"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cpf } from "@/utils/mascaras";
import { useState } from "react";
import banner from "@/public/banner.jpg";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
type FormularioDto = {
	cpf: string;
	senha: string;
	manter: boolean;
};

const DADOS_INICIAIS: FormularioDto = {
	cpf: "",
	senha: "",
	manter: false,
};

export default function Login() {
	const [dados, setDados] = useState<FormularioDto>(DADOS_INICIAIS);
	const { toast } = useToast();
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: () => {
			return axios.post("/api/user/login", {
				cpf: dados.cpf,
				senha: dados.senha,
			});
		},
		onError: () => {
			toast({
				variant: "destructive",
				title: "Erro ao realizar login",
				description: "Email ou senha incorretos",
			});
		},
		onSuccess: () => {
			router.push("/app/relatorio");
		},
	});

	function realizarLogin(e: any) {
		e.preventDefault();
		mutation.mutate();
	}

	return (
		<>
			<main className="bg-slate-300 w-screen h-screen flex items-center justify-center">
				<div className="w-[80vw] h-[80vh] flex">
					<div className="hidden md:block relative w-full bg-white">
						<Image
							fill
							placeholder="blur"
							alt="banner de login"
							src={banner}
							className="rounded-lg"
							priority={false}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							style={{
								maxWidth: "100%",
								objectFit: "cover",
							}}
						/>
					</div>
					<div className="rounded-sm md:rounded-r-lg w-full flex flex-col justify-center bg-white  p-8 items-center">
						<div className="mb-6">
							<h1>Logo Holerite</h1>
							<h1 className="font-bold text-sm">Bem vindo de volta!</h1>
						</div>
						<form
							onSubmit={realizarLogin}
							className="flex w-full flex-col gap-4 items-center"
						>
							<div className="grid w-full max-w-sm items-center gap-1.5">
								<Label htmlFor="cpf">CPF</Label>
								<Input
									value={dados.cpf}
									type="text"
									id="cpf"
									placeholder="000.000.000-00"
									onChange={(e) => {
										setDados((anterior) => {
											return {
												...anterior,
												cpf: cpf(e.target.value),
											};
										});
									}}
								/>
							</div>
							<div className="grid w-full max-w-sm items-center gap-1.5">
								<Label htmlFor="senha">Senha</Label>
								<Input
									value={dados.senha}
									type="password"
									id="senha"
									placeholder="*********"
									onChange={(e) => {
										setDados((anteriores) => {
											return {
												...anteriores,
												senha: e.target.value,
											};
										});
									}}
								/>
							</div>
							<div className="flex w-full max-w-sm items-center gap-1.5">
								<Checkbox
									checked={dados.manter}
									id="manter"
									onCheckedChange={(e) => {
										setDados((anterior) => {
											return {
												...anterior,
												manter: e as boolean,
											};
										});
									}}
								/>
								<Label
									htmlFor="manter"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Manter conectado
								</Label>
							</div>
							<Button
								isLoading={mutation.isPending}
								type="submit"
								className="mt-4 w-full max-w-sm"
							>
								Entrar
							</Button>
							<Link href="/recuperar-senha" className="text-sm text-center">
								Esqueceu a senha?
							</Link>
						</form>
					</div>
				</div>
			</main>
		</>
	);
}
