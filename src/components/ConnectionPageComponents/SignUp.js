import { Avatar, Button, Link } from '@mui/material';
import React, { useState } from 'react';
import { BiLogIn } from 'react-icons/bi';
import { FaHandPointRight } from 'react-icons/fa'
import AvatarContainer from './AvatarContainer';
import '../../style/Avatars.scss'
import axios from '../../server/axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../../features/userSlice';

function SignUp({ setLogPage }) {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [profilePic, setProfilePic] = useState('bigcat.png')
    const [avatarPickerShown, setAvatarPickerDisplay] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!userName || !password) return
        axios.post('/singup', {
            userName,
            password,
            avatar: profilePic
        }).then((res) => {
            const { auth, token } = res.data
            if(!auth) return

            localStorage.setItem('token', token)
            dispatch(setToken(token))
        }).catch((err) => {
            console.log(err)
        })
    }

  return <div className='log_div'>
      <div className="log_header">
          <span>Sign Up</span>
      </div>
      <form onSubmit={handleSubmit} className="log_body">
          <div className="input_groupe">
              <input type="text" className={userName ? 'valid_input' : ''} value={userName} onChange={(e) => setUserName(e.target.value)} />
              <label className={userName ? 'valid_input_label' : ''} >User Name</label>
          </div>
          <div className="input_groupe">
              <input type="password" className={password ? 'valid_input' : ''} value={password} onChange={(e) => setPassword(e.target.value)} />
              <label className={password ? 'valid_input_label' : ''} >Password</label>
          </div>
          <div className="avatar_section">
              <span>Choose your avatar here</span>
              <FaHandPointRight size={15} />
              <div className="avatars_box">
                <Avatar 
                    className='avatar_picker' 
                    src={require(`../../Imgs/avatars/${profilePic}`)} 
                    onClick={()=> {
                        if(!avatarPickerShown) return setAvatarPickerDisplay(true)
                        setAvatarPickerDisplay(false)
                    } }
                />
                <AvatarContainer setAvatarPickerDisplay={ setAvatarPickerDisplay } avatarPickerShown={ avatarPickerShown } setProfilePic={ setProfilePic } />
              </div>
          </div>
          <Link onClick={() => setLogPage('login')} >Already have an account ?</Link>
          <Button type='submit' className='log_button'>
              <span>sign up</span>
              <BiLogIn size={20}/>
          </Button>
      </form>
  </div>;
}

export default SignUp;
