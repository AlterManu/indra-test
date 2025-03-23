import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

const ZoomContainer = ({ children }: { children: ReactNode }) => {
  // * Hooks
  const [scale, setScale] = useState(1);

  // * Methods
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 1)); // Máx 1 para no hacer más zoom que el inicial
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5)); // Mín 0.5 para no hacer zoom out infinito
  const reset = () => setScale(1);

  return (
    <>
      {/* Botones de control */}
      <div className="fixed top-4 left-4 z-10 flex gap-2">
        <button
          className="bg-slate-500 px-4 py-2 rounded-full cursor-pointer text-white"
          onClick={zoomIn}
          disabled={scale === 1}
          style={{ opacity: scale === 1 ? 0.5 : 1 }}
        >
          Acercar
        </button>
        <button
          className="bg-slate-500 px-4 py-2 rounded-full cursor-pointer text-white"
          disabled={scale === 0.5}
          style={{ opacity: scale === 0.5 ? 0.5 : 1 }}
          onClick={zoomOut}
        >
          Alejar
        </button>
        <button
          className="bg-slate-500 px-4 py-2 rounded-full cursor-pointer text-white"
          onClick={reset}
          style={{ opacity: scale === 1 ? 0.5 : 1 }}
        >
          Reiniciar
        </button>
      </div>

      <motion.div
        animate={{ scale }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default ZoomContainer;
