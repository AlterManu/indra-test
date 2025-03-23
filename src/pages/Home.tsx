import DragAndDropBoard from "../components/DragAndDropBoard";
import EditorButton from "../components/EditorButton";
import Gallery from "../components/Gallery";
import ZoomContainer from "../components/ZoomContainer";
import { useProducts } from "../context/useProducts";
import { modes } from "../models/item";

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

        {/* Botón de switch entre modos */}
        <EditorButton />
      </div>
    </main>
  );
}
