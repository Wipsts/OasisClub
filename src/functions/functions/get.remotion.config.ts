import {remoteConfig} from '../function'
import { getValue, fetchAndActivate } from "firebase/remote-config";

export function getRemoteConfig(tagRemote:string):Promise<Array<string>>{
    return new Promise((resolve, reject) => {
        fetchAndActivate(remoteConfig)
        .then(() => {
            const value:any = getValue(remoteConfig, tagRemote)

            // resolve(value['_value'])
            resolve(JSON.parse(value['_value']))
        })
        .catch((err) => {
          // ...
        });
    })
    
}