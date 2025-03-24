import DragAndDropBoard from "../components/Board/DragAndDropBoard";
import EditorButton from "../components/EditorButton";
import Gallery from "../components/Gallery/Gallery";
import ZoomContainer from "../components/Board/ZoomContainer";
import { useProducts } from "../context/useProducts";
import { modes } from "../models/models";
import Navbar from "../components/Navbar";

export default function Home() {
  const { mode } = useProducts();

  return (
    <>
      {mode === modes.LIVE && <Navbar />}

      <main className="w-screen flex justify-center my-[5%]">
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

          {/* Botón de switch entre modos */}
          <EditorButton />
        </div>
      </main>

      <footer className="w-full py-3 bg-gray-100">
        <p className="text-center text-gray-500 text-sm">
          © 2025 - Creado y diseñado por{" "}
          <a
            className="text-blue-500 font-bold"
            href="https://altermanu.com"
            target="_blank"
            rel="noreferrer"
          >
            Manu
          </a>
        </p>
      </footer>
    </>
  );
}
