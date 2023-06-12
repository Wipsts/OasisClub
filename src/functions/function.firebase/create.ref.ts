import { getStorage, ref } from "firebase/storage";

function createRef(data:any, res:any){
    const storage = getStorage();
    const storageRef = ref(storage);

}

export default createRef