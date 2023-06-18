import {processingTextArtigle} from '../function'

// TODO remove

export async function createMokup(txtArtigle:string, ads:number):Promise<Array<string> | string>{
    const processedText = await processingTextArtigle(txtArtigle) as any;

    return txtArtigle
    // return processedText ? processedText : txtArtigle;
}