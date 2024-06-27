import { prisma } from "@/data/database";
import { removePonto } from "@/utils/mascaras/cpf";
import type { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
	try {
		const dados = await request.json();

		if (!dados.cnpj) {
			throw "CNPJ é obrigatório!";
		}

		if (!dados.fantasia) {
			throw "O nome é obrigatório!";
		}

		console.log(dados);

		if (dados.usuario < 0) {
			throw "O Usuário é obrigatório";
		}

		await prisma.empresa.create({
			data: {
				nome: dados.nome,
				cnpj: removePonto(dados.cnpj),
				User: {
					connect: {
						id: dados.usuario,
					},
				},
			},
		});

		return Response.json(true);
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === "SQLITE_CONSTRAINT") {
				return Response.json(
					{ mensagem: "Empresa já cadastrado" },
					{ status: 400 },
				);
			}
		}
		return Response.json({ mensagem: e }, { status: 400 });
	}
}
