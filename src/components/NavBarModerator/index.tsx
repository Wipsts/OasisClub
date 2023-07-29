import {useState} from 'react'
import {PopUp, TextareaInput} from '../components'
import './style.scss'

interface BavBarModeratorParams{
    sendChanged: any
    isEcommerce?: boolean
}

export function NavBarModerator({sendChanged, isEcommerce}:BavBarModeratorParams){
    const [correctionPopup, setCorrectionPopup] = useState<boolean>(false)
    const [correctionText, setCorrectionText] = useState<string>('')
    
    function openAndCloseCorrection(){
        setCorrectionPopup(!correctionPopup)
        document.body.style.overflow = !correctionPopup ? 'hidden' : 'auto';
    }
    
    function SendChanged(type:number){
        sendChanged(type, correctionText)
    }

    return (
        <>
            <nav className="nav-bar-moderator">
                <button className="button-bar style-fired"  onClick={() => SendChanged(0)}>Reprovar</button>
                <div className="content-right">
                    {!isEcommerce ? <button className="button-bar style-correction" onClick={() => openAndCloseCorrection()}>Eviar para correção</button> : ''}
                    <button className="button-bar style-approve"  onClick={() => SendChanged(2)}>Aprovar</button>
                </div>
            </nav>
        
            <PopUp closeMenu={() => openAndCloseCorrection()} show={correctionPopup} key={'pop-up'}>
                <div className='container-correction'>
                    <h6 className='title-correction'><u> Informe o autor </u> o que ele deve corrigir.</h6>
                    <span className='subtext-correction'>Adicone o máximo de informações possiveis</span>

                    <div className="content-inputs-correction">
                        <TextareaInput className='textarea-input-correction' onChange={(e) => setCorrectionText(e.target.value)} value={correctionText} key={'textarea-correction'} placeholder='Escreva aqui. Adicone o máximo de informações possiveis'/>
                    </div>

                    <button className='button-send' onClick={() => SendChanged(3)}>Enviar Alteração</button>
                </div>
            </PopUp>    
        </>
    )
}