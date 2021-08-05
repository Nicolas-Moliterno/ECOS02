from connect import get_db, refresh_db
import time
from datetime import datetime

regions2Check = ["norte", "leste", "sul", "oeste", "centro"]
neighbor_regions = {
    "centro":["norte", "sul", "leste", "oeste"],
    "norte":["centro", "leste", "oeste"],
    "leste": ["centro", "norte", "sul"],
    "sul": ["centro", "leste", "oeste"],
    "leste": ["centro", "norte", "sul"]
}
time2Check = 60

def print_delivery(deliverymen, have_changed):
    if len(have_changed) > 0:
        for d in have_changed:
            print(deliverymen[d]['name']+':')
            print("-> Avaiable: "+str(deliverymen[d]['avaiable']))
            print('-> Deliveries: '+str(deliverymen[d]['open_deliveries']))
            print('-> Regions: '+str(deliverymen[d]['open_deliveries_regions']))
            print('-> Capacity: '+str(deliverymen[d]['capacity']-deliverymen[d]['capacity_avaiable'])+'/'+str(deliverymen[d]['capacity']))

def avaiable_for_that_region(open_deliveries_regions, current_region):
    if current_region in open_deliveries_regions:
        return True
    elif len(open_deliveries_regions) == 1:
        if current_region in neighbor_regions[open_deliveries_regions[0]]:
            return True
        else:
            return False
    elif len(open_deliveries_regions) > 1:
        return False
    else:
        return True

def main():
    while(True):
        #initialize
        db = get_db()
        deliverymen = []
        for d in db['deliverymen']:
            if db['deliverymen'][d]['avaiable'] == True:
                deliverymen.append(d)
        have_changed = []

        #handling
        print("__________ "+str(datetime.now())+" __________")
        for region in regions2Check:
            for district in db["regions"][region]:
                for order in list(db["orders"][district]):
                    if db["orders"][district][order]["deliverymanId"] == "":
                        order_without_deliveryman = True
                        for deliverymen_a in deliverymen:
                            if (order_without_deliveryman)and(db['deliverymen'][deliverymen_a]['capacity_avaiable'] > 0)and(avaiable_for_that_region(db['deliverymen'][deliverymen_a]['open_deliveries_regions'],region)):
                                print("Order "+order+" will be delivered from "+db["deliverymen"][deliverymen_a]["name"]+'.')
                                db["deliverymen"][deliverymen_a]["open_deliveries"].append(order)
                                db["deliverymen"][deliverymen_a]["avaiable"] = False
                                if region not in db["deliverymen"][deliverymen_a]["open_deliveries_regions"]:
                                    db["deliverymen"][deliverymen_a]["open_deliveries_regions"].append(region)
                                db["deliverymen"][deliverymen_a]["capacity_avaiable"] = db["deliverymen"][deliverymen_a]["capacity_avaiable"] - 1
                                db["orders"][district][order]["deliverymanId"] = deliverymen_a
                                refresh_db("deliverymen", deliverymen_a, db["deliverymen"][deliverymen_a])
                                refresh_db("orders", order, db["orders"][district][order])
                                if deliverymen_a not in have_changed:
                                    have_changed.append(deliverymen_a)
                                order_without_deliveryman = False
                        if order_without_deliveryman:
                            print("Order "+order+" without deliveryman avaiable.")
        print_delivery(db['deliverymen'], have_changed)
        time.sleep(time2Check)


main()