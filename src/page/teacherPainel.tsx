import React, {useState, useEffect} from "react";
import {Header, NavDown, Search} from "../components/components"
import RealWoman from '../images/img/real-woman.jpg'
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

function PopUp({children, show, closeMenu}:{children:JSX.Element, show: boolean, closeMenu: any}) {
    const [display, setDisplay] = useState('none')

    const PopUpDisplay = () => {
        if(show){
            setDisplay('block')
        }else{
            setTimeout(() => {
                setDisplay('none') 
            }, 700)
        }
    }

    useEffect(() => {
        PopUpDisplay()
    })

    return (
        <>
            <section id="section-pop-up" style={{display: display}}>
                <div className={`container-pop-up ${show ? 'style-PopUpOpen' : 'style-PopUpClose'}`}>
                    <button className="button-close-pop-up" onClick={closeMenu}></button>
                    <button className="button-drag-close-pop-up" onClick={closeMenu}/>
                    
                    <div className="container-information-pop-up">
                        {children}
                    </div>
                </div>
            </section>
        </>
    )
}

function TeacherPainel(){
    const [teachers, setTeachers] = useState([
        {name: 'Cristina', image: RealWoman, color: '#253C42', aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu imperdiet elit. Pellentesque cursus, turpis vel consectetur viverra, massa urna porta ante, eget viverra risus augue vitae metus. Phasellus a orci sed dui aliquet varius eu non quam. In erat arcu, vulputate sed felis a, dapibus malesuada purus. Nunc tincidunt, nulla eu blandit cursus, nisl orci vulputate mi, id varius mi ipsum sit amet ipsum. Vivamus eu ante nec nisl tempus placerat id dignissim neque. In vel tellus vitae erat mollis semper in sit amet urna. Maecenas viverra velit felis, a suscipit libero vulputate ac.',  myResume: [{name: 'Pedagogia', information: 'Universidade de -------, formada em 2010 '}], simpleInformation: ['Marketing digital', 'coordenadora de área '], id: 'jdmhsdusdyh89'},
        {name: 'Bele', image: RealWoman, color: '#253C42', aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu imperdiet elit. Pellentesque cursus, turpis vel consectetur viverra, massa urna porta ante, eget viverra risus augue vitae metus. Phasellus a orci sed dui aliquet varius eu non quam. In erat arcu, vulputate sed felis a, dapibus malesuada purus. Nunc tincidunt, nulla eu blandit cursus, nisl orci vulputate mi, id varius mi ipsum sit amet ipsum. Vivamus eu ante nec nisl tempus placerat id dignissim neque. In vel tellus vitae erat mollis semper in sit amet urna. Maecenas viverra velit felis, a suscipit libero vulputate ac.',  myResume: [{name: 'Pedagogia', information: 'Universidade de -------, formada em 2010 '}], simpleInformation: ['Marketing digital', 'coordenadora de área '], id: 'gasyags78a'},
        {name: 'Beatriz', image: RealWoman, color: '#253C42', aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu imperdiet elit. Pellentesque cursus, turpis vel consectetur viverra, massa urna porta ante, eget viverra risus augue vitae metus. Phasellus a orci sed dui aliquet varius eu non quam. In erat arcu, vulputate sed felis a, dapibus malesuada purus. Nunc tincidunt, nulla eu blandit cursus, nisl orci vulputate mi, id varius mi ipsum sit amet ipsum. Vivamus eu ante nec nisl tempus placerat id dignissim neque. In vel tellus vitae erat mollis semper in sit amet urna. Maecenas viverra velit felis, a suscipit libero vulputate ac.',  myResume: [{name: 'Pedagogia', information: 'Universidade de -------, formada em 2010 '}], simpleInformation: ['Marketing digital', 'coordenadora de área '], id: 'jaohs7axh8a9hd79'},
    ])
    const [loading, setLoading] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [informationPopUp, setInformationPopUp] = useState<any>({name: '', aboutMe: '', myResume: [{name: '', information: ''}]})


    function selectTeacherById(id:string):object{
        var teacherSeletc = {}
        for (let i = 0; i < teachers.length; i++) {
            const teacher = teachers[i];
            if(teacher.id === id){
                teacherSeletc = teacher
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
                    <Search type='song' onClick={() => {}}/>
                </div>
                <section id='section-content-teacherBox'>
                    {teachers?.map(teacher => (
                        <BoxInformationTeacher key={`${teacher.name}`} {...teacher} openAndClosePopUp={openAndClosePopUp}/>
                    ))}
                </section>
            </main>
            <NavDown color={"#171717"}/>
        </>
    )
}

export default TeacherPainel