import {useEffect, useState, ChangeEvent, MouseEvent} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate, useParams} from 'react-router-dom'
import {Header, Ads, Footer, TextareaInput} from "../components/components"
import {logUser, createArticle, AuthorsParams, getImageOfTheData, firestore, DataAddingParams, StNb, updateArticle} from '../functions/function'
import "../style/min/viewArtigle.scss"
import IconImage from '../images/icon/IconImage.svg'

interface DataArtigleParams{
    image: any | null;
    color: string;
    title: string;
    advisor: string | boolean;
    typeWriting:StNb;
    typeText: StNb;
    matter: StNb;
    difficultyLevel: StNb;
    Orientation?: string;
    analyze?: number 
}

interface SelectAticleParams{
    className: string;
    value: string | number;
    onChange: (e:EventSelectChange) => void;
}

interface EditorParams{
    value: string;
    onChange: (newValue: string) => void
}

type EventSelectChange = ChangeEvent<HTMLSelectElement>
type EventInputChange = ChangeEvent<HTMLInputElement>
type EventTextareaChange = ChangeEvent<HTMLTextAreaElement>

function SelectArticle(props: React.PropsWithChildren<SelectAticleParams>){
    return (
        <select {...props}>
            {props.children}
        </select>
    )
}

function IncludeAds({txt, isAdd, ads, quantAds, addAds, returnedText}:{txt:string, isAdd: boolean, ads?: Array<number>, quantAds:number, addAds?: (e:MouseEvent<HTMLButtonElement>) => void, returnedText: (t:string[]) => void}){
    const indexInArray = (index:number) => {
        const is = ads?.map((key, a) => {
            return key == index
        })
        return is?.includes(true)
    }
    
    const processingAds = () => {
        let processedText = txt.split(/<ads\/>|&lt;ads\/&gt;|<br>/g);
        let newText = []
       
        for (let i = 0; i < processedText.length; i++) {
            if(i !== 0 && indexInArray(i)){
                newText.push('<ads/>')
            }
            newText.push(processedText[i])
            returnedText(newText)
        }        
        return (
            <>
                {newText?.map((tag:any, index:number) => {
                    if(tag != '<ads/>'){
                        return <div key={`content-tags-${index}`} dangerouslySetInnerHTML={{__html: tag}} />
                    }else{
                        return <Ads key={`ads-artigle-${index}`} amountAds={2} link={true} automatic={true}/>
                    }
                })}
            </>
        )
    }

    const AddButtonsAds = () => {
        let processedText = txt.split(/<br>/g);
        let newText = []
        for (let i = 0; i < processedText.length; i++) {
            if(i !== 0){
                newText.push('<buttonAds/>')
            }
            newText.push(processedText[i])
        }        

        let buttonIndex = 0
        return (
            <>
                {newText?.map((tag:any, index:number) => {
                    if(tag != '<buttonAds/>'){
                        buttonIndex++
                        return <div key={`content-tags-${index}`} dangerouslySetInnerHTML={{__html: tag}} />
                    }else{
                        return <button onClick={addAds} data-value={buttonIndex} className={`button-addAds ${indexInArray(index) ? 'style-addedAds' : ''}`}>Adicionar Publicidade {ads?.length}/{quantAds}</button>
                    }
                })}
            </>
        )
    }

    return (
        <>
            {isAdd ? (
                <>
                    {txt && (txt.includes("<br>")) ? AddButtonsAds() : <div dangerouslySetInnerHTML={{__html: txt}} />}
                </>
            ):(
                <>
                    {txt && (txt.includes("<ads/>") || txt.includes("&lt;ads/&gt;") || txt.includes("<br>")) ? processingAds() : <div dangerouslySetInnerHTML={{__html: txt}} />}
                </>
            )}        
        </>
    )
    
}

function Editor({value, onChange}:EditorParams){
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean'],
          [{ 'color': [] }, { 'background': [] }],   
          [{ 'font': [] }],
          [{ 'align': [] }],        
        ],
    }
    
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'color', 'background',
        'font', 'aling'
      ]

    return <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules}
    formats={formats} placeholder="Escreva aqui seu artigo" />;
}

function setRequireAdsByTxt(txt:string){
    let processedText = txt.split(/<br>/g);
    let newText = []
    for (let i = 0; i < processedText.length; i++) {
        if(i !== 0){
            newText.push('<buttonAds/>')
        }
        newText.push(processedText[i])
    }        

    const requireAds = newText.filter((key) => key == '<buttonAds/>').length 
    const percentual = 30;

    return requireAds <= 2 ? requireAds : Math.round(requireAds * (percentual / 100));
}

