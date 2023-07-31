import {useState, useEffect} from "react";
import ReactCardFlip from 'react-card-flip';
import {Link, useNavigate} from "react-router-dom"
import {InputLogin, Editor} from "../../components/components"
import {EventInputChange, EventSelectChange} from '../../interfaces/interfaces'
import {createQuickStudy, configPage} from '../../functions/function'

import ArrowIcon from '../../images/icon/ArrowIcon.svg'
import FlipCardIcon from '../../images/icon/cardFlip.svg'
import loadingStudy from '../../images/animate/loadingStudy.gif'
import "../../style/min/quickStudyView.scss"

interface FlipCardParams{
    color: string;
    question: string;
    response: string;
    linkResolution:string;
    titleResolution: string;
    sendQuestion: (txt:string) => void;
    sendResponse: (txt:string) => void;
    cardSelect: number;
}


interface ObjectCards{
    question: string;
    response: string;
    titleResolution: string;
    linkResolution: string;
}

function FlipCard({color, question, response, cardSelect, sendQuestion, sendResponse}:FlipCardParams){
    const [questionCard, setQuestionCard] = useState<string>('')
    const [responseCard, setResponseCard] = useState<string>('')
    
    const [isFlipped, setIsFlipped] = useState(false)
    function flipped(){
        setIsFlipped(!isFlipped)
    }

    useEffect(() => {
        if(isFlipped === true){
            flipped()
        }

        if(question !== '' && response !== ''){
            setResponseCard(response)
            setQuestionCard(question)
        }else{
            setResponseCard('')
            setQuestionCard('')
        }
    },[cardSelect, question])

    useEffect(() => {
        sendQuestion(questionCard)
        sendResponse(responseCard)
    },[questionCard, responseCard])

    return (
        <>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className="container-adding-card container-front-flip" style={{backgroundColor: color}}>
                    <div className="content-editor">
                        <Editor onChange={setQuestionCard} value={questionCard} placeholder="Escreva aqui a pergunta." key={'card-input-question'}/>
                    </div>
                
                    <button onClick={() => flipped()} className="button-image-flip"><img src={FlipCardIcon} alt="" /></button>
                </div>

                <div className="container-adding-card container-back-flip" style={{backgroundColor: color}}>
                    <div className="content-editor">
                        <Editor onChange={setResponseCard} value={responseCard} placeholder="Escreva aqui a resposta." key={'card-input-response'}/>
                    </div>

                    <button onClick={() => flipped()} className="button-image-flip"><img src={FlipCardIcon} alt="" /></button>

                    <button className="button-link">Resolução</button>
                </div>
            </ReactCardFlip>
        </>
    )
}

