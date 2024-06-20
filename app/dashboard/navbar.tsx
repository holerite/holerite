import { Input } from "@/components/ui/input";
import { Clipboard, Import, StickyNote, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function Navbar() {
	return (
		<>
			<nav className="p-4 drop-shadow-md bg-white h-screen">
				<div className="w-full h-36">
					<Image
						width={200}
						height={50}
						className="aspect-video object-contain"
						alt="banner de login"
						src={"/logo_mock.png"}
						priority={false}
					/>
				</div>
				<Input placeholder="Pesquisar" />
				<ul className="mt-4 flex flex-col gap-2">
					<NavItem
						icon={<User className="w-5 h-5" />}
						name="Usuários"
						url="/usuarios"
					/>
					<NavItem
						icon={<StickyNote className="w-5 h-5" />}
						name="Recibos"
						url="/recibos"
					/>
					<NavItem
						icon={<Import className="w-5 h-5" />}
						name="Importar"
						url="/importar"
					/>
					<NavItem
						icon={<Clipboard className="w-5 h-5" />}
						name="Relatórios"
						url="/relatorioos"
					/>
				</ul>
			</nav>
		</>
	);
}

type NavItemDto = {
	name: string;
	url: string;
	icon?: ReactNode;
};
function NavItem({ name, url, icon }: NavItemDto) {
	return (
		<>
			<li className="px-2 py-2 hover:bg-black hover:text-white rounded-md border-solid">
				<Link href={url} className="flex items-center gap-2">
					<span>{icon}</span>
					{name}
				</Link>
			</li>
		</>
	);
}
