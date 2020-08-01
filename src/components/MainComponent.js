import React, { Component } from 'react';
import Songs from './RenderSongs'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSongs } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      songs: state.songs
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchSongs: () => {dispatch(fetchSongs())}
  });


function Header() {
    return (
        <div className="container-fluid p-3" id="heading">
            <div className="row justify-content-center">
                <h1>New EDM Friday</h1>
            </div>
        </div>
    );
}

function Footer() {
    return(
        <div className="footer mt-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="text-center">
                            <h5>Socials</h5>
                            <a className="fa fa-facebook" href="https://www.facebook.com/bhubhanshu.gurjar"></a> &nbsp;
                            <a className="fa fa-linkedin" href="https://www.linkedin.com/in/bhubhanshu/"></a> &nbsp;
                            <a className="fa fa-github" href="https://www.github.com/bhubhanshu/"></a> &nbsp;
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <h5>© Copyright 2020 Bhubhanshu Gurjar</h5>
                    </div>
                </div>
                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <h5>Built using ReactJS</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

class Main extends Component {
    componentDidMount() {
        this.props.fetchSongs();
    }
    render() {
        return( 
            <div id="body">
                <Header />
                <Songs songs={this.props.songs} />
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));