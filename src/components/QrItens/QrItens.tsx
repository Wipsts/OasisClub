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

                        {this.props.itens?.map((product:any, index) => (
                            <div className="content-box-item" key={`${product.id}-${index}`}>
                                <span className='name-item'>{product.title}</span>
                                <div className="box-informationItem">
                                    <div className="codeQr">{product.code}</div>
                                    <button className="img-qrCode" onClick={(e) => this.openQrCode(product.qrValue, product.title)}><QRCodeSVG value={product.qrValue} /></button>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </>
        )
    }
}