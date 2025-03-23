import { useProducts } from "../context/useProducts";
import { modes } from "../models/item";

export default function EditorButton() {
  const { mode, changeMode } = useProducts();

  return (
    <div className="fixed bottom-5 left-5">
      <button
        onClick={changeMode}
        className="bg-slate-500 px-4 py-2 rounded-full cursor-pointer text-white"
      >
        {mode === modes.LIVE ? "Cambiar a Modo Editor" : "Cambiar a Modo Live"}
      </button>
    </div>
  );
}
