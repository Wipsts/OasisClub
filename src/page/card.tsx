import React from 'react'
import {useParams, Link} from 'react-router-dom'
import {Header, NavDown, ScrollingItens, ItensBox, Footer} from "../components/components"
import ArrowIcon from "../images/icon/ArrowIcon.svg"
import "../style/min/card.scss"

export default function Card(){
    const { id } = useParams();
    const examplesEcommerce = [{id: "uhasg6afs", data: {title: "Esfirra de carne feita na hora", img: "https://th.bing.com/th/id/R.58c27595c93b6192e432e2314d52923f?rik=KFUZKh0DX3CwAQ&pid=ImgRaw&r=0", value: 6.00, oldValue: 0}}]

    return (
        <>
            <Header/>
            <main id="main-card">
               <Link to={`/ecommerce`}><button className='button-back'><img src={ArrowIcon} alt="" /><span>voltar</span></button></Link>

                <section className='section-card'>
                    <h1 className="title-page">Produtos E-commerce</h1>
                    <div className="content-product">
                        {examplesEcommerce.map((item, index) => (
                            <ItensBox uid={item.id} analyze={false} article={{img: item.data.img, title: item.data.title, color: '', author: '', value: item.data.value, oldValue: item.data.oldValue, analyze: 1}} type={'ecommerce'} link={true} key={`product-key-${index}`} />
                        ))}
                    </div>
                    <hr className='max-line'/>

                    <div className="container-finishCard">
                        <div className='box-value'>R$ 6,00</div>
                        <div className="content-text">
                            <span className='text-finishCard'>Finalizar Pedido</span>
                        </div>
                    </div>
                </section>

                <section className="section-moreProduct">
                    <div className="container-content">
                        <h3 className="title-content">Produtos semelhantes</h3>
                        <ScrollingItens itens={examplesEcommerce} link={true}  type={'ecommerce'} />
                    </div>
                </section>
            </main>
            <NavDown color={'#171717'}/>
            <Footer/>
        </>
    )
}