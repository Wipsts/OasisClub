import { doc, deleteDoc} from "firebase/firestore";

async function deleteData(data:any, db:any, res:any) {
    // const dataCollectionRef = doc(db, data.bd, data.id);
    // deleteDoc(dataCollectionRef)
    //     .then(Response => {res(true)})
    //     .catch(err => console.error(err.message), res(false))
}

export default deleteData