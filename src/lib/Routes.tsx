import React from "react";
import { Routes, Route } from "react-router-dom" 

import Index from "../page/index"
import Blog from "../page/blog"
import Ecommerce from "../page/ecommerce"
import Song from "../page/song"
import MyAccount from "../page/myAccount"
import ViewArticle from "../page/viewArticle"
import ViewProduct from "../page/viewProduct"
import Cart from "../page/cart"
import Payment from "../page/pay"
import Rank from "../page/rank"
import TeacherPainel from "../page/teacherPainel"
import QuickStudy from "../page/quickStudy"
import QuickStudyView from '../page/quickStudyView'
import Quiz from '../page/quiz'
import AddArticle from '../page/AddArticle'
import AddProduct from '../page/addProduct'

import ModeratorPage from '../page/admin/moderatorPage'
import ModeratorBlog from '../page/admin/moderator.blog'
import ModeratorEcommerce from '../page/admin/moderator.ecommerce'
import ModeratorQuickStudy from '../page/admin/moderator.quickStudy'

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
            <Route path="/cart" element={<Cart/>}></Route>
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
            
            <Route path="/add/article" element={<AddArticle/>}></Route>
            <Route path="/edit/article/:id" element={<AddArticle/>}></Route>
            <Route path="/edit/product/:id" element={<AddProduct/>}></Route>
            <Route path="/add/product" element={<AddProduct/>}></Route>

            <Route path="/admin/verify/article/:id" element={<ModeratorBlog/>}></Route>
            <Route path="/admin/verify/product/:id" element={<ModeratorEcommerce/>}></Route>
            <Route path="/admin/add/quickstudy" element={<ModeratorQuickStudy/>}></Route>
            

            <Route path="/admin/moderator/:type" element={<ModeratorPage/>}></Route>

            <Route path="*" element={<Error404/>} />
        </Routes>
    )
}

export default _Routes