import React, { useState } from 'react';
import axios from 'axios';

function Item() {
  const [items, setItems] = useState([{ id: Date.now(), image: null, title: '', description: '', quantity: 1, price: 0, date: '' }]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems(updatedItems);
  };

  const handleImageChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index].image = e.target.files[0];
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), image: null, title: '', description: '', quantity: 1, price: 0, date: '' }]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSaveItems = async () => {
    const formData = new FormData();
    formData.append('items', JSON.stringify(items));

    items.forEach((item, index) => {
      if (item.image) {
        formData.append('image', item.image);
      }
    });

    try {
      const response = await axios.post('https://crispy-broccoli-vj679996j7rcppw5-5000.app.github.dev/api/v1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        alert('Data added successfully')
      } else {
        alert('error occured');
      }
    } catch (error) {
      console.error('Error saving items:', error);
    }
  };

  return (
    <div>
      <h1>Item Manager</h1>

      {items.map((item, index) => (
        <div key={item.id} className="item-container">
          <div className="item-form">
            <input
              type="file"
              name='image'
              accept="image/*"
              onChange={(e) => handleImageChange(index, e)}
            />
            <input
              type="text"
              name="title"
              value={item.title}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Title"
            />
            <textarea
              name="description"
              value={item.description}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Description"
            />
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Quantity"
            />
            <input
              type="number"
              name="price"
              value={item.price}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Price"
            />
            <input
              type="date"
              name="date"
              value={item.date}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <div className="item-actions">
            {items.length > 1 && (
              <button
                className="action-button remove"
                onClick={() => handleRemoveItem(item.id)}
              >
                -
              </button>
            )}
            <button
              className="action-button add"
              onClick={handleAddItem}
            >
              +
            </button>
          </div>
        </div>
      ))}

      <button onClick={handleSaveItems}>Save Items</button>
      <button><a href='/list'>List</a></button>
    </div>
  );
}

export default Item;