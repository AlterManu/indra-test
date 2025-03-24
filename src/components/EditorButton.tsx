import { useProducts } from "../context/useProducts";
import { modes } from "../models/models";
import { CiEdit } from "react-icons/ci";
import { CgLivePhoto } from "react-icons/cg";

export default function EditorButton() {
  const { mode, changeMode } = useProducts();

  return (
    <div className="fixed bottom-5 left-5">
      <button
        onClick={changeMode}
        className="bg-blue-400 px-4 py-2 rounded-full cursor-pointer text-white"
      >
        <div className="flex justify-center items-center gap-2">
          {mode === modes.LIVE ? (
            <>
              <CgLivePhoto size={20} /> Modo Live
            </>
          ) : (
            <>
              <CiEdit size={20} /> Modo Editor
            </>
          )}
        </div>
      </button>
    </div>
  );
}
