import { Plugin, ViteDevServer } from "vite";
import * as fs from "fs";
import * as path from "path";
import { loadTranslations, generateLocaleFileContent } from "../core/generator";
import { Logger } from "../type/logger";

const PLUGIN_NAME = "vite-plugin-i18next-ts-bond";

export interface I18nPluginOptions {
  /** [Required] Directory containing the translation JSON files (e.g., "./locales") */
  localesDir: string;
  /** [Required] Output path for the generated TS file (e.g., "./src/i18nKey.ts") */
  outputFile: string;
  /** [Required] Array of language codes to process (e.g., ["ja", "en"]) */
  languages: string[];
  /** Target namespace (e.g., "common") */
  namespace?: string;
}

/**
 * Vite plugin that generates a TypeScript constants object with JSDoc comments
 * from translation JSON files.
 */
export default function i18nextTsBondVitePlugin(options: I18nPluginOptions): Plugin {
  // Extract necessary values from options and convert to absolute paths once.
  const { localesDir, outputFile, languages, namespace } = options;
  const localesDirPath = path.resolve(process.cwd(), localesDir);
  const outputFilePath = path.resolve(process.cwd(), outputFile);
  const defaultName = path.parse(outputFilePath).name;

  /**
   * Loads translation files, generates TS file content, and writes it to disk.
   * @param logger Logger (plugin instance during build or server.config.logger during development)
   */
  function updateTranslations(logger: Logger): void {
    const translations = loadTranslations(localesDirPath, languages);
    const fileContent = generateLocaleFileContent(translations, namespace, languages, defaultName, logger);
    fs.writeFileSync(outputFilePath, fileContent, "utf-8");
  }

  return {
    name: PLUGIN_NAME,

    // Execute file generation once at the start of the build.
    buildStart() {
      try {
        updateTranslations(this);
        this.info(`[${PLUGIN_NAME}] Generated TS file at: ${outputFilePath}`);
      } catch (err) {
        this.error(`[${PLUGIN_NAME}] Error during file generation: ${err}`);
      }
    },

    // During development, watch for changes in JSON files and regenerate accordingly.
    configureServer(server: ViteDevServer) {
      const { watcher, ws, config } = server;
      watcher.add(localesDirPath);
      watcher.on("change", (changedPath: string) => {
        if (changedPath.startsWith(localesDirPath)) {
          try {
            updateTranslations(config.logger);
            ws.send({
              type: "full-reload",
              path: "*",
            });
            config.logger.info(`[${PLUGIN_NAME}] Updated TS file at: ${outputFilePath}`);
          } catch (err) {
            config.logger.error(`[${PLUGIN_NAME}] Error while watching file changes: ${err}`);
          }
        }
      });
    },
  };
}
