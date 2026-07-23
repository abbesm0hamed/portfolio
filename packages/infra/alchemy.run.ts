import alchemy from "alchemy";
import { Astro } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const app = await alchemy("me");

export const web = await Astro("web", {
  assets: "../../apps/web/dist/client",
  bindings: {
    PUBLIC_SERVER_URL: alchemy.env.PUBLIC_SERVER_URL!,
  },
  cwd: "../../apps/web",
  entrypoint: "../../apps/web/dist/server/entry.mjs",
});

console.log(`Web    -> ${web.url}`);

await app.finalize();
