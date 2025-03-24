import zaraLogo from "../assets/img/zaraLogo.svg";

export default function Navbar() {
  return (
    <nav>
      <img
        className="fixed w-[250px] top-4 left-4 z-10"
        src={zaraLogo}
        alt="logo"
      />
    </nav>
  );
}
