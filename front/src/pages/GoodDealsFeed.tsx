import { useRecoilValue } from "recoil";
import { currentUserState } from "../atom/currentUserAtom";

const GoodDealsFeed = () => {
  const currentUser = useRecoilValue(currentUserState);
  console.log(">>>>curr user>>>", currentUser);
  return <div>Good Deals Feed</div>;
};

export default GoodDealsFeed;
