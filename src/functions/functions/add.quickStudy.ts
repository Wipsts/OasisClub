import {firestore, logUser, db} from '../function'
import { doc, deleteDoc } from 'firebase/firestore';

interface ObjectQuickStudy{
    cards: Array<object>;
    color: string;
    image: any;
    matter: string;
    responseColor: string;
    tag: string;
    time: number;
    title: string;
    totalQuestions: number;
    type: number;
    valueStudy: number;
    uidUser: string;
}

export interface configPage{
    color: string;
    responseColor: string;
    totalQuestions: number;
    valueStudy: number;
    image: any;
    tag: string;
    matter: string;
    nameImage: string;
}

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
    return await new firestore().createRef({bucket: 'quickStudy', nameFile: name, file: file})
}

export class createQuickStudy{
    async prepareData(configPage:configPage, cards:Array<object>){
        const user = await getDataUser()

        const informationImage = splitNameAndFile(configPage.image)
        await createRefImage(informationImage)
        var ref2 = doc(db, `gs:/oasis-club-42a44.appspot.com/quickStudy/${informationImage[1]}`);
        await deleteDoc(ref2);

        const data:ObjectQuickStudy = {
            cards: cards,
            color: configPage.color,
            matter: configPage.matter,
            tag: configPage.tag,
            totalQuestions: configPage.totalQuestions,
            valueStudy: 15,
            responseColor: this.TextColor(configPage.color),
            time: (cards.length * 2),
            title: 'Estudo Rápido',
            type: 2,
            image: ref2,
            uidUser: user.id,
        }

        return await this.addData(data)
    }

    TextColor = (hex: string) => {
        let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });
        let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) as any;
        rgb = (rgb ? { r: parseInt(rgb[1], 16), g: parseInt(rgb[2], 16), b: parseInt(rgb[3], 16) } : { r: 0, g: 0, b: 0 });
    
        return '#' + (Math.round(((parseInt(rgb.r) * 299) + (parseInt(rgb.g) * 587) + (parseInt(rgb.b) * 114)) / 1000) > 150 ? "555" : "FFF");
    }

    async addData(data:ObjectQuickStudy){
        const idQuickStudy = await new firestore().insertData({bd: 'quickStudy', insert_data: data})
        sessionStorage.removeItem('cach-quickStudy')
       
        return idQuickStudy
    }
}
