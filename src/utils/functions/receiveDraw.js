import draw from "./draw";

export default function receiveDraw(data, ctx) {
  const { lastX, lastY, x, y, lineWidth, color } = data;
  draw(ctx, lastX, lastY, x, y, lineWidth, color);
}
