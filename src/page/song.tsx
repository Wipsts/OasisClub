import React, {useState, useEffect} from "react";
import {Header, NavDown, Footer, Search, PlaylistBox} from "../components/components"
import "../style/min/song.scss"

interface propsAddSongParams{
    open: boolean
    onClick: () => void
}

function ContainerAddSong(props:propsAddSongParams){
    const [display, setDisplay] = useState('none')

    const addSongDisplay = () => {
        if(props.open){
            setDisplay('block')
        }else{
            setTimeout(() => {
                setDisplay('none') 
            }, 700)
        }
    }

    useEffect(() => {
        addSongDisplay()
    })

    return (
        <div className={`container-addSong ${props.open ? 'style-addSongOpen' : 'style-addSongClose'}`} style={{display: display}}>
            <div onClick={props.onClick} className="close-bar"></div>
            <div onClick={props.onClick} className="button-close"></div>
            <h2 className="title-page">Playlist escolar | Adicionar</h2>

            <form className="box-addSong">
                <span className="subtext-song">Nome da música <b>*</b></span>
                <input type="text" className="input-song" />
                <button className="button-addSong">Enviar</button>
            </form>
        </div>
    )
}

function Song(){
    const [menuAddSong, setMenuAddSong] = useState(false)

    function changeMenu(){
        setMenuAddSong(!menuAddSong)
    }

    // TODO quando o usuário clicar em "enviar" (música) | faz uma verificação para saber se a musica realmente existe (autocomplete interno) - se sim - realiza o input - se não - devolve "música não encontrada"

    return (
        <>
            <Header/>
            <main id="main-song">
                <ContainerAddSong onClick={() => changeMenu()} open={menuAddSong}/>

                <h1 className="title-page">Playlist escolar</h1>
                <div className="content-search">
                    <Search type='song' onClick={() => {}}/>
                </div>
                <div className="container-playlist">
                    <PlaylistBox key='playlist' onClick={() => {}} like={true} type={'default'} title={'Playlist recreio'} songs={[{uid: 'knasuihisasa', data: {title: 'Nosso Quadro', author: 'agroBoy & Ana Castela', like: '10'}}]}/>

                    <PlaylistBox key='playlist-deprecated' onClick={() => {}} like={false} type={'deprecated'} title={'Músicas desaprovadas'} songs={[{uid: 'knasuihisasa', data: {title: 'Nosso Quadro', author: 'agroBoy & Ana Castela', like: '10'}}]}/>

                    <PlaylistBox key='playlist-analyze' onClick={() => {}} like={false} type={'analyze'} title={'Músicas Em analise'} songs={[{uid: 'knasuihisasa', data: {title: 'Nosso Quadro', author: 'agroBoy & Ana Castela', like: '10'}}]}/>
                </div>
                <button className="button-placeOrder" onClick={() => changeMenu()}>Fazer pedido de música</button>
            </main>
            <Footer/>
            <NavDown color={"#171717"}/>
        </>
    )
}

export default Song