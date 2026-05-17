'use client'
export default function Character({
  name,
  japanName
}:{
  name:string;
  japanName:string
}){
  
  return (
    <div className="w-fit">
      <img src={`/rikki_img/${name}.svg`} className="h-30" />
      <p className="text-center">{japanName}</p>
    </div>
  )
}