/**
 * Pré-renderiza rotas como HTML estático após o build.
 * O TanStack Start prerender nativo não funciona com nitro preset cloudflare_pages
 * (espera dist/server/server.js, mas o Nitro gera _worker.js).
 *
 * Resultado: Cloudflare Pages serve HTML do CDN — zero invocações de Worker.
 * Meta tags, canonical e JSON-LD permanecem intactos (gerados via head() no SSR).
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const ssrEntry = join(root, "node_modules/.nitro/vite/services/ssr/index.js");

function getPathsFromSitemap() {
  const sitemap = readFileSync(join(root, "public/sitemap.xml"), "utf8");
  return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
}

function pathToOutputFile(pathname) {
  if (pathname === "/") return join(distDir, "index.html");
  return join(distDir, pathname.slice(1), "index.html");
}

async function main() {
  const paths = getPathsFromSitemap();
  const { default: server } = await import(ssrEntry);

  console.log(`Pré-renderizando ${paths.length} páginas...`);

  for (const path of paths) {
    const response = await server.fetch(new Request(`http://localhost${path}`));
    if (!response.ok) {
      throw new Error(`Falha ao renderizar ${path}: HTTP ${response.status}`);
    }

    const html = await response.text();
    const outputFile = pathToOutputFile(path);
    mkdirSync(dirname(outputFile), { recursive: true });
    writeFileSync(outputFile, html, "utf8");
    console.log(`  ✓ ${path}`);
  }

  // Site 100% estático — remove Worker para não consumir cota de solicitações.
  const workerDir = join(distDir, "_worker.js");
  rmSync(workerDir, { recursive: true, force: true });
  console.log("Removido dist/_worker.js (sem SSR em runtime).");

  for (const stale of ["_routes.json", "nitro.json"]) {
    const file = join(distDir, stale);
    try {
      rmSync(file);
      console.log(`Removido dist/${stale}`);
    } catch {
      // ok se não existir
    }
  }

  writeFileSync(
    join(distDir, "_redirects"),
    "# Site estático — HTML pré-renderizado no build.\n",
    "utf8",
  );

  // Nitro gera .wrangler/deploy/config.json apontando para dist/_worker.js/wrangler.json.
  // Sem Worker, isso quebra o deploy no Cloudflare Pages.
  rmSync(join(root, ".wrangler"), { recursive: true, force: true });
  console.log("Removido .wrangler/ (config de Worker obsoleta).");

  console.log(`Pré-render concluído: ${paths.length} páginas em dist/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
