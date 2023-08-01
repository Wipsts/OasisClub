import React, {useState, useEffect} from "react";
import {Header, NavDown, Ads, ScrollingItens, Footer, Search, ItensBox, Loading} from "../components/components"
import {firestore, filterByTag, getImageOfTheData, getRemoteConfig} from '../functions/function'
import "../style/min/blog.scss"

function Blog(){
    const [artigles, setArtigles] = useState([{}])
    const [filtered, setFiltered] = useState([{title: '', data: []}, {title: '', data: []}])
    const [tags, setTags] = useState(['regras gramáticais', 'enem']);
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    async function constructPage(){
        const returnedArtigles = await getImageOfTheData(await new firestore().get({bd: 'blog'}), 'blog', true)
        getRemoteTags()
        contructByTags(returnedArtigles)
        setArtigles(returnedArtigles)
        setLoading(false)
    
        async function contructByTags(data:any){
            if(tags && tags[0]){
                const returnFirstTag = await filterByTag(data, tags[0])
                const returnSecondTag = await filterByTag(data, tags[1])
                setFiltered([
                    {title: tags[0], data: returnFirstTag},
                    {title: tags[1], data: returnSecondTag}
                ])
            }
        }

        async function getRemoteTags(){
            const remoteTags = await getRemoteConfig('tags_blog')
            setTags(remoteTags)
        }
    }

    const getSearch = (s:string) => setSearch(s)
    const transformInUppercase = (t:string) => t.toUpperCase();

    useEffect(() => {
        constructPage()
    },[])

    return (
        <>
            <Header/>
            <main id="main-blog">
                <h1 className="title-page">Artigos</h1>
                <div id="container-defaultLayout">
                    {loading ? (<Loading key='loading-tag-1' width="100%" height="150px"/>) : (<ScrollingItens  key={'blog-scroll-1'} subtext={filtered[0].title} itens={filtered[0].data} type={'blog'} />)}
                    <Ads key={'ads-blog'} amountAds={2} link={true} automatic={true}/>
                    {loading ? (<Loading key='loading-tag-2' width="100%" height="150px"/>) : (<ScrollingItens  key={'blog-scroll-2'} subtext={filtered[1].title} itens={filtered[1].data} type={'blog'} />)}
                </div>
                {/* <hr className="max-line" /> */}
                <div className="content-search">
                    <Search type='blog' onClick={getSearch}/>
                </div>
                <div className="container-articles">
                    <span className="subtext-article">Todos os Artigos</span>
                    {loading ? (<Loading key='loading-more-artigle' width="100%" height="150px"/>) : (
                        <>
                            <div className="content-article">
                                {artigles.map((article:any, index) => (
                                    <>
                                        {transformInUppercase(article.data.title).includes(transformInUppercase(search)) ? <ItensBox uid={article.id} analyze={false} article={{img: article.data.image, title: article.data.title, color: ((article.data.color) ? article.data.color : ''), author: ((article.data.author) ? article.data.author : ''), value: 0, oldValue:0, analyze: article.data.analyze}} type={'blog'} link={true} key={`article-key-${index}`} /> : ''}                                        
                                    </>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>
            <Footer/>
            <NavDown color={"#171717"}/>
        </>
    )
}

export default Blog