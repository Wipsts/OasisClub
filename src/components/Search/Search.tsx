import {Component} from 'react';
import seachIcon from "../../images/icon/SeachIcon.svg"
import "./Search.scss"

interface SearchParams {
    type: 'blog' | 'ecommerce' | 'song'
    onClick: () => void
}

interface IState {
    searchText: string,
}

export default class Search extends Component<SearchParams,IState> {
    constructor(props:SearchParams){
        super(props);
        this.state = {
            searchText: ""
        }
    }

    changeSearchText(value:string){
        this.setState({searchText: value})
    }

    render(){
        return (
            <>
                <div className="container-search">
                    <button className='button-search'><img src={seachIcon} alt="" /></button>
                    <input type="text" placeholder='Pesquisar' className='input-search' value={this.state.searchText} onChange={(e) => this.changeSearchText(e.target.value)}/>
                </div>
            </>
        )
    }
}