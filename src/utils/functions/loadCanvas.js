import draw from "./draw";

export default function loadCanvas(data, ctx) {
  data.forEach(({ lastX, lastY, x, y, lineWidth, color }) => {
    draw(ctx, lastX, lastY, x, y, lineWidth, color);
  });
}
