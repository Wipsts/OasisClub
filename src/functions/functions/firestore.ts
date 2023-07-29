import {analytics, db, auth, storage} from '../../lib/server/firebase/firebase.config'

import {__getData, __getDataEspecific} from "../function.firebase/get.data"
import __addData from "../function.firebase/add.data"
import __updateData from "../function.firebase/update.data"
// import __deleteData from "../function.firebase/delete.data"
import __getUser from "../function.firebase/get.user"
import __createRef from "../function.firebase/create.ref"
const dataNotIncluded = ['user']

export function verifyIfExistData(nameData:string):any{
    if(nameData && !dataNotIncluded.includes(nameData)){
        if(JSON.parse(sessionStorage.getItem(`cach-${nameData}`) as string)){
            return JSON.parse(sessionStorage.getItem(`cach-${nameData}`) as string)
        }else{
            return false
        }
    }else{
        return false
    }
}

export function setItemInStorage(nameData:string, data:string | object | Array<any>):boolean{
    if(nameData && !dataNotIncluded.includes(nameData)){
        const processingData = JSON.stringify(data)
        sessionStorage.setItem(`cach-${nameData}`, processingData);
        return  true
    }else{
        return false
    }
}

export class firestore{
    async get(data:any):Promise<Array<object>>{
        return await new Promise((resolve, reject) => {
            const cachData = verifyIfExistData(data.bd)
            if(cachData){
                resolve(cachData)
            }else{
                __getData(data, db, (response: any)=>{
                    if(response){
                        setItemInStorage(data.bd, response)
                        resolve(response)
                    }else{
                        reject(false)
                    }
                })
            }
        })
    }
    async getWhere(data:object):Promise<Array<object>>{
        return await new Promise((resolve, reject) => {
            __getDataEspecific(data, db, (response: any)=>{
                if(response){
                    resolve(response)
                }else{
                    reject(false)
                }
            })
        })
    }
    async insertData(data:object){
        return await new Promise((resolve, reject) => {
            __addData(data, db, (response: any)=>{
                if(response){
                    resolve(response)
                }else{
                    reject(false)
                }
            })
        })
    }

    async updateData(data:object){
        return await new Promise((resolve, reject) => {
            __updateData(data, db, (response: any)=>{
                if(response){
                    resolve(response)
                }else{
                    reject(false)
                }
            })
        })
    }

    async deleteData(data:object){
        return 'error'
    }
    async getUser(){
        return await new Promise((resolve, reject) => {
            __getUser((response: any)=>{
                if(response){
                    resolve(response)
                }else{
                    reject(false)
                }
            })
        })
    }
    async createRef(data:object):Promise<any>{
        return await new Promise((resolve, reject) => {
            __createRef(data, (response: any)=>{
                if(response){
                    resolve(response)
                }else{
                    reject(false)
                }
            })
        })
    }
}

/*
    data: {
        'bd': "",
        'select': "",
        'insert_data': {'name': "", 'email': ""},
        'update': {'id': "", 'data': {'name': "", 'email': ""}},
        'limit': "",
        'where': ""
        'ref': {'bucket': 'blog', nameFile: 'caminhadaNaRua', file: ''}
    }
*/

