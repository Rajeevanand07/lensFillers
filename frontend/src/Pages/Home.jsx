
import HeroSlider from "../components/HeroSlider";
import New_video from "../components/New_video";
import Love from "../components/Love";
import Info from "../components/info";
import Royal from "../components/Royal";
import Photo_gallery from "../components/Photo_gallery";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Info />
      <Photo_gallery/>
      <New_video />
      <Love />
      <Royal/>
    </>
  )
}
