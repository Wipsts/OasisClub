import { Component} from 'react'
import './QrItens.scss'

interface propsQrItensParams{
    itens: object[]
    onClickQr: Function
    onClickCopy: Function
}

export default class QrItens extends Component<propsQrItensParams>{
    constructor(props:propsQrItensParams){
        super(props)
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
                                <img src="" alt="" className='img-qrCode' />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}