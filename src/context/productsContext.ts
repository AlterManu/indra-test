import { createContext, Dispatch, SetStateAction } from "react";
import { modes, RowModel } from "../models/item";

interface ProductsContextValue {
  products: RowModel[];
  setProducts: Dispatch<SetStateAction<RowModel[]>>;
  deleteItem: (rowIndex: number, itemIndex: number) => void;
  addItem: (rowIndex: number) => void;
  addRow: () => void;
  deleteRow: (rowIndex: number) => void;
  mode: modes;
  changeMode: () => void;
  changeTemplate: (row: RowModel) => void;
}

export const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined
);
