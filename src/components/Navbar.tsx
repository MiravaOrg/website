import { Coffee, Github } from "lucide-react";
import NavbarLinkIcon from "./NavbarLinkIcon";

function Navbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 p-4 px-8 flex justify-between items-center z-20 backdrop-blur-xl">
      <NavbarLinkIcon
        Icon={Github}
        label="Github"
        link="https://github.com/miravaorg/mirava"
      />
      <div>
        <h1 className="font-bold text-4xl text-center">Mirava</h1>
        <p className="text-center hidden md:block opacity-80">
          Mirava is a curated list of Iranian package mirrors, providing
          reliable and fast access to essential software resources within
          Iran.{" "}
        </p>
      </div>
      <NavbarLinkIcon
        Icon={Coffee}
        label="Donate"
        link="https://www.coffeete.ir/geedook"
      />
    </nav>
  )
}

export default Navbar;