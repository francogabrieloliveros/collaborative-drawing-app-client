export default function getCoordinates(e, canvas) {
  const source = e.nativeEvent.touches
    ? e.nativeEvent.touches[0]
    : e.nativeEvent;
  const { clientX, clientY } = source;
  const rect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (clientX - rect.left) * scaleX;
  const y = (clientY - rect.top) * scaleY;

  return { x, y };
}
