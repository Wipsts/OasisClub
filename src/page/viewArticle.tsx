import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import {Header, NavDown, Ads, Footer, Loading} from "../components/components"
import {firestore, getImageOfTheData} from '../functions/function'
import "../style/min/viewArtigle.scss"

function IncludeAds({txt}:{txt:string}){
    const processingAds = () => {
        let processedText = txt.split(/<ads\/>/g);
        let newText = []

        for (let i = 0; i < processedText.length; i++) {
            if(i !== 0){
                newText.push('<ads/>')
            }
            newText.push(processedText[i])
        }
        return (
            <>
                {newText?.map((tag:any, index:number) => {
                    if(tag != '<ads/>'){
                        return <p key={`content-tags-${index}`} dangerouslySetInnerHTML={{__html: tag}} />
                    }else{
                        return <Ads key={`ads-artigle-${index}`} amountAds={2} link={true} automatic={true}/>
                    }
                })}
            </>
        )
    }

    return (
        <>
            {txt && txt.includes("<ads/>") ? processingAds() : <div dangerouslySetInnerHTML={{__html: txt}} />}
        </>
    )
    
}

export default function ViewArticle(){
    const { id } = useParams();
    const [dataArtigle, setArtigle] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const typeWriter = ['Formal', 'Informal', 'Descontraido', 'Jovem']
    const typeText = ['História', 'Informativo', 'Pesquisa', 'Entreterimento', 'Entrevista']
    const matters = ['Exatas', 'Linguagens', 'Português', "Matemática", "História", "Geografia", "Filosofia", "Sociologia", "Arte", "Ciências", "Fisíca", "Quimíca", "Outras"]
    const [txtArtigle, setTxtArtigle] = useState<string>("")

    async function constructPage(){
        const dataBlog = await getImageOfTheData(await new firestore().get({bd: 'blog'}), 'blog', true);
        const artigleValue = selectArtigleById(dataBlog)
        setArtigle(artigleValue.data)
        createMarkup(artigleValue.data)
        setLoading(false)

        function selectArtigleById(data:any){
            return data.filter((a:any) => a.id === id)[0]
        }

        async function createMarkup(artigleValue:any) {
            setTxtArtigle(artigleValue.article)
        }

    }

    useEffect(() => {
        constructPage()
    },[])

    return (
        <>
            <main id="main-viewArtigle">
                <section className="section-header">
                    <Header type={1} link={'/blog'} color={loading ? '#1a1a1a' : dataArtigle.color}/>
                    <div className="container-imageArtigle">
                        {loading ? (<Loading width="100%" height="100%"/>) : <img className="image-artile" src={dataArtigle.image} alt="" />}
                    </div>
                </section>
                <section className="section-txts">
                    <article>
                        {loading ? (<Loading width="100%" height="50px"/>) : <h1 className="title-article">{dataArtigle.title}</h1> }
                        
                        <div className="container">
                            {loading && txtArtigle ? (<Loading width="100%" height="40vh"/>) : <IncludeAds txt={txtArtigle} />}
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
                        {loading ? (<Loading width="100%" height="30px"/>) : (<span className="text-information">Tipo de escrita: <b> {typeWriter[dataArtigle.typeWriting]} </b></span>)}
                        {loading ? (<Loading width="100%" height="30px"/>) : (<span className="text-information">Tipo de texto: <b> {typeText[dataArtigle.typeText]} </b></span>)}
                        {loading ? (<Loading width="100%" height="30px"/>) : (<span className="text-information">Matéria: <b> {matters[dataArtigle.matter]} </b></span>)}
                        {loading ? (<Loading width="100%" height="30px"/>) : (<span className="text-information">Nível de dificuldade: <b> {dataArtigle.difficultyLevel}/10 </b></span>)}           
                    </div>

                </section>
            </main>
            <Footer/>
            <NavDown color={"#171717"}/>
        </>
    )
}