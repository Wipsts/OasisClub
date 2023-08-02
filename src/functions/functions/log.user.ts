import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail} from "firebase/auth";
import {firestore} from '../function'
const auth = getAuth();

interface returndAuthenticateUserParams{
    login: boolean;
    data?: Array<string>;
    why?: string; 
}

interface returnedRegistreUserParams{
    registre: boolean;
    why?: string; 
}

interface ObjectCreateUser{
    Uid: string;
    admin: {admin: boolean, mode: 'blog' | 'ecommerce' | 'quickstudy' | 'quiz' | ''};
    code: string;
    email: string;
    instagram: string;
    name: string;
    points: number;
    purchases: number;
    quizDone: Array<string>;
    schoolGrade: number;
    screenTime: number;
    uidArtigle: Array<string>;
    uidCard: Array<object>;
    uidProducts: Array<string>;
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
    async registreUserWithEmail(email:string, password:string, name:string, code: string, schollGrade: number):Promise<returnedRegistreUserParams>{
        return new Promise((resolve, reject) => {
            const auth = getAuth();

            createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              const user:any = userCredential.user;
              const localID = user.reloadUserInfo.localId // ponte da auth com o bd
            
              const registreInBd = await this.registreUserInBd(name, localID, email, code, schollGrade)
          
              if(!registreInBd){
                reject({registre: false, why: "#1721872"})
              }

              sendEmailVerification(user)
                .then(() => {
                   resolve({registre: true})
                }).catch(() => {
                    reject({registre: false, why: "#8176278"})
                });
            })
            .catch(() => {
                reject({registre: false, why: "#9087511"})
            });
        })
    }

    async registreUserInBd(name:string, uid:string, email: string, code: string, schollGrade:number):Promise<boolean>{
        const createDataUser: ObjectCreateUser = {
            admin: {admin: false, mode: ''},
            code: code,
            email: email,
            instagram: '',
            name: name,
            points: 0,
            purchases: 0,
            quizDone: [],
            schoolGrade: schollGrade,
            screenTime: 0,
            Uid: uid,
            uidArtigle: [],
            uidCard: [],
            uidProducts: []
        }

        const added = await new firestore().insertData({bd: 'user', insert_data: createDataUser})
        return added ? true : false
    }
}

export class RedifinePassword{
    sendCode(email:string):Promise<boolean>{
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            sendPasswordResetEmail(auth, email)
            .then(() => {
                resolve(true)
            })
            .catch(() => {
              reject(false)
            });
        })
    }
}