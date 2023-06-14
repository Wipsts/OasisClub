import {remoteConfig} from '../lib/server/firebase/firebase.config'
import {firestore} from './functions/firestore'
import {getImageOfTheData, getImageReference, filterByTag} from './functions/processing.data'
import {getRemoteConfig} from './functions/get.remotion.config'
import {logUser, registreUser, RedifinePassword} from './functions/log.user'
import {filterByUids, getBoughtProduct, getArtiglesUser, getEcommerceUser, scanQrCode} from './functions/myAccount'

export {firestore, getImageOfTheData, getImageReference, filterByTag, getRemoteConfig, remoteConfig, logUser, registreUser, RedifinePassword, filterByUids, getBoughtProduct, getArtiglesUser, getEcommerceUser, scanQrCode}