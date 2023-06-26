import React, { useContext, useEffect } from "react";
import ReactStars from "react-stars";
import { useState } from "react";
import { reviewsRef, db } from "../Firebase/firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import sweetAlert from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

const Review = ({ id, prevRating, userRated }) => {
  const useAppstate =useContext(Appstate);
  const navigate = useNavigate();
  
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const [reviewload, setReviewload] = useState(false);
  const [newadd, setNewadded] = useState(0);

  const sendreview = async () => {
    setLoading(true);
    try {
      if(useAppstate.login){
        await addDoc(reviewsRef, {
          movieid: id,
          name: useAppstate.userName,
          rating: rating,
          thought: form,
          timestamp: new Date().getTime(),
        });
        const ref = doc(db, "movies", id);
        await updateDoc(ref, {
          rating: prevRating + rating,
          rated: userRated + 1,
        });

        setRating(0);
        setForm("");
        setNewadded(newadd + 1);
        sweetAlert({
          title: "Successfully Added",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
      }
      else{
        navigate('/login');
      }
    } catch (error) {
      sweetAlert({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setReviewload(true);
      setData([]);
      let quer = query(reviewsRef, where("movieid", "==", id));
      const querRes = await getDocs(quer);
      querRes.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });

      setReviewload(false);
    }
    getData();
  }, [newadd]);

  return (
    <div className="mt-2 py-1 border-t-2 border-gray-700 w-full">
      <ReactStars
        size={25}
        half={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder="Share Your Thoughts"
        className="w-full m-2 p-2 outline-none header"
      />
      <button
        onClick={sendreview}
        className="bg-green-600 w-full flex justify-center p-2 hover:bg-green-700 m-2 mt-1"
      >
        {loading ? <TailSpin height={20} color="white" /> : "Share"}
      </button>

      {reviewload ? (
        <div className="mt-8 flex justify-center">
          <ThreeDots height={10} color="white" />
        </div>
      ) : (
        <div className="mt-4">
          {data.map((e, i) => {
            return (
              <div className=" p-2 mt-2 w-full border-b border-gray-500" key={i}>
                <div className="flex items-center">
                  <p className="text-blue-300">{e.name}</p>
                  <p className="ml-3 text-xs">
                    ({new Date(e.timestamp).toLocaleString()})
                  </p>
                </div>
                <ReactStars
                  size={15}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
                <p>{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Review;
