import React, { useEffect, useState } from "react";
import { getTrending } from "../../services/FetchTopics";

const Trends = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getTrending().then((data) => {
      setTrending(data);
    });
  }, []);

  return (
    <div
      className="bg-white w-full p-5 rounded-lg"
      style={{ height: "max-content" }}>
      <p className="font-poppins font-semibold text-base mb-3">Trends</p>
      <hr />
      {trending.map((trend)=>{
        return(
        <div className="tags">
          <p className="py-2 font-noto font-semibold">{trend.topic}</p>
          <p className="font-noto font-medium text-grey-600">{trend.count} {trend.count === 1 ? "Tweet" : "Tweets"}</p>
        </div>
      )})}
    </div>
  );
};

export default Trends;
