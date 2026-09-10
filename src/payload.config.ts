import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Faq } from "./collections/Faq";
import { FaqCategories } from "./collections/FaqCategories";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { SolutionCategories } from "./collections/SolutionCategories";
import { Solutions } from "./collections/Solutions";
import { StoryCategories } from "./collections/StoryCategories";
import { Stories } from "./collections/Stories";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    StoryCategories,
    Stories,
    SolutionCategories,
    Solutions,
    FaqCategories,
    Faq,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  sharp,
});
