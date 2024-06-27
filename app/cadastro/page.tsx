"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cpf } from "@/utils/mascaras";
import { useState } from "react";
import banner from "@/public/banner.jpg";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const DADOS_INICIAIS = {
  cpf: "",
  nome: "",
  email: "",
  senha: "",
  confirmar: "",
};

export default function Login() {
  const [dados, setDados] = useState<typeof DADOS_INICIAIS>(DADOS_INICIAIS);
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => {
      return axios.post("/api/user/create", {
        ...dados,
      });
    },
    onError: (erro) => {
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar usuário",
        description: erro.message,
      });
    },
    onSuccess: (resposta) => {
      router.push(`/cadastro/empresa?key=${resposta.data.token}`);
    },
  });

  function toastErro(mensagem: string) {
    toast({
      variant: "destructive",
      title: "Erro ao cadastrar usuário",
      description: mensagem,
    });
  }

  function cadastrar(e: any) {
    e.preventDefault();

    if (!dados.nome) {
      toastErro("O nome é obrigatório!");
      return;
    }

    if (!dados.email) {
      toastErro("O email é obrigatório!");
      return;
    }

    if (!dados.cpf) {
      toastErro("O CPF é obrigatório!");
      return;
    }

    if (!dados.senha) {
      toastErro("A senha é obrigatória!");
      return;
    }

    if (!dados.confirmar || dados.confirmar !== dados.senha) {
      toastErro("Confirmação de senha incorreta!");
      return;
    }

    mutation.mutate();
  }

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
              onSubmit={cadastrar}
              className="flex w-full flex-col gap-4 items-center"
            >
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="nome">Nome </Label>
                <Input
                  value={dados.nome}
                  type="text"
                  id="nome"
                  onChange={(e) => {
                    setDados((anterior) => {
                      return {
                        ...anterior,
                        nome: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email </Label>
                <Input
                  value={dados.email}
                  type="email"
                  id="email"
                  onChange={(e) => {
                    setDados((anterior) => {
                      return {
                        ...anterior,
                        email: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  value={dados.cpf}
                  type="text"
                  id="cpf"
                  placeholder="000.000.000-00"
                  onChange={(e) => {
                    setDados((anterior) => {
                      return {
                        ...anterior,
                        cpf: cpf(e.target.value),
                      };
                    });
                  }}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  value={dados.senha}
                  type="password"
                  id="senha"
                  placeholder="*********"
                  onChange={(e) => {
                    setDados((anteriores) => {
                      return {
                        ...anteriores,
                        senha: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="senha">Confirmar senha</Label>
                <Input
                  value={dados.confirmar}
                  type="password"
                  id="confirmar-senha"
                  placeholder="*********"
                  onChange={(e) => {
                    setDados((anteriores) => {
                      return {
                        ...anteriores,
                        confirmar: e.target.value,
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
                Continuar
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
