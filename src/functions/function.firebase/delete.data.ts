import { doc, deleteDoc} from "firebase/firestore";

interface Objectdata{
    bd: string;
    id: string
}

async function deleteData(data:Objectdata, db:any, res:any) {
    const dataCollectionRef = doc(db, data.bd, data.id);
    deleteDoc(dataCollectionRef)
        .then(Response => {res(true)})
        .catch(err => {console.error(err.message); res(false)})
}

export default deleteData