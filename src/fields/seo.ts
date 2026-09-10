import type { Field } from "payload";

export const seoFields = (): Field => ({
  name: "seo",
  type: "group",
  label: "SEO",
  fields: [
    {
      name: "metaTitle",
      type: "text",
    },
    {
      name: "metaDescription",
      type: "textarea",
    },
    {
      name: "metaImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "canonicalUrl",
      type: "text",
    },
    {
      name: "noIndex",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "ogTitle",
      type: "text",
    },
    {
      name: "ogDescription",
      type: "textarea",
    },
    {
      name: "ogImage",
      type: "upload",
      relationTo: "media",
    },
  ],
});
