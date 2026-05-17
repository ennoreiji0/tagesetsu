const fs = require('fs');
const path = require('path');
const createBoundingBox = require('svg-path-bounding-box');

// お前の利っ器ーの画像が入っているフォルダ
const SVG_DIR = `C:\\Users\\佐藤　立美\\Desktop\\rikki\\public\\rikki_img`;

fs.readdir(SVG_DIR, (err, files) => {
  if (err) return console.error("❌ フォルダが開けねえ！", err);

  const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');
  console.log(`📦 ${svgFiles.length}個の利っ器ーを発見。ガチの余白切り詰めを開始する…`);

  svgFiles.forEach(file => {
    const filePath = path.join(SVG_DIR, file);
    
    try {
      let svgData = fs.readFileSync(filePath, 'utf8');

      // SVG内のすべてのd属性（パスデータ）を抽出して、イラストの本当のサイズを計算する
      const pathRegex = /d="([^"]+)"/g;
      let match;
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      let hasPaths = false;

      while ((match = pathRegex.exec(svgData)) !== null) {
        try {
          const boundingBox = createBoundingBox(match[1]);
          if (boundingBox.x1 < minX) minX = boundingBox.x1;
          if (boundingBox.y1 < minY) minY = boundingBox.y1;
          if (boundingBox.x2 > maxX) maxX = boundingBox.x2;
          if (boundingBox.y2 > maxY) maxY = boundingBox.y2;
          hasPaths = true;
        } catch (e) {
          // 解析できないパスはスキップ
        }
      }

      if (hasPaths && minX !== Infinity) {
        // 少しだけ見切れ防止のバッファ（マージン）を足す
        const padding = 2;
        const x = Math.floor(minX) - padding;
        const y = Math.floor(minY) - padding;
        const width = Math.ceil(maxX - minX) + (padding * 2);
        const height = Math.ceil(maxY - minY) + (padding * 2);

        // 既存の viewBox を新しく計算したガチのサイズに置換する
        const newViewBox = `viewBox="${x} ${y} ${width} ${height}"`;
        
        if (svgData.includes('viewBox=')) {
          svgData = svgData.replace(/viewBox="[^"]+"/, newViewBox);
        } else {
          svgData = svgData.replace('<svg', `<svg ${newViewBox}`);
        }

        // width と height が固定値で邪魔してる場合があるので消去か100%にする
        svgData = svgData.replace(/width="[^"]+"/, 'width="100%"');
        svgData = svgData.replace(/height="[^"]+"/, 'height="100%"');

        fs.writeFileSync(filePath, svgData, 'utf8');
        console.log(`✂️ 余白カット成功: ${file}`);
      } else {
        console.log(`⚠️ パスが見つからないか解析不能: ${file}`);
      }

    } catch (error) {
      console.error(`❌ 失敗: ${file}`, error.message);
    }
  });

  console.log("\n✨ 今度こそすべての利っ器ーの余白を強制終了したぞ！画面を見てみろ！");
});