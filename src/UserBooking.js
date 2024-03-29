import { useParams } from "react-router-dom";
import { API } from "./global";
import { useEffect, useState } from "react";

export function UserBooking() {
  // const hotels = [
  //   {
  //     id: "1",
  //     name: "Taj Hotel",
  //     city: "Mumbai",
  //     hotelType: "5 star",
  //     pricePerRoomPernight: "100000",
  //     image:
  //       "https://navbharattimes.indiatimes.com/thumb/95857952/facts-about-taj-hotel-mumbai-you-probably-didnt-know-about-95857952.jpg?imgsize=175834&width=1200&height=900&resizemode=75",
  //     phonenumber: "9989649278",
  //   },
  //   {
  //     id: "2",
  //     name: "The Oberoi Rajvilas, Jaipur",
  //     city: "Jaipur",
  //     hotelType: "4 star",
  //     pricePerRoomPernight: "50000",
  //     image:
  //       "https://cf.bstatic.com/xdata/images/hotel/max500/48356404.jpg?k=94a7dba4725f4284d857358a3aa6bea0e3b3d342e52fa60ae761e44ea35c5074&o=&hp=1",
  //   },
  //   {
  //     id: "3",
  //     name: " Taj Resort & Convention Centre, Goa",
  //     city: "Goa",
  //     hotelType: "4 star",
  //     pricePerRoomPernight: "18000",
  //     image:
  //       "https://media-cdn.tripadvisor.com/media/photo-s/1c/9e/a3/b4/roof-top-infinity-pool.jpg",
  //   },
  //   {
  //     id: "4",
  //     name: "Goldfinch Hotel Mumbai",
  //     city: "Mumbai",
  //     hotelType: "3 star",
  //     pricePerRoomPernight: "5999",
  //     image:
  //       "https://media-cdn.tripadvisor.com/media/photo-s/1d/02/e3/1c/goldfinch-mumbai.jpg",
  //   },
  //   {
  //     id: "5",
  //     name: "Roseate House",
  //     city: "Delhi",
  //     hotelType: "4 star",
  //     pricePerRoomPernight: "12500",
  //     image:
  //       "https://media-cdn.tripadvisor.com/media/photo-s/28/67/da/5a/pres-suite-bathroom-opt.jpg",
  //   },
  //   {
  //     id: "6",
  //     name: " Hotel Lakend",
  //     city: "udaipur",
  //     hotelType: "4 star",
  //     pricePerRoomPernight: "95000",
  //     image:
  //       "https://media-cdn.tripadvisor.com/media/photo-s/11/28/2e/21/hotel-lakend.jpg",
  //   },
  //   {
  //     id: "7",
  //     name: "Country Inn & Suites by Radisson Zirakpur",
  //     city: "zirakpur",
  //     hotelType: "3 star",
  //     pricePerRoomPernight: "7000",
  //     image:
  //       "https://media-cdn.tripadvisor.com/media/photo-s/1d/e9/ec/25/hotel-entrance.jpg",
  //   },
  //   {
  //     id: "8",
  //     name: "The Leaf Munnar",
  //     city: "Hydrabad",
  //     hotelType: "3 star",
  //     pricePerRoomPernight: "6400",
  //     image:
  //       "https://media-cdn.tripadvisor.com/media/photo-s/1d/5a/bf/58/the-leaf-munnar.jpg",
  //   },
  //   {
  //     id: "9",
  //     name: "Great Trails Kodaikanal By GRT Hotels",
  //     city: "Udaipur",
  //     hotelType: "4 star",
  //     pricePerRoomPernight: "12116",
  //     image:
  //       "https://media-cdn.tripadvisor.com/media/photo-s/0d/5c/46/c5/night-view-from-opps.jpg",
  //   },
  //   {
  //     id: "10",
  //     name: "Grand Chennai By GRT Hotels",
  //     city: "Chennai",
  //     hotelType: "4 star",
  //     pricePerRoomPernight: "6495",
  //     image:
  //       "https://media-cdn.tripadvisor.com/media/photo-s/0d/b1/35/26/img-20161121-135234-largejpg.jpg",
  //   },
  //   {
  //     id: "11",
  //     name: "Bella Vista Resort",
  //     city: "Jaipue",
  //     hotelType: "5 star",
  //     pricePerRoomPernight: "55000",
  //     image:
  //       "https://media-cdn.tripadvisor.com/media/photo-s/05/79/73/ec/bella-vista-resort.jpg",
  //   },
  // ];
  const { userIdS } = useParams();

  const details = {
    userId: userIdS,
  };
  let [hotels, setHotels] = useState([]);
  function getBookingDetails() {
    let res = fetch(`${API}/hotels/bookingDetails`, {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "content-type": "application/json",
      },
    });
    res.then((data) => data.json()).then((hotel) => setHotels(hotel));
  }

  useEffect(() => {
    getBookingDetails();
  }, []);
  return (
    <div>
      <h1>All Your Bookings available here</h1>
      {hotels.map((ele, index) => (
        <DisplayBookings hotelData={ele} key={index} />
      ))}
    </div>
  );
}
function DisplayBookings({ hotelData }) {
  return (
    <div className="hotelBookingContainer">
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
          <p>bookingDate:{hotelData.booking[0].checkin}</p>
        </div>
      </div>
    </div>
  );
}
