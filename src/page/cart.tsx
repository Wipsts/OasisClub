import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Header, NavDown, ScrollingItens, ItensBox, Footer, Loading} from "../components/components"
import {firestore, getImageOfTheData, logUser} from '../functions/function'
import ArrowIcon from "../images/icon/ArrowIcon.svg"

import "../style/min/cart.scss"

export default function Cart(){
    const [productsCart, setProductsCart] = useState<Array<any>>([{}])
    const [moreProduct, setMoreProduct] = useState<Array<object>>([{}])
    const [dataCart, setDataCart] = useState({value: ''})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    async function constructPage(){
        const ecommerce = await getImageOfTheData(await new firestore().get({bd: 'ecommerce'}), 'ecommerce', true);
        const UidUser = await new logUser().getUser()
        const user = await new firestore().getWhere({bd: 'user', where: ['Uid', UidUser]}) as any;
        const cart = selectProductsCart(ecommerce, user.data.uidCard)
        const selectOthesProduct = selectAllProductWithoutThisID(ecommerce, cart.uidsProductCart)
    
        setDataCart(prevState => {return {...prevState, value: cart.valueCart.toLocaleString('pt-br', {minimumFractionDigits: 2})}})
        setProductsCart(cart.productCart)
        setMoreProduct(selectOthesProduct)
        setLoading(false)

        function selectProductsCart(data:any, cart:any){
            const Cartproducts:any = []
            const uidsProductCart: Array<string> = [""]
            let valueCart: number = 0

            for (let i = 0; i < cart.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    const productCart = cart[i];
                    const productEcommerce = data[j];

                    if((productCart.uidProduct === productEcommerce.id) && !productCart.bought){
                        Cartproducts.push(productEcommerce)
                        uidsProductCart.push(productCart.uidProduct)
                        valueCart += parseFloat(productEcommerce.data.value.replace(",", "."))
                    }
                }
            }
            
            return {productCart: Cartproducts.filter((a:any) => a !== null), uidsProductCart, valueCart}
        }

        function selectAllProductWithoutThisID(data:any, idsProduct:Array<string>){
            return data.filter((a:any) => !idsProduct.includes(a.id))
        }
    }

    async function verifyUser(){
        if(await new logUser().getUser()){}else{navigate('/login')}
    }

    function openPayment(){
        if(productsCart[0].id){
            navigate('/payment')
        }
    }

    useEffect(() => {
        constructPage()
        verifyUser()
    },[])

    return (
        <>
            <Header/>
            <main id="main-card">
               <Link to={`/ecommerce`}><button className='button-back'><img src={ArrowIcon} alt="" /><span>voltar</span></button></Link>

                <section className='section-card'>
                    <h1 className="title-page">Carrinho</h1>
                    <div className="content-product">
                        {loading && false ? <Loading width='100%' height='140px'/> : (
                            <>
                                {productsCart[0].id ? productsCart?.map((item:any, index) => (
                                    <ItensBox uid={item.id} analyze={false} article={{img: item.data.image, title: item.data.title, color: '', author: '', value: item.data.value, oldValue: item.data.oldValue, analyze: 1}} type={'ecommerce'} link={true} key={`product-key-${index}`} />
                                )) : <span className='text-empty-cart'>Nenhum item no carrinho. <br/> <br/>  <Link to={'/ecommerce'}> <i>Procurar</i> </Link></span>}
                            </>
                        )}
                    </div>
                    <hr className='max-line'/>

                    <div className="container-finishCard">
                        {loading ? <Loading width='100%' height='30px'/> : <div className='box-value'>R$ {dataCart.value}</div>}
                        <div className="content-text">
                            <span className='text-finishCard' onClick={() => openPayment()}>Finalizar Pedido</span>
                        </div>
                    </div>
                </section>

                <section className="section-moreProduct">
                    <div className="container-content">
                        {moreProduct[0] ? (
                            <>
                                <h3 className="title-content">Produtos semelhantes</h3>
                                {loading ? <Loading width='100%' height='100px'/> : <ScrollingItens itens={moreProduct} link={true}  type={'ecommerce'} />}
                            </>
                        ):""}
                    </div>
                </section>
            </main>
            <NavDown color={'#171717'}/>
            <Footer/>
        </>
    )
}