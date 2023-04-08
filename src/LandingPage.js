import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();
  let id = localStorage.getItem("id");

  return (
    <div className="landingPageContainer">
      <h1 className="landingPageHeading">GAST</h1>
      <h4>We treat our guest better then anyone</h4>
      <button
        className="getStartedButton"
        onClick={() => {
          id ? navigate("/home") : navigate("/login");
        }}
      >
        GET STARTED
      </button>
    </div>
  );
}
