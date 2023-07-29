import React, {useState, useEffect} from "react";
import {Header, Loading, NavDown, Search, PopUp} from "../components/components"
import {teacherPainel} from '../functions/function'
import "../style/min/teacherPainel.scss"

interface InformationBoxTeacherParams{
    name: string;
    image: string;
    simpleInformation: Array<string>;
    id: string;
    color?: string
    openAndClosePopUp: any
}


function BoxInformationTeacher({name, image, simpleInformation, id, color, openAndClosePopUp}:InformationBoxTeacherParams){
    return (
        <>
            <div className="container-teacher">
                <div className="box-image-teacher" style={{backgroundColor: color ? color : '#fff'}}>
                    <img src={image} alt="img teacher" />
                </div>
                <div className="container-information">
                    <span className="text-title-name">{name}</span>
                    <div className="content-simple-information">
                        {simpleInformation?.map((info: string) => (
                            <span key={`${info}-${id}`} className="text-information">{info}</span>
                        ))}
                    </div>
                    <button className="button-more-information" onClick={() => openAndClosePopUp(id)}>Mais informações</button>
                </div>
            </div>
        </>
    )
}

function TeacherPainel(){
    const [teachers, setTeachers] = useState<any>([{}])
    const [loading, setLoading] = useState(true)
    const [popUp, setPopUp] = useState(false)
    const [informationPopUp, setInformationPopUp] = useState<any>({name: '', aboutMe: '', myResume: [{name: '', information: ''}]})
    const [search, setSearch] = useState('')

    function selectTeacherById(id:string):object{
        var teacherSeletc = {}
        for (let i = 0; i < teachers.length; i++) {
            const teacher = teachers[i];
            if(teacher.id === id){
                teacherSeletc = teacher.data
            }
        }

        return teacherSeletc
    }

    const openAndClosePopUp = (id?:string) => {
        
        if(id){
            const data = selectTeacherById(id)
            setInformationPopUp(data)
        }

        setPopUp(!popUp)
        document.body.style.overflow = !popUp ? 'hidden' : 'auto';
    }

    async function createPage(){
        const teachers = await new teacherPainel().getTeachers() as Array<object>
        setTeachers(teachers)
        setLoading(false)
    }

    useEffect(() => {
        createPage()
    }, [])
    
    const getSearch = (s:string) => setSearch(s)
    const transformInUppercase = (t:string) => t ? t.toUpperCase() : t;

    return (
        <>
            <Header/>

            <PopUp show={popUp} closeMenu={() => openAndClosePopUp()}>
                <div className="container-information-teacher">
                    <h2 className="title-name-teacher">{informationPopUp.name}</h2>
                    
                    <div className="container-aboutMe">
                        <span className="text-subtext">sobre mim</span>
                        <div className="box-aboutMe">
                            <p className="paragraph-aboutMe">
                                {informationPopUp.aboutMe}
                            </p>
                        </div>
                    </div>

                    <div className="container-resume">
                        <span className="text-subtext">meu currículo</span>
                        <div className="content-resume">

                            {informationPopUp?.myResume?.map((resume:any, index:number) => (
                                <div className="box-resume" key={`${resume.name}-${index}`}>
                                    <div className="box-resume-up">
                                        <span className="text-name-resume">{resume.name} </span>
                                    </div>
                                    <div className="box-resume-down">
                                        <span className="text-information-resume">{resume.information} </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </PopUp>

            <main id="main-teacher-painel">
                <h1 className="title-page">Painel de Funcionários</h1>
                <div className="content-search">
                    <Search type='song' onClick={getSearch}/>
                </div>
                <section id='section-content-teacherBox'>
                    {loading ? <Loading width="100%" height="300px"/> : (
                        <>
                            {teachers?.map((teacher:any) => {
                                return transformInUppercase(teacher.data.name).includes(transformInUppercase(search)) ? <BoxInformationTeacher key={`${teacher.data.name}`} {...teacher.data} id={teacher.id} openAndClosePopUp={openAndClosePopUp}/> : ""
                            })}
                        </>
                    )}
                </section>
            </main>
            <NavDown color={"#171717"}/>
        </>
    )
}

export default TeacherPainel