import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './chatcomponents/ChatFeed';
import LoginForm from './chatcomponents/LoginForm';
import './style.css';

const projectID = 'ab278817-849f-4918-94d5-5a10d646a517';

const Chatroom = () => {
  if (!localStorage.getItem('username')) return <LoginForm />;

  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  );
};

// infinite scroll, logout, more customizations...

export default Chatroom;
