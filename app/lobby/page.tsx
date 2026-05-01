'use client'
import TextArea from "@/components/TextArea";
import { getAllMessages, saveMessage } from "@/lib/db";
import { useEffect, useState } from "react";

type Message = {
  id?: number;
  userName: string;
  text: string;
  timestamp: number;
};

export default function Lobby(){
  const [messages, setMessages] = useState<Message[]|undefined>([]);

  const load = async () => {
    const data = await getAllMessages();
    setMessages(data);
  };
  // 起動時にDBからこれまでのログを読み込む
  useEffect(() => {
    load();
  }, []);
  const handleSend = async (text: string) => {
    // ここで現在の人格（お前か、主人格か、JKか）を決める
    const currentUserName = "実装担当"; 
    
    // DBに保存！
    await saveMessage(currentUserName, text);
    load()
    console.log("DBに書いたぞ！");
  };
  return (
    <div>
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages?.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.userName === "実装担当" ? "items-end" : "items-start"}`}>
            <span className="text-xs text-zinc-500">{msg.userName}</span>
            <div className={`p-2 rounded-lg max-w-[70%] ${msg.userName === "実装担当" ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-200"}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <TextArea onSend={handleSend}/>
    </div>
  )
}