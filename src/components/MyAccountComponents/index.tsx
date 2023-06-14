import React, { useEffect, useState, useRef} from "react";
import {Input,QrCodeScan } from "../../components/components"
import {scanQrCode} from '../../functions/function'
import {QRCodeSVG} from 'qrcode.react';
import "./style.scss"

export function ScanQrCode({show, closeMenu}:{show: boolean, closeMenu:any}) {
    const popUpScan = useRef<HTMLButtonElement>(null)
    
    const [display, setDisplay] = useState('none')
    const [data, setData] = useState('');
    const [resultCount, setResultCount] = useState(0)
    const [viewProductByQr, setViewProductByQr] = useState(false)
    const [layoutResult, setLayoutResult] = useState({})

    function openAndCloseProductByQr(){
        setViewProductByQr(!viewProductByQr)
        document.body.style.overflow = !viewProductByQr ? 'hidden' : 'auto';
    }

    const informationQrCode = async (result:string) => {
        setData(result)
        setResultCount(1)
        if(resultCount === 0 && !data){
            const scanQrCodeClass = new scanQrCode()
            scanQrCodeClass.processingQrCode(result)
            
            if(await scanQrCodeClass.changeBuyersCart()){
                if(await scanQrCodeClass.changeDataProduct()){
                    if(popUpScan.current !== null){
                        const informationLayout = await scanQrCodeClass.showLayoutProduct() as object
                        setLayoutResult(informationLayout)
                        popUpScan.current.click()
                        setViewProductByQr(true)
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
            <ViewProductCreateByQr show={viewProductByQr} data={layoutResult} closeMenu={() => openAndCloseProductByQr()}/>

            <section id="section-qrCode" style={{display: display}}>
                <div className={`container-scanQrCode ${show ? 'style-ScanOpen' : 'style-ScanClose'}`}>
                    <button className="button-close-scan" onClick={closeMenu} ref={popUpScan}></button>
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
export function ViewQrCode({show, closeMenu, data}:{show: boolean, closeMenu:any, data?:Array<string>}) {
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
export function ViewProductCreateByQr({show, closeMenu, data}:{show: boolean, closeMenu:any, data:any}) {
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
                                <span className="title-qr">{data.title}</span>
                                <div className="scan-camera" >
                                   <img src={data.image} alt="" />                        
                                </div>
                            </>
                        ):''}
                        
                    </div>
                </div>
            </section>
        </>
    )
}
