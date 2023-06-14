import React, { useEffect, useState, useRef} from "react";
import {Input,QrCodeScan } from "../../components/components"
import {scanQrCode} from '../../functions/function'
import {QRCodeSVG} from 'qrcode.react';
import "./style.scss"

export function ScanQrCode({show, closeMenu}:{show: boolean, closeMenu:any}) {
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
