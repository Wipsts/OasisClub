import React from "react";
import {Header, NavDown, BigAds, ScrollingItens, Footer} from "../components/components"
import "../style/min/index.scss"

function Index(){
    const examplesBlog = [{id: "ijsudhusdhsudjs", data: {title: "Como usar o crase, explicação e exemplos praticos", img: "https://th.bing.com/th/id/OIP.5zsYKymVDeJQntqyJ1aTfQHaFj?pid=ImgDet&rs=1",  color: "#028c73", author: [{name: "Hélio Martins", schoolGrade: "3º A", icon: ""}]}}, {id: "182719ah98ha8s", data: {title: "Como usar autoridades na redação", img: "https://th.bing.com/th/id/R.4c52cde9c49e5971a5b1d088d9bd0b2c?rik=3%2bOY63bKYBFjzQ&pid=ImgRaw&r=0", color: "#0084c2", author: [{name: "Hélio Martins", schoolGrade: "3º A", icon: ""}]}}]
    const examplesEcommerce = [{id: "uhasg6afs", data: {title: "Esfirra de carne feita na hora", img: "https://th.bing.com/th/id/R.58c27595c93b6192e432e2314d52923f?rik=KFUZKh0DX3CwAQ&pid=ImgRaw&r=0", value: 6.00, oldValue: 0}}]

    return (
        <>
            <Header/>
            <main id="main-index">
                <BigAds amountAds={2} link={true} automatic={true}/>
                <div className="container-content">
                    <h3 className="title-content">Artigos mais recentes</h3>
                    <ScrollingItens itens={examplesBlog} link={true}  type={'blog'} />
                </div>
                <hr className="min-line" />
                <div className="container-content">
                    <h3 className="title-content">Produtos em promoção</h3>
                    <ScrollingItens itens={examplesEcommerce} link={true}  type={'ecommerce'} />
                </div>
            </main>
            <Footer/>
            <NavDown color={"#171717"}/>
        </>
    )
}

export default Index