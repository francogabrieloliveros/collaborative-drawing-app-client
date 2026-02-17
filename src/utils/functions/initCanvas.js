export default function initCanvas(canvas) {
  const ctx = canvas.getContext("2d");

  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 10;

  return ctx;
}
