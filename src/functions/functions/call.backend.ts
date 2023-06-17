import axios from 'axios';

const backendAPI_baseURL = "http://127.0.0.1:5000"
const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export async function processingTextArtigle(txt:string){
    if(txt){
        try{
            const response = await axios({
                method: 'post',
                url: `${backendAPI_baseURL}/processing/artigle`,
                headers: defaultHeaders, 
                data: {
                  text: txt, // This is the body part
                }
            });
    
            return response.data.processed
        }
        catch(err){
            return false
        }
    }else{
        return false
    }
}