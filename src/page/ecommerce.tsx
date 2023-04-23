import React from "react";
import {Header, NavDown, Ads, ScrollingItens, Footer, Search} from "../components/components"
import "../style/min/blog.scss"

function Ecommerce(){
    const examplesEcommerce = [{id: "uhasg6afs", data: {title: "Esfirra de carne feita na hora", img: "https://th.bing.com/th/id/R.58c27595c93b6192e432e2314d52923f?rik=KFUZKh0DX3CwAQ&pid=ImgRaw&r=0", value: 6.00, oldValue: 0}}]

    return (
        <>
            <Header/>
            <main id="main-blog">
                <h1 className="title-page">Produtos E-commerce</h1>
                <div className="content-search">
                    <Search type='ecommerce' onClick={() => {}}/>
                </div>
                <div id="container-defaultLayout">
                    <ScrollingItens subtext={'Comidas'} itens={examplesEcommerce} type={'ecommerce'} />
                    <ScrollingItens subtext={'Produtos'} itens={examplesEcommerce} type={'ecommerce'} />
                    <Ads amountAds={2} link={true} automatic={true}/>
                </div>
            </main>
            <Footer/>
            <NavDown color={"#171717"}/>
        </>
    )
}

export default Ecommerce