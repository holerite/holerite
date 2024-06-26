"use server";
import { cookies } from "next/headers";

export async function usuarioLogado() {
	const usuario = cookies().get("user");

	return JSON.parse(usuario?.value || "");
}

// const session = await getSession();
// const userRole = session?.user?.role;
