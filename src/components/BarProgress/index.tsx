import React from "react";
import './style.scss'

export function BarProgress({progress, total, color}:{progress:number, total:number,color:string}){
    const calcProgress = () => {
        const perc = Math.round(((progress + 1) / total) * 100);
        return perc
    }
    
    return (
        <div className="bar-progress" style={{width: `${calcProgress()}%`, backgroundColor: color}}/>
    )
}