function ModeratorQuickStudy(){
    const navigate = useNavigate()
    const [page, setPage] = useState<Array<boolean>>([true, false])

    // information card
    const [responseText, setResponseText] = useState<string>('')
    const [questionText, setQuestionText] = useState<string>('')
    const [urlResolution, setUrlResolution] = useState<string>('')

    // mock
    const [configPage, setConfigPage] = useState<configPage>({color: '#1a1a1a', responseColor: '#3a3a3a', totalQuestions: 15, valueStudy: 44, nameImage: '', image: '', tag: '', matter: ''})
    const [cardSelect, setCardSelect] = useState(0)
    const [cards, setCards] = useState<ObjectCards[]>([])
    const [loading, setLoading] = useState(true)

    // function
    function addCard(){
        if(urlResolution !== ''){
            if(!urlResolution.includes("https://")){
                alert("Adicione um URL válida à resolução (url válida começa com 'https://')")
            
                return
            }
        }
        if(!responseText || !questionText){
            alert('Prencha todas as informações! Lembre-se de virar a carta clicando no botão flip no canto inferior esquerdo')
            return 
        }

        const _cards = cards
        _cards[cardSelect] = {question: questionText, response: responseText, linkResolution: urlResolution, titleResolution: 'Mais sobre o assunto'}
        _cards.push({question: '', response: '', linkResolution: '', titleResolution: ''})
        setCards(_cards)
        
        if(((cardSelect+1)+1) <= 15){
            setCardSelect(cardSelect+1)
            setUrlResolution('')
            setQuestionText('')
            setResponseText('')
        }else{
            alert("O limite de 15 foi atingido!, basta agora publicar clicando no botão inferior na tela.")
        }
    }
    

    function backCard(){
        const _cards = cards
        _cards.splice(cardSelect, 1)
        setCards(_cards)

        if(cardSelect > 0){
            const removedCardSelect = cardSelect-1
            setCardSelect(removedCardSelect)      
    
            const selectCard = cards[removedCardSelect]
            setUrlResolution(selectCard.linkResolution)
            setQuestionText(selectCard.question)
            setResponseText(selectCard.response)
        }else{
            console.error("dont back more")
        }
    }

    function createPage(){
        setCards([{question: '', response: '', linkResolution: '', titleResolution: ''}])
        setLoading(false)
    }

    async function publish(){
        if(page[0]){
            const _cards = cards
            _cards.splice(cardSelect, 1)
            setCards(_cards)

            if(cards.length >= 4){
                setPage([false, true])
                setConfigPage(prevState => {return {...prevState, totalQuestions: cardSelect + 1}})
            }else{
                alert("Ops! O minimo de carta é 4 e o máximo é 15");
            }
        }else{
            if(!checkIfAllInputIsComplete()){
                const adding = await new createQuickStudy().prepareData(configPage, cards)
                if(adding){
                    alert("Postado com sucesso!")
                    navigate('/admin/moderator/quickstudy')
                }else{
                    alert("Error!")
                }
            }
            // add in bd
        }

        function checkIfAllInputIsComplete(){
            var instComplete = false
            const keyNotIncluded = ['responseColor', 'totalQuestions', 'valueStudy']
            
            for (const property in configPage) {
                const prop = (configPage as any)[property]
                if(!keyNotIncluded.includes(property)){
                    if(prop === undefined || prop === null || prop == ''){
                        instComplete = true
                    }
                }
            }
            return instComplete
        }
    }
    
    const changeInformation = (e: EventInputChange|EventSelectChange, key:string) => {
        setConfigPage(prevstate => {return {...prevstate, [key]: e.target.value}})
    }

    const onImageChange = (event: EventInputChange) => {
        if (event.target.files && event.target.files[0]) {
            setConfigPage(prevState => { return {...prevState, image: event?.target?.files, nameImage: event.target.value}})
        }
    }

    const getResponse = (text:string) =>{
        setResponseText(text)
    }
    const getQuestion = (text:string) =>{
        setQuestionText(text)
    }

    useEffect(() => {createPage()}, [])
    return (
        <>
            <main id="main-quickStudyView">
                <div className="container-header-quiz">
                    <Link to={`/admin/moderator/quickstudy`}><button className="button-back"><img src={ArrowIcon} alt="" /><span>SAIR</span></button></Link>
                    <div className="container-quant-question">
                        <span className="text-quant-question"> <b>{cardSelect}</b>/15</span>
                    </div>
                </div>

                {page[0] ? (
                    <>
                        {loading?(<img src={loadingStudy} alt="" className="loadingStudy" />):(
                        <>
                            <section id='section-quickStudyView'>
                                <FlipCard color={configPage.color} {...cards[cardSelect]} cardSelect={cardSelect} sendQuestion={getQuestion} sendResponse={getResponse}  key={'card-quickStudy'}/>
                                
                                <div className="content-input">
                                    <InputLogin name="Link de resolução" onchange={(e) => setUrlResolution(e.target.value)} type="url" value={urlResolution} key={'input-resolution-card'}/>
                                </div>
                                <div className="container-buttons-action-card">
                                    {cardSelect >= 1 ? (<button onClick={() => backCard()} className="button-back-card">Voltar</button>) : ''}
                                    <button onClick={() => addCard()} className="button-next-card">Adicionar</button>
                                </div>
                            </section>    
                        </>    
                    )}
                    </>
                ): (
                    <section id="section-informationCard">
                        <InputLogin name="Cor" onchange={(e) => changeInformation(e, 'color')} type="color" value={configPage.color} key={'input-color-card'}/>
                        <InputLogin name="Image" onchange={(e) => onImageChange(e)} type="file" value={configPage.nameImage} key={'input-image-card'}/>
                        <InputLogin name="Matéria" placeholder="Ex: Sociologia 2 Bimestre" onchange={(e) => changeInformation(e, 'matter')} type="text" value={configPage.matter} key={'input-matter-card'}/>
                        
                        <select className="input-quickstudy" value={configPage.tag} onChange={(e) => changeInformation(e, 'tag')}  >
                            <option value="" disabled>Selecionar tags</option>
                            <option value="Sociologia">Sociologia</option>
                            <option value="Matemática">Matemática</option>
                        </select>
                    </section>
                )}

            </main>
            <button onClick={() => publish()} className="button-post">{ page[0] ? 'Proxímo' : 'Publicar'}</button>
        </>
    )
}

export default ModeratorQuickStudy