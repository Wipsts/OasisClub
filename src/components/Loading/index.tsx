import React from 'react'
import './style.scss'

interface LoadingParams{
    width?: string
    height?: string
    color?: string
    type?: number
}

export function Loading({width, height, color, type}:LoadingParams){
    return (
        <>
            <div className="container-min-loading" style={{width: width, height: height}}>
                <div className="skeleton-loading"></div>
            </div>
        </>
    )
}