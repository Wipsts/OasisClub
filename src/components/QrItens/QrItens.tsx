import { Component} from 'react'
import {QRCodeSVG} from 'qrcode.react';
import './QrItens.scss'

interface propsQrItensParams{
    itens: object[]
    onClickQr: any
    onClickCopy: Function
}

export default class QrItens extends Component<propsQrItensParams>{
    constructor(props:propsQrItensParams){
        super(props)
    }

    openQrCode(valueQr:string, name:string){
        this.props.onClickQr(valueQr, name)
    }

    render(){
        return (
            <>
                <div className="container-itens">
                    <div className="content-title">
                        <span className='title-container'>Código dos produtos comprados</span>
                    </div>
                    <div className="content-box-itens">
                        <div className="content-box-item">
                            <span className='name-item'>Esfirra de carne</span>
                            <div className="box-informationItem">
                                <div className="codeQr">#182129u181</div>
                                <button className="img-qrCode" onClick={(e) => this.openQrCode('#182129u181', 'Esfirra de carne')}><QRCodeSVG value={'#182129u181'} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}