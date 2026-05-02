export type Message ={
  id?: number;
  senderId: number|undefined;    // 人格の名前
  content: string;       // 伝えたいこと
  timestamp: number;     // 書き込んだ時間
  
}

export type Persona ={
  id?: number;
  name: string;
  color: string; // 人格ごとのイメージカラー
}