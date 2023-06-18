import React, {useState, useEffect} from "react";
import ReactCardFlip from 'react-card-flip';
import {Link, useNavigate, useParams} from "react-router-dom"
import {BarProgress} from "../components/components"
import {constructQuickStudy} from '../functions/function'
import ArrowIcon from '../images/icon/ArrowIcon.svg'
import FlipCardIcon from '../images/icon/cardFlip.svg'
import loadingStudy from '../images/animate/loadingStudy.gif'
import "../style/min/quickStudyView.scss"

interface FlipCardParams{
    color: string;
    question: string;
    response: string;
    linkResolution:string;
    titleResolution: string;
}

function FlipCard({color, question, response, linkResolution, titleResolution}:FlipCardParams){
    const [isFlipped, setIsFlipped] = useState(false)
    function flipped(){
        setIsFlipped(!isFlipped)
    }

    return (
        <>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className="container-front-flip" onClick={() => flipped()} style={{backgroundColor: color}}>
                    <div dangerouslySetInnerHTML={{__html:question}}/>

                    <button className="button-image-flip"><img src={FlipCardIcon} alt="" /></button>
                </div>

                <div className="container-back-flip" onClick={() => flipped()} style={{backgroundColor: color}}>
                    <div dangerouslySetInnerHTML={{__html:response}}/>
                    <button className="button-image-flip"><img src={FlipCardIcon} alt="" /></button>
                    <Link to={linkResolution}><button className="button-link">{titleResolution}</button></Link>
                </div>
            </ReactCardFlip>
        </>
    )
}

function QuickStudyView(){
    const { id } = useParams()
    const navigate = useNavigate()

    // mock
    const [configPage, setConfigPage] = useState({color: '#1a1a1a', responseColor: '#3a3a3a', totalQuestions: 2, valueStudy: 44})
    const [cardSelect, setCardSelect] = useState(0)
    const [cards, setCards] = useState<any>([{}])
    const [loading, setLoading] = useState(true)

    // function
    function nextCard(){
        if(((cardSelect+1)+1) <= configPage.totalQuestions){
            setCardSelect(cardSelect+1)
        }else{
            navigate('/quickStudy')
        }
    }

    async function createPage(){
        const data = await new constructQuickStudy().getDataQuickStudy(id as string) 
        const dataQuickStudy = data.data
        setConfigPage({color: dataQuickStudy.color, responseColor: dataQuickStudy.responseColor, totalQuestions: dataQuickStudy.totalQuestions, valueStudy: dataQuickStudy.valueStudy})
        setCards(dataQuickStudy.cards)
        setLoading(false)
    }

    useEffect(() => {createPage()}, [])
    return (
        <>
            <main id="main-quickStudyView">
                <div className="container-header-quiz">
                    <Link to={'/quickStudy'}><button className="button-back"><img src={ArrowIcon} alt="" /><span>SAIR</span></button></Link>
                </div>
                {loading?(<img src={loadingStudy} alt="" className="loadingStudy" />):(
                    <>
                        <section id='section-quickStudyView'>
                            <FlipCard color={configPage.color} {...cards[cardSelect]} key={'card-quickStudy'}/>
                            <button onClick={() => nextCard()} className="button-next-card">próximo</button>
                        </section>

                        <section className="section-bar-progress" style={{backgroundColor: configPage.color}}>
                            <BarProgress progress={cardSelect} total={configPage.totalQuestions} color={configPage.responseColor}/>
                        </section>
                    </>    
                )}
            </main>
        </>
    )
}

export default QuickStudyView