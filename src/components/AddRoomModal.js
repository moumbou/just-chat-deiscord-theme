import React, { useState } from 'react';
import '../style/AddRoomModal.css'
import { AiFillFolderAdd } from 'react-icons/ai'
import { BiAddToQueue } from 'react-icons/bi'
import axios from '../server/axios'
import { useSelector } from 'react-redux';
import { selectToken } from '../features/userSlice';

function AddRoomModal({ modalDisplay, setModalDisplay }) {

    const [roomName, setRoomName] = useState('')
    const token = useSelector(selectToken)

    const handleSubmit = (e) => {
        e.preventDefault()
        const roomNameWithoutBlankSpace = roomName.replace(/\s/g, "")
        console.log(console.log('add room trigger'))
        if(!roomNameWithoutBlankSpace) return setRoomName('')

        axios({
          method: 'POST',
          url: '/add/channel',
          headers: {
            "x-access-token": token
          },
          data: {
            channelName: roomName
          }
        }).then((res) => {

          setRoomName('')
          setModalDisplay(false)

        }).catch((err) => {
          console.log(err)
        })

    }

  return <div className={ modalDisplay ? 'add_room_modal add_room_modal_show' : 'add_room_modal'} style={{display: modalDisplay ? 'flex' : 'none'}} onMouseDown={(e) => {
      const className = e.target.className
      if(!className.includes('add_room_modal_show')) return
        
      setRoomName('')
      setModalDisplay(false)
    }}>
      <div className="add_room_modal_content">
          <div className='add_room_modal_content_title'>
            <p>add room</p>       
            <AiFillFolderAdd size={20}/>
          </div>
          <form onSubmit={handleSubmit} className="add_room_modal_content_body">
              <p>#Enter the name of the new room</p>
              <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
              <button type='submit'>
                  <span>register</span>
                  <BiAddToQueue />
              </button>
          </form>
      </div>     
  </div>;
}

export default AddRoomModal;
