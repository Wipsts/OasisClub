import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import {Header, NavDown,Ads, Footer, Loading} from "../components/components"
import {firestore, getImageOfTheData} from '../functions/function'
import "../style/min/viewArtigle.scss"

export default function ViewArticle(){
    const { id } = useParams();
    const [dataArtigle, setArtigle] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const typeWriter = ['Formal', 'Informal', 'Descontraido', 'Jovem']
    const typeText = ['História', 'Informativo', 'Pesquisa', 'Entreterimento', 'Entrevista']

    async function constructPage(){
        const dataBlog = await getImageOfTheData(await new firestore().get({bd: 'blog'}), 'blog', true);
        const dataArtigle = selectArtigleById(dataBlog)
        setArtigle(dataArtigle.data)
        setLoading(false)

        function selectArtigleById(data:any){
            return data.filter((a:any) => a.id === id)[0]
        }
    }

    useEffect(() => {
        constructPage()
    },[])

    return (
        <>
            <main id="main-viewArtigle">
                <section className="section-header">
                    <Header type={1} link={'/blog'} color={loading ? '#1a1a1' : dataArtigle.color}/>
                    <div className="container-imageArtigle">
                        {loading ? (<Loading width="100%" height="100%"/>) : <img src={dataArtigle.image} alt="" />}
                    </div>
                </section>
                <section className="section-txts">
                    <article>
                        {loading ? (<Loading width="100%" height="50px"/>) : <h1 className="title-article">{dataArtigle.title}</h1> }
                        
                        <div className="container">
                            {/* TODO fazer a integração entre tags html e tags REACT */}
                            {loading ? (<Loading width="100%" height="40vh"/>) : <div dangerouslySetInnerHTML={{__html:dataArtigle.article }}/>}
                        </div>
                    </article>

                    <hr className="max-line"/>

                    <div className="container-informationArticle-author">
                    {loading ? (<Loading width="100%" height="80px"/>) : (
                        <>
                            {dataArtigle?.author?.map((author:any, index:number) => (
                                <div className="box-Author" key={author.name} style={{backgroundColor:  dataArtigle.color}}>
                                    <img className="iconUser" src='' alt=""/>
                                    <span className="text-author">{author.name} | {author.schoolGrade}</span>
                                </div>
                            ))}
                            <div className="box-Author style-teacher" style={{backgroundColor: '#373737'}}>
                                <span className="text-author">{dataArtigle.advisor}</span>
                            </div>
                        </>
                    )}
                    </div>

                    <hr className="min-line"/>

                    <div className="container-informationArticle">
                        <span className="text-information">Tipo de escrita: <b> {typeWriter[dataArtigle.typeWriting]} </b></span>
                        <span className="text-information">Tipo de texto: <b> {typeText[dataArtigle.typeText]} </b></span>
                        <span className="text-information">Matéria: <b> {dataArtigle.matter} </b></span>
                        <span className="text-information">Nível de dificuldade: <b> {dataArtigle.difficultyLevel}/10 </b></span>
                    </div>

                </section>
            </main>
            <Footer/>
            <NavDown color={"#171717"}/>
        </>
    )
}