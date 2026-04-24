import random

def simulate_price_change(asset_type,current_price):

    if not current_price:
        return None
    
    current_price = float(current_price)

    if asset_type == 'crypto':
        change_percent = random.uniform(-0.08,0.08)
    elif asset_type == 'stock':
        change_percent = random.uniform(-0.03,0.03)
    else:
        change_percent = random.uniform(-0.01,0.01)        

    new_price= current_price*(1 + change_percent)   
    return round(new_price,2) 