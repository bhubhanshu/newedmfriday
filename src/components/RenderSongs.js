import React, { Component } from 'react';
import Loading from './LoadingComponent';
import { Card, CardImg, CardBody, CardTitle, Button, CardText, CardSubtitle } from 'reactstrap';

class RenderSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            btnhover: false
        };
        this.toggleHover = this.toggleHover.bind(this);
        this.togglebtnHover = this.togglebtnHover.bind(this);
    }
    toggleHover() {
        this.setState({
            hover: !this.state.hover
        });
    }
    togglebtnHover() {
        this.setState({
            btnhover: !this.state.btnhover
        });
    }
    render() {
        var cardcss = { opacity: '1', 'border-radius': '15px 15px 0px 0px' };
        var btncss = { position: 'absolute', top: '35%', 'background-color': '#000000', display: 'none', 'border-radius': '2rem' , 'font-family': 'libre', 'z-index': '0'}
        if (this.state.hover) {
            btncss.display = 'inline';
            cardcss.opacity = '0.9';
            cardcss.transition = '0.5s ease-in-out';
            btncss['z-index']='1';
        }
        if (this.state.btnhover) {
            btncss['background-color'] = 'green';
            btncss.transition = '0.2s ease-in-out';
        }
        return (
            <div className="col-6 col-md-2">
                <div className="row">
                    <Card id="card" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} >
                        <div className="row justify-content-center" >
                            <Button style={btncss} onMouseLeave={this.togglebtnHover} onMouseEnter={this.togglebtnHover}><a href={this.props.song.song_url} id="listen" target="_blank">Listen On &ensp;<i className="fa fa-spotify"></i> Spotify</a></Button>
                        </div>
                        <CardImg top src={this.props.song.img} alt={this.props.song.name} height="75%" style={cardcss} />
                        <CardBody id="cardbody">
                            <CardTitle id="songtitle" data-toggle="tooltip" data-placement="right" title={this.props.song.name}>{this.props.song.name}</CardTitle>
                            <CardSubtitle id="artist">{this.props.song.artists.map(artist => {
                                return(
                                    <a href={artist.external_urls.spotify} data-toggle="tooltip" data-placement="right" title={artist.name}>{artist.name} &nbsp;</a> 
                                )
                            })}</CardSubtitle>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}


const Songs = (props) => {
    const songs = props.songs.songs.map((song) => {
        return (
            <RenderSong song={song} />
        );
    });
    if (props.songs.isLoading) {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.songs.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{props.songs.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h3>Friday July 31st</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {songs}
                </div>
            </div>
        );
}

export default Songs;