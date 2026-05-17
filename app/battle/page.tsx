'use client'

import Character from "@/components/Character"


import { useState, useEffect } from 'react';

export default function Battle() {
  // 1. どっちのターンかをstateで管理 ('player' か 'enemy')
  const [currentTurn, setCurrentTurn] = useState('player');
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [battleLog, setBattleLog] = useState('バトル開始！');

  // 2. これがお前の言った turn() 関数！
  const playTurn = () => {
    // ※罠対策：stateの最新の値を安全に取るために、関数型の更新を使う
    setCurrentTurn((prevTurn) => {
      if (prevTurn === 'player') {
        // プレイヤーのターン：敵にダメージ
        setEnemyHP((prevHp) => Math.max(0, prevHp - 20));
        setBattleLog('味方のAEDの攻撃！ 敵に20ダメージ！');
        return 'enemy'; // 次は敵のターンにする
      } else {
        // 敵のターン：プレイヤーにダメージ
        setPlayerHP((prevHp) => Math.max(0, prevHp - 15));
        setBattleLog('敵のちびっこの攻撃！ 味方に15ダメージ！');
        return 'player'; // 次はプレイヤーのターンにする
      }
    });
  };

  // 3. setInterval を使って自動で turn() を回す
  useEffect(() => {
    // 1秒ごとに turn() を実行
    const timer = setInterval(() => {
      // どっちかのHPが0になったらタイマーを止める
      
      playTurn();
    }, 1000);

    // 画面が閉じたらタイマーを破棄する（お作法）
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div>
        <div className="flex">

          <div className="w-1/2 flex flex-col items-center gap-4">
            <Character name="AED" japanName="AED"/>
            <Character name="chibikko" japanName="ちびっこ二人組"/>
          </div>

          <div className="w-1/2 flex flex-col items-center gap-4">
            <Character name="AED" japanName="AED"/>
            <Character name="chibikko" japanName="ちびっこ二人組"/>
          </div>

        </div>
      </div>
      <div className="text-center p-4 bg-slate-800 text-white font-bold">
        <p>現在のターン: {currentTurn === 'player' ? '味方' : '敵'}</p>
        <p className="text-yellow-400 mt-2">{battleLog}</p>
        <p>味方HP: {playerHP} | 敵HP: {enemyHP}</p>
      </div>
    </div>
  );
}