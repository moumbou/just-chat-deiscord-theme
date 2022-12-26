import { Button, Link } from '@mui/material';
import React, { useState } from 'react';
import { BiLogIn } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { setToken } from '../../features/userSlice';
import axios from '../../server/axios';

function Login({ setLogPage }) {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const submitHandler = async (e) => {
      e.preventDefault()
      const res = await axios.post('/login', {
        userName,
        password
      }).catch((err) => {
        console.log(err)
      })

      if(!res) return
      const data = res.data
      if(data.auth) {
        localStorage.setItem('token', data.token)
        dispatch(setToken(data.token))
      }
    }

  return <div className='log_div'>
      <div className='log_header'>
        <span>LogIn</span>
      </div>
      <form className="log_body" onSubmit={submitHandler}>
        <div className="input_groupe">
            <input type="text" className={userName ? 'valid_input' : ''} value={userName} onChange={(e) => setUserName(e.target.value)}/>
            <label className={userName ? 'valid_input_label' : ''} >User Name</label>
        </div>
        <div className="input_groupe">
            <input type="password" className={password ? 'valid_input' : ''} value={password} onChange={(e) => setPassword(e.target.value)}/>
            <label className={password ? 'valid_input_label' : ''}>Password</label>
        </div>
        <Link onClick={() => setLogPage('signup')}>Create an account ?</Link>
        <Button type='submit' className='log_button'>
            <span>Login</span>
            <BiLogIn size={20}/>
        </Button>
      </form>
  </div>;
}

export default Login;
