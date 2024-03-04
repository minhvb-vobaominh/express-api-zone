import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeBody = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:8000/item');
        const { data } = res.data;

        if (data && data.length > 0) {
          const formattedData = data.map((item) => {
            const { thumbnail_path, ...rest } = item;
            return {
              ...rest,
              thumbnail_url:
                'http://localhost:8000/item/' +
                thumbnail_path.toString().replaceAll(/\\/g, '/'),
            };
          });
          setItems(formattedData);
        } else {
          setItems(data);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleChangeSearch = () => {};

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className='px-5'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search items...'
          className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
          value={searchTerm}
          onChange={handleChangeSearch}
        />
      </div>

      <div className='mb-4'>
        <select
          className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
          value={filter}
          onChange={handleChangeFilter}>
          <option value='all'>All categories</option>
          <option value='technology'>Technology</option>
          <option value='fiction'>Fiction</option>
        </select>
      </div>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-4'>All Items</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {items.map((item) => (
            <div key={item.id} className='bg-white rounded-lg shadow-md p-4'>
              <img
                src={item.thumbnail_url}
                alt={item.name}
                className='w-full h-40 object-cover mb-4'
              />
              <h2 className='text-lg font-bold'>{item.name}</h2>
              <p className='text-gray-600 mb-2'>Price: ${item.price}</p>
              <p className='text-gray-600'>Category: {item.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
