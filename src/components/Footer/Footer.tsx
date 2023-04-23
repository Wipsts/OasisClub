import React from "react"
import warningIcon from "../../images/icon/warningIcon.svg"
import "./Footer.scss"

export default function Footer(){
    return (
        <>
            <footer>
                <div className="container-upFooter">
                    <div className="box-reminder">
                        <div className="box-reminderTitle">
                            <img src={warningIcon} alt="ATENÇÃO" />
                            <span className="title-reminder">Regras de Músicas</span>
                        </div>
                        <div className="content-reminder">
                            <ul>
                                <li>Sem Palavrão</li>
                                <li>Funk somente após revisão</li>
                                <li>Spam não será tolerado!</li>
                                <li>Lembre-se temos crianças na escola</li>
                            </ul>
                        </div>
                    </div>
                    <div className="box-warning">
                        <img src={warningIcon} alt="ATENÇÃO" />
                        <span className="text-warning"><u>Oásis Club</u> não se responsabiliza pelo e-commerce </span>
                    </div>
                </div>
                <div className="box-contact">
                    <span className="text-contact">Contato com os administradores:</span>
                    <ul>
                        <a target='_blank' rel="noreferrer" href="https://api.whatsapp.com/send?phone=5567992546008"><li>Suporte: <u> 67 99254-6008</u></li></a>
                        <a target='_blank' rel="noreferrer" href="https://api.whatsapp.com/send?phone=5567000000000"><li>Coordenador de projeto: <u>67 0000-0000</u></li></a>
                        <a target='_blank' rel="noreferrer" href="https://api.whatsapp.com/send?phone=5567000000000"><li>Coordenador do e-commerce: <u>67 0000-0000</u></li></a>
                        <a target='_blank' rel="noreferrer" href="https://api.whatsapp.com/send?phone=5567000000000"><li>Coordenadoria: <u>67 0000-0000</u></li></a>
                    </ul>
                </div>
            </footer>
        </>
    )
}
