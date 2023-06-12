import {remoteConfig} from '../lib/server/firebase/firebase.config'
import {firestore} from './functions/firestore'
import {getImageOfTheData, getImageReference, filterByTag} from './functions/processing.data'
import {getRemoteConfig} from './functions/get.remotion.config'

export {firestore, getImageOfTheData, getImageReference, filterByTag, getRemoteConfig, remoteConfig}