import { Component } from "react";
import heartIcon from "../../images/icon/heartIcon.svg"
import './PlaylistBox.scss'

interface PlaylistParams {
    type: 'default' | 'deprecated' | 'analyze'
    title: string
    like?: boolean
    songs: object[]
    onClick: () => void
}

export default class PlaylistBox extends Component<PlaylistParams>{
    constructor(props: PlaylistParams){
        super(props)
    }

    selectStyleBoxSong(){
        switch(this.props.type){
            case 'default':
                return ''
            case 'deprecated': 
                return 'style-deprecated'
            default:
                return 'style-analyze'
        }
    }

    render(){
        return(
            <>
                <div className="container-playlistBox">
                    <span className="text-playlistBox">{this.props.title}</span>
                    <div className="container-boxSongs">
                        {this.props.songs ? this.props.songs.map((song:any, index) => (
                            <div key={`song-${this.props.type}-${song.uid}`} className={`box-song ${this.selectStyleBoxSong()}`}>
                                <span className="text-nameSong"> <b>{song.data.title} |</b> {song.data.author} </span>
                                {this.props.like?(
                                    <div className="box-like style-liked">
                                        <span className="text-like">{song.data.like}</span>
                                        <img src={heartIcon} alt="S2" />
                                    </div>
                                ):''}
                            </div>
                        )):''}
                    </div>
                </div>
            </>
        )
    }
}