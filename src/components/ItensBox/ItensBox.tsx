import { Component} from 'react'
import {Link} from 'react-router-dom'
import "./ItensBox.scss"

interface ScrollingItensParams{
    article: {img: string, title: string, color?: string, author?: string | object[], value?: number, oldValue?: number, analyze: number}
    type: 'blog' | 'ecommerce'
    link?: boolean
    key: string
    analyze: boolean
    myAccount?: boolean;
    uid: string
}
interface ArtigleInformationParams{
    informationAuthor: object[] | any
    color: any,
}
interface EcommerceInformationParams{
    value: number | any
    oldValue: number | any
}

const TextColor = (hex:string):string => {
    if(hex){
        let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });
        let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) as any
        rgb = (rgb ? { r: parseInt(rgb[1], 16), g: parseInt(rgb[2], 16), b: parseInt(rgb[3], 16) } : { r: 0, g: 0, b: 0 });
        let returned = '#' + (Math.round(((parseInt(rgb.r) * 299) + (parseInt(rgb.g) * 587) + (parseInt(rgb.b) * 114)) /1000) > 150 ? "1a1a1a" : "fff" );
        return returned
    }else{
        return "#fff"
    }
}

export default class ItensBox extends Component<ScrollingItensParams> {
    constructor(props:ScrollingItensParams){
        super(props)
    }

    ArtigleInformation(props:ArtigleInformationParams){
        return (
            <>
                <div className="container-informationArtigle">
                    {props.informationAuthor ? props.informationAuthor.map((author:any, index:number) => (
                        <div key={`author-${index}`} className="box-Author" style={{backgroundColor: props.color}}>
                            <img className="iconUser" src={author.icon} alt=""/>
                            <span className="text-author" style={{color: TextColor(props.color) }}>{author.name} | {author.schoolGrade}</span>
                        </div>
                    )) : ''}
                </div>
            </>
        )
    }

    EcommerceInformation(props:EcommerceInformationParams){
        return (
            <>
                <div className="container-informationEcommerce">
                    {props.oldValue !== 0 ? (<span className="text-oldValue">R$ {props.oldValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>) : ''}
                    <span className="text-value">R$ {props.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                </div>
            </>
        )
    }

    createLink(){
        let baseLink = (this.props.type === 'blog' ? 'viewArticle' : 'viewProduct')
        return `/${baseLink}/${this.props.uid}`
    }

    showAndHide(){
        if(this.props.myAccount){
            return true
        }else{
            if(this.props.article.analyze == 0 || this.props.article.analyze == 1){
                return false
            }else{
                return true
            }
        }
    }

    render(){
        const styleAnalyze = ['style-red', 'style-yellow', 'style-green']

        return(
            <>
                {this.showAndHide() ? (
                    <Link to={this.createLink()}>
                        <div key={this.props.key} className={`box-item ${this.props.type === 'blog' ? 'style-blog' : 'style-ecommerce'}`}>
                            {this.props.analyze ? (<div className={`box-analyze ${styleAnalyze[this.props.article.analyze]}`}></div>) : ''}
                            <img src={this.props.article.img} alt="" className="img-backgroundItem" />
                            <div className="content-informationItem">
                                <span className="text-titleItem">{this.props.article.title}</span>
                                {this.props.type === 'blog' ? <this.ArtigleInformation color={this.props.article.color} informationAuthor={this.props.article.author}/> : <this.EcommerceInformation value={this.props.article.value} oldValue={this.props.article.oldValue}/>}
                            </div>
                        </div>
                    </Link>
                ) : ''}
            </>
        )
    }
}