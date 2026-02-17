import { useRef } from "react";
import { CanvasContext } from "../hooks/useCanvas.js";
import socket from "../utils/socket.js";
import LeftNav from "../components/LeftNav.jsx";
import Canvas from "../components/Canvas.jsx";

export default function CanvasPage() {
  const isPen = useRef(true);
  const setIsPen = (bool) => (isPen.current = bool);
  const sliderRef = useRef(null);
  const colorRef = useRef(null);

  return (
    <main className="relative left-1/2 mx-auto mt-10 inline-block translate-x-[-50%]">
      <CanvasContext value={{ socket, sliderRef, colorRef, isPen, setIsPen }}>
        <LeftNav />
        <Canvas />
      </CanvasContext>
    </main>
  );
}
