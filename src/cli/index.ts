#!/usr/bin/env node
import * as path from "path";
import * as fs from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chokidar from "chokidar";
import chalk from "chalk";
import { loadTranslations, generateLocaleFileContent } from "../core/generator";
import { Logger } from "../type/logger";

chalk.level = 1;

// Define CLI options
const argv = yargs(hideBin(process.argv))
  .option("localesDir", {
    alias: "l",
    type: "string",
    demandOption: true,
    description: "Directory containing translation JSON files (e.g., ./locales)",
  })
  .option("outputFile", {
    alias: "o",
    type: "string",
    demandOption: true,
    description: "Output path for the generated TS file (e.g., ./src/i18nKey.ts)",
  })
  .option("languages", {
    alias: "L",
    type: "string",
    demandOption: true,
    description: "Language codes to process (comma-separated, e.g., ja,en)",
  })
  .option("namespace", {
    alias: "n",
    type: "string",
    description: "Target namespace (e.g., common)",
  })
  .option("watch", {
    alias: "w",
    type: "boolean",
    default: false,
    description: "(Optional) Enable watch mode to automatically regenerate the file when translations change.",
  })
  .help()
  .parseSync();

// Resolve paths and values from the options
const localesDirPath = path.resolve(process.cwd(), argv.localesDir);
const outputFilePath = path.resolve(process.cwd(), argv.outputFile);
const languages = (argv.languages as string).split(",").map((s) => s.trim());
const namespace = argv.namespace;
const defaultName = path.parse(outputFilePath).name;

const logger: Logger = {
  info: (msg: string) => console.log(chalk.green(msg)),
  warn: (msg: string) => console.warn(chalk.yellow(msg)),
  error: (msg: string) => console.error(chalk.red(msg)),
};

// Function to load translation files and generate a TS file
function updateTranslations(): void {
  try {
    const translations = loadTranslations(localesDirPath, languages);
    const fileContent = generateLocaleFileContent(translations, namespace, languages, defaultName, logger);
    fs.writeFileSync(outputFilePath, fileContent, "utf-8");
    logger.info(`[Generated] TS file at: ${outputFilePath}`);
  } catch (err) {
    logger.error(`[Error] During file generation: ${err}`);
  }
}

// Initial generation
updateTranslations();

// If the --watch option is enabled, use chokidar to monitor the specified directory
if (argv.watch) {
  logger.info(`[Watch] Monitoring directory: ${localesDirPath}`);
  const watcher = chokidar.watch(localesDirPath, { ignoreInitial: true });
  watcher.on("change", (changedPath: string) => {
    logger.info(`[Changed] File updated: ${changedPath}`);
    updateTranslations();
  });
}
