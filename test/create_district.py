import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

orders = list(db.collection(u'orders').get())

users = list(db.collection(u'users').get())

doc_ref = db.collection(u'users')
# doc_ref.set({
#     u'name' : 'Cruzeiro',
#     u'location' : 'Norte'
# })


# for snapshot in orders:
#     pedido = snapshot.to_dict()
#     doc_ref = db.collection(u'promotions').document(pedido['address']['name'])
#     doc_ref.set({
#         u'pontuation' : 0
#     })

print(users)
for snapshot in users:
    # print(snapshot.to_dict())
    snap_dict = snapshot.to_dict()
    if ('pontuation' in snap_dict):
        print('EXISTEEE')
    else:
        print('nao existe')


# for snapshot in users:
#     snap_dict = snapshot.to_dict()       
#     if ('userId' in snap_dict):
#         pass
#     else:
#         print('nele nao existe', snap_dict['pontuation'])
#         doc_ref = db.collection(u'users').document('QR8LRYAcY3Riqul8V7engbQt9mV2') 
#         doc_ref.set({
#             u'address' : u"",
#             u'email' : u'pessoa1@gmail.com',
#             u'name' : u'Pessoa1',
#             u'userId' : u'QR8LRYAcY3Riqul8V7engbQt9mV2'
#         })