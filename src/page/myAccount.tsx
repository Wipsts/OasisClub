import React, {useState, useEffect} from "react";
import {Header, NavDown, ScrollingItens, Input, QrItens, Footer, QrCodeScan} from "../components/components"
import {QRCodeSVG} from 'qrcode.react';
import "../style/min/myAccount.scss"


function ScanQrCode({show, closeMenu}:{show: boolean, closeMenu:any}) {
    const [display, setDisplay] = useState('none')
    const [data, setData] = useState('');

    const informationQrCode = (result:string) => {
        setData(result)
        console.log(result)
    }

    const ScanDisplay = () => {
        if(show){
            setDisplay('block')
        }else{
            setTimeout(() => {
                setDisplay('none') 
            }, 700)
        }
    }

    useEffect(() => {
        ScanDisplay()
    })

    return (
        <>
            <section id="section-qrCode" style={{display: display}}>
                <div className={`container-scanQrCode ${show ? 'style-ScanOpen' : 'style-ScanClose'}`}>
                    <button className="button-close-scan" onClick={closeMenu}></button>
                    <div className="container-content-scan">
                        <div className="scan-camera" >
                            {show ? (<QrCodeScan information={informationQrCode}/>) : ''}
                            
                        </div>
                        <span className="division-ou">ou</span>
                        <div className="content-input-code">
                            <Input titleInput={'Código QR'} type='text' value={''} onChange={(e:any) => {}}/>
                            <button className="button-send-code">Enviar Código</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

function ViewQrCode({show, closeMenu, data}:{show: boolean, closeMenu:any, data?:Array<string>}) {
    const [display, setDisplay] = useState('none')
    const ScanDisplay = () => {
        if(show){
            setDisplay('block')
        }else{
            setTimeout(() => {
                setDisplay('none') 
            }, 700)
        }
    }

    useEffect(() => {
        ScanDisplay()
    })

    return (
        <>
            <section id="section-qrCode" style={{display: display}}>
                <div className={`container-scanQrCode ${show ? 'style-ScanOpen' : 'style-ScanClose'}`}>
                    <button className="button-close-scan" onClick={closeMenu}></button>
                    <div className="container-content-scan">
                        {data ? (
                            <>
                                <span className="title-qr">{data[1]}</span>
                                <div className="scan-camera" >
                                   <QRCodeSVG value={data[0]} />                         
                                </div>
                            </>
                        ):''}
                        
                    </div>
                </div>
            </section>
        </>
    )
}

function MyAccount(){
    const examplesBlog = [{id: "ijsudhusdhsudjs", data: {title: "Como usar o crase, explicação e exemplos praticos", img: "https://th.bing.com/th/id/OIP.5zsYKymVDeJQntqyJ1aTfQHaFj?pid=ImgDet&rs=1",  color: "#028c73", analyze: 1, author: [{name: "Hélio Martins", schoolGrade: "3º A", icon: ""}]}}, {id: "182719ah98ha8s", data: {title: "Como usar autoridades na redação", img: "https://th.bing.com/th/id/R.4c52cde9c49e5971a5b1d088d9bd0b2c?rik=3%2bOY63bKYBFjzQ&pid=ImgRaw&r=0", color: "#0084c2", analyze: 0, author: [{name: "Hélio Martins", schoolGrade: "3º A", icon: ""}]}}]
    const examplesEcommerce = [{id: "uhasg6afs", data: {title: "Esfirra de carne feita na hora", img: "https://th.bing.com/th/id/R.58c27595c93b6192e432e2314d52923f?rik=KFUZKh0DX3CwAQ&pid=ImgRaw&r=0", value: 6.00, oldValue: 0, analyze: 1}}]

    const [valuesUser, setValuesUser] = useState({name: 'Nome completo Aluno', email: 'emailaluno@gmail.com', code: '0000000'})

    const [scanQrCode, setScanQrCode] = useState(false)
    const [viewQrCode, setViewQrCode] = useState(false)
    const [valueQrCodeViwer, setValueQrCodeViwer] = useState<Array<string>>(['', ''])

    function changeValue(value: string, key:string){
        setValuesUser(prevState => {return {...prevState, [key]: value}})
    }

    const openAndCloseViewQr = (valueQr?:string, name?:string) => {
        setViewQrCode(!viewQrCode)
        document.body.style.overflow = !viewQrCode ? 'hidden' : 'auto';

        if(valueQr && name){
            setValueQrCodeViwer([valueQr, name])
        }        
    }

    function openAndCloseScanQr(){
        setScanQrCode(!scanQrCode)
        document.body.style.overflow = !scanQrCode ? 'hidden' : 'auto';
    }

    return (
        <>
            <Header/>

            <ScanQrCode show={scanQrCode} closeMenu={() => openAndCloseScanQr()}/>
            <ViewQrCode show={viewQrCode} data={valueQrCodeViwer} closeMenu={() => openAndCloseViewQr()}/>

            <main id="main-myAccount">
                <section className="container-informationUser">
                    <h1 className="title-page">Minha Conta</h1>

                    <div className="content-inputs">
                        <Input titleInput={'Nome'} type='text' value={valuesUser.name} onChange={(e:any) => changeValue(e.target.value, 'name')}/>
                        <Input titleInput={'Email'} type='email'  disabled={true} value={valuesUser.email} onChange={(e:any) => changeValue(e.target.value, 'email')}/>
                        <Input titleInput={'código do aluno'} type='number' disabled={true} value={valuesUser.code} onChange={(e:any) => changeValue(e.target.value, 'code')}/>
                    </div>
                </section>

                <hr className="min-line"/>
                <section className="section-container">
                    <QrItens itens={[{name: 'Esfirra de carne', code:'#182129u181', qrCode:'', quant:2}]} onClickQr={openAndCloseViewQr} onClickCopy={(e:any) => {}}/>
                </section>

                <hr className="min-line"/>
                <section className="section-container">
                    <button className="button-action style-button-artigle">Escrever artigo</button>
                    <button className="button-action style-button-ecommerce">Adicionar no e-commerce</button>
                    <button className="button-action style-button-qrcode" onClick={(e) => openAndCloseScanQr()}>escanear QR-CODE </button>
                    <button className="button-disconnect">Desconectar</button>
                </section>
                <hr className="min-line"/>
                <section className="section-container">
                    <ScrollingItens subtext={'Artigos Postados/em analise'} analyze={true} itens={examplesBlog} type={'blog'} />
                    <ScrollingItens subtext={'Produtos e-commerce'} analyze={true} itens={examplesEcommerce} type={'ecommerce'} />
                </section>
            </main>
            <Footer/>
            <NavDown color={"#171717"}/>
        </>
    )
}

export default MyAccount