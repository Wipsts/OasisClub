/* eslint-disable @typescript-eslint/no-useless-constructor */
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import homeIcon from '../../images/icon/homeIcon.svg'
import blogIcon from '../../images/icon/blogIcon.svg'
import pcIcon from '../../images/icon/pcIcon.svg'
import songIcon from '../../images/icon/songIcon.svg'
import meIcon from '../../images/icon/meIcon.svg'

import "./NavDown.scss"

interface NavParams {
    color: string
}

export default class NavDown extends Component<NavParams> {
    constructor(props: NavParams) {
        super(props)
    }
    render(){
        return (
            <>  
                <nav className="container-navDown">
                    <Link to={"/"}><div className="box"><img src={homeIcon} alt="Home" /><span>Home</span></div></Link>
                    <Link to={"/blog"}><div className="box"><img src={blogIcon} alt="Blog" /><span>Blog</span></div></Link>
                    <Link to={"/ecommerce"}><div className="box"><img src={pcIcon} alt="E-commerce" /><span>E-commerce</span></div></Link>
                    {/* <Link to={"/song"}><div className="box"><img src={songIcon} alt="Músicas" /><span>Músicas</span></div></Link> */}
                    <Link to={"/myAccount"}><div className="box"><img src={meIcon} alt="Eu" /><span>EU</span></div></Link>
                </nav>
            </>
        )
    }
}