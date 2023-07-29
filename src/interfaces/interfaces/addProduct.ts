import {ChangeEvent} from 'react'

export interface ObjectProductParams{
    PIXHash: string;
    analyze: number;
    cartQuant: number;
    description: string;
    image: string | any;
    oldValue: string; 
    postID: string;
    quant: number;
    quantType: boolean;
    tag: string;
    title: string;
    type: number;
    value: string;
}


export interface InputProductParams{
    className: string;
    value: string | number;
    type?: string;
    onChange: (e: EventInputChange) => void | any
    placeholder?: string;
}

export type EventSelectChange = ChangeEvent<HTMLSelectElement>
export type EventInputChange = ChangeEvent<HTMLInputElement>
export type EventTextareaChange = ChangeEvent<HTMLTextAreaElement>