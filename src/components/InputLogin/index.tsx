import React from 'react';
import {EventInputChange} from '../../interfaces/interfaces'
import './style.scss'

interface propsInputParams{
    name: string;
    value: string | number;
    type: string;
    onchange: (e:EventInputChange) => {} | any;
    placeholder?: string;
}

export function InputLogin({name, value, type, onchange, placeholder}:propsInputParams){
    return (
        <>
            <div className="container-input">
                <span className='text-name-input'>{name}</span>
                <input type={type} onChange={onchange} placeholder={placeholder} value={value} className='input-login-input'/>
            </div>
        </>
    )
}
