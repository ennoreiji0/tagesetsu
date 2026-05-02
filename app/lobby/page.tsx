'use client'
import TextArea from "@/components/TextArea";
import { db } from "@/lib/db";
import { useEffect, useState } from "react";
import { Message } from "@/lib/types";
import { useLiveQuery } from "dexie-react-hooks";
import Fukidashi from "@/components/Fukidashi";

export default function Lobby(){
  const personas = useLiveQuery(() => db.personas.toArray());
  const personaMap = new Map(personas?.map(p => [p.id, p.name]));
  const messages = useLiveQuery(() => 
    db.messages.orderBy('timestamp').toArray()
  );
  const [activePersonaId,setActivePersonaId]=useState<number|undefined>(undefined)
  const handleSend = async (text: string) => {
    // ここで現在の人格（お前か、主人格か、JKか）を決める

    
    // DBに保存！
    await db.messages.add({
      senderId:activePersonaId,
      content:text,
      timestamp:Date.now()
    })
    console.log("DBに書いたぞ！");
  };

  return(
  <div className="flex flex-col h-screen overflow-hidden">

      {/* メッセージ表示エリア：ここだけがスクロールする */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages?.map((msg) => 
          <div key={msg.id}>
            <Fukidashi
              nowUserId={5}
              content={msg.content}
              username={personaMap.get(msg.senderId) || '名無し'}
              postUserId={msg.senderId}
            />
          </div>
        )}
      </div>

      {/* 下部に固定するエリア */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-3xl mx-auto p-2">
            
          {/* 人格選択ボタン（ここに入れる！） */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {personas?.map(p => (
              <button 
                key={p.id}
                onClick={() => p.id && setActivePersonaId(p.id)}
                style={{ backgroundColor: activePersonaId === p.id ? p.color : '#e5e7eb' }}
                className="px-3 py-1 rounded-full text-xs text-white whitespace-nowrap"
              >
                {p.name}
              </button>
            ))}
          </div>
          
          {/* スッキリさせた TextArea */}
          <TextArea onSend={handleSend} />
          
        </div>
      </footer>
    </div>

  )

  return (

    



    <div>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages?.map((msg) => 
          <div key={msg.id}>
            <Fukidashi
              nowUserId={5}
              content={msg.content}
              username={personaMap.get(msg.senderId) || '名無し'}
              postUserId={msg.senderId}
            />
          </div>
        )}
      </div>
      <div className="flex gap-2 p-2">
        {personas?.map(p => (
          <button 
            key={p.id}
            onClick={() => setActivePersonaId(p.id)}
            style={{ backgroundColor: activePersonaId === p.id ? p.color : '#ccc' }}
            className="px-4 py-2 rounded text-white"
          >
            {p.name}
          </button>
        ))}
      </div>
      <TextArea onSend={handleSend}/>
    </div>
  )
}