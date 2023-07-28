import { Component } from "react"
import {Link} from 'react-router-dom'
import {ItensBox} from "../components"
import ArrowIcon from "../../images/icon/ArrowIcon.svg"
import "./ScrollingItens.scss"

interface ScrollingItensParams{
    subtext?: string
    itens: object[]
    type: 'blog' | 'ecommerce'
    tagFillter?: string
    link?: boolean
    analyze?: boolean
    myAccount?: boolean;
}

export default class ScrollingItens extends Component<ScrollingItensParams>{
    constructor(props:ScrollingItensParams){
        super(props)
    }

    render(){
        return (
            <>
                <div className="container-contentCarrosel">
                    {this.props.subtext ? (<span className="text-subtext">{this.props.subtext}</span>) : ''}
                    <div className="container-leftCarossel">
                        {this.props.itens.map((item:any, index:number) => (
                            <div key={`content-key-${index}-${item.id}`}>
                                {item.id ? (
                                    <ItensBox uid={item.id} myAccount={this.props.myAccount} analyze={this.props.analyze ? this.props.analyze : false} article={{img: item.data.image, title: item.data.title, color: ((item.data.color) ? item.data.color : ''), author: ((item.data.author) ? item.data.author : ''), value: ((item.data.value) ? item.data.value : 0), oldValue: ((item.data.oldValue) ? item.data.oldValue : 0), analyze: item.data.analyze}} type={this.props.type} link={this.props.link} key={`item-key-${index}-${item.id}`} />
                                ):""}
                            </div>
                        ))}
                    </div>
                    {this.props.link ? (<Link to={`/${this.props.type}`}><div className="viewProduct"><span className="text-viewer">Visualizar mais itens</span><img src={ArrowIcon} alt="->" /></div></Link>) : ''}
                </div>
            </>
        )
    }
}