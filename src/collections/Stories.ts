import type { CollectionConfig } from "payload";

import { seoFields } from "../fields/seo";

export const Stories: CollectionConfig = {
  slug: "stories",
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
      name: "cover",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "client",
      type: "text",
    },
    {
      name: "content",
      type: "richText",
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "story-categories",
      hasMany: true,
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
