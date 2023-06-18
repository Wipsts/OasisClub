import React from 'react';
import {Header, QrItens, Footer} from "../components/components"
import {Link} from 'react-router-dom'
import ArrowIcon from "../images/icon/ArrowIcon.svg"
import "../style/min/pay.scss"

export default function Payment(){
    return (
        <>
            <Header/>
            <main id="main-pay">
                <Link to="/cart"><button className='button-back'><img src={ArrowIcon} alt="" /><span>VOLTAR</span></button></Link>
                <section id="information-payment">
                    <h1 className="title-page">Pagamento</h1>

                    <div className="container-informations">
                        <div className="box-value">
                            <span className='text-Value'>Valor Total: </span>
                            <div className='text-boxValue'>R$ 4,00</div>
                        </div>
                        <div className="box-pix">
                            <span className='text-pix'>Token PIX: </span>
                            <button className='text-tokenPix'>iVBORw0KGgoAAAANSUhEUgAABRQAAAUUCAYAAACu5</button>
                        </div>
                    </div>
                    <button className='button-payment'>Finalizar</button>
                    <span className='text-warningPayment'>Realizará a transação do valor</span>
                </section>  
                <hr className='max-line'/>
                <span className='text-warning'>Após o pagamento será liberado o <b> código do produto </b>, que pode ser acessado através da pagina “ <Link to="/myAccount">Minha Conta</Link> ”.</span>
            </main>
            <Footer/>
        </>
    )
}