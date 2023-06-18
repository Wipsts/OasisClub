import React, {useState, useEffect} from "react";
import {Header, NavDown, Search, BoxQuestion, Loading} from "../components/components"
import {constructStudy} from '../functions/function'
import "../style/min/quickStudy.scss"

function QuickStudy(){
    const [quiz, setQuiz] = useState([{}])
    const [quickStudy, setQuickStudy] = useState([{}])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    async function createStudy(){
        const callClass = new constructStudy()
        await callClass.getDataQuiz()
        await callClass.getDataQuickStudy()
        callClass.processingData()

        const {quiz, quickStudy} = await callClass.returnData()
        
        setQuiz(quiz)
        setQuickStudy(quickStudy)
        setLoading(false)
    }

    const getSearch = (s:string) => setSearch(s)
    const transformInUppercase = (t:string) => t.toUpperCase();
    useEffect(() => {createStudy()}, [])
    return (
        <>
            <Header/>
            <main id="main-quickStudy">
                <h1 className="title-page">Estudo rápido</h1>
                <div className="content-search">
                    <Search type='song' onClick={getSearch}/>
                </div>
                <section id='section-quickStudy'>
                    <div className="container-prominence">
                        <span className="text-subtext">Em destaque</span>
                        <div className="content-prominence">
                            {loading ? <Loading width="100%" height="100px"/> : (
                                <>
                                    {quiz?.map((value:any, index) => (
                                        <BoxQuestion key={value.id} id={value.id} color={value.data.color} type={value.data.type} matter={value.data.matter} title={value.data.title} time={value.data.time} imageBackground={value.data.image}/>
                                    ))}
                                </>
                            )}
          
                        </div>
                    </div>

                    <hr />

                    {loading ? Array.from({ length: 4 }, (_, index) => (<Loading key={`loading-index-${index}`} width="100%" height="140px"/>)) : (
                        <>
                            {quickStudy?.map((boxStudy:any, index) => (
                                <div className="container-prominence" key={`${boxStudy.matter}-${index}`}>
                                    <span className="text-subtext">{boxStudy.matter}</span>
                                    <div className="content-prominence">
                                        {boxStudy?.data?.map((value:any, index:number) => {
                                            return transformInUppercase(value.data.matter).includes(transformInUppercase(search)) ? <BoxQuestion key={value.id} id={value.id} color={value.data.color} type={value.data.type} matter={value.data.matter} title={value.data.title} time={value.data.time} imageBackground={value.data.image}/> : ''
                                        })}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </section>
            </main>
            <NavDown color={"#171717"}/>
        </>
    )
}

export default QuickStudy