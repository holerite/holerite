import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <h1> Landing page </h1>
      <Link href="/login">Login</Link>
      <Link href="/cadastro">Cadastrar</Link>
    </>
  );
}
