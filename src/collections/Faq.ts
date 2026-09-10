import type { CollectionConfig } from "payload";

export const Faq: CollectionConfig = {
  slug: "faq",
  admin: {
    useAsTitle: "question",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "question",
      type: "text",
      required: true,
    },
    {
      name: "answer",
      type: "richText",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "faq-categories",
    },
    {
      name: "order",
      type: "number",
    },
  ],
};
