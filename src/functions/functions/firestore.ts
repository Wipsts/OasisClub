import {analytics, db, auth, storage} from '../../lib/server/firebase/firebase.config'

import {__getData, __getDataEspecific} from "../function.firebase/get.data"
import __addData from "../function.firebase/add.data"
import __updateData from "../function.firebase/update.data"
// import __deleteData from "../function.firebase/delete.data"
import __getUser from "../function.firebase/get.user"
import __createRef from "../function.firebase/create.ref"

export class firestore{
    async get(data:object):Promise<Array<object>>{
        return await new Promise((resolve, reject) => {
            __getData(data, db, (response: any)=>{
                if(response){
                    resolve(response)
                }else{
                    reject(false)
                }
            })
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
    async createRef(data:object){
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
    }
*/

