import {firestore, logUser} from '../function'

interface dataProductParams{
    uidProduct: string,
    bought: boolean,
    code: string,
    quant: number,
    scanned: number,
}

export class insertProductInCart{
    DATAPRODUCT: dataProductParams | {}
    DATACART: Array<dataProductParams>
    UIDUSER: string
    IDUSER: string
    CART: Array<dataProductParams>

    constructor(){
        this.DATAPRODUCT = {}
        this.DATACART = []
        this.UIDUSER = ""
        this.IDUSER = ""
        this.CART = []
    }

    selectProduct(id:string){
        this.DATAPRODUCT = {
            uidProduct: id,
            bought: false,
            code: generateCodeCart(),
            quant: 1,
            scanned: 0,
        }

        function generateCodeCart(){
            const caractereCode = "ABCDEFGHIJKLMNOPQRSTUVabcdefghijklmnopqrstuv123456789"
            let code = "";
            for (let i = 0; i <= 8; i++) {
                let selectCaractere = caractereCode[Math.floor(Math.random() * 53 + 0)]
                code += selectCaractere
            }

            return `#${code}`
        }
    }

    async selectUser(){
        const uidUser = await new logUser().getUser() as string
        if(uidUser){
            this.UIDUSER = uidUser
        }else{
            return false
        }
    }

    async selectCart(){
        const uidUser = this.UIDUSER
        if(uidUser){
            const user = await new firestore().getWhere({bd: 'user', where: ["Uid", uidUser]}) as any;
            this.DATACART = user.data.uidCard
            this.IDUSER = user.id
        }else{
            return false
        }
    }

    addProductInCart(){
        const cart = this.DATACART
        const product = this.DATAPRODUCT as dataProductParams
        let addNewProduct = true
        if(cart){
            const newCart = []
            for (let i = 0; i < cart.length; i++) {
                const cartValue = cart[i];
                if(!cartValue.bought){
                    if(cartValue.uidProduct === product.uidProduct){
                        addNewProduct = false
                        cartValue.quant += product.quant
                    }
                }else{
                    newCart.push(cartValue)
                }
            }

            if(addNewProduct){
                newCart.push(product)
            }

            this.CART = newCart
        }else{
            return false
        }
    }

    async updateBdCartUser(){
        const cart = this.CART
        const idUser = this.IDUSER

        if(cart && idUser){
            console.log(cart)
            console.log(idUser)
            const updateUser = await new firestore().updateData({bd: "user", update: {"id": idUser, "data": {'uidCard': cart}}})
            return updateUser
        }else{
            return false
        }
    }

}