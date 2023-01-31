import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import io from 'socket.io-client'

export interface Props {}

const socket = io('http://localhost:4000')

interface Message {
  timestamp: number
  msg: string
  sender: string
}

export default function Chat(_props: Props) {
  const [inputMsg, setInputMsg] = useState('')
  const [sender, setSender] = useState('bumblebee')
  const [lastPong, setLastPong] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])

  //@ts-ignore
  global.socket = socket

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('newMessages', setMessages)

    socket.on('pong', (msg: string) => {
      console.log('pong', msg)
      setLastPong(Date.now())
    })

    return () => {
      socket.off('connect')
      socket.off('pong')
    }
  }, [])

  function sendMessage() {
    console.log('Sending message: ', inputMsg)
    socket.emit('sendMessage', {
      sender,
      msg: inputMsg,
      timestamp: Date.now(),
    })
  }

  function sendPing() {
    socket.emit('ping')
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    if (name === 'sender') {
      setSender(value)
    } else if (name === 'message') {
      setInputMsg(value)
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div>
      <p>Time of last Pong: {lastPong}</p>
      <button onClick={sendPing}>Ping</button>
      <input
        onChange={handleChange}
        name="sender"
        value={sender}
        placeholder="Sender Name"
      />
      <input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        name="message"
        placeholder="New chat message"
      />
      <ul>
        {messages.map((msg) => (
          <li key={msg.sender + msg.timestamp}>
            {msg.sender}: {msg.msg}
          </li>
        ))}
      </ul>
    </div>
  )
}
