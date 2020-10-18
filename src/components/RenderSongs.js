import React, { Component } from 'react';
import Loading from './LoadingComponent';
import { Card, CardImg, CardBody, CardTitle, Button, CardSubtitle } from 'reactstrap';
import { Switch } from 'react-router-dom';

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

class Songs extends Component {
    constructor(props){
        super(props);
        this.state={
            drop: false,
            artists: [],
            displaySongs: [],
            allArtists: []
        };
        this.toggleFilter=this.toggleFilter.bind(this);
        this.addFilter = this.addFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
    }
    
    toggleFilter(){
        this.setState({
            drop: !this.state.drop
        });
    }
    addFilter(artist){
        this.setState({
            artists: this.state.artists.concat(artist)
        });
    }
    removeFilter(artist){
        var index = this.state.artists.indexOf(artist);
        this.state.artists.splice(index,1);
        this.setState({
            artists: this.state.artists
        });
    }
    render() {
        this.state.displaySongs=[];
        const t = new Date().getDate() + (6 - new Date().getDay() - 1) - 7 ;
        const lastFriday = new Date();
        lastFriday.setDate(t);
        if(this.state.artists.length !== 0){
            this.props.songs.songs.map((song) => {
                const temp=song.artists;
                for(var i=0; i<temp.length; i++){
                    if(this.state.artists.indexOf(song.artists[i].name) !== -1){
                        if(this.state.displaySongs.indexOf(song) === -1){
                            this.state.displaySongs.push(song);
                        }
                        break;
                    }
                }
            });
        }
        else{
            this.state.displaySongs=this.props.songs.songs;
        }
        this.props.songs.songs.map((song) => {
            const temp=song.artists;
            for(var i=0; i<temp.length; i++){
                if(this.state.allArtists.indexOf(temp[i].name) === -1){
                    this.state.allArtists.push(temp[i].name);
                    break;
                }
            }
        });

        this.state.allArtists.sort();
        const Filter = () => {
            var filtercss = { display : 'none'};
            if(this.state.drop){
                filtercss.display='block';
            }
            return(
                <div>
                <Button onClick={this.toggleFilter} color="success">
                    Filter Songs By Artists {this.state.drop ? <i class="fa fa-angle-double-up" aria-hidden="true"></i> : <i class="fa fa-angle-double-down" aria-hidden="true"></i>}
                </Button>
                <div style={filtercss} id="filter">  
                    {this.state.allArtists.map((artist) => {
                        if(this.state.artists.indexOf(artist) !== -1){
                            return(
                                <Button id="filteritem" color="success" onClick={() => this.removeFilter(artist)}>{artist}</Button>
                            );
                        }
                        return(
                            <Button id="filteritem" color="black" onClick={() => this.addFilter(artist)}>{artist}</Button>
                        );
                    })}
                </div>
                </div>
            );
        }
        const songs = this.state.displaySongs.map((song) => {
            return (
                <RenderSong song={song} />
            );
        });
        if (this.props.songs.isLoading) {
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.songs.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4>{this.props.songs.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                            <h3>{lastFriday.toDateString()}</h3>
                        </div>
                        <div className="offset-md-3 my-5 justify-content-end">
                            <Filter />
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        {songs}
                    </div>
                </div>
            );
    }
}

export default Songs;