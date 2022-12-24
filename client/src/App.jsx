import io from 'socket.io-client';
import { useEffect, useState } from 'react';
// now we need to give the connection from front end to the back end
const socket = io.connect('http://localhost:3001');
// now we can use this socket for emit or listern the the events

function App() {
  // state for setting the message send
  const [message, setMessage] = useState('');
  const [recivedMessage, setRecivedMessage] = useState('');

  // function which trigger on the sending message
  const sendMessage = () => {
    console.log(message);
    console.log('button clicked');
    // emiting an action with a action name
    // ! imp the state name will like a key and the value is like the actual message
    socket.emit('send_message', { message });
  };

  useEffect(() => {
    //* the beauty is that  this use efffect will trigger on each change in the socket as we given as dep in use effect
    console.log('user effect working');
    // this is listening the recieve_message and getting the data
    socket.on('recive_message', (data) => {
      console.log(data);
      // alert(data.message);
      setRecivedMessage(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send message</button>
      <h1>Resived Message : {recivedMessage && recivedMessage}</h1>
    </div>
  );
}

export default App;
