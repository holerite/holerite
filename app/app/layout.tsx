import { Header } from "./header";
import { Navbar } from "./navbar";

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
					<Header />
					{children}
				</div>
			</main>
		</>
	);
}
