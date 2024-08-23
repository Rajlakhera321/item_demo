import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Item.css';

function ItemList() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchItems();
  }, [search, startDate, endDate, page]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://crispy-broccoli-vj679996j7rcppw5-5000.app.github.dev/api/v1/list', {
        params: {
          search,
          currentPage: page,
          startDate,
          endDate,
        },
      });
      setItems(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); 
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') setStartDate(value);
    if (name === 'endDate') setEndDate(value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="item-list-container">
      <h1>Items List</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={handleSearchChange}
        />
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleDateChange}
        />
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleDateChange}
        />
      </div>

      <table className="items-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                <img
                  src={`/${item.image}`}
                  alt={item.title}
                  className="item-image"
                />
              </td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={page === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ItemList;