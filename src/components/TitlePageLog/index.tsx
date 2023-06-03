import React from 'react'
import './style.scss'

export function TitlePageLog(props:{title:string}){
    return (
        <>
            <h1 className='text-title-page'>{props.title}</h1>
        </>
    )
} 