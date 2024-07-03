import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  likeFestival,
  interestingFestival,
  toobadFestival,
} from "../redux/action";

import "../App.css";
import { FestivalData } from "./FestivalInfo";

const API_URL = import.meta.env.VITE_APP_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export interface FestivalEvaluation {
  like: number;
  interesting: number;
  toobad: number;
}

const FestivalRead = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const festival = state as FestivalData;

  useEffect(() => {
    const $title = document.getElementsByTagName("title")[0];
    $title.innerText = festival.fstvlNm;
  }, [festival.fstvlNm]);

  const { like, interesting, toobad } = useSelector(
    (state: RootState) => state.festivalEvalution
  );

  const handleLike = () => {
    dispatch(likeFestival());
  };

  const handleInteresting = () => {
    dispatch(interestingFestival());
  };

  const handleToobad = () => {
    dispatch(toobadFestival());
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFestivalData = async () => {
      try {
        const response = await fetch(
          `${API_URL}?serviceKey=${API_KEY}&numOfRows=1&pageNo=1&type=json`
        );
        const data = await response.json();
        const filteredData = data.response.body.items.filter(
          (festival: FestivalData) => {
            const startDate = new Date(festival.fstvlStartDate);
            return startDate >= new Date(2022, 1, 1);
          }
        );
        console.log(filteredData);
      } catch (error) {
        console.error("Error fetching festival data:", error);
      }
    };

    fetchFestivalData();
  }, []);

  const goSearch = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="festival_read">
        <div>
          <div>
            <img src="../img_loading.png" className="read_img" />
          </div>
          <div className="read_content_out">
            <div className="read_content_in">
              <h2>{festival.fstvlNm}</h2>
              <h3>{festival.opar}</h3>
              <p>
                <span className="festival_info_name">기간</span>
                <span className="festival_info_detail">
                  {festival.fstvlStartDate} ~ {festival.fstvlEndDate}
                </span>
              </p>
              <p>
                <span className="festival_info_name">축제정보 </span>
                <span className="festival_info_detail">{festival.fstvlCo}</span>
              </p>

              <p>
                <span className="festival_info_name">홈페이지 </span>
                <span className="festival_info_detail">
                  <a href={festival.homepageUrl}>{festival.homepageUrl}</a>
                </span>
              </p>
              <p>
                <span className="festival_info_name">주소 </span>
                <span className="festival_info_detail">{festival.rdnmadr}</span>
              </p>
              <p>
                <span className="festival_info_name">주관 </span>
                <span className="festival_info_detail">{festival.mnnstNm}</span>
              </p>
              <p>
                <span className="festival_info_name">전화번호 </span>
                <span className="festival_info_detail">
                  {festival.phoneNumber}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <ul className="festival_Eval">
        <li>
          <button type="button" className="eval_btn" onClick={handleLike}>
            <img className="eval_img" src="../like.png" />
            <span className="eval_text">좋아요</span>
            <em className="eval_count">{like}</em>
          </button>
        </li>
        <li className="festival_Eval">
          <button
            type="button"
            className="eval_btn"
            onClick={handleInteresting}
          >
            <img className="eval_img" src="../interesting.png" />
            <span className="eval_text">유익해요</span>
            <em className="eval_count">{interesting}</em>
          </button>
        </li>
        <li className="festival_Eval">
          <button type="button" className="eval_btn" onClick={handleToobad}>
            <img className="eval_img" src="../toobad.png" />
            <span className="eval_text">아쉬워요</span>
            <em className="eval_count">{toobad}</em>
          </button>
        </li>
      </ul>

      <div className="go_search">
        <button onClick={goSearch}>목록</button>
      </div>
    </>
  );
};

export default FestivalRead;
