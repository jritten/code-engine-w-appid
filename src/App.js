import React, {useEffect, useMemo, useState} from 'react';
import logo from './logo.svg';
import AppID from 'ibmcloud-appid-js';
import './App.css';

function App() {

  const [name, setName] = useState();

  const appID = React.useMemo(() => {
    return new AppID()
  }, []);

  useEffect(() => {
    (async () => {
        try {
          await appID.init({
            clientId: 'ad6d80fb-c3f0-4165-a013-7051f4957a70',
            discoveryEndpoint: 'https://us-south.appid.cloud.ibm.com/oauth/v4/adf25e67-ae8e-4dac-8aed-722b108a9706/.well-known/openid-configuration'
          });
        } catch (e) {
          console.error(e);
        }
      })();
  });

  const handleLogin = async () => {
    try {
      const tokens = await appID.signin();
      console.log(tokens);
      setName(tokens.idTokenPayload.name);
      const userInfo = await appID.getUserInfo(tokens.accessToken);
      console.log('user info:', userInfo);
    } catch (e) {
      console.error(e);
    }
  };

  // const [errorState, setErrorState] = React.useState(false);
  // const [errorMessage, setErrorMessage] = React.useState('');
  // (async () => {
  //   try {
  //     await appID.init({
  //       clientId: '<SPA_CLIENT_ID>',
  //       discoveryEndpoint: '<WELL_KNOWN_ENDPOINT>'
  //     });
  //   } catch(e) {
  //     setErrorState(true);
  //     setErrorMessage(e.message);
  //   }
  // })();

  // const [welcomeDisplayState, setWelcomeDisplayState] = React.useState(false);
  // const [loginButtonDisplayState, setLoginButtonDisplayState] = React.useState(true);
  // const [userName, setUserName] = React.useState('');
  // const loginAction = async () => {
  //   try {
  //     const tokens = await appID.signin();
  //     setErrorState(false);
  //     setLoginButtonDisplayState(false);
  //     setWelcomeDisplayState(true);
  //     setUserName(tokens.idTokenPayload.name);
  //   } catch(e) {
  //     setErrorState(true);
  //     setErrorMessage(e.message);
  //   }
  // };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Super Cool Code Engine + App ID React App!
        </p>
        {name && <h3>Welcome Back, {name}!</h3>}
        <button onClick={handleLogin}>Login</button>
      </header>
    </div>
  );
}

export default App;
