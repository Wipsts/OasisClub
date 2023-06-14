import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import {Header, NavDown, ScrollingItens, Input, QrItens, Footer, QrCodeScan, Loading} from "../components/components"
import {logUser, getArtiglesUser, getEcommerceUser, getBoughtProduct, scanQrCode} from '../functions/function'
import {QRCodeSVG} from 'qrcode.react';
import "../style/min/myAccount.scss"

function ScanQrCode({show, closeMenu}:{show: boolean, closeMenu:any}) {
    const [display, setDisplay] = useState('none')
    const [data, setData] = useState('');
    const [resultCount, setResultCount] = useState(0)
    const buttonOpenAndClose = useRef<HTMLButtonElement>(null)

    const informationQrCode = async (result:string) => {
        setData(result)
        setResultCount(1)
        if(resultCount === 0 && !data){
            const scanQrCodeClass = new scanQrCode()
            scanQrCodeClass.processingQrCode(result)
            
            if(await scanQrCodeClass.changeBuyersCart()){
                if(await scanQrCodeClass.changeDataProduct()){
                    if(buttonOpenAndClose.current !== null){
                        const informationLayout = await scanQrCodeClass.showLayoutProduct()
                        buttonOpenAndClose.current.click()
                    }
                }
            }            
        }
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
                    <button className="button-close-scan" onClick={closeMenu} ref={buttonOpenAndClose}></button>
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
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [artigles, setArtigles] = useState([{}])
    const [ecommerce, setEcommerce] = useState([{}])
    const [valuesUser, setValuesUser] = useState({name: 'Nome completo Aluno', email: 'emailaluno@gmail.com', code: '0000000'})
    const [boughtProduct, setBoughtProduct] = useState([{}])

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

    async function logOut(){
        const logout = await new logUser().logOutUser()
        if(logout.logout){
            navigate('/login')
        }
    }

    async function constructPage(){
        const logUserClass = new logUser()
        const uidUser = await logUserClass.getUser() as string
        const dataUser = await logUserClass.getDataUser(uidUser) as any
        const data = dataUser.data.data

        const requestBougthProduct = await getBoughtProduct(data.uidCard, dataUser.data.id)
        const requestArtigleUser = await getArtiglesUser(data.uidArtigle)
        const requestEcommerceUser = await getEcommerceUser(data.uidProducts)
        setValuesUser(data)

        if(requestArtigleUser[0] && requestEcommerceUser[0] && requestBougthProduct){
            setBoughtProduct(requestBougthProduct)
            setArtigles(requestArtigleUser)
            setEcommerce(requestEcommerceUser)
            setLoading(false)
        }

    }

    useEffect(() => {
        constructPage()
    },[])

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
                    {loading ? <Loading width="100%" height="90px"/> : <QrItens itens={boughtProduct} onClickQr={openAndCloseViewQr} onClickCopy={(e:any) => {}}/>}
                </section>

                <hr className="min-line"/>
                <section className="section-container">
                    <button className="button-action style-button-artigle">Escrever artigo</button>
                    <button className="button-action style-button-ecommerce">Adicionar no e-commerce</button>
                    <button className="button-action style-button-qrcode" onClick={(e) => openAndCloseScanQr()}>escanear QR-CODE </button>
                    <button className="button-disconnect" onClick={() => logOut()}>Desconectar</button>
                </section>
                <hr className="min-line"/>
                <section className="section-container">
                     {loading ? <Loading width="100%" height="150px"/> : <ScrollingItens subtext={'Artigos Postados/em analise'} analyze={true} itens={artigles} type={'blog'} />}
                     {loading  ? <Loading width="100%" height="150px"/> : <ScrollingItens subtext={'Produtos e-commerce'} analyze={true} itens={ecommerce} type={'ecommerce'} />}
                </section>
            </main>
            <Footer/>
            <NavDown color={"#171717"}/>
        </>
    )
}

export default MyAccount