import { useRef, useEffect } from "react";
import { io } from "socket.io-client";
import draw from "../utils/draw";

export default function Canvas(props) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const socket = io(
    "https://collaborative-drawing-app-server-production.up.railway.app"
  );
  useEffect(() => {
    socket.on("load_canvas", (data) => {
      data.forEach(({ lastX, lastY, offsetX, offsetY }) => {
        draw(ctxRef.current, lastX, lastY, offsetX, offsetY);
      });
    });

    socket.on("received_draw", (data) => {
      const { lastX, lastY, offsetX, offsetY } = data;
      draw(ctxRef.current, lastX, lastY, offsetX, offsetY);
    });
  }, [socket]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 10;

    ctxRef.current = ctx;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      {...props}
      onMouseDown={(e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        isDrawingRef.current = true;
        lastXRef.current = offsetX;
        lastYRef.current = offsetY;
      }}
      onMouseMove={(e) => {
        if (!isDrawingRef.current) return;

        const { offsetX, offsetY } = e.nativeEvent;
        draw(
          ctxRef.current,
          lastXRef.current,
          lastYRef.current,
          offsetX,
          offsetY
        );

        socket.emit("draw", {
          lastX: lastXRef.current,
          lastY: lastYRef.current,
          offsetX,
          offsetY,
        });

        lastXRef.current = offsetX;
        lastYRef.current = offsetY;
      }}
      onMouseUp={() => (isDrawingRef.current = false)}
      onMouseOut={() => (isDrawingRef.current = false)}
    />
  );
}
