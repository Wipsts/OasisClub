import React, { useEffect, useState} from "react";
import {Header, NavDown, BigAds, ScrollingItens, Footer, Loading} from "../components/components"
import {firestore, getImageOfTheData} from '../functions/function'
import "../style/min/index.scss"

function Index(){
    const [artigles, setArtigles] = useState([{}])
    const [ecommerce, setEcommerce] = useState([{}])
    const [loading, setLoading] = useState(true)

    async function constructPage(){
        const returnedArtigles = await getImageOfTheData(await new firestore().get({bd: 'blog'}), 'blog', true)
        const returnedEcommerce = await getImageOfTheData(await new firestore().get({bd: 'ecommerce'}), 'ecommerce', true)
        setArtigles(returnedArtigles)
        setEcommerce(returnedEcommerce)
        setLoading(false)
    }

    useEffect(() => {
        constructPage()
    },[])

    return (
        <>
            <Header/>
            <main id="main-index">
                <BigAds amountAds={2} link={true} automatic={true}/>
                <div className="container-content">
                    <h3 className="title-content">Artigos mais recentes</h3>
                    {loading ? (<Loading width="100%" height="200px"/>) : (<ScrollingItens itens={artigles} link={true}  type={'blog'} />)}
                </div>
                <hr className="min-line" />
                <div className="container-content">
                    <h3 className="title-content">Produtos em promoção</h3>
                    {loading ? (<Loading width="100%" height="200px"/>) : (<ScrollingItens itens={ecommerce} link={true}  type={'ecommerce'} />)}
                </div>
            </main>
            <Footer/>
            <NavDown color={"#171717"}/>
        </>
    )
}

export default Index