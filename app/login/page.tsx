"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function() {
  return (
    <>
      <main className="bg-slate-300 w-screen h-screen flex items-center justify-center">

        <div className="w-[80vw] h-[80vh] flex">
          <div className="hidden md:block relative w-full bg-white">
            <Image objectFit="cover" fill alt="banner de login" src={"/banner.jpg"} className="rounded-lg" />
          </div>
          <div className="rounded-sm md:rounded-r-lg w-full flex flex-col justify-center bg-white  p-8 items-center">

            <div className="mb-6">
              <h1>Logo Holerite</h1>
              <h1 className="font-bold text-sm">Bem vindo de volta!</h1>
            </div>

            <form onSubmit={() => { console.log("") }} className="flex w-full flex-col gap-4 items-center">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="cpf">CPF</Label>
                <Input type="text" id="cpf" placeholder="000.000.000-00" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="senha">Senha</Label>
                <Input type="password" id="senha" placeholder="*********" />
              </div>
              <div className="flex w-full max-w-sm items-center gap-1.5">
                <Checkbox id="manter" />
                <Label htmlFor="manter" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Manter conectado
                </Label>
              </div>
              <Button className="mt-4 w-full max-w-sm">Entrar</Button>
              <Link href="/recuperar-senha" className="text-sm text-center">Esqueceu a senha?</Link>
            </form>
          </div>

        </div>

      </main>

    </>
  )
}
