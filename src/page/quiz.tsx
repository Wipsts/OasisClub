import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom"
import {BarProgress} from '../components/components'
import ClockIcon from "../images/icon/clock.svg"
import ArrowIcon from '../images/icon/ArrowIcon.svg'
import "../style/min/quiz.scss"

function ButtonAnswer({answerNumber, answer, select, onclick, color}:{answerNumber:number|string, answer:string, select:boolean,onclick:any, color:string}){
    return (
        <>
            <button onClick={onclick} className={`button-answer ${select ? 'style-select-answer' : ''}`}>
                <div className="container-numberAnswer">{answerNumber}</div>
                <span className="text-answer">{answer}</span>
            </button>
        </>
    )
}


function Timer({timer, work}:{timer?:any, work:boolean}){
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [working, setWorking] = useState(true)
    
    useEffect(() => {
        setWorking(!work)
    },[])
    
    if(Object.is(working, work)){
        setWorking(false)
    }

    useEffect(() => {
        if(working){
            const timerInterval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
                
                if (seconds >= 59) {
                  setSeconds(0);
                  setMinutes((prevMinutes) => prevMinutes + 1);
                }
            }, 1000);


            return () => {
              clearInterval(timerInterval);
            };
        }
    }, [working]);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    timer(`${formattedMinutes}:${formattedSeconds}`)

    return (
        <>
            <div className="container-time">
                <img src={ClockIcon} alt="" />
                <span className="text-time">{formattedMinutes}:{formattedSeconds}</span>
            </div>
        </>
    )
}

