import DragAndDropBoard from "../components/DragAndDropBoard";
import EditorButton from "../components/EditorButton";
import Gallery from "../components/Gallery";
import { useProducts } from "../context/useProducts";
import { modes } from "../models/item";
import { useSpring, animated } from "@react-spring/web";
import { ReactNode, useState } from "react";

const ZoomContainer = ({ children }: { children: ReactNode }) => {
  // * Hooks
  const [scale, setScale] = useState(1);
  const props = useSpring({ scale }); // Animación que suaviza el zoom

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

      <animated.div style={{ transform: props.scale.to((s) => `scale(${s})`) }}>
        {children}
      </animated.div>
    </>
  );
};

export default function Home() {
  const { mode } = useProducts();

  return (
    <main className="w-screen flex justify-center py-[5vh]">
      <div className="container">
        {mode === modes.EDITOR ? (
          <>
            <ZoomContainer>
              <DragAndDropBoard />
            </ZoomContainer>
          </>
        ) : (
          <Gallery />
        )}
        <EditorButton />
      </div>
    </main>
  );
}
