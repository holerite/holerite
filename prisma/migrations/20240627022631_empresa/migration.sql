-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Empresa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "cnpj" TEXT NOT NULL,
    "logo" TEXT,
    "nome_fantasia" TEXT
);
INSERT INTO "new_Empresa" ("cnpj", "id", "logo", "nome", "nome_fantasia") SELECT "cnpj", "id", "logo", "nome", "nome_fantasia" FROM "Empresa";
DROP TABLE "Empresa";
ALTER TABLE "new_Empresa" RENAME TO "Empresa";
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
