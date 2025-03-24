import zaraLogo from "../assets/img/zaraLogo.svg";
import { useProducts } from "../context/useProducts";
import { modes } from "../models/models";

export default function Navbar() {
  // * Hooks
  const { mode } = useProducts();

  return (
    <nav>
      <img
        className="fixed top-4 left-4 z-10"
        src={zaraLogo}
        style={{ width: mode === modes.EDITOR ? 200 : 250 }}
        alt="logo"
      />
    </nav>
  );
}
