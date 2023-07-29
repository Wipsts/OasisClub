import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Header, ScrollingItens, Footer, Loading} from "../../components/components"
import {firestore, getImageOfTheData} from '../../functions/function'
import {ObjectProductParams, DataAddingParams} from '../../interfaces/interfaces'
import '../../style/min/moderatorPage.scss'

interface returnDataBd{
    id: string;
    data: ObjectProductParams | DataAddingParams
}

export default function ModeratorPage(){
    const {type} = useParams()
    const [isBlog, setIsBlog] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [objectAnalyze, setObjectAnalyze] = useState<Array<returnDataBd>>([])
    const [objectAlreadyAnalyze, setObjectAlreadyAnalyze] = useState<Array<returnDataBd>>([])
    const navigate = useNavigate()

    async function constructPage(){
        let usageBlog = false
        if(type === 'blog'){
            setIsBlog(true)
            usageBlog = true
        }

        const data = await getImageOfTheData(await new firestore().get({bd: usageBlog ? 'blog' : 'ecommerce'}), usageBlog ? 'blog' : 'ecommerce', true);
        const [analyze, alreadyAnalyze] = selectByAnalyze(data)

        setObjectAnalyze(analyze)
        setObjectAlreadyAnalyze(alreadyAnalyze)
        setLoading(false)

        function selectByAnalyze(data:Array<returnDataBd>){
            const analyze = []
            const alreadyAnalyze = []
            
            for (let i = 0; i < data.length; i++) {
                const element = data[i];

                if(element.data.analyze == 3){
                    alreadyAnalyze.push(element)
                }else if(element.data.analyze == 1){
                    analyze.push(element)
                }
            }
            
            return [analyze, alreadyAnalyze]
        }
    }

    function exitModeradorMode(){
        navigate('/myAccount')
    }

    useEffect(() => {
        constructPage()
    },[])

    return (
        <>
            <Header color="##171717" key={'header-moderator-page'} type={2}/>
            <main className="main-moderatorPage">
                <div className="content-title-page">
                    <h1 className="title-page">Pagina do moderador</h1>
                    <span className="mode-moderator">{isBlog ? 'Blog' : 'E-commerce'} Adm</span>
                </div>

                <hr className="max-line"/>

                <section className="content-objects">
                    {loading && objectAnalyze ? <Loading height="200px" key={'loading-analyze'} width="100%" /> : <ScrollingItens itens={objectAnalyze} type={isBlog ? 'blog' : 'ecommerce'}  analyze={true} key={'scroll-analyze'} tagFillter="1" myAccount={true} subtext="Para Análize"/>}
                    {loading && objectAlreadyAnalyze ? <Loading height="200px" key={'loading-already-analyze'} width="100%" /> : <ScrollingItens itens={objectAlreadyAnalyze} type={isBlog ? 'blog' : 'ecommerce'}  analyze={true} key={'scroll-already-analyze'} tagFillter="0" myAccount={true} subtext="Enviados para correção"/>}   
                </section>

                <button className="button-exit-moderador" onClick={() => exitModeradorMode()}>Sair do modo moderador</button>
            </main>    
            <Footer/>
        </>
    )
}