import { useNavigate } from "react-router-dom";
import "../App.css";

const Header = () => {
  const navigate = useNavigate();

  const goSearch = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="MyHeader">
      <img src="../LOGO.png" className="title_img" onClick={goSearch} />
    </div>
  );
};

export default Header;
