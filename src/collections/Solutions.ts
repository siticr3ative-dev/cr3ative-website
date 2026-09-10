import type { CollectionConfig } from "payload";

import { seoFields } from "../fields/seo";

export const Solutions: CollectionConfig = {
  slug: "solutions",
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
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "content",
      type: "richText",
    },
    {
      name: "icon",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "macroCategory",
      type: "relationship",
      relationTo: "solution-categories",
    },
    {
      name: "template",
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
