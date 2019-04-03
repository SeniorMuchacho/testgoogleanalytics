import React, { Component } from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';
import axios from 'axios'


class App extends Component {
  render() {
    const responseGoogle = (response) => {
      const data = axios.post("http://localhost:5000/test", {
        'data' : response
      }, 
      {
        headers:{'Content-Type' : 'application/json'}
      });
    }
    return (
      <div className="App">
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

export default App;
