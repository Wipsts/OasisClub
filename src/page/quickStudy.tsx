import React, {useState, useEffect} from "react";
import {Header, NavDown, Search, BoxQuestion} from "../components/components"
import "../style/min/quickStudy.scss"

function QuickStudy(){

    return (
        <>
            <Header/>
            <main id="main-quickStudy">
                <h1 className="title-page">Estudo rápido</h1>
                <div className="content-search">
                    <Search type='song' onClick={() => {}}/>
                </div>
                <section id='section-quickStudy'>
                    <div className="container-prominence">
                        <span className="text-subtext">Em destaque</span>
                        <div className="content-prominence">
                            <BoxQuestion key={'ahsyuagsya'} id='ahsyuagsya' color={'#35316B'} type={1} matter={'Matemática'} title={'teste de conhecimento'} time={'10'} imageBackground={'https://th.bing.com/th/id/OIP.ukoZscHtSjhD0CRDL3bljQHaHa?pid=ImgDet&rs=1'}/>
                            <BoxQuestion key={'kjagsyagsa'} id='kjagsyagsa' color={'#1F672F'} type={1} matter={'português'} title={'teste de conhecimento'} time={'15'} imageBackground={'https://img.freepik.com/fotos-kostenlos/portugiesische-beschriftung-auf-pfirsichhintergrund_23-2148293431.jpg?size=626&ext=jpg'}/>
                        </div>
                    </div>

                    <hr />

                    <div className="container-prominence">
                        <span className="text-subtext">português</span>
                        <div className="content-prominence">
                            <BoxQuestion key={'ljahbysgai'} id='ljahbysgai' color={'#222222'} type={2} matter={'Figura de linguagem'} title={'Estudo Rápido'} time={'5'} imageBackground={'https://th.bing.com/th/id/OIP.ukoZscHtSjhD0CRDL3bljQHaHa?pid=ImgDet&rs=1'}/>
                            <BoxQuestion key={'lkajhsiaus'} id='lkajhsiaus' color={'#222222'} type={2} matter={'Formas Verbais'} title={'Estudo Rápido'} time={'5'} imageBackground={'https://img.freepik.com/fotos-kostenlos/portugiesische-beschriftung-auf-pfirsichhintergrund_23-2148293431.jpg?size=626&ext=jpg'}/>
                        </div>
                    </div>
                </section>
            </main>
            <NavDown color={"#171717"}/>
        </>
    )
}

export default QuickStudy