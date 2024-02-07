import { HomePageScreen } from "@/screen/HomePageScreen";
import { getAllCharacter } from "@/services/rickandmorty";

const getRickAndMortyData = async () => {
  try {
    const res = await getAllCharacter();
    return {list:res?.results || [], error:false};
  } catch (error) {
    console.error("Eroorrr");
    return {list:[], error:true};
  }
};

export default async function Home() {
  const rickAndMortydata = await getRickAndMortyData();
  return <HomePageScreen response={rickAndMortydata.list} error={rickAndMortydata.error}/>;
}
