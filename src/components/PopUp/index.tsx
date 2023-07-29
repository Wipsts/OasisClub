import {useState, useEffect} from 'react'
import "./style.scss"

export function PopUp({children, show, closeMenu}:{children:JSX.Element, show: boolean, closeMenu: any}) {
    const [display, setDisplay] = useState('none')

    const PopUpDisplay = () => {
        if(show){
            setDisplay('block')
        }else{
            setTimeout(() => {
                setDisplay('none') 
            }, 700)
        }
    }

    useEffect(() => {
        PopUpDisplay()
    })

    return (
        <>
            <section id="section-pop-up" style={{display: display}}>
                <div className={`container-pop-up ${show ? 'style-PopUpOpen' : 'style-PopUpClose'}`}>
                    <button className="button-close-pop-up" onClick={closeMenu}></button>
                    <button className="button-drag-close-pop-up" onClick={closeMenu}/>
                    
                    <div className="container-information-pop-up">
                        {children}
                    </div>
                </div>
            </section>
        </>
    )
}