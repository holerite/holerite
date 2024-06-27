import { prisma } from "@/data/database";
import { removePonto } from "@/utils/mascaras/cpf";
import type { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import * as jose from "jose";
import { Warnes } from "next/font/google";

export async function POST(request: NextRequest) {
	try {
		const dados = await request.json();

		if (!dados.senha) {
			throw "Senha é obrigatória";
		}

		if (!dados.nome) {
			throw "O nome é obrigatório";
		}

		if (!dados.cpf) {
			throw "O CPF é obrigatório";
		}

		const senhaHasheada = bcrypt.hashSync(dados.senha, 10);

		const usuario = await prisma.user.create({
			data: {
				cpf: removePonto(dados.cpf),
				nome: dados.nome,
				senha: senhaHasheada,
				perfil: {
					connect: {
						id: 1,
					},
				},
			},

			select: {
				nome: true,
				id: true,
			},
		});
		const secret = new TextEncoder().encode(process.env.JWT_TOKEN);
		const alg = "HS256";

		const jwt = await new jose.SignJWT({ ...usuario })
			.setProtectedHeader({ alg })
			.setIssuedAt()
			.setIssuer("horelite:issuer")
			.setAudience("holerite:audience")
			.setExpirationTime("2h")
			.sign(secret);

		return Response.json({ token: jwt });
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === "SQLITE_CONSTRAINT") {
				return Response.json(
					{ mensagem: "Usuário já cadastrado" },
					{ status: 400 },
				);
			}
		}
		return Response.json({ mensagem: e }, { status: 400 });
	}
}
