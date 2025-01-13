import React from 'react';
import Chat from './Chat';
import './App.css';

function App() {


  return (
    <div>
    <center>
    <div className="title-box">
    <img style={{margin: '10px'}} width="48" height="48" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-chat-communication-media-flaticons-flat-flat-icons-4.png" alt="external-chat-communication-media-flaticons-flat-flat-icons-4"/>
      <h1 style={{ color: 'gold', webkitTextStroke: '1px gold', letterSpacing: '2px' }}>Byte</h1> 
      <h1 style={{ color: 'black', webkitTextStroke: '1px black', letterSpacing: '2px' }}>Talk </h1> 
      <h1 style={{ color: 'silver', webkitTextStroke: '1px silver', letterSpacing: '1px' }}> - Realtime Chat</h1> 
      </div>
      </center>

      <Chat />

      <div style={{margin: '20px', paddingLeft: '20px',  width: '490px', height: '120px', backgroundColor: 'gold',  border: 'solid 3px silver', borderRadius: '20px', boxShadow: '0 0 40px black'}}>
          <h2 style={{color: 'red'}}>Instruction :</h2>
        <center>
          <p style={{fontWeight: 'bolder', fontSize: '20px', color: 'black'}}>
            Click this link to connect to the chat room : <a href="http://localhost:3000/">Link</a>
          </p>
        </center>
      </div>

    </div>
    
     
  );
}

export default App;
