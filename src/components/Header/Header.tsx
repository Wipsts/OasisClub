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
    onClick: () => void
    color?: string
    link?: string
}

interface AdminHeaderParams{
    color?: string;
    link?: string;
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

function AdminHeader(props:AdminHeaderParams){
    return (
        <header id='admin-header' style={{backgroundColor: props.color}}>
            <div className="content-icon">
                <img src={IconOasisClub} alt="OASST" />
                <span>Oásis Club | ADM</span>
            </div>
        </header>
    )
}

export default function Header(props:propHeaderParams){
    const [configMenu, setConfigMenu] = useState(false)
    
    function alterateMenu(){
        setConfigMenu(!configMenu)
    }

    function SelectMenu(){
        if(props.type){
            if(props.type === 1){
                return <AlternateHeader link={props.link} color={props.color} onClick={() => alterateMenu()} />
            }else{
                return <AdminHeader link={props.link} color={props.color}/>
            }
        }else{
            return <DefaultHeader onClick={() => alterateMenu()}/>
        }
    }

    return (
        <>
            <SelectMenu/>
            <Menu menu={configMenu} closeMenu={alterateMenu}/>
        </>

    )
}