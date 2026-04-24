from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Investment
from .serializers import InvestmentSerializer
from .simulation import simulate_price_change


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_investment(request):
    serializer = InvestmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(investor=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_investments(request):
    investments=Investment.objects.filter(investor=request.user)
    serializer=InvestmentSerializer(investments,many=True)
    
    total_value = 0
    stock_total = 0
    crypto_total = 0
    commodity_total = 0
    
    for inv in investments:
        price = inv.current_price if inv.current_price else inv.buy_price
        value = float(inv.quantity) * float(price)
        total_value +=  value

        if inv.type=='stock':
            stock_total+=value
        elif inv.type=='crypto':
            crypto_total+=value
        elif inv.type=='commodity':
            commodity_total+=value    

            # Risk calculation
    risk_score = 0
    risk_level = "No investments"
    composition = {'stocks':0, 'crypto':0, 'commodities':0}
    warnings = []

    if total_value > 0:
        composition={
            'stocks':round((stock_total/total_value*100),1),
            'crypto':round((crypto_total/total_value*100),1),
            'commodities':round((commodity_total/total_value*100),1)
        }
        # base risk
        crypto_pct = crypto_total/total_value
        stock_pct = stock_total/total_value
        commodity_pct = commodity_total/total_value
        risk_score = (crypto_pct*3)+(stock_pct*2)+(commodity_pct*1)


        investment_value = {}
        for inv in investments:
            price = inv.current_price if inv.current_price else inv.buy_price
            value = float(inv.quantity)*float(price)
            if inv.name in investment_value:
                investment_value[inv.name] += value
            else:    
                investment_value[inv.name] = value

        largest_value = max(investment_value.values())
        largest_pct = largest_value/total_value
        
        if largest_pct > 0.5:
            risk_score += 0.3  # Penalty for concentration

            # risk level 
        if risk_score<=1.5:
            risk_level= "Low Risk"
        elif risk_score<=2.3:
            risk_level = "Medium Risk"
        else:
            risk_level= "High Risk"           


        if composition['crypto'] >50:
             warnings.append(f"High crypto exposure - very volatile ({composition['crypto']}% of holdings are crypto)")

        if composition['stocks']>70:
            warnings.append(f"High stock market exposure ({composition['stocks']}% of holdings are stocks)")
        if composition['commodities'] > 80:
            warnings.append(f"Portfolio lacks growth potential ({composition['commodities']}% of holdings are commodities)")    
        if largest_pct >0.6:
            warnings.append(f"{round(largest_pct*100)}% in single investment - not diversified")


    return Response({
        'total_value': round(total_value, 2),
        'stock_total': round (stock_total,2),
        'crypto_total':round(crypto_total,2),
        'commodity_total':round(commodity_total,2),
        'composition':composition,
        'warnings':warnings,
        'risk_score':risk_score,
        'risk_level':risk_level,
        'investments': serializer.data
    })


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_investment(request,investment_id):
    try:
        investment=Investment.objects.get(id=investment_id,investor=request.user)
    except Investment.DoesNotExist:
        return Response({'error':'Investment not found'},status=status.HTTP_404_NOT_FOUND)

    serializer=InvestmentSerializer(investment, data=request.data, partial=True)    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_investment(request, investment_id):
    try:
        investment=Investment.objects.get(id=investment_id, investor=request.user)
    except Investment.DoesNotExist:
        return Response({'error':'Investment not found'},status=status.HTTP_404_NOT_FOUND)  

    investment.delete()
    return Response({'message':'Investment deleted successfully'}, status=status.HTTP_200_OK) 


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def simulate_market(request):
    investments = Investment.objects.filter(investor=request.user)

    if not investments.exists():
        return Response({'message': 'No investments yet'}, status=status.HTTP_200_OK)
    
    grouped_prices = {}
    for investment in investments:
        if investment.name not in grouped_prices:
            current_price = investment.current_price if investment.current_price else investment.buy_price
            grouped_prices[investment.name] = simulate_price_change(investment.type, current_price)

    updated_count = 0
    for investment in investments:
        if investment.name in grouped_prices:
            new_price = grouped_prices[investment.name]
            if new_price:
                investment.current_price = new_price
                investment.save()
                updated_count += 1

    serializer = InvestmentSerializer(investments, many=True)
    return Response({
        'message': f"Market simulated. {updated_count} investments updated.",
        'investments': serializer.data
    }, status=status.HTTP_200_OK)

    # total_value = sum(
    # float(inv.current_price if inv.current_price else inv.buy_price) * float(inv.quantity)
    # for inv in investments
    # )
    # return Response({
    #     'total_value': round(total_value,2),
    #     'investments': serializer.data
    # })