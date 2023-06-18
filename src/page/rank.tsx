import React, {useState, useEffect} from "react";
import {Header, NavDown, Search, Loading} from "../components/components"
import {createRank} from '../functions/function'
import FirstIcon from '../images/icon/FirstIcon.png'
import "../style/min/rank.scss"


interface InformationParticipantParams{
    bigStyle: boolean;
    name: string;
    schoolGrade: number;
    instagram?: string;
    points: number|string;
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
    points: number|string;
    color?: string;
}

interface studentsParams{
    name: string,
    schoolGrade: number,
    instagram: string,
    points: string,
    Uid: string
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
    const [students, setStudents] = useState<Array<studentsParams>>([{name: "", schoolGrade: 1, instagram: "", points: "", Uid: ""}])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    function organizedPointsPosition(){
        if(students){
            students.sort(function(a:any,b:any) {
                return b.points - a.points;
            });
            setLoading(false)
        }
    }

    async function constructPage(){
        const studens = await new createRank().getStudens() as Array<studentsParams>
        setStudents(studens)
        organizedPointsPosition()
    }

    const getSearch = (s:string) => setSearch(s)
    const transformInUppercase = (t:string) => t.toUpperCase();

    useEffect(() => {
        constructPage()
    },[])

    return (
        <>
            <Header/>
            <main id="main-rank">
                <h1 className="title-page">Rank</h1>
                <div className="content-search">
                    <Search type='song' onClick={getSearch}/>
                </div>
                <section id='section-rank'>
                    <section className="section-First">
                        <div className="container-crown">
                            <img src={FirstIcon} alt="Primeiro Lugar" />
                        </div>
                        <div className="container-information-first">
                            {loading ? (<Loading width="100%" height="140px" />) : (<ParticipantRankBox key={`${students[0].name}-0`} {...students[0]} bigStyle={true}/>)}
                        </div>
                    </section>
                    <section className="section-more-students">
                        <div className="content-participant">
                            {loading ? (<Loading width="100%" height="140px" />) : (
                                <>
                                    {students?.map((student, index) => {
                                        if(index !== 0){
                                            return transformInUppercase(student.name).includes(transformInUppercase(search)) ? <ParticipantRankBox key={`${student.name}-${index}`} {...student} bigStyle={false}/> : ""
                                        }
                                    })}
                                </>
                            )}
                        </div>
                    </section>
                </section>
            </main>
            <NavDown color={"#171717"}/>
        </>
    )
}

export default Rank