function Quiz(){
    const { id } = useParams();
    const navigate = useNavigate()
    
    // states
    const [timer, setTimer] = useState('00:00');
    const [configPage, setConfigPage] = useState({color: '#1F672F', responseColor: '#359b4b', totalQuestions: 2, valueQuiz: 44})
    const [questions, setQuestions] = useState([
        {question: 'Qual das respostas então coretas', resolutionLink: '/', answer: [{answerNumber: 'A', answer:'14'}], corectAnswer: 0},
        {question: 'Teste 2', resolutionLink: '/', answer: [{answerNumber: 'A', answer:'14'},{answerNumber: 'B', answer:'90'}], corectAnswer: 0}
    ])
    const [questionSelect, setQuestionSelect] = useState(0)
    const [aswerSelect, setAswerSelect] = useState([false])
    const [finishedQuiz, setFinishedQuiz] = useState(false)
    const [responseAnswer, setResponseAnswer] = useState([false])
    const [loading, setLoading] = useState(true);


    // get
    const getTimer = (timer:string) => {setTimer(timer)}
    const selectAnswer = (position:number) => {
        let answerSelect = aswerSelect?.map((aswer) => false);
        answerSelect[position] = true
        setAswerSelect(answerSelect)
    }
    const takeAverageTime = () => {
        let time = transformSecondInTime((transformTimeInSeconds() / configPage.totalQuestions))
        return time

        function transformSecondInTime(seconds:number){
            let minutos = Math.floor(seconds / 60);
            let segundosRestantes = Math.floor(seconds % 60);
          
            let minutosFormatados = minutos < 10 ? "0" + minutos : minutos; 
            let segundosFormatados = segundosRestantes < 10 ? "0" + segundosRestantes : segundosRestantes;
          
            return `${minutosFormatados}:${segundosFormatados}`;
        }

        function transformTimeInSeconds(){
            let time = timer.split(":")
            let minute = parseInt(time[0])
            let second = parseInt(time[1])
            return (minute * 60) + second
        }
    }

    const totalCorrectAnswers = () => {
        let totalCorrectAnswers = responseAnswer.filter((answer) => answer===true)
        return `${totalCorrectAnswers.length}/${configPage.totalQuestions}`
    }

    // functions
    function nextQuestion(){
        if(((questionSelect+1)+1) <= configPage.totalQuestions){
            checkCorrectAnswer()
            setNewQuestion()
        }else{
            checkCorrectAnswer()
            setFinishedQuiz(true)
        }

        function setNewQuestion(){
            setQuestionSelect(questionSelect+1)
            let questionAnswerLayout = questions[questionSelect]?.answer?.map((question) => false);
            setAswerSelect(questionAnswerLayout)
            checkCorrectAnswer()
        }

        function checkCorrectAnswer(){
            let correctAnswer = questions[questionSelect].corectAnswer;
            if(aswerSelect[correctAnswer] === true){
                responseAnswer[questionSelect] = true;
                setResponseAnswer(responseAnswer)
            }
        }
    }
    function finishQuiz(){
        // TODO guardar no banco de dados
        navigate('/quickStudy')
    }
    function constructQuiz(){
        // TODO get questions in BD
        setFinishedQuiz(false)
        setLoading(false)
        setQuestionSelect(0)
        createResponseAnswer()
        createAswerSelect()

        function createResponseAnswer(){
            let createdResponseAnswer = questions.map((i) => false);
            setResponseAnswer(createdResponseAnswer)
        }
        function createAswerSelect(){
            let createdAswerSelect = questions.map((i) => false);
            setResponseAnswer(createdAswerSelect)
        }
        function createConfigPage(){

        }
    }

    useEffect(() => {
        if(aswerSelect.includes(true)){
            setTimeout(nextQuestion, 1000)
        }
    },[aswerSelect])

    useEffect(() => {
        constructQuiz()
    },[])

    return (
        <>
            {loading ? (
                <>
                    <span>Loading....</span>
                </>
            ):(
                <>
                    <main id="main-quiz">
                        <div className="container-header-quiz">
                            <Link to={'/quickStudy'}><button className="button-back"><img src={ArrowIcon} alt="" /><span>SAIR</span></button></Link>
                            <Timer work={finishedQuiz} timer={getTimer}/>
                        </div>

                        {finishedQuiz ? (
                            <>
                                <section className="section-report" style={{backgroundColor: configPage.color}}>
                                    <div className="container-correctAnswer">
                                        <span className="text-title-report">Respostas corretas</span>
                                        <span className="text-subtext-report">{totalCorrectAnswers()}</span>
                                    </div>
                                    <div className="container-timeAnswer">
                                        <span className="text-title-report">tempo médio</span>
                                        <span className="text-subtext-report">{takeAverageTime()}<i>s</i></span>
                                    </div>
                                </section>

                                <section className="section-progressGraph">
                                    <span className="title-page">Acompanhe seu progresso</span>
                                    <span className="warning-progress">Na proxíma atualização, seu progresso aparecerá aqui!</span>
                                </section>

                                <div className="container-points" style={{backgroundColor: configPage.color}}><span><b>+</b> {configPage.valueQuiz} <i>pts</i></span></div>

                                <button onClick={() => finishQuiz()} className="button-exit-quiz">Terminar Quiz</button>
                            </>
                        ):(
                            <>
                                <section className="section-question" style={{backgroundColor: configPage.color}}>
                                    <p className="text-paragraph" dangerouslySetInnerHTML={{__html:questions[questionSelect].question}}/>

                                    <Link to={questions[questionSelect].resolutionLink}><button style={{borderColor: configPage.color}} className="button-resolution">Resolução</button></Link>
                                </section> 

                                <section className="section-answer">
                                    {questions[questionSelect] ? questions[questionSelect]?.answer?.map((answer, index) => (
                                        <ButtonAnswer key={answer.answerNumber} color={configPage.responseColor} {...answer} select={aswerSelect[index]} onclick={() => selectAnswer(index)}/>
                                    )):''}
                                </section>
                            </>
                        )}
                    </main>

                    <section className="section-bar-progress" style={{backgroundColor: configPage.color}}>
                        <BarProgress progress={questionSelect} total={configPage.totalQuestions} color={configPage.responseColor}/>
                    </section>
                </>
            )}
        </>
    )
}

export default Quiz