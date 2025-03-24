import { ReactNode, useState } from "react";
import { mockProducts } from "../mock/products";
import {
  modes,
  RowModel,
  templates,
  templatesIndexes,
  templateTypes,
} from "../models/models";
import { ProductsContext } from "./productsContext";

const initialData = [
  {
    id: 0,
    template: templates.FIRST,
    items: [mockProducts[0], mockProducts[1]],
  },
  {
    id: 1,
    template: templates.SECOND,
    items: [mockProducts[2], mockProducts[3]],
  },
];

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<RowModel[]>(initialData);
  const [mode, setMode] = useState<modes>(modes.EDITOR);

  const addRow = () => {
    const updatedRows = [...products];
    const randomIndex = Math.floor(Math.random() * 20);

    updatedRows.push({
      id: updatedRows.length,
      template: templates.FIRST,
      items: [mockProducts[randomIndex]],
    });

    setProducts(updatedRows);
  };

  const deleteRow = (rowIndex: number) => {
    const updatedRows = [...products];
    updatedRows.splice(rowIndex, 1);

    setProducts(updatedRows);
  };

  const addItem = (rowIndex: number) => {
    const updatedRows = [...products];
    const randomIndex = Math.floor(Math.random() * 20);
    updatedRows[rowIndex].items.push(mockProducts[randomIndex]);

    setProducts(updatedRows);
  };

  const deleteItem = (rowIndex: number, itemIndex: number) => {
    if (products[rowIndex].items.length === 1) {
      deleteRow(rowIndex);
    } else {
      const updatedRows = [...products];
      updatedRows[rowIndex].items.splice(itemIndex, 1);
      setProducts(updatedRows);
    }
  };

  const changeTemplate = (row: RowModel) => {
    const currentRow = { ...row };
    const currentIndex = templateTypes[currentRow.template].index;
    const templatesAmount = Object.keys(templateTypes).length - 1;

    const newTemplateIndex =
      currentIndex === templatesAmount ? 0 : currentIndex + 1;
    currentRow.template = templatesIndexes[newTemplateIndex];

    const foundIndex = products.findIndex((item) => item.id === currentRow.id);
    const newProducts = [...products];
    newProducts.splice(foundIndex, 1, currentRow);
    setProducts(newProducts);
  };

  const changeMode = () => {
    setMode((prev) => (prev === modes.EDITOR ? modes.LIVE : modes.EDITOR));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        deleteItem,
        addItem,
        addRow,
        mode,
        changeMode,
        deleteRow,
        changeTemplate,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
