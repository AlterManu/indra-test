import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Row from "./Row";
import { RowModel } from "../models/item";
import { useProducts } from "../context/useProducts";

const DragAndDropBoard = () => {
  // * Hooks
  const { products, setProducts, addRow } = useProducts();

  // * Methods
  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const updatedRows: RowModel[] = [...products];
    const [movedRow] = updatedRows.splice(dragIndex, 1);
    updatedRows.splice(hoverIndex, 0, movedRow);
    setProducts(updatedRows);
  };

  // Mueve un elemento dentro o entre filas
  const moveItem = (
    dragRowIndex: number,
    dragItemIndex: number,
    hoverRowIndex: number,
    hoverItemIndex: number
  ) => {
    const updatedRows = [...products];

    const [movedItem] = updatedRows[dragRowIndex].items.splice(
      dragItemIndex,
      1
    );
    updatedRows[hoverRowIndex].items.splice(hoverItemIndex, 0, movedItem);

    setProducts(updatedRows);
  };

  return (
    <div className="w-full px-5 cursor-default">
      <DndProvider backend={HTML5Backend}>
        {products.map((product, rowIndex) => (
          <Row
            key={product.id}
            row={product}
            rowIndex={rowIndex}
            moveRow={moveRow}
            moveItem={moveItem}
          />
        ))}
      </DndProvider>
      <div className="w-full flex justify-center mt-5">
        <button
          onClick={addRow}
          className="bg-slate-500 px-8 py-2 rounded-full cursor-pointer text-white"
        >
          + Añadir fila
        </button>
      </div>
    </div>
  );
};

export default DragAndDropBoard;
