import { Component} from 'react'
import './Input.scss'

interface propsInputParams{
    type: string
    value: string | ''
    onChange: any
    placeholder?: string
    titleInput: string
    disabled?: boolean
}

export default class Input extends Component<propsInputParams>{
    constructor(props:propsInputParams){
        super(props)
    }
    render(){
        return (
            <>
                <div className="container-input">
                    <span className='title-input'>{this.props.titleInput}</span>
                    <input type={this.props.type} disabled={this.props.disabled} placeholder={this.props.placeholder} className='input' value={this.props.value} onChange={this.props.onChange}/>
                </div>
            </>
        )
    }
}