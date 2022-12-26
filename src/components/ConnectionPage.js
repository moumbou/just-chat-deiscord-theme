import React, { useState } from 'react';
import '../style/Stars.scss'
import Login from './ConnectionPageComponents/Login';
import Logo from './ConnectionPageComponents/Logo';
import SignUp from './ConnectionPageComponents/SignUp';
import StarsDiv from './ConnectionPageComponents/StarsDiv';
import '../style/log.style.scss'

function ConnectionPage() {

  const [isLogin, setLogPage] = useState('login')

  return <div className='connection_page'>
      <StarsDiv />
      <Logo />
      {
        isLogin === 'login' ? <Login setLogPage={ setLogPage } /> : <SignUp setLogPage={ setLogPage } />
      }
  </div>;
}

export default ConnectionPage;
