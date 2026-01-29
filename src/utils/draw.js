export default function draw(ctx, startX, startY, destX, destY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(destX, destY);
  ctx.stroke();
}
