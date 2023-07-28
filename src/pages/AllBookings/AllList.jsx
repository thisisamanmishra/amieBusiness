import "./AllList.scss"
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"

const AllList = () => {
  const { restaurant } = useSelector((state) => state.restaurantState);
  const [bookingData, setBookingData] = useState([]);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/myrestaurantbookings/${restaurant._id}`);
        console.log(response);
      
        const CompletedBookings = response.data.bookings.filter((booking) => {
          return booking.status === 'Complete';
        });

        setBookingData(CompletedBookings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable userData={bookingData} />
      </div>
    </div>
  )
}

export default AllList;