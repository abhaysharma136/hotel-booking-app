import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./global";

export function HomePage() {
  const navigate = useNavigate();
  let date = new Date();
  let day = date.getDay() + 2;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  let currentDate = `${year}-${month}-${day}`;
  // console.log(currentDate);
  let [checkinDate, setCheckInDate] = useState();

  // let OneDay = new Date(checkinDate);
  // OneDay.setDate(OneDay.getDate() + 1);
  // console.log(OneDay);
  // let day2 = OneDay.getDate();
  // let month2 = OneDay.getMonth() + 1;
  // let year2 = OneDay.getFullYear();
  // let minCheckOutDate = `${year2}-${month2}-${day2}`;
  // console.log(minCheckOutDate);

  // let [checkOutDate, setCheckOutDate] = useState();
  // console.log(checkOutDate);
  const bookingDate = {
    checkin: checkinDate,
  };
  const [hotels, setHotels] = useState([]);
  function getAllHotels() {
    let res = fetch(`${API}/hotels/checkAvailablity`, {
      method: "POST",
      body: JSON.stringify(bookingDate),
      headers: {
        "content-type": "application/json",
      },
    });
    res.then((data) => data.json()).then((hotel) => handleDate(hotel));
  }

  function handleDate(rest) {
    setHotels(rest);
    localStorage.setItem("travelDate", bookingDate.checkin);
  }

  let isLogin = localStorage.getItem("isLogin");
  function notLogin() {
    if (!isLogin) {
      navigate("/");
    }
  }

  useEffect(() => {
    notLogin();
  }, []);
  return (
    <div className="homeContainer">
      <h1>Book your hotels with us</h1>
      <div>
        <input
          type="date"
          id="start"
          name="trip-start"
          min={currentDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          required
        />
        <button
          onClick={() => getAllHotels()}
          disabled={checkinDate ? false : true}
        >
          Search Hotel
        </button>
      </div>
      <div className="hotelFlexDiv">
        {hotels.map((ele, index) => (
          <DisplayHotel hotelData={ele} key={index} />
        ))}
      </div>
    </div>
  );
}
function DisplayHotel({ hotelData }) {
  const navigate = useNavigate();
  return (
    <div className="hotelContainer">
      <img
        src={hotelData.image}
        alt={hotelData.name}
        width="300px"
        height="400px"
      />
      <div className="hotelSpecsDiv">
        <h4>{hotelData.name}</h4>
        <h4>Rating:{hotelData.hotelType}</h4>
        <h4>Contact:{hotelData.phonenumber}</h4>
        <h4>Price:{hotelData.pricePerRoomPernight}</h4>
        <div className="viewDetailsDiv">
          <button
            className="viewMoreButton"
            onClick={() => navigate(`/hotels/${hotelData._id}`)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
