#!/usr/bin/env node
import { input } from "@inquirer/prompts";
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, readdirSync, rmSync, } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.join(__dirname, "..", "template");
const args = process.argv.slice(2);
const command = args[0];
let projectName = args[1];
if (command === "init") {
    if (!projectName) {
        projectName = await input({
            message: "Qual será o nome do projeto?",
            validate(value) {
                if (!value.trim()) {
                    return "Informe um nome para o projeto.";
                }
                if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
                    return "Use apenas letras, números, hífen ou underscore.";
                }
                return true;
            },
        });
    }
    console.log("");
    console.log("✅ Criando projeto Next.js | by: Emptyxz.dev");
    console.log(`📦 Nome do projeto: ${projectName}`);
    console.log("");
    const result = spawnSync("npx", [
        "create-next-app@latest",
        projectName,
        "--typescript",
        "--eslint",
        "--no-tailwind",
        "--src-dir",
        "--app",
        "--import-alias",
        "@/*",
        "--no-agents-md",
    ], {
        shell: true,
        stdio: "pipe",
        encoding: "utf-8",
    });
    if (result.status !== 0) {
        console.log("❌ Erro ao criar o projeto.");
        if (result.stderr) {
            console.log(result.stderr);
        }
        process.exit(1);
    }
    const projectPath = path.join(process.cwd(), projectName);
    const appPath = path.join(projectPath, "src", "app");
    const publicPath = path.join(projectPath, "public");
    const pageModuleCssPath = path.join(appPath, "page.module.css");
    if (existsSync(pageModuleCssPath)) {
        rmSync(pageModuleCssPath, {
            force: true,
        });
    }
    if (existsSync(publicPath)) {
        for (const file of readdirSync(publicPath)) {
            rmSync(path.join(publicPath, file), {
                recursive: true,
                force: true,
            });
        }
    }
    copyFileSync(path.join(templatePath, "page.tsx"), path.join(appPath, "page.tsx"));
    copyFileSync(path.join(templatePath, "layout.tsx"), path.join(appPath, "layout.tsx"));
    copyFileSync(path.join(templatePath, "globals.css"), path.join(appPath, "globals.css"));
    copyFileSync(path.join(templatePath, "favicon.ico"), path.join(appPath, "favicon.ico"));
    console.log("✅ Template Emptyxz aplicado.");
    console.log(`✅ Projeto criado com sucesso em ./${projectName}`);
}
else {
    console.log("Emptyxz CLI");
}
//# sourceMappingURL=index.js.map