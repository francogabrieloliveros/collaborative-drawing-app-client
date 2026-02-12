import { useRef, useEffect } from "react";
import { io } from "socket.io-client";
import draw from "../utils/draw";
import LeftNav from "../components/LeftNav.jsx";

export default function Canvas(props) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const rectRef = useRef(null);
  const isDrawingRef = useRef(false);
  const sliderRef = useRef(null);
  const colorRef = useRef(null);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const isPen = useRef(true);
  const socket = io(import.meta.env.VITE_BACKEND_API_URL);
  useEffect(() => {
    socket.on("load_canvas", (data) => {
      data.forEach(({ lastX, lastY, x, y, lineWidth, color }) => {
        draw(ctxRef.current, lastX, lastY, x, y, lineWidth, color);
      });
    });

    socket.on("received_draw", (data) => {
      const { lastX, lastY, x, y, lineWidth, color } = data;
      draw(ctxRef.current, lastX, lastY, x, y, lineWidth, color);
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

  const setIsPen = (bool) => (isPen.current = bool);

  return (
    <div className="relative left-1/2 mx-auto mt-10 inline-block translate-x-[-50%]">
      <LeftNav
        socket={socket}
        sliderRef={sliderRef}
        colorRef={colorRef}
        setIsPen={setIsPen}
      />
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
          const lineWidth = sliderRef.current.value;
          const color = isPen.current ? colorRef.current.value : "#ffffff";

          draw(
            ctxRef.current,
            lastXRef.current,
            lastYRef.current,
            x,
            y,
            lineWidth,
            color,
          );

          socket.emit("draw", {
            lastX: lastXRef.current,
            lastY: lastYRef.current,
            x,
            y,
            lineWidth,
            color,
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
