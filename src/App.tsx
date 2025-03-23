import { ProductsProvider } from "./context/productsProvider";
import Home from "./pages/Home";

function App() {
  return (
    <ProductsProvider>
      <Home />
    </ProductsProvider>
  );
}

export default App;
