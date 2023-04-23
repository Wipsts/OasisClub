import React from 'react';
import {Header, NavDown} from "../../components/components"
import gif404 from '../../images/animate/404Gif.gif'
import '../../style/error/404.scss'

export default function Error404(){
    return (
        <>
            <Header/>
            <main id="main-404">
                <img src={gif404} alt="" />

                <h1 className='text-errorName'>page Not Found</h1>
            </main>
            <NavDown color='#171717'/>
        </>
    )
}