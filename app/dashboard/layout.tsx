import { Bell, Ellipsis } from "lucide-react";
import { Navbar } from "./navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<main className="grid grid-cols-[275px_1fr]">
				<Navbar />
				<div>
					<div className="w-full flex justify-end px-6 h-24">
						<div className="flex gap-6 items-center">
							<div>
								<Bell />
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
								<Ellipsis />
							</div>
						</div>
					</div>
					{children}
				</div>
			</main>
		</>
	);
}
