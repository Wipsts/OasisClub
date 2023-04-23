import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import {Header, NavDown,Ads, Footer} from "../components/components"
import "../style/min/viewArtigle.scss"

export default function ViewArticle(){
    const { id } = useParams();

    useEffect(() => {
        console.log(id)
    },[])

    return (
        <>
            <main id="main-viewArtigle">
                <section className="section-header">
                    <Header type={1} link={'/blog'} color={'#00c5a1'}/>
                    <div className="container-imageArtigle"><img src="https://th.bing.com/th/id/OIP.5zsYKymVDeJQntqyJ1aTfQHaFj?pid=ImgDet&rs=1" alt="" /></div>
                </section>
                <section className="section-txts">
                    <article>
                        <h1 className="title-article">Como usar o crase, explicação e exemplos praticos</h1>
                        <div className="container">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu imperdiet elit. Pellentesque cursus, turpis vel consectetur viverra, massa urna porta ante, eget viverra risus augue vitae metus. Phasellus a orci sed dui aliquet varius eu non quam. In erat arcu, vulputate sed felis a, dapibus malesuada purus. Nunc tincidunt, nulla eu blandit cursus, nisl orci vulputate mi, id varius mi ipsum sit amet ipsum. Vivamus eu ante nec nisl tempus placerat id dignissim neque. In vel tellus vitae erat mollis semper in sit amet urna. Maecenas viverra velit felis, a suscipit libero vulputate ac. Donec non arcu enim. Morbi pretium aliquet fermentum. Aenean mollis urna vel lorem tincidunt tristique. Vestibulum ante ipsum primis in faucibus.</p>
                            <Ads amountAds={2} link={true} automatic={true}/>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu imperdiet elit. Pellentesque cursus, turpis vel consectetur viverra, massa urna porta ante, eget viverra risus augue vitae metus. Phasellus a orci sed dui aliquet varius eu non quam. In erat arcu, vulputate sed felis a, dapibus malesuada purus. Nunc tincidunt, nulla eu blandit cursus, nisl orci vulputate mi, id varius mi ipsum sit amet ipsum. Vivamus eu ante nec nisl tempus placerat id dignissim neque. In vel tellus vitae erat mollis semper in sit amet urna. Maecenas viverra velit felis, a suscipit libero vulputate ac. Donec non arcu enim. Morbi pretium aliquet fermentum. Aenean mollis urna vel lorem tincidunt tristique. Vestibulum ante ipsum primis in faucibus.</p>
                        </div>
                    </article>

                    <hr className="max-line"/>

                    <div className="container-informationArticle-author">
                        <div className="box-Author" style={{backgroundColor: '#00c5a1'}}>
                            <img className="iconUser" src='' alt=""/>
                            <span className="text-author">Nome Aluno  | 2ºA</span>
                        </div>
                        <div className="box-Author style-teacher" style={{backgroundColor: '#373737'}}>
                            <span className="text-author">Nome Orientador</span>
                        </div>
                    </div>

                    <hr className="min-line"/>

                    <div className="container-informationArticle">
                        <span className="text-information">Tipo de escrita: <b> INFORMAL </b></span>
                        <span className="text-information">Tipo de texto: <b> INFORMATIVO </b></span>
                        <span className="text-information">Matéria: <b> PORTUGUÊS </b></span>
                        <span className="text-information">Nível de dificuldade: <b> 3/10 </b></span>
                    </div>

                </section>
            </main>
            <Footer/>
            <NavDown color={"#171717"}/>
        </>
    )
}