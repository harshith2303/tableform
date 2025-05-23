
import React, { useEffect, useState } from 'react';

function Tableform() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((rawData) => rawData.json())
      .then((finalData) => setData(finalData)).catch((err)=>alert("failed to fetch data"+err));
  }, []);

  
  const totalPages = Math.ceil(data.length / itemsPerPage);

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  const currentData = data.slice(startIndex, endIndex);

  
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ background: "rgb(224,219,219)", padding: "20px" }}>
      <h1>Employee Data Table</h1>
      <table style={{ width: "100%" }}>
        <thead>
          <tr style={{ background: "rgb(0,137,66)", color: "white" }}>
            <th style={{ border: "none" }}>Id</th>
            <th style={{ border: "none" }}>Name</th>
            <th style={{ border: "none" }}>Email</th>
            <th style={{ border: "none" }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((ele) => (
            <tr
              key={ele.id}
              style={{ background: "rgb(250, 250, 250)", color: "black", padding: "1px" }}
            >
              <td style={{ border: "none" }}>{ele.id}</td>
              <td style={{ border: "none" }}>{ele.name}</td>
              <td style={{ border: "none" }}>{ele.email}</td>
              <td style={{ border: "none" }}>{ele.role}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <div style={{ marginTop: "10px" }}>
        <button
          style={{ background: "rgb(0,137,66)", color: "white", marginRight: "5px" }}
          onClick={handlePrev}
        //   disabled={currentPage === 1}
        >
          Previous
        </button>

        <button style={{ background: "rgb(0,137,66)", color: "white", marginRight: "5px" }}>
          {currentPage}
        </button>

        <button
          style={{ background: "rgb(0,137,66)", color: "white" }}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Tableform;

