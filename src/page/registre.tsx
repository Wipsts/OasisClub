import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {Header, TitlePageLog, LoginOptions, InputLogin} from '../components/components'
import {registreUser} from '../functions/function'
import ImageBackgroundRegistre from '../images/img/registre-background.gif'
import LoadingGif from '../images/img/loading-registre.gif'
import '../style/min/login.scss'

function Registre(){
    const [inputEmail, setEmailInput] = useState('')
    const [inputName, setNameInput] = useState('')
    const [inputpass, setPassInput] = useState('')
    const [inputRa, setRaInput] = useState('')
    const [inputSchollGrade, setInputSchollGrade] = useState<number>(0)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const logUser = async (event:any) => {
        event.preventDefault();

        if(!inputEmail || !inputpass || !inputName || !inputRa){
            return 
        }

        if(!verifyCodeRa()){
            return 
        }

        // logUser
        
        setLoading(true)
        const userRegistre = await new registreUser().registreUserWithEmail(inputEmail, inputpass, inputName, inputRa, inputSchollGrade);

        if(userRegistre.registre){
            alert(`Verifique seu email '${inputEmail}' para ativar conta!`)
            setLoading(false)
        }

        setTimeout(() => {
            navigate('/login')
        },1200)
    }

    function verifyCodeRa(){
        if(inputRa.length === 7){
            return true
        }else{
            return false
        }
    }

    return (
        <>
            <Header />

            {loading ? (
                <div className="container-loading">
                    <img src={LoadingGif} alt="" />
                </div>
            ):(
                <main id="main-login">
                    <TitlePageLog title={'Cadastrar-se'}/>

                    <section id="section-image-login">
                        <div className="container-image-login">
                            <img src={ImageBackgroundRegistre} alt="" />
                        </div>
                    </section>

                    <section id="section-login-options">
                        <LoginOptions/>
                    </section>

                    <section id="section-inputs-login">
                        <form onSubmit={logUser}>
                            <InputLogin key='input-name' name={'Nome Completo:'} onchange={(e:any) => setNameInput(e.target.value)} value={inputName} type='text' />
                            <InputLogin key='input-email' name={'E-mail:'} onchange={(e:any) => setEmailInput(e.target.value)} value={inputEmail} type='email' />
                            <InputLogin key='input-pass' name={'Senha:'} onchange={(e:any) => setPassInput(e.target.value)} value={inputpass} type='password' />
                            <InputLogin key='input-ra' name={'CA/RA:'} onchange={(e:any) => setRaInput(e.target.value)} value={inputRa} type='number' />
                            <InputLogin key='input-year' name={'Ano escolar:'} onchange={(e:any) => setInputSchollGrade(e.target.value)} value={inputSchollGrade} type='number' />
                            <button className='button-log'>Cadastrar</button>
                        </form>
                        <Link to="/login"><button className='button-page'>Já tem uma conta? <u> Faça login </u></button></Link>
                    </section>      
                </main>
            )}
        </>
    )
}

export default Registre

