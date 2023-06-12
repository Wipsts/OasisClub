import { updateDoc, doc} from "firebase/firestore";

async function updateData(data:any, db:any, res:any) {
    const dataCollectionRef = doc(db, data.bd, data.update.id);
    updateDoc(dataCollectionRef, data.update.data).then(Response => {
        res(true)
    }).catch(err => {console.error(err.message); res(false)})
}

export default updateData
