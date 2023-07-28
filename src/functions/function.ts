import {remoteConfig, db} from '../lib/server/firebase/firebase.config'
import {firestore} from './functions/firestore'
import {getImageOfTheData, getImageReference, filterByTag} from './functions/processing.data'
import {getRemoteConfig} from './functions/get.remotion.config'
import {logUser, registreUser, RedifinePassword} from './functions/log.user'
import {filterByUids, getBoughtProduct, getArtiglesUser, getEcommerceUser, scanQrCode} from './functions/myAccount'
import {createMokup} from './functions/blog.view'
import {insertProductInCart} from './functions/functions.ecommerce'
import {createRank} from './functions/create.rank'
import {teacherPainel} from './functions/create.teacher.painel'
import {constructStudy, constructQuiz, constructQuickStudy} from './functions/construct.study'
import {createArticle, AuthorsParams} from './functions/add.article'

import {processingTextArtigle} from './functions/call.backend'

export {db}
export {firestore, createRank, teacherPainel, constructStudy, constructQuiz, constructQuickStudy, createArticle, createMokup, processingTextArtigle, getImageOfTheData, getImageReference, filterByTag, getRemoteConfig, remoteConfig, logUser, registreUser, RedifinePassword, filterByUids, getBoughtProduct, getArtiglesUser, getEcommerceUser, scanQrCode, insertProductInCart}
export type {AuthorsParams}