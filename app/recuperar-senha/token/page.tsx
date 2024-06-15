import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export default function Token() {
  return <>
    <main className="bg-slate-300 w-screen h-screen flex items-center justify-center">

      <div className="w-[80vw] h-[80vh] flex">
        <div className="hidden md:block relative w-full bg-white">
          <Image
            fill
            alt="banner de login"
            src={"/banner.jpg"}
            className="rounded-lg"
            style={{
              maxWidth: "100%",
              height: "auto",
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
              <Label >
                Código de recuperação</Label>
              <InputOTP maxLength={8} >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                  <InputOTPSlot index={6} />
                  <InputOTPSlot index={7} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button className="mt-4 w-full max-w-sm">Enviar</Button>
          </form>
        </div>

      </div>

    </main>


  </>;
}
