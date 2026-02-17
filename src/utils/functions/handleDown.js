import getCoordinates from "./getCoordinates";

export default function handleDown(
  e,
  isDrawingRef,
  canvas,
  lastXRef,
  lastYRef,
) {
  isDrawingRef.current = true;

  const { x, y } = getCoordinates(e, canvas);
  lastXRef.current = x;
  lastYRef.current = y;
}
