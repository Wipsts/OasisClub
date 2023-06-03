import React from 'react';
import './style.scss'

export function LoginOptions(){
    return (
        <>
            <div className="container-login-options">
                <div className="content-options">
                    <button title='Google' onClick={(e) => {}} className='button-option'><img src="" alt="" /></button>
                    <button title='Instagram' onClick={(e) => {}} className='button-option'><img src="" alt="" /></button>
                    <button title='Apple' onClick={(e) => {}} className='button-option'><img src="" alt="" /></button>
                </div>
                <span className='line-login-options'>OU</span>
            </div>
        </>
    )
}