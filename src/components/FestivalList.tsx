import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { FestivalData } from "./FestivalInfo";

const API_URL = import.meta.env.VITE_APP_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const List = () => {
  const [festivalData, setFestivalData] = useState<FestivalData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [selectYear, setSelectYear] = useState(2024);
  const [searchText, setSearchText] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFestivalData(page, searchText, selectYear);
  }, [page]);

  useEffect(() => {
    setPage(1);
    setFestivalData([]);
  }, [searchText, selectYear]);

  useEffect(() => {
    if (page === 1) {
      fetchFestivalData(1, searchText, selectYear);
    }
  }, [searchText, selectYear, page]);

  const fetchFestivalData = async (
    pageNumber: number,
    searchText: string,
    year: number
  ) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_URL}?serviceKey=${API_KEY}&numOfRows=9&pageNo=${pageNumber}&type=json`
      );
      const data = await response.json();

      if (!data.response || !data.response.body || !data.response.body.items) {
        setIsLoading(false);
        return;
      }

      const filteredData = data.response.body.items.filter(
        (festival: FestivalData) => {
          const startDate = new Date(festival.fstvlStartDate);
          return (
            startDate.getFullYear() === year &&
            festival.fstvlNm.toLowerCase().includes(searchText.toLowerCase())
          );
        }
      );

      setFestivalData((prevData) =>
        pageNumber === 1 ? filteredData : [...prevData, ...filteredData]
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching festival data:", error);
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      containerRef.current &&
      window.innerHeight + window.scrollY >=
        containerRef.current.offsetHeight &&
      !isLoading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = () => {
    setPage(1);
    setFestivalData([]);
    fetchFestivalData(1, searchText, selectYear);

    if (searchText.length < 1) {
      alert("검색어를 입력 해 주세요");
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(e.target.value);
    setSelectYear(selectedYear);
  };

  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goRead = (festival: FestivalData) => {
    navigate("/read", { state: festival });
  };

  return (
    <nav ref={containerRef} className="festival_list">
      <div className="search_list">
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" ? handleSearch() : null;
          }}
          placeholder="패스티벌을 검색해 주세요."
        />
        <button className="search_btn" onClick={handleSearch}>
          검색
        </button>
        <select
          className="search_year"
          value={selectYear}
          onChange={handleYearChange}
        >
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
        </select>
      </div>

      <div className="list_up">
        {festivalData.map((festival, index) => (
          <div
            key={`${festival.fstvlNm}-${index}`}
            onClick={() => goRead(festival)}
          >
            <div className="list_img">
              <img src="../img_loading.png" alt="Festival Thumbnail" />
            </div>
            <div className="list_title">{festival.fstvlNm}</div>
          </div>
        ))}
        <span className="upIcon">
          <img
            src="../upIcon.png"
            className="upIcon"
            onClick={moveTop}
            alt="Scroll to Top"
          />
        </span>
      </div>
    </nav>
  );
};

export default List;
