from flask import Flask
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from connect import get_db, refresh_db
import time
from datetime import datetime
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# Use a service account
cred = credentials.Certificate('../test/serviceAccountKey.json')
#firebase_admin.initialize_app(cred)

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


def sumPoint(name, total_pontos):
    db = firestore.client()

    users_ref = db.collection(u'users').document(name)
    old_pontuation =  users_ref.get(field_paths={'pontuation'}).get('pontuation')
    users_ref.set({
        u'pontuation' : int(float(old_pontuation)) + int(float(total_pontos)),
    }, merge=True)
    print('pontuação atualizada')



def get_stuf():
    db = firestore.client()

    users = list(db.collection(u'users').get())
    orders = list(db.collection(u'orders').get())

    users_dict = {}
    pedidos_completos = []

    ##CRIA O CAMPO PONTUAÇÃO SE ELE NAO EXISTE e preenche o dicionario de usuario para outros metodos
    # para nao ficar buscando no banco toda hora
    key = 0
    for snapshot in users:
        users_dict.setdefault(key,[]).append(snapshot.to_dict())
        if ('pontuation' in users_dict[key][0]):
            pass
        else:
            users_ref = db.collection(u'users').document(users_dict[key][0]['userId']) 
            users_ref.set({
                u'pontuation' : 0,
            }, merge=True)
        key = key + 1
    

    #checar o id do usuario e o status do pedido dele e mandar o nome tbm de quem pediu para controle
    for pedido in orders:
        orders_dict = pedido.to_dict()
        if(orders_dict['status']['status'] == 'confirmed'):
            pedidos_completos.append(orders_dict['orderId'])

        print('Nome de quem pediu', orders_dict['address']['name'])
        print('Status pedido', orders_dict['status']['status'])
        print('Id do pedido', orders_dict['orderId'])

        for i in users_dict:
            if orders_dict['userId'] == users_dict[i][0]['userId']:
                print('Pedido pelo usuario', users_dict[i][0]['name'])

                #Salvando os pedidos compĺetos
                if(orders_dict['status']['status'] == 'confirmed'):
                    for i in range(len(pedidos_completos)):
                        if(orders_dict['orderId'] == pedidos_completos[i]):
                            print('o pedido ',orders_dict['orderId'],' foi entregue')
                            print('o usuario ', users_dict[i][0]['name'], 'ganhou ', orders_dict['total'], ' de pontos')
                            sumPoint(name=orders_dict['userId'], total_pontos=orders_dict['total'])
                print('Seus pontos', users_dict[i][0]['pontuation'])

        print('-----------------------')

    print('OS PEDIDOS COMPLETOS SAO', pedidos_completos)

    return 'calc de pontuacao'


@app.route("/motoboys")
@cross_origin()
def motoboys():
    #initialize
        dict = {'Avaiable': [],'Deliveries': [], 'Regions': [], 'Capacity': []}
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

        return db['deliverymen'], have_changed


        time.sleep(time2Check)


@app.route("/pontuation_calc")
@cross_origin()
def index():
	return get_stuf()

@app.route("/pontuation")
@cross_origin()
def pontuation():
    db = firestore.client()

    users = list(db.collection(u'users').get())

    users_dict = {}

    key = 0
    for snapshot in users:
        users_dict.setdefault(key,[]).append(snapshot.to_dict())
        key = key + 1


    for i in users_dict:
        if (users_dict[i][0]['pontuation'] >= 100):
            print()
            doc_ref = db.collection(u'users').document(users_dict[i][0]['userId'])
            doc_ref.set({
                u'promotion' : '10%"desc',
            }, merge=True)  

    return users_dict

if __name__ == "__main__":
	app.run(host='localhost', port='5014', debug=True)

      