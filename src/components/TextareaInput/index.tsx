import {EventTextareaChange} from '../../interfaces/interfaces'

interface TextareaAticleParams{
    className: string;
    value: string;
    onChange: (e:EventTextareaChange) => void | any;
    placeholder?: string;
}

export function TextareaInput(props:TextareaAticleParams){
    return (
        <textarea {...props}/>
    )
}