import { createFileRoute } from "@tanstack/react-router";
import MoonLanding from "@/components/MoonLanding";

export const Route = createFileRoute("/")({
  component: MoonLanding,
  head: () => ({
    meta: [
      { title: "مصباح القمر الفاخر — أجواء ساحرة لدارك | Moon Luxe" },
      { name: "description", content: "حوّل أي غرفة لأجواء ساحرة مع مصباح القمر الفاخر. توصيل مجاني، الدفع عند الاستلام، +5000 زبون راضي." },
      { property: "og:title", content: "مصباح القمر الفاخر — أجواء ساحرة لدارك" },
      { property: "og:description", content: "إضاءة دافئة، ديكور أنيق، وهدية مثالية. اطلب الآن بـ 149 DH فقط." },
    ],
  }),
});
