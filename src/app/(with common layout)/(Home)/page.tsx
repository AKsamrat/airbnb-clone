import AvailableNextMonth from "@/component/home/AvailableNextMonth";
import FeaturedHome from "@/component/home/FeaturedHome";
import PopularNearby from "@/component/home/PopularHome";

const page = () => {
  return (
    <div>
      <PopularNearby></PopularNearby>
      <FeaturedHome></FeaturedHome>
      <AvailableNextMonth></AvailableNextMonth>
    </div>
  );
};

export default page;
