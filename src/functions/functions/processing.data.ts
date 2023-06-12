import { getStorage, ref, getDownloadURL } from "firebase/storage";
const storage = getStorage();

export async function getImageOfTheData(data:any, path:string, isArray:boolean){
    if(isArray){
        let responseData = []
        for (let i = 0; i < data.length; i++) {
            const dataElement = data[i];
            if(checkImage(dataElement['image'])){
                dataElement['image'] = await getImageReference(path,dataElement['image'])
            }
            responseData.push(dataElement)
        }
    
        return responseData
    }else{
        data['image'] = await getImageReference(path,data['image'])
        return data
    }

    function checkImage(image:any){
        return image ? true : false
    }
}

export async function getImageReference (imageReference:any, path:string){
    const nameImage = imageReference._key.path.segments[8]
    const url = await getDownloadURL(ref(storage, `${path}/${nameImage}`))
    return url
}