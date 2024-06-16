import connectDB from "@/lib/mongoose";
import { Header, TopSellers } from "../components/index";
import { getCategory } from "./serverAction/apiCalls";
import { getUniqueData } from "@/utils/utility";
import userDb from "@/models/userDb";

export default async function Home() {
  const categoryData = await getCategory();
  await connectDB()

  return (
    <main className="maxWidth">
      <Header gameData={getUniqueData(categoryData?.specials?.items)} />
      <TopSellers gameData={getUniqueData(categoryData?.top_sellers?.items)} />
    </main>
  );
}
