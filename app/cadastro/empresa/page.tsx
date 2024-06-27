"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import banner from "@/public/banner.jpg";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as jose from "jose";
import { cnpj } from "@/utils/mascaras/cpf";

const DADOS_INICIAIS = {
  cnpj: "",
  fantasia: "",
  usuario: -1,
};

export default function Login() {
  const [dados, setDados] = useState<typeof DADOS_INICIAIS>(DADOS_INICIAIS);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const mutation = useMutation({
    mutationFn: () => {
      return axios.post("/api/company/create", {
        ...dados,
      });
    },
    onError: (erro: any) => {
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar usuário",
        description: erro.response.data.message,
      });
    },
    onSuccess: () => {
      router.push("/login");
    },
  });

  function toastErro(mensagem: string) {
    toast({
      variant: "destructive",
      title: "Erro ao cadastrar usuário",
      description: mensagem,
    });
  }

  function realizarLogin(e: any) {
    e.preventDefault();

    if (!dados.cnpj) {
      toastErro("O CNPJ é obrigatório!");
      return;
    }

    mutation.mutate();
  }

  async function verificarToken() {
    const jwt = searchParams.get("key");
    if (!jwt) {
      router.push("/cadastro");
      return;
    }
    const payload = jose.decodeJwt(jwt);

    setDados((anterior) => {
      return {
        ...anterior,
        usuario: payload.id as number,
      };
    });
    console.log(payload);
  }

  useEffect(() => {
    verificarToken();
  }, []);

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
            </div>
            <form
              onSubmit={realizarLogin}
              className="flex w-full flex-col gap-4 items-center"
            >
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="nome">Nome Fantasia</Label>
                <Input
                  value={dados.fantasia}
                  type="text"
                  id="fantasia"
                  onChange={(e) => {
                    setDados((anterior) => {
                      return {
                        ...anterior,
                        fantasia: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="nome">CNPJ</Label>
                <Input
                  value={dados.cnpj}
                  type="text"
                  id="cnpj"
                  onChange={(e) => {
                    setDados((anterior) => {
                      return {
                        ...anterior,
                        cnpj: cnpj(e.target.value),
                      };
                    });
                  }}
                />
              </div>
              <Button
                isLoading={mutation.isPending}
                type="submit"
                className="mt-4 w-full max-w-sm"
              >
                Cadastrar
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
