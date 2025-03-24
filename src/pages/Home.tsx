import DragAndDropBoard from "../components/Board/DragAndDropBoard";
import EditorButton from "../components/EditorButton";
import Gallery from "../components/Gallery/Gallery";
import ZoomContainer from "../components/Board/ZoomContainer";
import { useProducts } from "../context/useProducts";
import { modes } from "../models/models";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

      <Footer />
    </>
  );
}
