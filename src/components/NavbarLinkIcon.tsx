import type { LucideProps } from "lucide-react";
import type React from "react";

type Props = {
  link: string;
  label: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

function NavbarLinkIcon({ link, label, Icon }: Props) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-2 rounded-lg hover:bg-cyan-800/40 transition-colors"
    >
      <Icon className="text-white/80 hover:text-white transition-colors" size={20} />
    </a>
  );
}

export default NavbarLinkIcon;
