import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from 'react-router-dom'
import {Header, NavDown, Ads,ScrollingItens, Footer, Loading} from "../components/components"
import {firestore, getImageOfTheData, insertProductInCart} from '../functions/function'
import "../style/min/viewProduct.scss"

export default function ViewProduct(){
    const { id } = useParams();
    const [dataEcommerce, setEcommerce] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const [moreProduct, setMoreProduct] = useState([])
    const navigate = useNavigate()

    async function constructPage(){
        const ecommerce = await getImageOfTheData(await new firestore().get({bd: 'ecommerce'}), 'ecommerce', true);
        const ecommeceData = selectEcommerceById(ecommerce)
        const selectOthesProduct = selectAllProductWithoutThisID(ecommerce, ecommeceData.data)

        setEcommerce(ecommeceData.data)
        setMoreProduct(selectOthesProduct)
        setLoading(false)

        function selectEcommerceById(data:any){
            return data.filter((a:any) => a.id === id)[0]
        }

        function selectAllProductWithoutThisID(data:any, product:any){
            return data.filter((a:any) => a.id !== id && a.tag === product.tag)
        }
    }

    async function addProductInCart(){
        if(!loading){
            const insertInCartClass = new insertProductInCart()
            insertInCartClass.selectProduct(id as string)
            await insertInCartClass.selectUser()
            await insertInCartClass.selectCart()
            insertInCartClass.addProductInCart()
            const updated = await insertInCartClass.updateBdCartUser()

            if(updated){
                navigate('/cart')
            }else{
                alert("Ops! não conseguimos adcionar o produto no seu carrinho.")
            }
        }
    }

    useEffect(() => {
        constructPage()
    },[])

    return (
        <>
            <main id="main-viewProduct">
                <section className="section-header">
                    <Header type={1} link={'/ecommerce'} color={'#272727'}/>
                    <div className="container-imageProduct">
                        {loading ? <Loading width="100%" height="100%"/> : <img className="image-product" src={dataEcommerce.image} alt={dataEcommerce.title} />}
                    </div>
                </section>
                <section className="section-informationProduct">
                    {loading ? <Loading width="100%" height="40px"/> : <h1 className="title-product">{dataEcommerce.title}</h1>}

                    <div className="box-content-value">
                        {loading ? <Loading width="100%" height="25px"/> : dataEcommerce.oldValue ? ( <span className="text-oldValue">R$ {dataEcommerce.oldValue}</span>):""}
                        {loading ? <Loading width="100%" height="25px"/> : <span className="text-value">R$ {dataEcommerce.value}</span>}                        
                    </div>

                    <hr className="max-line"/>

                    <div className="container-informationProduct">
                        {loading ? <Loading width="100%" height="120px"/> : (<div dangerouslySetInnerHTML={{__html: dataEcommerce.description}} />)}
                    </div>

                    <button className="button-addCard" onClick={() => addProductInCart()}>Fazer Pedido</button>
                    <span className="txt-ops">Você será redirecionado à tela de pagamento</span>
                </section>
                <section className="section-moreProduct">
                    <Ads amountAds={2} link={true} automatic={true}/>
                    {moreProduct[0] ? (
                        <div className="container-content">
                            <h3 className="title-content">Produtos semelhantes</h3>
                            {loading ? <Loading width="100%" height="100px"/> : <ScrollingItens itens={moreProduct} link={true}  type={'ecommerce'} />}
                        </div>
                    ):""}
                </section>

            </main>
            <Footer/>
            <NavDown color={"#171717"}/>
        </>
    )
}