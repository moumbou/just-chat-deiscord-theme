import React, { useEffect, useState } from 'react';
import AddRoomModal from './components/AddRoomModal';
import Chat from './components/Chat';
import ConnectionPage from './components/ConnectionPage';
import Rooms from './components/Rooms';
import './style/App.css';
import { selectUser, login, logout, selectToken } from './features/userSlice'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from './server/axios'

function App() {

  const [modalDisplay, setModalDisplay] = useState(false)

  const user = useSelector(selectUser)
  const token = useSelector(selectToken)
  const dispatch = useDispatch()

  useEffect(()=> {

      if(token) {
        axios.get('/', {
          headers: {
            "x-access-token": token
          }
        }).catch((err) => {
          console.log(err)
        }).then((response) => {

          const { user } = response.data
  
          dispatch(login({
            avatar: user.avatar,
            uid: user.id,
            username: user.userName,
            id: user._id,
          }))

        })
      } else {
        dispatch(logout())
      }

  }, [token, dispatch])

  return (
    <div className="App">
      {
        user ? (
          <>
            <Rooms setModalDisplay={ setModalDisplay } />
            <Chat />
            <AddRoomModal modalDisplay={ modalDisplay } setModalDisplay={ setModalDisplay }/>
          </>
        ) : <ConnectionPage />
      }
    </div>
  );
}

export default App;
