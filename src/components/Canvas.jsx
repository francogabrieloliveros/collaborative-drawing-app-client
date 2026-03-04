import { useRef, useEffect, useState } from "react";
import { useCanvas } from "../hooks/useCanvas.js";
import { TailSpin } from "react-loader-spinner";
import {
  initCanvas,
  setDrawing,
  handleMove,
  handleDown,
  loadCanvas,
  receiveDraw,
  clearCanvas,
} from "../utils/index.js";

export default function Canvas() {
  const { socket, sliderRef, colorRef, isPen } = useCanvas();
  const [connected, setConnected] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);

  // Initialize canvas
  useEffect(() => {
    ctxRef.current = initCanvas(canvasRef.current);
  }, []);

  // Handle received socket events
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    socket.on("connect_client", (data) => {
      setConnected(data);
    });
    socket.on("load_canvas", (data) => loadCanvas(data, ctx));
    socket.on("received_draw", (data) => receiveDraw(data, ctx));
    socket.on("clear", () => clearCanvas(ctx, canvas));
  }, [socket]);

  const drawStart = (e) =>
    handleDown(e, isDrawingRef, canvasRef.current, lastXRef, lastYRef);
  const drawMove = (e) =>
    handleMove(
      e,
      socket,
      isDrawingRef.current,
      canvasRef.current,
      sliderRef.current,
      colorRef.current,
      isPen.current,
      ctxRef.current,
      lastXRef,
      lastYRef,
    );
  const drawEnd = setDrawing(isDrawingRef, false);

  return (
    <>
      {!connected ? (
        <>
          <div></div>
          <div className="fixed top-1/2 left-1/2 flex -translate-1/2 flex-col items-center rounded-sm px-1 py-3 text-sm text-black select-none">
            <TailSpin
              height="30"
              width="30"
              color="black"
              ariaLabel="tail-spin-loading"
              visible={true}
            />
            Server not connected
          </div>
        </>
      ) : undefined}
      <canvas
        width={850}
        height={850}
        ref={canvasRef}
        className="h-[90dvw] max-h-[856px] w-[90dvw] max-w-[856px] rounded-[clamp(0px,3vw,4em)] border-3 bg-white"
        onTouchStart={drawStart}
        onMouseDown={drawStart}
        onTouchMove={drawMove}
        onMouseMove={drawMove}
        onTouchEnd={drawEnd}
        onMouseUp={drawEnd}
        onMouseOut={drawEnd}
      />
    </>
  );
}
