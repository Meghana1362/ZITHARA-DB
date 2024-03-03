import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, [sortColumn, sortOrder, searchTerm]);

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5050/api/customers");
  //       console.log("Data:", response.data);
  //       setData(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     }
  //   };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/customers", {
        params: {
          sortBy: sortColumn,
          sortOrder: sortOrder.toUpperCase(),
          search: searchTerm,
        },
      });
      console.log("Data:", response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const columns = [
    {
      Header: "Serial No.",
      accessor: "sno",
      filterable: false,
      getHeaderProps: () => ({ style: { backgroundColor: '#00b386'  } }),
      width: 80,
    },
    {
      Header: "Customer Name",
      accessor: "customer_name",
      filterable: false,
      getHeaderProps: () => ({ style: { backgroundColor:'#00b386'  } }),
    },
    {
      Header: "Age",
      accessor: "age",
      filterable: false,
      getHeaderProps: () => ({ style: { backgroundColor: '#00b386'  } }),
    },
    {
      Header: "Phone",
      accessor: "phone",
      filterable: false,
      getHeaderProps: () => ({ style: { backgroundColor: '#00b386'  } }),
    },
    {
      Header: "Location",
      accessor: "location",
      filterable: false,
      getHeaderProps: () => ({ style: { backgroundColor: '#00b386'  } }),
    },
    {
      Header: "Created At",
      columns: [
        {
          Header: "Date",
          accessor: "date",
          filterable: false,
          getHeaderProps: () => ({ style: { backgroundColor:'#00b386'  } }),
        },
        {
          Header: "Time",
          accessor: "time",
          filterable: false,
          getHeaderProps: () => ({ style: { backgroundColor: '#00b386' } }),
        },
      ],
    },
  ];

  return (
    <div className="App" style={{ backgroundColor: '#9FF3DD' , display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        // Example using a simple dropdown, you can replace it with your preferred UI element
        <div style={{}}>
          
          <h1 style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>CUSTOMER DATABASE</h1>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label style={{ backgroundColor: '#00b386', padding: '5px', marginRight: '5px' }}>Sort By:</label>
          <select
            value={sortColumn}
            onChange={(e) => setSortColumn(e.target.value)}
          >
            <option value="date">Date</option>
            <option value="time">Time</option>
          </select>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label style={{ backgroundColor: '#00b386', padding: '5px', marginRight: '5px' }}>Sort Order:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label style={{ backgroundColor:'#00b386', padding: '5px', marginRight: '5px' }}>Search by Customer Name or Location:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /><br></br>
          <br></br>
          
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={20}
            pageSizeOptions={[10, 20, 30, 50]}
            filterable={true}
            sortable={true}
            //defaultSorted={[{ id: "created_at", desc: false }]}
            defaultSorted={[{ id: sortColumn, desc: sortOrder === "desc" }]}
            style={{ margin: '0 auto', backgroundColor: 'white',borderRadius: '10px', overflow: 'hidden',width : '110%'}}
            nextText={<span style={{backgroundColor:'#00b386', padding: '10px', borderRadius: '5px', color: 'white' }}>Next</span>}
  previousText={<span style={{ backgroundColor:'#00b386', padding: '10px', borderRadius: '5px', color: 'white' }}>Previous</span>}
          />
        </div>
      )}
    </div>
  );
}

export default App;










