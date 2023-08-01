import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {Header, ScrollingItens, Footer, Loading} from "../../components/components"
import {firestore, getImageOfTheData} from '../../functions/function'
import {ObjectProductParams, DataAddingParams} from '../../interfaces/interfaces'
import '../../style/min/moderatorPage.scss'

interface returnDataBd{
    id: string;
    data: ObjectProductParams | DataAddingParams
}

interface BdByTypeParams{
    bd: 'ecommerce' | 'blog' | 'quickStudy' | 'quiz';
    name: string;
    type: number
}

export default function ModeratorPage(){
    const {type} = useParams()
    const [configPage, setConfigPage] = useState<BdByTypeParams>({bd: 'blog', name: 'Blog', type: 0})

    const [loading, setLoading] = useState<boolean>(true)
    const [objectAnalyze, setObjectAnalyze] = useState<Array<returnDataBd>>([])
    const [objectAlreadyAnalyze, setObjectAlreadyAnalyze] = useState<Array<returnDataBd>>([])
    const navigate = useNavigate()

    async function constructPage(){
        let onlyAdmin = false
        const bdUse = setBdByType()
        setConfigPage(bdUse)

        if(bdUse.type === 2 || bdUse.type === 3){
            onlyAdmin = true;
        }
        
        const data = await getImageOfTheData(await new firestore().get({bd: bdUse.bd}), bdUse.bd, true);
        const [analyze, alreadyAnalyze] = selectByAnalyze(data, onlyAdmin)

        setObjectAnalyze(analyze)
        setObjectAlreadyAnalyze(alreadyAnalyze)
        setLoading(false)

        function selectByAnalyze(data:Array<returnDataBd>, isOnlyAdmin:boolean){            
            if(!isOnlyAdmin){
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
            }else{
                return [data, []]
            }
            
        }

        function setBdByType():BdByTypeParams{
            switch(type){
                case 'blog':
                    return {bd: 'blog', name: 'Blog', type: 0};
                case 'ecommerce':
                    return {bd: 'ecommerce', name: 'E-commerce', type: 1};
                case 'quickstudy':
                    return {bd: 'quickStudy', name: 'Estudo Rápido', type: 2}
                case 'quiz':
                    return {bd: 'quiz', name: 'Quizzes', type: 3};
                default:
                    return {bd: 'blog', name: 'Blog', type: 0};
            }
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
                    <span className="mode-moderator">{configPage.name} Adm</span>
                </div>

                <hr className="max-line"/>

                <section className="content-objects">
                    {loading && objectAnalyze ? <Loading height="200px" key={'loading-analyze'} width="100%" /> : <ScrollingItens itens={objectAnalyze} type={configPage.bd}  analyze={true} key={'scroll-analyze'} tagFillter="1" admin={true} subtext="Para Análize"/>}
                    {loading && objectAlreadyAnalyze ? <Loading height="200px" key={'loading-already-analyze'} width="100%" /> : <ScrollingItens itens={objectAlreadyAnalyze} type={configPage.bd}  analyze={true} key={'scroll-already-analyze'} tagFillter="0" admin={true} subtext="Enviados para correção"/>}   
                </section>

                {configPage.type === 2 ? <Link to={'/admin/add/quickstudy'}><button className="button-add-card">Adicionar Card de estudo rápido</button> </Link> : ''}                
                <button className="button-exit-moderador" onClick={() => exitModeradorMode()}>Sair do modo moderador</button>
            </main>    
            <Footer/>
        </>
    )
}