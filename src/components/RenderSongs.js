import React, { Component } from 'react';
import Loading from './LoadingComponent';
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';

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
        var cardcss = { opacity: '1' };
        var btncss = { position: 'absolute', top: '35%', 'background-color': '#000000', display: 'none', 'border-radius': '2rem' }
        if (this.state.hover) {
            btncss.display = 'inline';
            cardcss.opacity = '0.4';
            cardcss.transition = '0.5s ease-in-out';
        }
        if (this.state.btnhover) {
            btncss['background-color'] = 'green';
            btncss.transition = '0.2s ease-in-out';
        }
        return (
            <div className="col-6 col-md-2">
                <Card id="card" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} >
                    <CardImg top src={this.props.song.img} alt={this.props.song.name} height="75%" style={cardcss} />
                    <CardBody>
                        <CardTitle id="songtitle">{this.props.song.name}</CardTitle>
                        <Button style={btncss} onMouseLeave={this.togglebtnHover} onMouseEnter={this.togglebtnHover}><a href={this.props.song.song_url} id="listen" target="_blank">Listen On &ensp;<i className="fa fa-spotify"></i> Spotify</a></Button>
                    </CardBody>
                </Card>
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
                        <h3>Friday July 10th</h3>
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