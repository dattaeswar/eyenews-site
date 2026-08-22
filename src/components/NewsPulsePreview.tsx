import { GridArticleCard } from "@/components/ArticleCard";
import { getNewsPulse } from "@/lib/news/fetch-news";

export default async function NewsPulsePreview() {
  const data = await getNewsPulse();

  const topPerRegion = [
    data.andhraPradesh[0],
    data.telangana[0],
    data.india[0],
    data.international[0],
  ].filter(Boolean);

  topPerRegion.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  if (topPerRegion.length === 0) {
    return <p className="text-neutral-500">Sources are temporarily unavailable.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {topPerRegion.map((item) => (
        <GridArticleCard key={item.link} item={item} />
      ))}
    </div>
  );
}
