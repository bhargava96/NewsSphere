import { feeds } from "../config/feeds";
import Feed from "./Feed";

const FeedList = () => {
  return (
    <div className="row g-3 mt-3">
      {Object.entries(feeds).map(([key, feed]) => (
        <div className="col-12 col-md-6" key={key}>
          <Feed feedKey={key} feed={feed} />
        </div>
      ))}
    </div>
  );
};

export default FeedList;
