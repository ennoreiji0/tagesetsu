'use client'

import NormalButton from "@/components/NormalButton"
import { useRouter } from "next/navigation"

export default function Home(){
  const router =useRouter()
  return (
    <div>
      <NormalButton 
        onClick={()=>{router.push('/battle')}}
      >バトル！</NormalButton>
    </div>
  )
}