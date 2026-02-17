export default function setDrawing(isDrawingRef, bool) {
  return () => (isDrawingRef.current = bool);
}
