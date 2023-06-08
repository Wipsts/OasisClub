import React, {useState, useEffect} from "react";
import {Header, NavDown, Search} from "../components/components"
import FirstIcon from '../images/icon/FirstIcon.png'
import "../style/min/rank.scss"


interface InformationParticipantParams{
    bigStyle: boolean;
    name: string;
    schoolGrade: number;
    instagram?: string;
    points: number;
    color?: string;
}

interface BigStyleParams{
    name: string;
    schoolGrade: number;
    instagram?: string;
}

interface MinifyStyleParams{
    name: string;
    schoolGrade: number;
    points: number;
    color?: string;
}


function ParticipantRankBox({bigStyle, name, schoolGrade, instagram, points, color}:InformationParticipantParams){
    function BigStyle({name, schoolGrade, instagram}:BigStyleParams){
        return (
            <>
                <div className="container-big-style">
                    <div className="box-up-style">
                        <span className="text-name-student">{name}</span>
                        <div className="box-schoolGrade">{schoolGrade}ª</div>
                    </div>
                    <div className="box-down-style">
                        <span className="text-instagramAccount">{instagram}</span>
                    </div>
                </div>
            </>
        )
    }

    function MinifyStyle({name, schoolGrade, points, color}:MinifyStyleParams){
        return (
            <>
                <div className="container-minify-style">
                    <div className="container-points">
                        <span className="text-points">{points}pts - </span>
                    </div>
                    <div className="container-information-participant" style={{backgroundColor: color}}>
                        <span className="text-name-student">{name}</span>
                        <div className="box-schoolGrade" style={{backgroundColor: color}}>{schoolGrade}ª</div>
                    </div>
                </div>
            </>
        )
    }
    
    return (
        <>
            {bigStyle ? (<BigStyle name={name} schoolGrade={schoolGrade} instagram={instagram}/>):(<MinifyStyle name={name} schoolGrade={schoolGrade} points={points} color={color}/>)}
        </>
    )
}

function Rank(){
    const [students, setStudents] = useState([
        {name: 'Hélio Peres Martins Neto', schoolGrade: 3, instagram: 'wipsts', points: 100},
        {name: 'Clara Jelevisk Petrova', schoolGrade: 7, instagram: 'clarinha.pj', points: 16},
        {name: 'Ana Carolina da Mata', schoolGrade: 1, instagram: 'corol.da.mata', points: 418},
    ])
    const [loading, setLoading] = useState(false)

    function organizedPointsPosition(){
        if(students){
            students.sort(function(a,b) {
                return b.points - a.points;
            });
            setLoading(true)
        }
    }

    useEffect(() => {
        organizedPointsPosition()
    },[])

    return (
        <>
            <Header/>
            <main id="main-rank">
                <h1 className="title-page">Rank</h1>
                <div className="content-search">
                    <Search type='song' onClick={() => {}}/>
                </div>
                <section id='section-rank'>
                    <section className="section-First">
                        <div className="container-crown">
                            <img src={FirstIcon} alt="Primeiro Lugar" />
                        </div>
                        <div className="container-information-first">
                            {loading ? (<ParticipantRankBox key={`${students[0].name}-0`} {...students[0]} bigStyle={true}/>) : ''}
                        </div>
                    </section>
                    <section className="section-more-students">
                        <div className="content-participant">
                            
                            {loading && students?.map((student, index) => {
                                if(index !== 0){
                                    return (
                                        <ParticipantRankBox key={`${student.name}-${index}`} {...student} bigStyle={false}/>
                                    )
                                }
                            })}
                        </div>
                    </section>
                </section>
            </main>
            <NavDown color={"#171717"}/>
        </>
    )
}

export default Rank