export default function draw(
  ctx,
  startX,
  startY,
  destX,
  destY,
  lineWidth,
  color,
) {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(destX, destY);
  ctx.stroke();
  ctx.closePath();
}
