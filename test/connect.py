import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

# print('DBBB',db.__dict__)

# print('teste', dir(db))


users = list(db.collection(u'users').get())
print('------DB USERS-----')
for snapshot in users:
    print(snapshot.to_dict())


menu = list(db.collection(u'menu').get())
print('------DB MENU-----')
for snapshot in menu:
    print(snapshot.to_dict())


products = list(db.collection(u'products').get())
print('------DB PRODUTOS-----')
for snapshot in products:
    print(snapshot.to_dict())


orders = list(db.collection(u'orders').get())
print('------DB PEDIDOS-----')
for snapshot in orders:
    print(snapshot.to_dict())


ordersStatus = list(db.collection(u'ordersStatus').get())
print('------DB Status dos PEDIDOS-----')
for snapshot in ordersStatus:
    print(snapshot.to_dict())


print('----------------------')

for snapshot in orders:
    pedido = snapshot.to_dict()

print('Endereço',pedido['address'])
print('Forma pagamento',pedido['payment'])