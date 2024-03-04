import { useState } from 'react';
import itemService from '../services/item.service';

const CreateItem = () => {
  const [filedUpload, setFileUpload] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
  });

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleChangeFileUpload = (e) => {
    setFileUpload(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('thumbnail', filedUpload);
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('price', formData.price);

      const res = await itemService.createItem(data);

      if (res) {
        alert(res.msg);
        setFileUpload(null);
        setFormData({
          name: '',
          category: '',
          price: '',
        });
        console.log('File uploaded successfully: ', res.data);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <form onSubmit={handleSubmit} className='max-w-lg mx-auto'>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
            Name
          </label>
          <input
            type='text'
            name='name'
            className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
            value={formData.name}
            onChange={handleChangeFormData}
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='filedUpload'
            className='block text-gray-700 font-bold mb-2'>
            Thumbnail
          </label>
          <input
            type='file'
            name='fileUpload'
            className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
            onChange={handleChangeFileUpload}
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='category'
            className='block text-gray-700 font-bold mb-2'>
            Category
          </label>
          <input
            type='text'
            name='category'
            className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
            value={formData.category}
            onChange={handleChangeFormData}
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='price' className='block text-gray-700 font-bold mb-2'>
            Price
            <span className='text-xs italic'>(Unit: VND)</span>
          </label>
          <input
            type='text'
            name='price'
            className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
            value={formData.price}
            onChange={handleChangeFormData}
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600'>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
