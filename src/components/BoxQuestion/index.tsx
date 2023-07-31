import React from "react";
import {Link} from 'react-router-dom'
import ClockIcon from '../../images/icon/clock.svg'
import './style.scss'

export function BoxQuestion({id, color, type, matter, title, time, imageBackground, admin}:{id:string, color:string, type:number, matter:string, title:string, time:string, imageBackground:string, admin?: boolean}){
    
    function createLink(){
        if(admin){
            return `/admin/add/${type===1?'quiz':'quickStudy'}/${id}`
        }else{
            return `/${type===1?'quiz':'quickStudy/view'}/${id}`
        }
    }

    return (
        <>
            <div className="box-question">
                <Link to={createLink()}>            
                    <img src={imageBackground} alt="" />
                    <div className="content-information-question">
                        {type === 1 ? (
                            <svg width={300} height={135}>
                                <polygon points="0,0 300,0 0,135" fill={color}/>
                            </svg>
                        ) : (
                            <svg width={300} height={135}>
                                <rect width={230} x="-37" height={135} ry={'115'} rx={'40'} fill={color}/>
                            </svg>
                        )}
        
                        <div className="box-information">   
                            <span className="text-title-question">{title}</span>
                            <span className="text-subtitle-question">{matter}</span>
                            <div className="box-time">
                                <img src={ClockIcon} alt="" />
                                <span className="text-time">{time}/min</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

