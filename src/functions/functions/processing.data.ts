import { getStorage, ref, getDownloadURL } from "firebase/storage";
const storage = getStorage();

export async function getImageOfTheData(data:any, path:string, isArray:boolean){
    if(isArray){
        let responseData = []
        for (let i = 0; i < data.length; i++) {
            const dataElement = data[i];
            if(checkImage(dataElement.data.image)){
                dataElement.data.image = await getImageReference(dataElement.data.image, path)
            }
            responseData.push(dataElement)
        }
        return responseData
    }else{
        data.data.image = await getImageReference(data.data.image, path)
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

export async function filterByTag(data:any, tag:string){
    return data?.filter((data:any) => data.data.tag === tag)
}