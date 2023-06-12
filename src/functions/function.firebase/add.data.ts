import { collection, addDoc} from "firebase/firestore";

async function addData(data:any, db:any, res:any) {    
    if(!data.insert_data){
        res(["error", "data is not valid"])
        return
    }

    const dataCollectionRef = collection(db, data.bd);
    addDoc(dataCollectionRef, data.insert_data).then(Response => {
        res(Response.id)
    }).catch(err => {
        console.error(err.message) 
    })
}

export default addData