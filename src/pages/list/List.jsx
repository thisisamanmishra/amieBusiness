import "./list.scss"
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"

const List = () => {
  const { restaurant } = useSelector((state) => state.restaurantState);
  const [userData, setUserData] = useState([]);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/myrestaurantbookings/${restaurant._id}`);
      
      
        // Filter the bookings with status === 'Checked' or status === 'Processing'
        const pendingAndProcessingBookings = response.data.bookings.filter((booking) => {
          return booking.status === 'Checked' || booking.status === 'Processing';
        });

        setUserData(pendingAndProcessingBookings);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [restaurant._id]);

 


  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable userData={userData} />
      </div>
    </div>
  )
}

export default List