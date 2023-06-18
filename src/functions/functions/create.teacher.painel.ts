import {firestore,getImageOfTheData} from '../function'

export class teacherPainel{
    async getTeachers():Promise<Array<object>>{
        const teacher = await getImageOfTheData(await new firestore().get({'bd': 'teacher'}),'teacher',true)
        return teacher
    }
}