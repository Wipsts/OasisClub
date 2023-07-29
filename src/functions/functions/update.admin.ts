/* eslint-disable no-restricted-globals */
import {firestore, getDataUser} from '../function'

export class updateAdminArticle{
    async prepareData(type:number, commit:string, id:string){
        const isConfirm = confirm("Essa ação é inreversivel, tem certeza que quer continuar?")
        if(isConfirm){
            const user = await getDataUser()
            
            const data = {
                'analyze': type,
                'Orientation': commit,
                'advisor': user.data.name
            }        
    
            return this.updateData(data, id)
        }else{
            return false
        }
    }

    async updateData(data:object, id:string){
        sessionStorage.removeItem('cach-blog')
        return await new firestore().updateData({bd: 'blog', update: {id: id, data: data}})
    }
}

export class updateAdminEcommerce{
    async prepareData(type:number, id:string){
        const isConfirm = confirm("Essa ação é inreversivel, tem certeza que quer continuar?")
        if(isConfirm){
            const user = await getDataUser()
            
            const data = {
                'analyze': type,
                'advisor': user.data.name
            }        
    
            return this.updateData(data, id)
        }else{
            return false
        }
    }

    async updateData(data:object, id:string){
        sessionStorage.removeItem('cach-ecommerce')
        return await new firestore().updateData({bd: 'ecommerce', update: {id: id, data: data}})
    }
}