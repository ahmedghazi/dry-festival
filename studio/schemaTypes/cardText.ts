import { defineField } from "sanity";
import { FiCreditCard } from "react-icons/fi";
import { getFirstBlockText } from "./lib/blockPreview";

export default defineField({
  name: "cardText",
  title: "Card Text",
  type: "object",
  icon: FiCreditCard,
  fields: [
    defineField({
      name: "title",
      type: "text",
      title: "Title",
    }),
    defineField({
      name: "text",
      type: "blockContent",
      title: "Text",
    }),
    defineField({
      name: "footerText",
      type: "string",
      title: "Footer Text",
    }),
    defineField({
      name: "color",
      type: "string",
      title: "Color",
      options: {
        list: [
          { title: "Black — #000000", value: "black" },
          { title: "Gray 50 — #dde0de", value: "gray-50" },
          { title: "Gray 100 — #c5c5c5", value: "gray-100" },
          { title: "Blue 50 — #84b0c5", value: "blue-50" },
          { title: "Blue 100 — #5098ec", value: "blue-100" },
          { title: "Blue 200 — #0000ed", value: "blue-200" },
          { title: "Red 50 — #e87568", value: "red-50" },
          { title: "Red 100 — #ff4b65", value: "red-100" },
          { title: "Pink 50 — #ff7cf2", value: "pink-50" },
          { title: "Pink 100 — #ff47f2", value: "pink-100" },
          { title: "Lime 100 — #83a613", value: "lime-100" },
          { title: "Green 100 — #268b09", value: "green-100" },
          { title: "Yellow 100 — #ffff26", value: "yellow-100" },
          { title: "Purple 100 — #6b33e1", value: "purple-100" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      text: "text",
      color: "color",
    },
    prepare(selection) {
      const { title, text, color } = selection;
      const firstText = getFirstBlockText(text);
      return {
        title: title || "Card Text",
        subtitle: firstText || (color ? `Color: ${color}` : "Card Text"),
      };
    },
  },
});
