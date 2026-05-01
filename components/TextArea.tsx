'use client'
import { useState } from "react"
import NormalButton from "./NormalButton"
type Props={
  onSend:(text:string)=>void
}
export default function TextArea({onSend}:Props){
  const [message,setMessage]=useState<string>('')
  const handleSend = () => {
    if (!message.trim()) return; // 空文字送信ガード
    onSend(message); // 親（page.tsx）にテキストを渡す
    setMessage("");  // 入力欄をクリア
  };
  return (
    <div>
      <input type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}} className="border-2 "/>
      <NormalButton onClick={handleSend}>送信</NormalButton>
    </div>
  )
}