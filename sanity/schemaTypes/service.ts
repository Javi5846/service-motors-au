import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "price",
      title: "Starting Price (AUD)",
      type: "number",
      description: "Optional. Leave blank if price varies.",
    }),
    defineField({
      name: "duration",
      title: "Estimated Duration",
      type: "string",
      description: "e.g. 30 min, 1 hour",
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description:
        "Lucide icon name (e.g. wrench, droplets, shield). For display on the website.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "price",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `From $${subtitle}` : "Price on request",
      };
    },
  },
});
