import { getStorage, ref, uploadBytes} from "firebase/storage";

function createRef(data:any, res:any){
    const storage = getStorage();
    const storageRef = ref(storage, `${data.bucket}/${data.nameFile}`);

    uploadBytes(storageRef, data.file).then((snapshot) => {
        res(storageRef)
    });
}

export default createRef