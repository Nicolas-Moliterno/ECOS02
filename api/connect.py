import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

def refresh_db(table, id, dict):
    doc_ref = db.collection(table).document(id)
    doc_ref.set(dict)

def get_db():
    dataB = {}

    deliverymen = list(db.collection(u'deliverymen').get())
    #print('------DB DELIVERYMEN-----')
    DF_deliverymen = {}
    for snapshot in deliverymen:
        DF_deliverymen[snapshot.to_dict()['id']] = snapshot.to_dict()
    #print(DF_deliverymen)
    #DF_deliverymen.to_csv('DF_deliverymen.csv', sep=';')
    dataB["deliverymen"] = DF_deliverymen


    regions = list(db.collection(u'regions').get())
    #print('------DB DISTRICTS-----')
    DF_regions = {}
    for snapshot in regions:
        DF_regions[snapshot.to_dict()["name"]] = snapshot.to_dict()["districts"]
    #print(DF_districts)
    #DF_regions.to_csv('DF_regions.csv', sep=';')
    dataB["regions"] = DF_regions


    orders = list(db.collection(u'orders').get())
    #print('------DB ORDERS-----')
    DF_orders = {}
    for r in DF_regions:
        for d in DF_regions[r]:
            DF_orders[d] = {}
    for snapshot in orders:
        DF_orders[snapshot.to_dict()["address"]["district"]][snapshot.to_dict()["orderId"]] = snapshot.to_dict()
    #print(DF_orders)
    #DF_orders.to_csv('DF_orders.csv', sep=';')
    dataB["orders"] = DF_orders

    return dataB