import {firestore, getImageOfTheData} from '../function'

interface processingResultParams{
    productID: string,
    userID: string,
    productCode: string,
}

export async function filterByUids(uids:Array<string>, data:any){
    const response = []
    for (let i = 0; i < uids.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if(data[j].id === uids[i]){
                response.push(data[j])
            }
        }
    }

    return response
}

export async function getBoughtProduct(uids:Array<object>, uidUser:string){
    const dataEcommerce = await getImageOfTheData(await new firestore().get({bd: 'ecommerce'}), 'ecommerce', true)
    const filterdByBougthAndScanned = uids?.map((product:any) => (isProductBought(product) && isProductScanned(product)) ? product : null).filter(e=> e!=null)    
    const getOnlyUid = filterdByBougthAndScanned?.map((product:any) => product.uidProduct)
    const filteredByUids = await filterByUids(getOnlyUid, dataEcommerce);
    const reponse = await correlateCartWithProduct(filterdByBougthAndScanned, filteredByUids)
   
    return reponse

    function isProductBought(product:any){
        if(product.bought){
            return true
        }else{
            return false
        }
    }

    function isProductScanned(product:any){
        if(product.scanned < product.quant){
            return true
        }else{
            return false
        }
    }

    async function correlateCartWithProduct(uids:Array<any>, products:Array<any>){
        const response = []
        for (let i = 0; i < uids.length; i++) {
            for (let j = 0; j < products.length; j++) {
                const product = products[j]
                const uid = uids[i]
                if(uid.uidProduct === product.id){
                    
                    response.push(
                        {
                            title: product.data.title,
                            code: uid.code,
                            quant: uid.quant,
                            uid_user: uidUser,
                            qrValue: `${product.id}-${uidUser}-${uid.code}`,
                            id: product.id,
                        }
                    )
                }
            }
            
        }

        return response
    }
}

export async function getArtiglesUser(uids:Array<string>){
    const dataArtigle = await getImageOfTheData(await new firestore().get({bd: 'blog'}), 'blog', true)
    const filteredByUids = await filterByUids(uids, dataArtigle);

    return filteredByUids
}
export async function getEcommerceUser(uids:Array<string>){
    const dataEcommerce = await getImageOfTheData(await new firestore().get({bd: 'ecommerce'}), 'ecommerce', true)
    const filteredByUids = await filterByUids(uids, dataEcommerce);

    return filteredByUids
}

export class scanQrCode{
    processingResult: processingResultParams

    constructor(){
        this.processingResult = {productID: '', userID: '', productCode:''}
    }
    processingQrCode(value:string){
        if(value){
            const [productID, userID, productCode] = value.split('-')
            this.processingResult = {productID: productID, userID: userID, productCode:productCode}
        }
    }

    async showLayoutProduct(){
        const productID = this.processingResult.productID
        const product =  await getImageOfTheData(await new firestore().getWhere({bd: 'ecommerce', where: ['documentID', productID]}), 'ecommerce', false) as any
        return product.data
    }

    async changeBuyersCart(quant = 1){
        const productCode = this.processingResult.productCode
        const userID = this.processingResult.userID

        const userCart = await new firestore().getWhere({bd: 'user', where: ['documentID', userID]}) as any
        const processedData = changeInformationCart(userCart.data.uidCard)
        return await changeCart(processedData)


        async function changeCart(data:any){
            return await new firestore().updateData({bd: 'user', update: {'id': userID, 'data': {'uidCard': data}}});
        }

        function changeInformationCart(dataCart:any){
            return dataCart?.map((product:any, index:number) => {
                if(product.code === productCode){
                    var processedProduct = addMoreScan(product)
                    if(checkIfProductIsOver(processedProduct.scanned, product.quant)){
                        return null
                    }else{
                        return processedProduct
                    }                    
                }else{
                    return product
                }
            }).filter((p:any) => p !== null)
        }

        function addMoreScan(dataProduct:any){
            var scanned = dataProduct.scanned
            dataProduct.scanned = scanned + quant
            return dataProduct
        }

        function checkIfProductIsOver(scanned:number, quant:number){
            return scanned < quant ? false : true
        }
    }

    async changeDataProduct(quant = 1){
        const productID = this.processingResult.productID

        const product = await new firestore().getWhere({bd: 'ecommerce', where: ['documentID', productID]}) as any
        const processedData = changeInformationProduct(product.data)
        return await changeProductBd(processedData)

        function changeInformationProduct(product:any){
            const quantProduct = product.quant
            product.quant = quantProduct - quant
            
            if(product.quant <= 0){
                product.analyze = 0
            }
            
            return product
        }

        async function changeProductBd(data:any){
            return await new firestore().updateData({bd: 'ecommerce', update: {'id': productID, 'data': {'quant': data.quant, 'analyze': data.analyze}}});
        }
        
    }
}