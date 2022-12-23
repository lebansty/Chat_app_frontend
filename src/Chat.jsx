import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({socket,userName,room}) {
    const [currentMessege,setCurrentMessege] =useState('')
    const [messageList, setMessageList] = useState([]);

let sendMessege=async()=>{
    if(currentMessege !==""){
        const messageData={
            room:room,
            author:userName,
            messege:currentMessege,
            time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
        }
        await socket.emit("send_messege",messageData)
        setMessageList((list) => [...list, messageData]);
        setCurrentMessege('');
    }
}

useEffect(()=>{
socket.on("recieve_messege",(data)=>{
    setMessageList((list) => [...list, data]);
})
},[socket])


  return (
    <div className='chat-window'>
        <div className="chat-header">
            <p>Live chat</p>
        </div>
        <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={userName === messageContent.author ? "other" : "you"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.messege}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input type="text"onKeyUp={(e)=>{e.key==="Enter"&& sendMessege()}} value={currentMessege} onChange={(e)=>{setCurrentMessege(e.target.value)}} placeholder='type here...' />
            <button  onClick={sendMessege}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat