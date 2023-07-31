import { Component } from "react"
import {Link} from 'react-router-dom'
import {ItensBox, BoxQuestion} from "../components"
import ArrowIcon from "../../images/icon/ArrowIcon.svg"
import "./ScrollingItens.scss"

interface ScrollingItensParams{
    subtext?: string
    itens: object[]
    type: 'blog' | 'ecommerce' | 'quickStudy' | 'quiz'
    tagFillter?: string
    link?: boolean
    analyze?: boolean
    myAccount?: boolean;
    admin?: boolean;
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
                        {this.props.itens.map((item:any, index:number) => {
                            if(item.id ){
                                if(this.props.type === 'ecommerce' || this.props.type === 'blog'){
                                    return <ItensBox uid={item.id} admin={this.props.admin} myAccount={this.props.myAccount} analyze={this.props.analyze ? this.props.analyze : false} article={{img: item.data.image, title: item.data.title, color: ((item.data.color) ? item.data.color : ''), author: ((item.data.author) ? item.data.author : ''), value: ((item.data.value) ? item.data.value : 0), oldValue: ((item.data.oldValue) ? item.data.oldValue : 0), analyze: item.data.analyze}} type={this.props.type} link={this.props.link} key={`item-key-${index}-${item.id}`} />
                                }else{
                                    return <BoxQuestion key={item.id} admin={this.props.admin} id={item.id} color={item.data.color} type={item.data.type} matter={item.data.matter} title={item.data.title} time={item.data.time} imageBackground={item.data.image}/>
                                }
                            }
                        })}
                    </div>
                    {this.props.link ? (<Link to={`/${this.props.type}`}><div className="viewProduct"><span className="text-viewer">Visualizar mais itens</span><img src={ArrowIcon} alt="->" /></div></Link>) : ''}
                </div>
            </>
        )
    }
}
