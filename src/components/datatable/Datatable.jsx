import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { changeBookingStatus } from '../../redux/actions/restaurantAction';
import { Select, MenuItem } from '@mui/material';

const Datatable = ({ userData }) => {
  const dispatch = useDispatch();
  const { isLoading, allBookings } = useSelector((state) => state.restaurantState);

  const [bookingRef, setBookingRef] = useState(undefined);
  
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(userData); // Set the data state with the passed userData prop
  }, [userData]);

//   const completeHandler = () => {
//     dispatch(changeBookingStatus("complete", bookingRef._id));
//     setBookingRef(undefined);
// }
// const handleCompleteBooking = async (bookingId) => {
//   try {
//     // Make a POST request to update the booking status to "Complete"
//     await axios.post(`/api/v1/updateBookingStatus/${bookingId}`, { status: 'Complete' });

//     // After updating the status, fetch the updated bookings again
//     fetchData();
//   } catch (error) {
//     console.error('Error updating booking status:', error);
//   }
// };



  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">Checked In</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Completed
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        All Pending Bookings
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        getRowId={(row) => row._id}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