const typeWriter = ['Formal', 'Informal', 'Descontraido', 'Jovem']
const typeText = ['História', 'Informativo', 'Pesquisa', 'Entreterimento', 'Entrevista']
const matters = ['Exatas', 'Linguagens', 'Português', "Matemática", "História", "Geografia", "Filosofia", "Sociologia", "Arte", "Ciências", "Fisíca", "Quimíca", "Outras"]
const difficultyLevel = ['1/10', '2/10', '3/10', '4/10', '5/10', '6/10', '7/10', '8/10', '9/10', '10/10', 'Hard']

export default function AddArticle(){
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const [dataArtigle, setArtigle] = useState<DataArtigleParams>({image: '', color: '#1a1a1a', title: '', advisor: false, difficultyLevel: 0, matter: 'Matemática', typeText: 0, typeWriting: 0})
    const [imageArticle, setImageArticle] = useState<string>('')
    const [authors, setAuthors] = useState<AuthorsParams[]>([])
    const [txtArtigle, setTxtArtigle] = useState<string>("")

    const [newText, setNewText] = useState<string>('')
    const [addingAds, setAddingAds] = useState<boolean>(false)   
    const [countAds, setCountAds] = useState<Array<number>>([])
    const [requiredAds, setRequiredAds] = useState<number>(0)
    
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const {id} = useParams()

    const changeInformation = (e: EventInputChange|EventTextareaChange|EventSelectChange, key:string) => {
        setArtigle(prevstate => {return {...prevstate, [key]: e.target.value}})
    }

    const onImageChange = (event: EventInputChange) => {
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files)
            setArtigle(prevState => { return {...prevState, image: event?.target?.files}})
            setImageArticle(URL.createObjectURL(event.target.files[0]));
        }
    }

    const returnedText = (s:string[]) => {
        setNewText(s.join(''))
    }

    async function getUserInformation(){
        const idUser = await new logUser().getUser()
        const informationUser = await new logUser().getDataUser(idUser as string)

        if(informationUser.user && informationUser.data){
            const dataUser = informationUser.data as any

            setAuthors([{
                id: dataUser.id,
                name: dataUser.data.name,
                schoolGrade: dataUser.data.schoolGrade
            }])
        
            setLoading(false)
        }
    }

    function addAds(e:any){
        const indexButton = e.target.getAttribute("data-value")
        setCountAds(prevState => {return [...prevState, indexButton]})
    }   

    async function postArticle(){
        if(addingAds){
            if(newText){
                if(isEdit){
                    const updatePost = await new updateArticle().prepareData(id as string, requiredAds, newText, authors, dataArtigle.color, dataArtigle.difficultyLevel, dataArtigle.image, dataArtigle.matter, 1, dataArtigle.title, dataArtigle.typeText, dataArtigle.typeWriting);
    
                    console.log(updatePost)
                    if(updatePost){
                        alert("Seu artigo atualizdo, ele passará por analize, tempo máximo de 1 semana.")
                        navigate('/myAccount')
                    }
                }else{
                    const createPost = await new createArticle().prepareData(requiredAds, newText, authors, dataArtigle.color, dataArtigle.difficultyLevel, dataArtigle.image, dataArtigle.matter, 1, dataArtigle.title, dataArtigle.typeText, dataArtigle.typeWriting);
    
                    if(createPost){
                        alert("Seu artigo passará por analize, tempo máximo de 1 semana.")
                        navigate('/myAccount')
                    }
                }
            }else{
                alert("É nessesario adcionar todos os anuncios solicitados.")
            }
            // save and post
        }else{
            if(dataArtigle.title && dataArtigle.color && dataArtigle.difficultyLevel !== undefined && imageArticle  && dataArtigle.matter && dataArtigle.typeText !== undefined && dataArtigle.typeWriting && txtArtigle){
                setAddingAds(true)
                setRequiredAds(setRequireAdsByTxt(txtArtigle))
            }else{
                console.log(dataArtigle)
                console.log(imageArticle)
                console.log(txtArtigle)

                alert("Preencha todos os dados")
            }
        }
    }

    function BackPost(){
        setAddingAds(false)
        setCountAds([])
        setNewText('')
        setRequiredAds(0)
    }

    function isEditArticle():boolean{
        if(id){
            setIsEdit(true)
            return true
        }else{
            setIsEdit(false)
            return false
        }
    }

    async function createPageForEdit(){
        const dataBlog = await getImageOfTheData(await new firestore().get({bd: 'blog'}), 'blog', true);
        const artigleValue = selectArtigleById(dataBlog)
        const data = artigleValue.data as DataAddingParams

        setAuthors(data.author)
        setImageArticle(data.image)
        setTxtArtigle(data.article)
        setArtigle({Orientation:data.Orientation, image: data.image, advisor: data.advisor, color: data.color, difficultyLevel: data.difficultyLevel, matter: data.matter, title: data.title, typeText: data.typeText, typeWriting: data.typeWriting})
        
        function selectArtigleById(data:any){
            return data.filter((a:any) => a.id === id)[0]
        }
    }

    useEffect(() => {
        getUserInformation()
        if(isEditArticle()){
            createPageForEdit()
        }
    },[])

    return (
        <>
            <main id="main-viewArtigle">
                <section className="section-header">
                    <Header type={1} link={'/myAccount'} color={dataArtigle.color}/>
                    <div className="container-imageArtigle">
                        <label htmlFor="input-image">
                        {imageArticle === '' ? ( 
                            <>
                                <div className="set-image-article">
                                    <img className="image-set" src={IconImage} alt="icon img" />
                                    <button className="button-add-image"></button>
                                </div>
                            </>
                            ) : <img className="image-artile" src={imageArticle} alt="" />}
                                <input id="input-image" type="file" accept="image/*" onChange={(e) => onImageChange(e)} />                            
                            </label>
                    </div>
                </section>
                <section className="section-txts">
                    <article>
                        <TextareaInput className="title-article input-title-article input-article" value={dataArtigle.title} onChange={(e) => changeInformation(e, 'title')} placeholder="Titulo do artigo" key={'input-title-article'}/>

                        <div className="container">
                            {addingAds ? (
                                <IncludeAds 
                                    txt={txtArtigle} 
                                    isAdd={countAds.length >= requiredAds ? false : true} 
                                    ads={countAds} 
                                    addAds={(e) => addAds(e)} 
                                    quantAds={requiredAds} 
                                    returnedText={returnedText} />
                                ) : 
                                <Editor value={txtArtigle} onChange={setTxtArtigle}/>}
                        </div>
                    </article>

                    <hr className="max-line"/>

                    <div className="container-informationArticle-author">
                        {!loading && authors?.map((user, index) => (
                            <div className="box-Author" key={user.name} style={{backgroundColor:  dataArtigle.color}}>
                                <img className="iconUser" src='' alt=""/>
                                <span className="text-author">{user.name} | {user.schoolGrade}º</span>
                            </div>
                        ))}
                            

                        {dataArtigle?.advisor ? (
                            <div className="box-Author style-teacher" style={{backgroundColor: '#373737'}}>
                                <span className="text-author">{dataArtigle.advisor}</span>
                            </div>
                        ) : '' }
                    </div>

                    <hr className="min-line"/>

                    <div className="container-informationArticle">
                        <span className="text-information">Tipo de escrita: <b> 
                            <SelectArticle className="input-article select-input" value={dataArtigle.typeWriting} onChange={(e) => changeInformation(e, 'typeWriting')} key={'select-typeWriting'}>
                                {typeWriter?.map((type, index) => (
                                    <option value={index}>{type}</option>
                                ))}
                            </SelectArticle>
                        </b></span>

                        <span className="text-information">Tipo de texto: <b> <SelectArticle className="input-article select-input" value={dataArtigle.typeText} onChange={(e) => changeInformation(e, 'typeText')} key={'select-typeText'}>
                                {typeText?.map((type, index) => (
                                    <option value={index}>{type}</option>
                                ))}
                        </SelectArticle></b></span>

                        <span className="text-information">Matéria: <b> <SelectArticle className="input-article select-input" value={dataArtigle.matter} onChange={(e) => changeInformation(e, 'matter')} key={'select-matter'}>
                                {matters?.map((matter, index) => (
                                    <option value={index}>{matter}</option>
                                ))}
                        </SelectArticle></b></span>

                        <span className="text-information">Nível de dificuldade: <b> <SelectArticle className="input-article select-input" value={dataArtigle.difficultyLevel} onChange={(e) => changeInformation(e, 'difficultyLevel')} key={'select-difficultyLevel'}>
                            {difficultyLevel?.map((difficultyLevel, index) => (
                                <option value={index}>{difficultyLevel}</option>
                            ))}
                        </SelectArticle></b></span>   

                        <span className="text-information">Color: <input type="color" value={dataArtigle.color} onChange={(e) => changeInformation(e, 'color')}  className="input-article color-input" /></span>   
                    </div>
                </section>
            </main>
            <div className="navDown-add-article">
                {addingAds ? <button onClick={() => BackPost()} className="button-back-add-article"> Voltar </button> : ''}
                <button onClick={() => postArticle()} className="button-add-article"> {!addingAds ? 'Proxímo' : 'Enviar para análize'}</button>
            </div>

            <Footer/>
        </>
    )
}