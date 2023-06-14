import React, {useEffect, useState} from "react";
import {Header, NavDown, Ads, ScrollingItens, Footer, Search, Loading} from "../components/components"
import {firestore, filterByTag, getImageOfTheData, getRemoteConfig} from '../functions/function'
import "../style/min/blog.scss"

function Ecommerce(){
    const [ecommerce, setEcommerce] = useState([{}])
    const [filtered, setFiltered] = useState([{title: '', data: []}, {title: '', data: []}])
    const [tags, setTags] = useState(['Comida', 'Produto']);
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    async function constructPage(){
        const returnedArtigles = await getImageOfTheData(await new firestore().get({bd: 'ecommerce'}), 'ecommerce', true)
        getRemoteTags()
        contructByTags(returnedArtigles)
        setEcommerce(returnedArtigles)
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
            const remoteTags = await getRemoteConfig('tags_ecommerce')
            const tag = remoteTags.split(',')
            setTags(tag)
        }
    }

    // const getSearch = (s:string) => setSearch(s)
    // const transformInUppercase = (t:string) => t.toUpperCase();

    useEffect(() => {
        constructPage()
    },[])

    return (
        <>
            <Header/>
            <main id="main-blog">
                <h1 className="title-page">Produtos E-commerce</h1>
                <div className="content-search">
                    {/* <Search type='ecommerce' onClick={getSearch}/> */}
                </div>
                <div id="container-defaultLayout">
                    {loading ? (<Loading key='loading-ecommerce-tag-1' width="100%" height="150px"/>) : (<ScrollingItens subtext={filtered[0].title} itens={filtered[0].data} type={'ecommerce'} />)}
                    {loading ? (<Loading key='loading-ecommerce-tag-2' width="100%" height="150px"/>) : (<ScrollingItens subtext={filtered[1].title} itens={filtered[1].data} type={'ecommerce'} />)}
                    <Ads amountAds={2} link={true} automatic={true}/>
                </div>
            </main>
            <Footer/>
            <NavDown color={"#171717"}/>
        </>
    )
}

export default Ecommerce