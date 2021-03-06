import React, { Component } from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios'

class Googlean extends Component {
  render() {
    const responseGoogle = (response) => {
      const data = axios.post("http://localhost:5000/googleanalytique", {
        'data' : response
      }, 
      {
        headers:{'Content-Type' : 'application/json'}
      });
    }

    return (
      <div>
        google analytics<br/>
        <GoogleLogin
          clientId="33806124753-mpp4pn6kigavueev3clvjuqsujbg69mp.apps.googleusercontent.com"
          buttonText="login with Google"
          scope ="https://www.googleapis.com/auth/analytics.readonly"
          onSuccess ={responseGoogle}
          onFailure ={responseGoogle} />
      </div>
    );
  }
}

class Facebook extends Component {
  render() {
        const responseFacebook = (response) => {
        const data = axios.post("http://localhost:5000/facebookads", {
          'data' : response
        }, 
        {
          headers:{'Content-Type' : 'application/json'}
        });
    }
    return (
      <div>
        Facebook Login <br/>
        <FacebookLogin
          appId="2192204914365061"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook} />
      </div>
    );
  }
}

class Googleads extends Component {
  render() {
    const responseGoogle = (response) => {
      const data = axios.post("http://localhost:5000/googleads", {
        'data' : response
      }, 
      {
        headers:{'Content-Type' : 'application/json'}
      });
    }

    return (
      <div>
        Google adwords<br/>
        <GoogleLogin
          clientId="33806124753-mpp4pn6kigavueev3clvjuqsujbg69mp.apps.googleusercontent.com"
          buttonText="login with Google"
          scope ="https://www.googleapis.com/auth/adwords"
          onSuccess ={responseGoogle}
          onFailure ={responseGoogle} />
      </div>
    );
  }
}

class App extends Component {
  render(){
    return (
      <div> 
        <Googlean/>
        <Googleads/>
        <Facebook/>
      </div>
    );
  }
}

export default App;
