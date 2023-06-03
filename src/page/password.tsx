import React, {useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Header, TitlePageLog, InputLogin} from '../components/components'
import ImageBackgroundLogin from '../images/img/changePass-background.gif'
import LoadingGif from '../images/img/loadin-gif.gif'
import '../style/min/login.scss'

function Password(){
    const [inputpass, setPassInput] = useState('')
    const [inputConfirmPass, setInputConfirmPass] = useState('')
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState({show: false, text: ''})
    const navigate = useNavigate()
    const { id } = useParams();

    const logUser = (event:any) => {
        event.preventDefault();

        if(!inputConfirmPass || !inputpass){
            return 
        }

        if(inputpass !== inputConfirmPass){
            setWarning({show: true, text: 'Senhas não coencidem, verifique a ortografia.'})
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
                    <TitlePageLog title={'Redefinir Senha'}/>

                    <section id="section-image-login">
                        <div className="container-image-login">
                            <img src={ImageBackgroundLogin} alt="" />
                        </div>
                    </section>
                    
                    <section id="section-login-options" style={{display: warning.show ? 'block' : 'none'}}>
                        <div className="container-warning">
                            <span className='text-warming'>{warning.text}</span>
                        </div>
                    </section>

                    <section id="section-inputs-login">
                        <form onSubmit={logUser}>
                            <InputLogin key='input-pass' name={'Senha:'} onchange={(e:any) => setPassInput(e.target.value)} value={inputpass} type='password' />
                            <InputLogin key='input-confirmPass' name={'Confirmar Senha:'} onchange={(e:any) => setInputConfirmPass(e.target.value)} value={inputConfirmPass} type='password' />
                            <button className='button-log'>Redefinir</button>
                        </form>
                        <Link to="/login"><button className='button-page'>Já tem uma conta? <u> Faça Login </u></button></Link>
                    </section>      
                </main>
            )}
        </>
    )
}

export default Password

