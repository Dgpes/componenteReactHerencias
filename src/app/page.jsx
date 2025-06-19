import { Typography } from "@/components/ui";
import SensorsPage from "./sensors/page";
import SubsPage from "./subscriptions/page";
import Counter from "./counter/page";
import FileUploader from "./portal/page";
import Form from "./form/page";

export default function Home() {
  return (
    <main className="p-8 flex flex-col gap-10">
      <Typography variant="h1" color="white" className="font-bold text-center">
        Portal de gestión de Herencias
      </Typography>
      <Form/>
      <FileUploader/>
    </main>
  );
}
