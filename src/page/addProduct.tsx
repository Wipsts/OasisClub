import {useEffect, useState} from "react";
import {useParams, useNavigate} from 'react-router-dom'
import {Header, Ads, Footer, Loading, TextareaInput, Input} from "../components/components"
import {firestore, getImageOfTheData, createProduct, updateProduct} from '../functions/function'
import {ObjectProductParams, EventSelectChange, EventInputChange, EventTextareaChange, InputProductParams} from '../interfaces/interfaces'
import "../style/min/viewProduct.scss"
import IconImage from '../images/icon/IconImage.svg'

function InputProduct(props:InputProductParams){
    return (
        <input {...props}/>
    )
}

export default function AddProduct(){
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [imageArticle, setImageArticle] = useState<string>('')
    const [dataEcommerce, setEcommerce] = useState<ObjectProductParams>({analyze: 0, cartQuant: 0, description: '',image: '',oldValue: '',PIXHash: '',postID: '',quant: 0, quantType: false, tag: '', title: '', type: 2, value: ''})
    const navigate = useNavigate()

    async function constructPage(){
        const ecommerce = await getImageOfTheData(await new firestore().get({bd: 'ecommerce'}), 'ecommerce', true);
        const ecommeceData = selectEcommerceById(ecommerce)
        ecommeceData.data.value = ecommeceData.data.value.replace(",", '.');
        ecommeceData.data.oldValue = ecommeceData.data.oldValue.replace(",", '.');

        setImageArticle(ecommeceData.data.image)
        setEcommerce(ecommeceData.data)

        function selectEcommerceById(data:any){
            return data.filter((a:any) => a.id === id)[0]
        }
    }

    const changeInformation = (e: EventInputChange|EventTextareaChange|EventSelectChange, key:string) => {
        setEcommerce(prevstate => {return {...prevstate, [key]: e.target.value}})
    }

    const onImageChange = (event: EventInputChange) => {
        if (event.target.files && event.target.files[0]) {
            setEcommerce(prevState => { return {...prevState, image: event?.target?.files}})
            setImageArticle(URL.createObjectURL(event.target.files[0]));
        }
    }

    async function postProduct(){
        if(checkIfAllInputIsComplete()){
            console.error('not complete')
            return 
        }
        
        if(isEdit){
            const updatedProduct = await new updateProduct().prepareData(dataEcommerce, id as string)
            if(updatedProduct){
                alert("Produto alterado com sucesso, está em analize. Pode demorar até uma semana.")
                navigate("/myAccount")
            }
            // edit
        }else{
            const createdProduct = await new createProduct().prepareData(dataEcommerce)
            if(createdProduct){
                alert("Produto adicionado com sucesso, está em analize. Pode demorar até uma semana.")
                navigate("/myAccount")
            }
        }

        function checkIfAllInputIsComplete(){
            var instComplete = false
            const keyNotIncluded = ['postID', 'quantType', 'oldValue', 'analyze', 'PIXHash', 'tag', 'cartQuant']
            
            for (const property in dataEcommerce) {
                const prop = (dataEcommerce as any)[property]
                if(!keyNotIncluded.includes(property)){
                    if(prop === undefined || prop === null || prop == ''){
                        console.log(property + ': ' +  prop)
                        instComplete = true
                    }
                }
            }
            return instComplete
        }
    }

    useEffect(() => {
        if(id){
            setIsEdit(true)
            constructPage()
        }
    },[])

    return (
        <>
            <main id="main-viewProduct">
                <section className="section-header">
                    <Header type={1} link={'/myAccount'} color={'#272727'}/>
                    <div className="container-imageProduct">
                        <label htmlFor="input-image">
                        {imageArticle === '' ? ( 
                            <>
                                <div className="set-image-product">
                                    <img className="image-set" src={IconImage} alt="icon img" />
                                    <button className="button-add-image"></button>
                                </div>
                            </>
                            ) : <img className="image-product" src={imageArticle} alt="" />}
                                <input id="input-image" type="file" accept="image/*" onChange={(e) => onImageChange(e)} />                            
                            </label>
                    </div>
                </section>
                <section className="section-informationProduct">
                    <TextareaInput className="title-product input-title-product input-product" value={dataEcommerce.title} onChange={(e) => changeInformation(e, 'title')} placeholder="Titulo do artigo" key={'input-title-product'}/>

                    <div className="box-content-value">
                        <div className="content-values">
                            <span className="text-oldValue">R$</span>
                            <InputProduct type="number" className="input-product text-oldValue" onChange={(e) => changeInformation(e, 'oldValue')} value={dataEcommerce.oldValue} placeholder="Valor de Desconto" key={'Input-old-value'} />
                        </div>


                        <div className="content-values">
                            <span className="text-value">R$</span>
                            <InputProduct type="number" className="input-product text-value" onChange={(e) => changeInformation(e, 'value')} value={dataEcommerce.value} placeholder="Valor do produto" key={'Input-value'} />         
                        </div>

                    </div>

                    <hr className="max-line"/>

                    <div className="container-informationProduct">
                        <TextareaInput className="description-product input-product txt-informationProduct" value={dataEcommerce.description} onChange={(e) => changeInformation(e, 'description')} placeholder="Descrição, aviso do seu produto" key={'input-description-product'}/>
                    </div>

                    <hr className="max-line"/>

                    <div className="container-moreInformationProduct">
                        <Input titleInput="Quantidade no estoque" onChange={(e:EventInputChange) => changeInformation(e, 'quant')} type="number" value={`${dataEcommerce.quant}`} key={'quant-estoque'} placeholder="Quantidade no estoque"/>
                        <select className="input-product" value={dataEcommerce.type} onChange={(e) => changeInformation(e, 'type')}  >
                            <option value="0" disabled>Selecionar</option>
                            <option value="1">Comida</option>
                            <option value="2">Produto</option>
                        </select>
                    </div>

                    <button className="button-addCard">Fazer Pedido</button>
                    <span className="txt-ops">Você será redirecionado à tela de pagamento</span>
                </section>
                <section className="section-moreProduct">
                    <Ads amountAds={2} link={true} automatic={true}/>
                    {[1,2].map((key) => (
                        <Loading key={key} width="100%" height="100px"/> 
                    ))}
                </section>

            </main>
            <div className="navDown-add-article">
                <button onClick={() => postProduct()} className="button-add-article"> Enviar para análize </button>
            </div>

            <Footer/>
        </>
    )
}