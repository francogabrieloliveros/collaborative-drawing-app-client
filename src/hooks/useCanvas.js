import { createContext, useContext } from "react";

export const CanvasContext = createContext(null);
export const useCanvas = () => useContext(CanvasContext);
