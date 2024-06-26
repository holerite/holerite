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
		});

		const senhaIgual = bcrypt.compareSync(dados.senha, user.senha);
		if (senhaIgual === false) throw "CPF ou senha incorretos.";

		cookies().set({
			name: "user",
			value: "tese",
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: dados.manterConectado ? 60 * 60 * 24 * 7 : 24 * 60 * 60 * 1000, // One week | One Day
		});
		return Response.json({ user });
	} catch (error) {
		console.log(error);
		return Response.json({ mensagem: error }, { status: 400 });
	}
}
