import {useState} from 'react';
import {Link} from 'react-router-dom'
import {Header, TitlePageLog, InputLogin} from '../components/components'
import {RedifinePassword} from '../functions/function'
import ImageBackgroundLogin from '../images/img/changePass-background.gif'
import LoadingGif from '../images/img/loadin-gif.gif'
import '../style/min/login.scss'

function Password(){
    const [inputEmail, setInputEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState({show: false, text: ''})

    const redifinedPass = async (event:any) => {
        event.preventDefault();

        if(!inputEmail){
            return 
        }
        
        setLoading(true)
        const sendedEmail = await new RedifinePassword().sendCode(inputEmail);
        setLoading(false)

        if(sendedEmail){
            setWarning({show: true, text: `Link de recuperação enviado para ${inputEmail}. Verifique o Lixo Eletrônico ou Span!`})
        }else{
            setWarning({show: true, text: `OPS! não consiguimos enviar o link de recuperação para o E-mail ${inputEmail} tente novamente mais tarde!`})
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
                        <form onSubmit={redifinedPass}>
                            <InputLogin key='input-pass' name={'Email:'} onchange={(e:any) => setInputEmail(e.target.value)} value={inputEmail} type='email' />
                            <button className='button-log'>Enviar email de recuperação</button>
                        </form>
                        <Link to="/login"><button className='button-page'>Já tem uma conta? <u> Faça Login </u></button></Link>
                    </section>      
                </main>
            )}
        </>
    )
}

export default Password

