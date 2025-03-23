import { useContext } from "react";
import { ProductsContext } from "./productsContext";

// Custom hook para usar el contexto
export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw Error("useProducts must be used inside of a ProductsProvider");
  }

  return context;
};
