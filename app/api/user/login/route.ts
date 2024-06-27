import { prisma } from "@/data/database";
import { removePonto } from "@/utils/mascaras/cpf";
import type { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
	const dados = await request.json();
	try {
		if (!dados.cpf || !dados.senha) {
			throw "CPF ou senha incorretos.";
		}

		const user = await prisma.user.findUniqueOrThrow({
			where: {
				cpf: removePonto(dados.cpf),
			},
			select: {
				nome: true,
				senha: true,
				foto: true,
				perfil: {
					select: {
						nome: true,
					},
				},
			},
		});

		const senhaIgual = bcrypt.compareSync(dados.senha, user.senha);
		if (senhaIgual === false) throw "CPF ou senha incorretos.";

		cookies().set({
			name: "user",
			value: JSON.stringify({
				nome: user.nome,
				perfil: user.perfil.nome,
				foto: user.foto,
			}),
			sameSite: "strict",
			httpOnly: false,
			secure: process.env.NODE_ENV === "production",
			maxAge: dados.manterConectado ? 60 * 60 * 24 * 7 : 24 * 60 * 60 * 1000, // One week | One Day
		});
		return Response.json(true);
	} catch (error) {
		console.log(error);
		return Response.json({ mensagem: error }, { status: 400 });
	}
}
