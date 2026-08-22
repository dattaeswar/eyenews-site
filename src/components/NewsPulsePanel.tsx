import NewsPulseTabs from "@/components/NewsPulseTabs";
import { getNewsPulse } from "@/lib/news/fetch-news";

export default async function NewsPulsePanel() {
  const data = await getNewsPulse();
  return <NewsPulseTabs data={data} />;
}
