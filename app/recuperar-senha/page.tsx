import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import banner from '@/public/banner.jpg'


export default function RecuperarSenha() {

  return <>
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
              objectFit: "cover"
            }} />
        </div>
        <div className="rounded-sm md:rounded-r-lg w-full flex flex-col justify-center bg-white  p-8 items-center">

          <div className="mb-6">
            <h1>Logo Holerite</h1>
            <h1 className="font-bold text-sm">Recuperação de senha</h1>
          </div>

          <form className="flex w-full flex-col gap-4 items-center">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="cpf">CPF</Label>
              <Input type="text" id="cpf" placeholder="000.000.000-00" />
            </div>

            <Button className="mt-4 w-full max-w-sm">Enviar email de recuperação</Button>
            <Link href="/login" className="text-sm text-center underline">Voltar para login</Link>
          </form>
        </div>

      </div>

    </main>


  </>;
}
