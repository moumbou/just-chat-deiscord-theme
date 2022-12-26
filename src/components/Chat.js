import React from 'react';
import '../style/chat.css'
import ChatChannel from './ChannelComponents/ChatChannel';
import FormChannel from './ChannelComponents/FormChannel';
import HeaderChannel from './ChannelComponents/HeaderChannel';

function Chat() {
  return <div className='channels'>
      <HeaderChannel />
      <ChatChannel />
      <FormChannel />
  </div>;
}

export default Chat;
