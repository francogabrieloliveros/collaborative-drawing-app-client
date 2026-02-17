import draw from "./draw";
import getCoordinates from "./getCoordinates";

export default function handleMove(
  e,
  socket,
  isDrawing,
  canvas,
  slider,
  color,
  isPen,
  ctx,
  lastXRef,
  lastYRef,
) {
  if (!isDrawing) return;

  const { x, y } = getCoordinates(e, canvas);
  const lineWidth = slider.value;
  const colorVal = isPen ? color.value : "#ffffff";

  draw(ctx, lastXRef.current, lastYRef.current, x, y, lineWidth, colorVal);

  socket.emit("draw", {
    lastX: lastXRef.current,
    lastY: lastYRef.current,
    x,
    y,
    lineWidth,
    color: colorVal,
  });

  lastXRef.current = x;
  lastYRef.current = y;
}
