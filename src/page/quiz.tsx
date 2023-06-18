import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom"
import {BarProgress, Loading} from '../components/components'
import {constructQuiz} from '../functions/function'
import ClockIcon from "../images/icon/clock.svg"
import ArrowIcon from '../images/icon/ArrowIcon.svg'
import loadingStudy from '../images/animate/loadingStudy.gif'
import "../style/min/quiz.scss"

function ButtonAnswer({answerNumber, correctAnswer, answer, select, onclick, color}:{answerNumber:number|string, correctAnswer:boolean, answer:string, select:boolean,onclick:any, color:string}){
    return (
        <>
            <button onClick={onclick} className={`button-answer ${select ? 'style-select-answer' : ''}  ${correctAnswer ? 'style-correct-answer' : ''}`}>
                <div className="container-numberAnswer">{answerNumber}</div>
                <span className="text-answer">{answer}</span>
            </button>
        </>
    )
}

function Timer({timer, work}:{timer?:any, work:boolean}){
    const [segundos, setSegundos] = useState(0);
    const [minutos, setMinutos] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (!work) {
          if (segundos === 59) {
            setSegundos(0);
            setMinutos(prevMinutos => prevMinutos + 1);
          } else {
            setSegundos(prevSegundos => prevSegundos + 1);
          }

          timer(`${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`)
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }, [work, segundos]);

    return (
        <>
            <div className="container-time">
                <img src={ClockIcon} alt="" />
                <span className="text-time">{minutos.toString().padStart(2, '0')}:{segundos.toString().padStart(2, '0')}</span>
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
    const [questions, setQuestions] = useState<any>([])
    const [questionSelect, setQuestionSelect] = useState(0)
    const [aswerSelect, setAswerSelect] = useState([false])
    const [finishedQuiz, setFinishedQuiz] = useState(false)
    const [responseAnswer, setResponseAnswer] = useState([false])
    const [loading, setLoading] = useState(true);
    const [questionIsCorrect, setQuestionIsCorrect] = useState<Array<boolean>>([false])

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
        checkCorrectAnswer()

        setTimeout(() => {
            if(((questionSelect+1)+1) <= configPage.totalQuestions){
                setNewQuestion()
            }else{
                setFinishedQuiz(true)
            }
        }, 1300)

        function setNewQuestion(){
            setQuestionSelect(questionSelect+1)
            let questionAnswerLayout = questions[questionSelect]?.answer?.map((question:any) => false);
            setAswerSelect(questionAnswerLayout)
            setQuestionIsCorrect(questionAnswerLayout)
        }

        function checkCorrectAnswer(){
            let correctAnswer = questions[questionSelect].corectAnswer;
            if(aswerSelect[correctAnswer] === true){
                responseAnswer[questionSelect] = true;
                questionIsCorrect[correctAnswer] = true
                setResponseAnswer(responseAnswer)
                setQuestionIsCorrect(questionIsCorrect)
            }
        }
    }
    function finishQuiz(){
        // TODO guardar no banco de dados
        navigate('/quickStudy')
    }
    async function createQuiz(){
        const data = await new constructQuiz().getDataQuiz(id as string) 
        const dataQuiz = data.data
        const questionQuiz = dataQuiz.questions
        
        setConfigPage({color: dataQuiz.color, responseColor: dataQuiz.responseColor, totalQuestions: dataQuiz.totalQuestions, valueQuiz: dataQuiz.valueQuiz})
        setQuestions(questionQuiz)

        setFinishedQuiz(false)
        setQuestionSelect(0)
        createResponseAnswer(questionQuiz)
        createAswerSelect(questionQuiz)
        
        if(questions){
            setLoading(false)
        }

        function createResponseAnswer(questionQuiz:any){
            let createdResponseAnswer = questionQuiz.map((i:any) => false);
            setResponseAnswer(createdResponseAnswer)
            setAswerSelect(createdResponseAnswer)
        }
        function createAswerSelect(questionQuiz:any){
            let createdAswerSelect = questionQuiz[questionSelect]?.answer?.map((i:any) => false);
            setQuestionIsCorrect(createdAswerSelect)
        }
    }

    useEffect(() => {
        if(aswerSelect.includes(true)){
            nextQuestion()
        }
    },[aswerSelect])

    useEffect(() => {
        createQuiz()
    },[])

    return (
        <>
            {loading ? (
                <>
                    <img src={loadingStudy} alt="" className="loadingStudy" />
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
                                    {loading ? (<Loading width="100%" height="200px"/>) : (
                                        <>
                                            {questions[questionSelect] && questionIsCorrect ? questions[questionSelect]?.answer?.map((answer:any, index:number) => (
                                                <ButtonAnswer key={answer.answerNumber} correctAnswer={questionIsCorrect[index]} color={configPage.responseColor} {...answer} select={aswerSelect[index]} onclick={() => selectAnswer(index)}/>
                                            )):''}
                                        </>
                                    )}
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