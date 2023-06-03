import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {Header, TitlePageLog, LoginOptions, InputLogin} from '../components/components'
import ImageBackgroundLogin from '../images/img/gif-login.gif'
import LoadingGif from '../images/img/loadin-gif.gif'
import '../style/min/login.scss'

function Login(){
    const [inputEmail, setEmailInput] = useState('')
    const [inputpass, setPassInput] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const logUser = (event:any) => {
        event.preventDefault();

        if(!inputEmail || !inputpass){
            return 
        }

        // logUser

        setLoading(true)
        setTimeout(() => {
            navigate('/myAccount')
        },1200)
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
                    <TitlePageLog title={'Login'}/>

                    <section id="section-image-login">
                        <div className="container-image-login">
                            <img src={ImageBackgroundLogin} alt="" />
                        </div>
                    </section>

                    <section id="section-login-options">
                        <LoginOptions/>
                    </section>

                    <section id="section-inputs-login">
                        <form onSubmit={logUser}>
                            <InputLogin key='input-email' name={'E-mail:'} onchange={(e:any) => setEmailInput(e.target.value)} value={inputEmail} type='email' />
                            <InputLogin key='input-pass' name={'Senha:'} onchange={(e:any) => setPassInput(e.target.value)} value={inputpass} type='password' />
                            <Link to="/password"><button className='button-forgot-pass'>Esqueceu a senha?</button></Link>
                            <button className='button-log'>Entrar</button>
                        </form>
                        <Link to="/registre"><button className='button-page'>Não tem uma conta? <u> Cadastre-se </u></button></Link>
                    </section>      
                </main>
            )}
        </>
    )
}

export default Login

