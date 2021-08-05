import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore



def sumPoint(name, total_pontos):
    print('aquiiii', name, total_pontos)

    db = firestore.client()

    users_ref = db.collection(u'users').document(name)
    old_pontuation =  users_ref.get(field_paths={'pontuation'}).get('pontuation')
    print('AQUIUII ', old_pontuation)
    users_ref.set({
        u'pontuation' : int(float(old_pontuation)) + int(float(total_pontos)),
    }, merge=True)
    print('pontuação atualizada')


def main():
    # Use a service account
    cred = credentials.Certificate('serviceAccountKey.json')
    firebase_admin.initialize_app(cred)

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
            print('Ja possuem pontuation zerada')
            pass
        else:
            print('nele nao existe', users_dict[key][0]['userId'])
            users_ref = db.collection(u'users').document(users_dict[key][0]['userId']) 
            users_ref.set({
                u'pontuation' : 0,
            }, merge=True)
        key = key + 1

    #print(users_dict[0][0]['userId'])
    print(users_dict)

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
                        if(orders_dict['orderId'] != pedidos_completos[i]):
                            print('o pedido ',orders_dict['orderId'],' foi entregue')
                            print('o usuario ', users_dict[i][0]['name'], 'ganhou ', orders_dict['total'], ' de pontos')
                            sumPoint(name=orders_dict['userId'], total_pontos=orders_dict['total'])
                print('Seus pontos', users_dict[i][0]['pontuation'])


        print('-----------------------')




    print('OS PEDIDOS COMPLETOS SAO', pedidos_completos)




if __name__ == "__main__":
    main()