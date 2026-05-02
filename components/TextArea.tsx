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
    <div className="w-full bg-white p-2">
      <div className="max-w-3xl mx-auto flex gap-2">
        <input 
          type="text" 
          value={message} 
          onChange={(e)=>{setMessage(e.target.value)}} 
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"/>
        <NormalButton 
          onClick={handleSend}
          className="transition"  
        >送信</NormalButton>
      </div>
    </div>
  )
}