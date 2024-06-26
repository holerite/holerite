import {
	CircleHelp,
	Clipboard,
	Import,
	Settings2,
	StickyNote,
	User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function Navbar() {
	return (
		<>
			<nav className="p-4 drop-shadow-md bg-white h-screen">
				<div className="w-full relative h-28">
					<Image
						objectFit="contain"
						fill={true}
						className="aspect-video object-contain"
						alt="banner de login"
						src={"/logo_mock.png"}
						priority={false}
					/>
				</div>
				<ul className="mt-4 flex flex-col gap-2">
					<NavItem
						icon={<Clipboard className="w-5 h-5" />}
						name="Relatórios"
						url="/relatorioos"
					/>
					<NavItem
						icon={<StickyNote className="w-5 h-5" />}
						name="Recibos"
						url="/recibos"
					/>
					<NavItem
						icon={<User className="w-5 h-5" />}
						name="Usuários"
						url="dashboard/usuarios"
					/>
					<NavItem
						icon={<Import className="w-5 h-5" />}
						name="Importar"
						url="/importar"
					/>

					<hr />
					<NavItem
						icon={<Settings2 className="w-5 h-5" />}
						name="Configurações"
						url="/configuracoes"
					/>
					<NavItem
						icon={<CircleHelp className="w-5 h-5" />}
						name="Ajuda"
						url="/ajuda"
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
			<li>
				<Link
					href={url}
					className="px-2 py-2 hover:bg-black hover:text-white rounded-md border-solid flex items-center gap-2"
				>
					<span>{icon}</span>
					{name}
				</Link>
			</li>
		</>
	);
}
