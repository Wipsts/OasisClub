import {firestore, logUser, db} from '../function'
import { doc, deleteDoc } from 'firebase/firestore';
import {ObjectProductParams} from '../../interfaces/interfaces'


async function getDataUser(){
    const idUser = await new logUser().getUser()
    const informationUser = await new logUser().getDataUser(idUser as string)
    return informationUser.data as any
}

function splitNameAndFile(img:string):Array<string>{
    const image = img[0] as any

    return [image, image.name]
}

async function createRefImage([file, name]:Array<string>){
    return await new firestore().createRef({bucket: 'ecommerce', nameFile: name, file: file})
}

export class createProduct{
    async prepareData(data:ObjectProductParams){
        const user = await getDataUser()

        const informationImage = splitNameAndFile(data.image)
        await createRefImage(informationImage)
        var ref2 = doc(db, `gs:/oasis-club-42a44.appspot.com/ecommerce/${informationImage[1]}`);
        await deleteDoc(ref2);

        data.analyze = 1
        data.tag = ['Comida', 'Produto'][data.type - 1]
        data.postID = user.id
        data.image = ref2

        return await this.addData(data, user.id, user.data.uidProducts)
    }

    async addData(data:ObjectProductParams, idUser:string, uidsProduct: Array<string>){
        const arrayUid = uidsProduct
        const idProduct = await new firestore().insertData({bd: 'ecommerce', insert_data: data})
        if(idProduct){
            arrayUid.push(idProduct as string)
            const updateUser = await new firestore().updateData({bd: 'user', update: {id: idUser, data: {'uidProducts': arrayUid}}})
            sessionStorage.removeItem('cach-ecommerce')

            return updateUser
        }else{
            return false
        }
    }
}

export class updateProduct{
    async prepareData(data:ObjectProductParams, idProduct:string){
        data.analyze = 1
        data.tag = ['Comida', 'Produto'][data.type - 1]
        data.image = await this.getImage(data.image)
        data.value = data.value.replace(".", ",")

        return await this.updateData(data, idProduct)
    }

    async getImage(image:string|object){
        var ref2
        if(typeof image !== 'object'){
            if(image.includes("https://")){
                const [name, bucket] = this.getNameAndBucketOfImg(image)
                ref2 = doc(db, `gs:/oasis-club-42a44.appspot.com/${bucket}/${name}`);
            }else{
                const informationImage = splitNameAndFile(image)
                await createRefImage(informationImage)
                ref2 = doc(db, `gs:/oasis-club-42a44.appspot.com/ecommerce/${informationImage[1]}`);
            }
        }else{
            const informationImage = (image as any)[0]
            await createRefImage([informationImage, informationImage.name])
            ref2 = doc(db, `gs:/oasis-club-42a44.appspot.com/ecommerce/${informationImage.name}`);
        }
        
        await deleteDoc(ref2);
        return ref2
    }

    getNameAndBucketOfImg(img:string):Array<string>{
        const splitedImg = img.split("/")[7]
        const bucketAndName = decodeURI(splitedImg.split("?")[0])
        const [bucket, name] = bucketAndName.split("%2F")

        return [name, bucket]
    }

    async updateData(data:ObjectProductParams, idProduct:string):Promise<any>{
        return await new firestore().updateData({bd: 'ecommerce', update: {id: idProduct, data: data}})
    }
}

