import type { CollectionConfig } from "payload";

import { seoFields } from "../fields/seo";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "pageTemplate",
      type: "select",
      required: true,
      defaultValue: "default",
      options: [
        {
          label: "Default",
          value: "default",
        },
      ],
    },
    seoFields(),
  ],
};
