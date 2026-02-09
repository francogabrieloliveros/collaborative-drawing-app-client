import { useRef, useEffect } from "react";
import { io } from "socket.io-client";
import draw from "../utils/draw";
import LeftNav from "../components/LeftNav.jsx";

export default function Canvas(props) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const rectRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const socket = io(import.meta.env.VITE_BACKEND_API_URL);
  useEffect(() => {
    socket.on("load_canvas", (data) => {
      data.forEach(({ lastX, lastY, x, y }) => {
        draw(ctxRef.current, lastX, lastY, x, y);
      });
    });

    socket.on("received_draw", (data) => {
      const { lastX, lastY, x, y } = data;
      draw(ctxRef.current, lastX, lastY, x, y);
    });

    socket.on("clear", (data) => {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
    });
  }, [socket]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 10;

    ctxRef.current = ctx;
  }, []);

  const getCoordinates = (e) => {
    rectRef.current = canvasRef.current.getBoundingClientRect();

    const { clientX, clientY } = e.nativeEvent;

    const scaleX = canvasRef.current.width / rectRef.current.width;
    const scaleY = canvasRef.current.height / rectRef.current.height;

    const x = (clientX - rectRef.current.left) * scaleX;
    const y = (clientY - rectRef.current.top) * scaleY;

    return { x, y };
  };

  return (
    <div className="relative left-1/2 mx-auto mt-10 inline-block translate-x-[-50%]">
      <LeftNav socket={socket} />
      <canvas
        ref={canvasRef}
        className="w-[90dvw] max-w-[856px] rounded-[clamp(0px,3vw,4em)] border-3 bg-white"
        {...props}
        onMouseDown={(e) => {
          const { clientX, clientY } = e.nativeEvent;
          isDrawingRef.current = true;

          const { x, y } = getCoordinates(e);
          lastXRef.current = x;
          lastYRef.current = y;
        }}
        onMouseMove={(e) => {
          if (!isDrawingRef.current) return;

          const { x, y } = getCoordinates(e);

          draw(ctxRef.current, lastXRef.current, lastYRef.current, x, y);

          socket.emit("draw", {
            lastX: lastXRef.current,
            lastY: lastYRef.current,
            x,
            y,
          });

          lastXRef.current = x;
          lastYRef.current = y;
        }}
        onMouseUp={() => (isDrawingRef.current = false)}
        onMouseOut={() => (isDrawingRef.current = false)}
      />
    </div>
  );
}
