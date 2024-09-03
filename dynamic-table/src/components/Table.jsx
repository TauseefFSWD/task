import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch data from the API
  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=50")
      .then((response) => {
        setData(response.data.results);
        setFilteredData(response.data.results);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Handle sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    sortData(key, direction);
  };

  const sortData = (key, direction) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
  };

  // Handle search
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term !== "") {
      const filtered = data.filter(
        (user) =>
          user.name.first.toLowerCase().includes(term.toLowerCase()) ||
          user.name.last.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name"
        className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th
              className="p-3 text-left text-sm font-semibold text-gray-600 cursor-pointer"
              onClick={() => handleSort("name.first")}
            >
              First Name
            </th>
            <th
              className="p-3 text-left text-sm font-semibold text-gray-600 cursor-pointer"
              onClick={() => handleSort("name.last")}
            >
              Last Name
            </th>
            <th
              className="p-3 text-left text-sm font-semibold text-gray-600 cursor-pointer"
              onClick={() => handleSort("email")}
            >
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((user, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3 text-sm text-gray-700">{user.name.first}</td>
              <td className="p-3 text-sm text-gray-700">{user.name.last}</td>
              <td className="p-3 text-sm text-gray-700">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 flex justify-center">
        {Array.from(
          { length: Math.ceil(filteredData.length / itemsPerPage) },
          (_, i) => i + 1
        ).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 mx-1 rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
