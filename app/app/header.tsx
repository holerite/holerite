"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Ellipsis, LogOut } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { sair } from "./logOut";
import { useRouter } from "next/navigation";
import { usuarioLogado } from "./usuarioLogado";
import { useEffect, useState } from "react";

type dadoUsuario = {
	nome: string;
	perfil: string;
	urlFoto: string;
};

export function Header() {
	const [usuario, setUsuario] = useState<dadoUsuario>();
	const router = useRouter();

	async function pegarDadosUsuarioCookie() {
		const dados = await usuarioLogado();
		setUsuario(dados);
	}

	useEffect(() => {
		pegarDadosUsuarioCookie();
	}, []);

	return (
		<>
			<div className="w-full flex justify-end px-6 h-24">
				<div className="flex gap-6 items-center">
					<div>
						<Popover>
							<PopoverTrigger>
								<Bell />
							</PopoverTrigger>
							<PopoverContent>
								<ScrollArea className="h-48">
									{[
										{
											id: "1273891",
											titulo: "Titulo",
											descricao: "teste teste",
										},
									].map((conteudo) => {
										return (
											<div className="mb-4" key={conteudo.id}>
												<h2 className="text-xs">24/06 </h2>
												<h1>
													<b>{conteudo.titulo}</b>
												</h1>
												<p>{conteudo.descricao}</p>
											</div>
										);
									})}
								</ScrollArea>
							</PopoverContent>
						</Popover>
					</div>
					<div className="flex items-center gap-3">
						<div>
							<Avatar>
								<AvatarImage src="https://github.com/shadcssssn.png" />
								<AvatarFallback>
									{usuario?.nome
										.split(" ")
										.slice(0, 2)
										.map((nome) => nome.charAt(0).toUpperCase())
										.join("")}
								</AvatarFallback>
							</Avatar>
						</div>
						<div>
							<h1>
								<b>{usuario?.nome.split(" ").slice(0, 2).join(" ")}</b>
							</h1>
							<h2>{usuario?.perfil}</h2>
						</div>
					</div>
					<div>
						<Menubar>
							<MenubarMenu>
								<MenubarTrigger className="border-none outline-none">
									<Ellipsis />
								</MenubarTrigger>
								<MenubarContent align="end">
									<MenubarItem>Ver perfil</MenubarItem>
									<MenubarSeparator />
									<MenubarItem>Trocar empresa</MenubarItem>
									<MenubarSeparator />
									<MenubarItem
										onClick={() => {
											sair();
											setTimeout(() => {
												router.push("/login");
											}, 1000);
										}}
										className="text-red-500 bg-red-50 hover:text-red-700"
									>
										Sair
										<MenubarShortcut>
											<LogOut className="w-4 h-4 text-red-500" />
										</MenubarShortcut>
									</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
						</Menubar>
					</div>
				</div>
			</div>
		</>
	);
}
