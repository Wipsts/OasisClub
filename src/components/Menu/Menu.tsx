import {Component} from 'react';
import {Link} from 'react-router-dom'
import instagramIcon from "../../images/icon/instagramIcon.png"
import whatsappIcon from "../../images/icon/whatsappIcon.png"
import "./Menu.scss"

interface IState {
    menuOpen: boolean,
    display: string
}
interface MenuParams {
    menu: boolean
    closeMenu: () => void
}
interface LetterMenuParams {
    text: string
    color: string
    size?: number | 1
    link: string | '/'
}

function LetterMenu(props:LetterMenuParams){
    return (
        <>
            <Link to={props.link}>
                <div className="container-letterMenu">
                    <span className="text-letterMenu" style={{color: props.color, fontSize: `${props.size}em`}}>{props.text}</span>
                    <hr style={{backgroundColor: props.color}} />
                </div>     
            </Link>
        </>
    )
}

export default class Menu extends Component<MenuParams,IState>{
    constructor(props:MenuParams){
        super(props)
        this.state = {
            menuOpen: false,
            display: 'none'
        }
    }

    componentDidMount(){
        this.setState({menuOpen: this.props.menu, display: this.props.menu ? "flex" : "none"})
    }

    componentDidUpdate(prevProps:any){
        const openMenu = () => {
            this.setState({menuOpen: this.props.menu, display: "flex"})
        }

        const closeMenu = () => {
            this.setState({menuOpen: this.props.menu})
            setTimeout(() => {
                this.setState({display: "none"})
            },500)
        }
        
        if(prevProps.menu !== this.props.menu){
            if(this.props.menu){
                openMenu()
            }else{
                closeMenu()
            }
        }
    }

    render(){
        return (
            <>
                <div className={`container-menu ${this.state.menuOpen ? 'openMenu' : 'closeMenu'}`} style={{display: this.state.display}}>
                    <div className="box-menu">
                        <button onClick={this.props.closeMenu} className="button-menu-hamburger"></button>
                        <nav className="box-linkPage">
                            <LetterMenu link={'/'} text={'home'} color={'#fff'} size={1.3}/>
                            <LetterMenu link={'/blog'} text={'blog'} color={'#fff'} size={1.3}/>
                            <LetterMenu link={'/ecommerce'} text={'E-commerce'} color={'#fff'} size={1.3}/>
                            <LetterMenu link={'/adminPainel'} text={'Painel Admin'} color={'#fff'} size={1.3}/>
                            <LetterMenu link={'/myAccount'} text={'Minha Conta'} color={'#fff'} size={1.3}/>
                        </nav>
                        <hr />
                        <nav className="box-linkPage">
                            <LetterMenu link={'/rank'} text={'Rank'} color={'#fff'} size={1}/>
                            <LetterMenu link={'/teacherPainel'} text={'Painel de professores'} color={'#fff'} size={1}/>
                            <LetterMenu link={'/quickStudy'} text={'Estudo Rápido'} color={'#fff'} size={1}/>
                            <LetterMenu link={'/requiredClub'} text={'Club Obrigatório'} color={'#fff'} size={1}/>
                            <LetterMenu link={'/avaliation'} text={'Avaliações'} color={'#fff'} size={1}/>
                        </nav>
                        <hr />
                        <nav className="box-linkPage">
                            <LetterMenu link={'/schoolRegiment'} text={'Regimento escolar'} color={'#39B0B8'} size={1}/>
                            <LetterMenu link={'/siteMap'} text={'Mapa do site'} color={'#2DA12A'} size={1}/>
                        </nav>

                        <div className="container-socialMedia">
                            <nav className="box-socialMedia">
                                <a href="https://www.instagram.com/escola_constantino/"><img src={instagramIcon} alt="INS" /></a>
                                <a href="https://whatsapp.com"><img src={whatsappIcon} alt="WTP" /></a>
                            </nav>
                            <span className='text-information'>Projeto baseado em fins educacionais</span>
                        </div>
                    </div>
                    {/* <div onClick={this.props.closeMenu} className="box-closeMenuColumn"></div> */}
                </div>
            </>
        )
    }
}