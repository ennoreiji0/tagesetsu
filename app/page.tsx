'use client'

import MyLink from "@/components/MyLink"
import { db } from "@/lib/db";
import { useEffect } from "react";


export default function Home(){
  useEffect(() => {
  const init = async () => {
    const count = await db.personas.count();
    if (count === 0) {
      await db.personas.bulkAdd([
        { name: '俺', color: '#16a34a' },     // 緑
        { name: '相談役', color: '#2563eb' }  // 青
      ]);
    }
  };
  init();
}, []);
  return (
    <div>
      <MyLink href="/lobby">全体チャット</MyLink>
    </div>
  )
}