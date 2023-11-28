import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcone from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { useEffect, useRef, useState } from 'react';
import { sendMsgToOpenAI } from './openai';


function App() {

  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hey, I am ChatGPT, how can I help you today?",
      isBot: true,
    }
  ]);

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages]);

  const handleSend = async () => {  // Function to handle sending a user message to OpenAI API and updating state.
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      { text, isBot: false }
    ])
    const res = await sendMsgToOpenAI(input);        // Send predefined query to OpenAI API.
    setMessages([                 // Update state with predefined query and OpenAI response.
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true }
    ]);
  }

  const handleEnter = async (e) => {     // Function to handle user pressing the 'Enter' key to send a message.
    if(e.key==='Enter') await handleSend();
  }

  const handleQery = async (e) => {       // Function to handle predefined queries triggered by clicking on query buttons.
    const text = e.target.value;
    setMessages([
      ...messages,
      { text, isBot: false }
    ])
    const res = await sendMsgToOpenAI(input);   // Send user message to OpenAI API.
    setMessages([     // Update state with user message and OpenAI response.
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true }
    ]);
  }

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo"/><span className="brand">ChatGPT</span>
          </div>
          <button className="midBtn" onClick={() => {window.location.reload()}}><img src={addBtn} alt="new chat" className="addBtn"/>New Chat</button> 
          <div className="upperSideBottom">
            <button className="query" onClick={handleQery} value={"What is Programming ?"}><img src={msgIcone} alt="Query"/>What is Programming ?</button>
            <button className="query" onClick={handleQery} value={"How to use an API ?"}><img src={msgIcone} alt="Query"/>How to use an API ?</button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="Home" className="listItemsImg"/>Home</div>
          <div className="listItems"><img src={saved} alt="Saved" className="listItemsImg"/>Saved</div>
          <div className="listItems"><img src={rocket} alt="Upgrade" className="listItemsImg"/>Upgrade to Pro</div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) => 
              <div key={i} className={message.isBot?"chat bot":"chat"}>
                <img className="chatimg" src={message.isBot? gptImgLogo : userIcon} alt=""/><p className="txt">{message.text}</p>
              </div>
          )}
          <div ref={msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder='Send a massage' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/><button className="send" onClick={handleSend}><img src={sendBtn} alt="Send"/></button>
          </div>
          <p>Chat GPT may produce inaccurate information about people, places, or facts. ChatGPT August 20 Version.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
