import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const  CreateFood= () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    video: null,
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'video') {
      setFormData({ ...formData, video: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('video', formData.video);

    try {
      const response = await axios.post('http://localhost:4000/api/food/create',data,{withCredentials:true});
        console.log(response.data);
        navigate("/home")
      

        setMessage('✅ Food submitted successfully!');
        setFormData({ name: '', description: '', video: null });
      } catch (error) {
        console.log(error);
        setMessage(`❌ ${error.response?.data?.message || 'Upload failed'}`);
      } finally {
        setLoading(false);
      }
}

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">🍔 Add New Food</h2>

      {message && <div className="mb-4 text-sm text-center text-red-600">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-blue-400"
          ></textarea>
        </div>

        

        <div>
          <label className="block text-sm font-medium mb-1">Upload Video *</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleChange}
            required
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreateFood;
