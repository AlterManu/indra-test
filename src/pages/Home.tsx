import DragAndDropBoard from "../components/DragAndDropBoard";
import EditorButton from "../components/EditorButton";
import Gallery from "../components/Gallery";
import { useProducts } from "../context/useProducts";
import { modes } from "../models/item";

export default function Home() {
  const { mode } = useProducts();

  return (
    <main className="w-screen flex justify-center py-[5vh]">
      <div className="container">
        {mode === modes.EDITOR ? <DragAndDropBoard /> : <Gallery />}
        <EditorButton />
      </div>
    </main>
  );
}
