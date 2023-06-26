import React, { useEffect } from "react";
import { useState } from "react";
import ReactStars from "react-stars";
import { ThreeDots } from "react-loader-spinner";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "../Firebase/firebase";
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const new_data = await getDocs(moviesRef);
      new_data.forEach((doc) => {
        setData((prev) => [...prev, {...(doc.data()), id: doc.id}]);
      });
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="flex flex-wrap justify-between px-3 mt-2">
      {loading ? (
        <div className="flex w-full justify-center items-center h-96">
          <ThreeDots height={40} color="white" />
        </div>
      ) : (
        data.map((e, i) => {
          return (
           <Link to={`/details/${e.id}`}><div
              key={i}
              className="card rounded-lg font-bold shadow-lg e p-1 hover:-translate-y-3 cursor-pointer mt-5 transition-all duration-500"
            >
              <img className="h-48 md:h-72 m-auto" src={e.image} alt="Tron" />
              <h1>
                 {e.title}
              </h1>
              <h1 className="flex items-center">
                <span className="text-red-400 mr-1">Rating:</span>
                <ReactStars
                  size={20}
                  half={true}
                  value={e.rating/e.rated}
                  edit={false}
                />
              </h1>
              <h1>
                <span className="text-red-400">Year:</span> {e.year}
              </h1>
            </div></Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;
