/*
  Warnings:

  - Added the required column `perfil_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Empresa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "nome_fantasia" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Perfil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "permissao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Colaborador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EmpresaToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EmpresaToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EmpresaToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ColaboradorToEmpresa" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ColaboradorToEmpresa_A_fkey" FOREIGN KEY ("A") REFERENCES "Colaborador" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ColaboradorToEmpresa_B_fkey" FOREIGN KEY ("B") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "foto" TEXT,
    "perfil_id" INTEGER NOT NULL,
    CONSTRAINT "User_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "Perfil" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("cpf", "id", "nome", "senha") SELECT "cpf", "id", "nome", "senha" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Colaborador_cpf_key" ON "Colaborador"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "_EmpresaToUser_AB_unique" ON "_EmpresaToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EmpresaToUser_B_index" ON "_EmpresaToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ColaboradorToEmpresa_AB_unique" ON "_ColaboradorToEmpresa"("A", "B");

-- CreateIndex
CREATE INDEX "_ColaboradorToEmpresa_B_index" ON "_ColaboradorToEmpresa"("B");
