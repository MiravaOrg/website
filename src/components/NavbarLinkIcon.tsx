import type { LucideProps } from 'lucide-react'
import type React from 'react'

type Props = {
  link: string,
  label: string,
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

function NavbarLinkIcon({ link, label, Icon }: Props) {
  return (
    <a href={link} target="_blank">
      <span className="hidden">{label}</span>
      <Icon className="text-white hover:opacity-70 transition-all" size={24}/>
    </a>
  )
}

export default NavbarLinkIcon