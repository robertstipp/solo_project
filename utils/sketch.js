const { createCanvas, loadImage } = require('canvas');
const fs = require('fs')
async function processImage() {
  const img = await loadImage('../public/images/spotify-logo.png');
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(img, 0, 0, img.width, img.height);
  const arr = []

  for (let x = 0; x < img.width; x += 10) {
    for (let y = 0; y < img.height; y += 10) {
      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      const [r, g, b, a] = pixelData;
      console.log(`Pixel at (${x}, ${y}): Red=${r}, Green=${g}, Blue=${b}, Alpha=${a}`);
      arr.push([x,y,a])
    }
  }
  fs.writeFileSync('./dots.json',JSON.stringify(arr))
}

processImage().catch(console.error);
