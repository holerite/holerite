import { db } from "@/data/database";
import { users } from "@/data/users";

export default async function Home() {
  const teste = await db.select().from(users).all()
  return (
    <h1>{JSON.stringify(teste)}</h1>
  );
}
