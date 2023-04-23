import {useState} from 'react';
import {Link} from 'react-router-dom'
import {Menu} from "../components"
import "./Header.scss"
import IconOasisClub from "../../images/icon/iconOasisClub.png"
import ArrowIcon from "../../images/icon/ArrowIcon.svg"

interface propHeaderParams {
    type?: number
    color?: string
    link?: string
}

interface typeHeaderParams{
    onClick: any
    color?: string
    link?: string
}

function DefaultHeader(props:typeHeaderParams){
    return (
        <>
            <header id="header">
                <div className="content-menu">
                    <button onClick={props.onClick} className="button-menu-hamburger"></button>
                </div>
                <div className="content-icon">
                    <img src={IconOasisClub} alt="OASST" />
                    <span>Oásis Club</span>
                </div>
            </header>
        </>
    )
}

function AlternateHeader(props:typeHeaderParams){
    return (
        <>
            <header id="alternate-header">
                <Link to={props.link ? props.link : ''}><button className='button-back' style={{backgroundColor: props.color}}>
                    <img src={ArrowIcon} alt="<-" />
                    <span>voltar</span>
                </button></Link>
                <div className="content-menu" style={{backgroundColor: props.color}} >
                    <button onClick={props.onClick} className="button-menu-hamburger"></button>
                </div>
            </header>
        </>
    )
}

export default function Header(props:propHeaderParams){
    const [configMenu, setConfigMenu] = useState(false)
    
    function alterateMenu(){
        setConfigMenu(!configMenu)
    }

    return (
        <>
            {props.type ? (<AlternateHeader link={props.link} color={props.color} onClick={() => alterateMenu()} />) : (<DefaultHeader onClick={() => alterateMenu()}/>)}
            <Menu menu={configMenu} closeMenu={alterateMenu}/>
        </>

    )
}