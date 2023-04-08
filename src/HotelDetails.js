import { useNavigate, useParams } from "react-router-dom";
import { API } from "./global";
import { useEffect, useState } from "react";

export function HotelDetails() {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  let bookingDate = localStorage.getItem("travelDate");
  let userId = localStorage.getItem("id");
  const bookingData = {
    checkin: bookingDate,
    bookingId: userId,
  };
  function bookHotel() {
    let res = fetch(`${API}/hotels/booking/${hotelId}`, {
      method: "PUT",
      body: JSON.stringify(bookingData),
      headers: {
        "content-type": "application/json",
      },
    });
    res.then((dat) => handleResult(dat));
  }

  const handleResult = (val) => {
    alert("Successfully booked hotel");
    navigate(`/currentBookings/${userId}`);
  };

  const [hotelData, setHotelData] = useState([]);
  function getHotelDetails() {
    let res = fetch(`${API}/hotels/${hotelId}`, {
      method: "GET",
    });
    res.then((data) => data.json()).then((hotel) => setHotelData(hotel));
  }

  useEffect(() => {
    getHotelDetails();
  }, []);
  return (
    <div className="hotelDetailsContainer">
      <div>
        <div className="detailsFirstDiv">
          <div>
            <h2>{hotelData.name}</h2>
          </div>
          <img
            src={hotelData.image}
            alt="hotelImage"
            width="400px"
            height="300px"
          />
        </div>
        <div className="detailsSecondDiv">
          <div>Hotel Ratings:{hotelData.hotelType}⭐</div>
          <div>City:{hotelData.city}</div>
          <div>Price/night:{hotelData.pricePerRoomPernight}</div>
          <button onClick={() => bookHotel()}>Book Now</button>
        </div>
      </div>
    </div>
  );
}
