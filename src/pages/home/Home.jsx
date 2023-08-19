import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";



const Home = () => {
  const { restaurant } = useSelector((state) => state.restaurantState);
  const [userData, setUserData] = useState([]);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/myrestaurantbookings/${restaurant._id}`);
      
      
        // Filter the bookings with status === 'Checked' or status === 'Processing'
        const pendingAndProcessingBookings = response.data.bookings.filter((booking) => {
          return booking.status === 'Checked' || booking.status === 'Processing' || booking.status === 'Complete';
        });

        setUserData(pendingAndProcessingBookings);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [restaurant._id]);
  

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          {/* <Widget type="earning" /> */}
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months Bookings" aspect={2 / 1} userData={userData} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
