import {firestore, logUser, db} from '../function'
import { doc, deleteDoc } from 'firebase/firestore';

export interface AuthorsParams{
    name: string;
    schoolGrade: string;
    id: string;
}

export type StNb = string | number

export interface DataAddingParams{
    Orientation: string;
    ads: number;
    advisor: string;
    analyze: number;
    article: string;
    author: AuthorsParams[];
    color: string;
    difficultyLevel: StNb;
    image: any;
    numberAds: number;
    postUid?: string;
    tag: string;
    title: string;
    matter: StNb;
    typeText: StNb;
    typeWriting: StNb;
}

const matters = ['Exatas', 'Linguagens', 'Português', "Matemática", "História", "Geografia", "Filosofia", "Sociologia", "Arte", "Ciências", "Fisíca", "Quimíca", "Outras"]


export async function getDataUser(){
    const idUser = await new logUser().getUser()
    const informationUser = await new logUser().getDataUser(idUser as string)
    return informationUser.data as any
}
export class createArticle{
    async prepareData(CountAds:number, article:string, author:AuthorsParams[], color: string, difficultyLevel: string | number, img: any, matter: string | number, numberAds = 1, title: string, typeText: StNb, typeWriting: StNb){        
        const idUser = author[0].id
        const tags = matters[matter as number]
        const user = await getDataUser() as any
        
        const informationImage = this.splitNameAndFile(img)
        await this.createRefImage(informationImage)
        
        var ref2 = doc(db, `gs:/oasis-club-42a44.appspot.com/blog/${informationImage[1]}`);
        await deleteDoc(ref2);

        const data:DataAddingParams = {
            'ads': CountAds,
            'advisor': '',
            'analyze': 1,
            'article': article,
            'author': author,
            'color': color,
            'difficultyLevel': difficultyLevel,
            'image': ref2,
            'numberAds': numberAds,
            'matter': matter,
            'Orientation': '',
            'postUid': idUser,
            'tag': tags,
            'title': title,
            'typeText': typeText,
            'typeWriting': typeWriting
        }

        return await this.addData(data, idUser, user.data.uidArtigle)
    }

    splitNameAndFile(img:string):Array<string>{
        const image = img[0] as any

        return [image, image.name]
    }

    async createRefImage([file, name]:Array<string>){
        return await new firestore().createRef({bucket: 'blog', nameFile: name, file: file})
    }

    async addData(data:DataAddingParams, id: string, uidsArtigle:Array<string>):Promise<any>{
        const arrayUid = uidsArtigle
        const addArticle = await new firestore().insertData({bd: 'blog', insert_data: data})
        if(addArticle){
            arrayUid.push(addArticle as string)
            const updateUser = await new firestore().updateData({bd: 'user', update: {id: id, data: {uidArtigle: arrayUid}}})
            sessionStorage.removeItem('cach-blog')

            return updateUser
        }else{
            return false
        }
    
    }

}

export class updateArticle{
    async prepareData(idArticle:string, CountAds:number, article:string, author:AuthorsParams[], color: string, difficultyLevel: string | number, img: any, matter: string | number, numberAds = 1, title: string, typeText: StNb, typeWriting: StNb){        
        const tags = matters[matter as number]
        
        const [name, bucket] = this.getNameAndBucketOfImg(img)
        var ref2 = doc(db, `gs:/oasis-club-42a44.appspot.com/${bucket}/${name}`);
        await deleteDoc(ref2);

        const data:DataAddingParams = {
            'ads': CountAds,
            'advisor': '',
            'analyze': 1,
            'article': article,
            'author': author,
            'color': color,
            'difficultyLevel': difficultyLevel,
            'image': ref2,
            'numberAds': numberAds,
            'matter': matter,
            'Orientation': '',
            'tag': tags,
            'title': title,
            'typeText': typeText,
            'typeWriting': typeWriting
        }

        return await this.updateData(data, idArticle)
    }

    getNameAndBucketOfImg(img:string):Array<string>{
        const splitedImg = img.split("/")[7]
        const bucketAndName = decodeURI(splitedImg.split("?")[0])
        const [bucket, name] = bucketAndName.split("%2F")

        return [name, bucket]
    }

    async updateData(data:DataAddingParams, uidsArtigle:string):Promise<any>{
        sessionStorage.removeItem('cach-blog')
        return await new firestore().updateData({bd: 'blog', update: {id: uidsArtigle, data: data}})
    }
}

export class removeArticle{
    async removeArticle(id:string){
        const user = await getDataUser() as any
        return await this.removeData(user.id, id, user.data.uidArtigle)
    }

    async removeData(idUser:string , idArticle: string, uidsArtigle: Array<string>){
        const removedArticle = await new firestore().deleteData({bd: 'blog', id: idArticle})
        if(removedArticle){
            const newUidArticleUser = this.removeIdArticleInUser(uidsArtigle, idArticle)
            const updateUser = await new firestore().updateData({bd: 'user', update: {id: idUser, data: {uidArtigle: newUidArticleUser}}})
            sessionStorage.removeItem('cach-blog')
            return updateUser
        }else{
            return false
        }
    }

    removeIdArticleInUser(uidsArtigle: Array<string>, uidArticle:string){
        const removeIdArticle = uidsArtigle.filter(id => id !== uidArticle)
        return removeIdArticle
    }
}