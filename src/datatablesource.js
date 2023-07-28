
export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "mobile",
    headerName: "User Mobile",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.phone}
        </div>
      );
    },
  },
  {
    field: "time",
    headerName: "Time & Date",
    width: 230,
  },

  {
    field: "name",
    headerName: "User",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

