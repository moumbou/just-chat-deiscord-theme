import React from 'react';
import logo from '../../Imgs/Logo/big-cat-logo.png'
import '../../style/logo.scss'

function Logo() {
  return <div className='logo_big_cat'>
      <img onClick={() => window.open('https://moumbou.herokuapp.com/', '_blank')} src={logo} alt="logo" />
  </div>;
}

export default Logo;
