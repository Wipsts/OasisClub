import React, {useState} from "react";
import {useParams} from 'react-router-dom'
import {Header, NavDown, Ads,ScrollingItens, Footer} from "../components/components"
import "../style/min/viewProduct.scss"

export default function ViewProduct(){
    const { id } = useParams();
    const examplesEcommerce = [{id: "uhasg6afs", data: {title: "Esfirra de carne feita na hora", img: "https://th.bing.com/th/id/R.58c27595c93b6192e432e2314d52923f?rik=KFUZKh0DX3CwAQ&pid=ImgRaw&r=0", value: 6.00, oldValue: 0}}]

    return (
        <>
            <main id="main-viewProduct">
                <section className="section-header">
                    <Header type={1} link={'/ecommerce'} color={'#272727'}/>
                    <div className="container-imageProduct"><img src="https://th.bing.com/th/id/R.58c27595c93b6192e432e2314d52923f?rik=KFUZKh0DX3CwAQ&pid=ImgRaw&r=0" alt="" /></div>
                </section>
                <section className="section-informationProduct">
                    <h1 className="title-product">Esfirra de carne feita na hora</h1>

                    <div className="box-content-value">
                        <span className="text-oldValue">R$ 6,00</span>
                        <span className="text-value">R$ 4,00</span>
                    </div>

                    <hr className="max-line"/>

                    <div className="container-informationProduct">
                        <span className="txt-informationProduct"><b>Alérgicos</b> contêm derivados de leite, contêm glúten</span>
                        <span className="txt-informationProduct"><b>Produto não Vegetariano</b></span>
                        <span className="txt-informationProduct"><b>Produto não Vegano</b></span>
                    </div>

                    <button className="button-addCard">Fazer Pedido</button>
                    <span className="txt-ops">Você será redirecionado à tela de pagamento</span>
                </section>
                <section className="section-moreProduct">
                    <Ads amountAds={2} link={true} automatic={true}/>
                    <div className="container-content">
                        <h3 className="title-content">Produtos semelhantes</h3>
                        <ScrollingItens itens={examplesEcommerce} link={true}  type={'ecommerce'} />
                    </div>
                </section>

            </main>
            <Footer/>
            <NavDown color={"#171717"}/>
        </>
    )
}