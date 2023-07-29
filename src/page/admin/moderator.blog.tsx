import {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom'
import {Header, Ads, Footer, Loading, NavBarModerator} from "../../components/components"
import {firestore, getImageOfTheData, updateAdminArticle} from '../../functions/function'
import "../../style/min/viewArtigle.scss"

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
    const difficultyLevel = ['1/10', '2/10', '3/10', '4/10', '5/10', '6/10', '7/10', '8/10', '9/10', '10/10', 'Hard']
    const [txtArtigle, setTxtArtigle] = useState<string>("")
    const navigate = useNavigate()

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

    async function updateData(type: number, commit:string){
        const updated = await new updateAdminArticle().prepareData(type, commit, id as string)
        if(updated){
            alert("Análize feita com sucesso.")
            navigate('/admin/moderator/blog')
        }else{
            alert("Ops! tivemos um erro, tente novamente mais tarde")
        }
    }

    const sendChanged = (type:number, commit:string) => {
        updateData(type, commit)
    }

    return (
        <>
            <main id="main-viewArtigle">
                <section className="section-header">
                    <Header type={1} link={'/admin/moderator/blog'} color={loading ? '#1a1a1a' : dataArtigle.color}/>
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
                        {loading ? (<Loading width="100%" height="30px"/>) : (<span className="text-information">Nível de dificuldade: <b> {difficultyLevel[dataArtigle.difficultyLevel]} </b></span>)}           
                    </div>

                </section>
            </main>
            <NavBarModerator sendChanged={sendChanged}/>
            <Footer/>
        </>
    )
}