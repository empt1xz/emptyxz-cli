#!/usr/bin/env node

import { input } from "@inquirer/prompts";
import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  readdirSync,
  rmSync,
} from "node:fs";
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
      message: "What's name of your project?",
      validate(value) {
        if (!value.trim()) {
          return "Enter a name for the project.";
        }

        if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
          return "Use only letters, numbers, hyphens, or underscores.";
        }

        return true;
      },
    });
  }

  console.log("");
  console.log("✅ Creating project in Next.js | by: Emptyxz.dev");
  console.log(`📦 Name of project: ${projectName}`);
  console.log("");

  const result = spawnSync(
    "npx",
    [
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
    ],
    {
      shell: true,
      stdio: "pipe",
      encoding: "utf-8",
    },
  );

  if (result.status !== 0) {
    console.log("❌ Error creating the project.");

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

  copyFileSync(
    path.join(templatePath, "page.tsx"),
    path.join(appPath, "page.tsx"),
  );

  copyFileSync(
    path.join(templatePath, "layout.tsx"),
    path.join(appPath, "layout.tsx"),
  );

  copyFileSync(
    path.join(templatePath, "globals.css"),
    path.join(appPath, "globals.css"),
  );

  copyFileSync(
    path.join(templatePath, "favicon.ico"),
    path.join(appPath, "favicon.ico"),
  );

  console.log("✅ Template Emptyxz applied.");
  console.log(`✅ Project successfully created in ./${projectName}`);
} else {
  console.log("Emptyxz CLI");
}