import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (AUD)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Oil", value: "Oil" },
          { title: "Filter", value: "Filter" },
          { title: "Brake Parts", value: "Brake Parts" },
          { title: "Accessories", value: "Accessories" },
          { title: "Other", value: "Other" },
        ],
      },
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "stripePriceId",
      title: "Stripe Price ID",
      type: "string",
      description:
        "The Stripe Price ID (e.g. price_xxx) from your Stripe dashboard.",
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
    },
  },
});
