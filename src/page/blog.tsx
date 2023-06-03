import React from "react";
import {Header, NavDown, Ads, ScrollingItens, Footer, Search, ItensBox} from "../components/components"
import "../style/min/blog.scss"

function Blog(){
    const examplesBlog = [{id: "ijsudhusdhsudjs", data: {title: "Como usar o crase, explicação e exemplos praticos", img: "https://th.bing.com/th/id/OIP.5zsYKymVDeJQntqyJ1aTfQHaFj?pid=ImgDet&rs=1",  color: "#028c73", analyze: 1, author: [{name: "Hélio Martins", schoolGrade: "3º A", icon: ""}]}}, {id: "182719ah98ha8s", data: {title: "Como usar autoridades na redação", img: "https://th.bing.com/th/id/R.4c52cde9c49e5971a5b1d088d9bd0b2c?rik=3%2bOY63bKYBFjzQ&pid=ImgRaw&r=0", color: "#0084c2", analyze: 0, author: [{name: "Hélio Martins", schoolGrade: "3º A", icon: ""}]}}]
   
    return (
        <>
            <Header/>
            <main id="main-blog">
                <h1 className="title-page">Artigos</h1>
                <div className="content-search">
                    <Search type='blog' onClick={() => {}}/>
                </div>
                <div id="container-defaultLayout">
                    <ScrollingItens subtext={'Regras Gramaticais'} itens={examplesBlog} type={'blog'} />
                    <Ads amountAds={2} link={true} automatic={true}/>
                    <ScrollingItens subtext={'Vantagens para o ENEM'} itens={examplesBlog} type={'blog'} />
                </div>
                <hr className="max-line" />
                <div className="container-articles">
                    <span className="subtext-article">Todos os Artigos</span>
                    <div className="content-article">
                        {examplesBlog.map((article, index) => (
                            <ItensBox uid={article.id} analyze={false} article={{img: article.data.img, title: article.data.title, color: ((article.data.color) ? article.data.color : ''), author: ((article.data.author) ? article.data.author : ''), value: 0, oldValue:0, analyze: article.data.analyze}} type={'blog'} link={true} key={`article-key-${index}`} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer/>
            <NavDown color={"#171717"}/>
        </>
    )
}

export default Blog