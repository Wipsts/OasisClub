/* eslint-disable @typescript-eslint/no-useless-constructor */
import React, { Component } from 'react';
import {changeAdsSelect, constructAds} from './function.ads'
import {Loading} from '../components'
import "./Ads.scss"

interface PropsAdsParams {
    amountAds: number,
    link?: boolean
    automatic?: boolean
}
interface ButtonPositionParams{
    amountAds: number
    position: number
}
interface objectAdsParams{
    img: string, title: string, describe: string, website: string
}
interface IsStateAds{
    ads: objectAdsParams[]
    adsSelect: number,
    loading: boolean
}

export default class Ads extends Component<PropsAdsParams,IsStateAds> {
    constructor(props: PropsAdsParams) {
        super(props)
        this.state = {
            ads: [{img: 'https://th.bing.com/th/id/R.7cf06e914ed6a1bb708676441060e329?rik=yHImMIIGWb7xWA&pid=ImgRaw&r=0', title: 'Agrosmart', describe: 'A Agrosmart atua no monitoramento de plantações fornecendo informações em tempo real aos agricultores, de forma a ajudar nas tomadas de decisão para garantir o melhor proveito de cada safra. Unindo tecnologia à agricultura, a startup também ajuda a tornar a produção agrícola mais sustentável', website: ''}, {img: 'https://tribalismo.com.br/wp-content/webp-express/webp-images/uploads/2022/11/800x415_impactotribal_tribalismo.jpg.webp', title: 'Tribalismo', describe: 'As canecas de alumínio personalizadas pela Tribalismo tem grande durabilidade pela qualidade da matéria prima, acabamento e detalhes da personalização. Já os tirantes, trabalhamos com o melhor material do mercado, sendo 100% poliéster acetinado e com 40mm de largura.', website: ''}],
            adsSelect: 0,
            loading: true
        }
    }

    ButtonPositionComponent(props:ButtonPositionParams){
        var buttonPosition = []
        for(let i = 0; i < props.amountAds; i++){
            buttonPosition.push(<button key={`buttonPositonAd-${i}`} className={`button-positionAd ${ i === props.position ? 'positionAd-select' : ''}`}></button>)
        }
        return (
            <>
                {buttonPosition}
            </>
        )
    }

    
    componentDidMount(){
        this.builtAds()
     
        setInterval(() => {
            this.changeAdsPosition()
        },1000*10)
    }

    async builtAds(){
        const ads = await new constructAds().construct(this.props.amountAds)
        this.setState({ads: treatData(ads), loading: false})

        function treatData(data: any) {
            return data?.map((data:any) => data.data)
        }
    }

    changeAdsPosition(){
        const newPosition = new changeAdsSelect().changePosition(this.state.ads, this.state.adsSelect)
        this.setState({adsSelect: newPosition})
    }

    render(){
        const ads = this.state.ads
        const adsSelect = this.state.adsSelect

        return (
            <>
                <div className="container-Ads">
                    {this.state.loading ? (<Loading height='300px'/>):(
                        <>
                            {ads[adsSelect] ? (
                                <>
                                    <span className='text-ads'>Publicidade</span>
                                    <div className="box-imageAds">
                                        <a target='_blank' rel="noreferrer" href={ads[adsSelect].website}><img src={ads[adsSelect].img} alt="" /></a>
                                    </div>
                                    <div className="container-loadAds">
                                        {<this.ButtonPositionComponent position={adsSelect} amountAds={this.props.amountAds}/>}
                                    </div>  
                                </>
                            ):''}
                        </>
                    )}
                </div>
            </>
        )
    }
}

export class BigAds extends Component<PropsAdsParams,IsStateAds> {
    constructor(props: PropsAdsParams) {
        super(props)
        this.state = {
            ads: [{img: 'https://th.bing.com/th/id/R.7cf06e914ed6a1bb708676441060e329?rik=yHImMIIGWb7xWA&pid=ImgRaw&r=0', title: 'Agrosmart', describe: 'A Agrosmart atua no monitoramento de plantações fornecendo informações em tempo real aos agricultores, de forma a ajudar nas tomadas de decisão para garantir o melhor proveito de cada safra. Unindo tecnologia à agricultura, a startup também ajuda a tornar a produção agrícola mais sustentável', website: ''}, {img: 'https://tribalismo.com.br/wp-content/webp-express/webp-images/uploads/2022/11/800x415_impactotribal_tribalismo.jpg.webp', title: 'Tribalismo', describe: 'As canecas de alumínio personalizadas pela Tribalismo tem grande durabilidade pela qualidade da matéria prima, acabamento e detalhes da personalização. Já os tirantes, trabalhamos com o melhor material do mercado, sendo 100% poliéster acetinado e com 40mm de largura.', website: ''}],
            adsSelect: 0,
            loading: true
        }
    }

    ButtonPositionComponent(props:ButtonPositionParams){
        var buttonPosition = []
        for(let i = 0; i < props.amountAds; i++){
            buttonPosition.push(<button key={`buttonPositonAd-${i}`} className={`button-positionAd ${ i === props.position ? 'positionAd-select' : ''}`}></button>)
        }
        return (
            <>
                {buttonPosition}
            </>
        )
    }

    componentDidMount(){
        this.builtAds()
     
        setInterval(() => {
            this.changeAdsPosition()
        },1000*10)
    }

    async builtAds(){
        const ads = await new constructAds().construct(this.props.amountAds)
        this.setState({ads: treatData(ads), loading: false})

        function treatData(data: any) {
            return data?.map((data:any) => data.data)
        }
    }

    changeAdsPosition(){
        const newPosition = new changeAdsSelect().changePosition(this.state.ads, this.state.adsSelect)
        this.setState({adsSelect: newPosition})
    }

    render(){
        const ads = this.state.ads
        const adsSelect = this.state.adsSelect
        return (
            <>
                <div className="container-bigAds">
                    {this.state.loading ? (<Loading height='200px'/>):(<>
                        {ads[adsSelect] ? (
                            <>
                                <div className="box-imageAds">
                                    <a target='_blank' rel="noreferrer" href={ads[adsSelect].website}><img src={ads[adsSelect].img} alt="" /></a>
                                    <div className="container-loadAds">
                                        {<this.ButtonPositionComponent position={adsSelect} amountAds={this.props.amountAds}/>}
                                    </div>  
                                </div>
                                <div className="box-descriptionAds">
                                    <span className='title-ads'>{ads[adsSelect].title}</span>
                                    <p className='text-ads'>{ads[adsSelect].describe}</p>
                                </div>
                            </>
                        ):''}
                    </>)}
                </div>
            </>
        )
    }
}
