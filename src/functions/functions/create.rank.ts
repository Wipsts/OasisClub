import {firestore} from '../function'

export class createRank{
    async getStudens():Promise<Array<object>>{
        const studens = await new firestore().get({'bd': 'user'})

        return await this.filterData(studens)
    }

    async filterData(data:any){
        const select = ['name', 'points', 'instagram', 'Uid', 'schoolGrade']
        const resultado = data.map((objeto:any) =>
            Object.fromEntries(
              Object.entries(objeto.data).filter(([chave]) => select.includes(chave))
            )
        );
        
        return resultado
    }
}