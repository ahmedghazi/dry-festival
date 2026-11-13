import { defineField } from "sanity";
import { AiOutlineColumnHeight } from "react-icons/ai";

export default defineField({
  name: "sepUI",
  title: "Séparateur",
  type: "object",
  icon: AiOutlineColumnHeight,
  fields: [
    defineField({
      name: "size",
      type: "string",
      title: "taille",
      options: {
        list: [
          { title: "Petit", value: "sm" },
          { title: "Moyen", value: "md" },
          { title: "Grand", value: "lg" },
          { title: "Très Grand", value: "xl" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      subtitle: "size",
    },
  },
});
