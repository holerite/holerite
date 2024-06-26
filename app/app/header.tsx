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
export function Header() {
	const router = useRouter();

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
									{new Array(20).fill(0).map((item, id) => {
										return (
											<div className="mb-4" key={id}>
												<h2 className="text-xs">24/06 </h2>
												<h1>
													<b>Título da notificação</b>
												</h1>
												<p>Texto da notificação</p>
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
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>LA</AvatarFallback>
							</Avatar>
						</div>
						<div>
							<h1>
								<b>Luis Amorim</b>
							</h1>
							<h2>Admin</h2>
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
											router.push("/login");
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
