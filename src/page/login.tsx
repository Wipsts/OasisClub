import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {Header, TitlePageLog, LoginOptions, InputLogin} from '../components/components'
import {logUser} from '../functions/function'
import ImageBackgroundLogin from '../images/img/gif-login.gif'
import LoadingGif from '../images/img/loadin-gif.gif'
import '../style/min/login.scss'


function Login(){
    const [inputEmail, setEmailInput] = useState('')
    const [inputpass, setPassInput] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const formLog = async (event:any) => {
        event.preventDefault();

        if(!inputEmail || !inputpass){
            return 
        }

        // logUser
        const user = await new logUser().getAuthenticateUser(inputEmail, inputpass)
        if(user.login){
            setLoading(true)
            setTimeout(() => {
                navigate('/myAccount')
            },1200)
        }else{
            // TODO criar mensagem de error (layout)
            console.log(user)
        }
    }

    function redefinePass(){

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
                        <form onSubmit={formLog}>
                            <InputLogin key='input-email' name={'E-mail:'} onchange={(e:any) => setEmailInput(e.target.value)} value={inputEmail} type='email' />
                            <InputLogin key='input-pass' name={'Senha:'} onchange={(e:any) => setPassInput(e.target.value)} value={inputpass} type='password' />
                            <button onClick={() => redefinePass()} className='button-forgot-pass'>Esqueceu a senha?</button>
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

