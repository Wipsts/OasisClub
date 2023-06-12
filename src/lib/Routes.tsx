import React from "react";
import { Routes, Route } from "react-router-dom" 

import Index from "../page/index"
import Blog from "../page/blog"
import Ecommerce from "../page/ecommerce"
import Song from "../page/song"
import MyAccount from "../page/myAccount"
import ViewArticle from "../page/viewArticle"
import ViewProduct from "../page/viewProduct"
import Card from "../page/card"
import Payment from "../page/pay"
import Rank from "../page/rank"
import TeacherPainel from "../page/teacherPainel"
import QuickStudy from "../page/quickStudy"
import QuickStudyView from '../page/quickStudyView'

import Quiz from '../page/quiz'

import Login from '../page/login'
import Registre from '../page/registre'
import Password from '../page/password'

import TestQrCode from '../page/test/qrCodeTest'

import Error404 from "../page/error/404";

function _Routes(){
    return (
        <Routes>
            <Route path="/" element={<Index/>}></Route>
            <Route path="/blog" element={<Blog/>}></Route>
            <Route path="/ecommerce" element={<Ecommerce/>}></Route>
            <Route path="/song" element={<Song/>}></Route>
            <Route path="/myAccount" element={<MyAccount/>}></Route>
            <Route path="/viewArticle/:id" element={<ViewArticle/>}></Route>
            <Route path="/viewProduct/:id" element={<ViewProduct/>}></Route>
            <Route path="/card" element={<Card/>}></Route>
            <Route path="/payment" element={<Payment/>}></Route>
            <Route path="/rank" element={<Rank/>}></Route>
            <Route path="/teacherPainel" element={<TeacherPainel/>}></Route>
            <Route path="/quickStudy" element={<QuickStudy/>}></Route>
            <Route path="/quiz/:id" element={<Quiz/>}></Route>
            <Route path="/quickStudy/view/:id" element={<QuickStudyView/>}></Route>

            <Route path="/login" element={<Login/>}></Route>
            <Route path="/registre" element={<Registre/>}></Route>
            <Route path="/password/:id" element={<Password/>}></Route>

            <Route path="/scanQr" element={<TestQrCode/>}></Route>

            <Route path="*" element={<Error404/>} />
        </Routes>
    )
}

export default _Routes