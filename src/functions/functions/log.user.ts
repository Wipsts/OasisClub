import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import {firestore} from '../function'
const auth = getAuth();

interface returndAuthenticateUserParams{
    login: boolean;
    data?: Array<string>;
    why?: string; 
}

export class logUser{
    async getAuthenticateUser(email:string, password:string):Promise<returndAuthenticateUserParams>{
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user as any;
                const emailVerify = user.emailVerified
                const tokenAccess = user.accessToken
                const localID = user.reloadUserInfo.localId // ponte da auth com o bd
            
                if(true){ // emailVerify
                    resolve({login: true, data: [localID, tokenAccess]})
                }else{
                    resolve({login: false, why: "email"})
                }
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                reject({login: false, why: "notUser"})
            });    
        });
    }

    async getDataUser(uid:string){
        const dataUser = await getInformationUserByUid(uid)
        return dataUser ? {user:true, data: dataUser} : {user: false, why: "notUser"}

        async function getInformationUserByUid(uid:string):Promise<object>{
            return await new firestore().getWhere({bd: 'user', where: ['Uid', uid]})
        }
    }

    async logOutUser():Promise<any>{
        return new Promise((resolve, reject) => {
            signOut(auth).then(() => {
                sessionStorage.removeItem('ahjsgba87sga87s')
                resolve({logout: true})
            }).catch((error) => {
                reject({logout: false, why: error.message})
            });
        })
    }


    async getUser():Promise<string|boolean>{
        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;
                    resolve(uid)
                } else {
                    resolve(false)
                }
            });
        })
    }

    async userIsAdm(id?:string){
        const uid = (id ? id : await this.getUser()) as string;
        if(uid){
            const getController = controllerCachAdmin('', false)
            if(getController){
                return getController
            }else{
                const dataUser = await this.getDataUser(uid) as any
                controllerCachAdmin(dataUser.data.data.admin, true)
            }
        }else{
            return 'false'
        }

        function controllerCachAdmin(admin:string, setData?:boolean){
            if(setData){
                sessionStorage.setItem('ahjsgba87sga87s', admin)
            }else{
                return sessionStorage.getItem('ahjsgba87sga87s')
            }
        }
    }
}

export class registreUser{
    async registreUserWithEmail(email:string, password:string, code:string){

    }
    confirmRegistration(){

    }
}

export class RedifinePassword{
    sendCode(){

    }


}