"use server";
import { cookies } from "next/headers";

export async function sair() {
	cookies().delete("user");
}
