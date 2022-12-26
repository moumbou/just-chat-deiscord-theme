import React, { useState } from 'react';
import { BiSend } from 'react-icons/bi'
import { MdOutlineDelete } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { select_channel_id } from '../../features/appSlice';
import { selectToken } from '../../features/userSlice';
import axios from '../../server/axios'

function FormChannel() {

  const token = useSelector(selectToken)
  const channel_id = useSelector(select_channel_id)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!message || !channel_id) return

    axios({
      method: 'POST',
      url: '/add/message',
      headers: {
        "x-access-token": token
      },
      data: {
        message,
        channel_id
      }
    }).then((res) => {
      setMessage('')
    }).catch((err) => {
      console.log(err)
    })
  }

  const [message, setMessage] = useState('')

  return <div className='form_channel'>
    <form onSubmit={handleSubmit}>
      <MdOutlineDelete size={25} className="delete_message" onClick={() => setMessage('') } />
      <input type="text" placeholder="type your message here" value={message} onChange={(e) => setMessage(e.target.value)}/>
      <BiSend size={30} className='submit_button' onClick={(e) => {
        const submit = document.getElementById('add_message')
        submit.click()
      }} />
      <button type='submit' id='add_message' />
    </form>
  </div>;
}

export default FormChannel;
