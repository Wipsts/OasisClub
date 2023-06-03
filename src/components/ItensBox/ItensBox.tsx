import { Component} from 'react'
import {Link} from 'react-router-dom'
import "./ItensBox.scss"

interface ScrollingItensParams{
    article: {img: string, title: string, color?: string, author?: string | object[], value?: number, oldValue?: number, analyze: number}
    type: 'blog' | 'ecommerce'
    link?: boolean
    key: string
    analyze: boolean
    uid: string
}
interface ArtigleInformationParams{
    informationAuthor: object[] | any
    color: string | undefined
}
interface EcommerceInformationParams{
    value: number | any
    oldValue: number | any
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
                            <span className="text-author">{author.name} | {author.schoolGrade}</span>
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
                    {props.oldValue !== 0 ? (<span className="text-oldValue">{props.oldValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>) : ''}
                    <span className="text-value">{props.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                </div>
            </>
        )
    }

    createLink(){
        let baseLink = (this.props.type === 'blog' ? 'viewArticle' : 'viewProduct')
        return `/${baseLink}/${this.props.uid}`
    }

    render(){
        const styleAnalyze = ['style-red', 'style-yellow', 'style-green']

        return(
            <>
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
            </>
        )
    }
}