import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = () => {

  const [Data, setData] = useState([])
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);
    formData.append('video', video);
  
    try {
      const response = await axios.post('https://mern-backened-ojlq.onrender.com/products', formData);
  
      console.log('Product created:', response.data);
      // Show success message
      alert('Product created successfully');
  
      fetchData();

      // Reset form fields after successful submission
      setTitle('');
      setDescription('');
      setThumbnail(null);
      setVideo(null);
    } catch (error) {
      console.error('Error creating product:', error.response.data.error);
      // Show error message
      alert('Error creating product: ' + error.response.data.error);
    }
  };
  

  async function fetchData() {
    try {
      const response = await axios.get('https://mern-backened-ojlq.onrender.com/products');
      console.log('Data:', response.data);
      setData(response.data)
      return response.data; // Return the data if needed
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Throw the error if needed
    }
  }
  
  // Call the async function
  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);



  // styles 
  const formStyles = {
    backgroundColor: '#f5f5f5',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
  };

  const inputContainer = {
    marginBottom: '20px',
  };

  const labelStyles = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333',
  };

  const inputStyles = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    outline: 'none',
  };

  const textareaStyles = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    outline: 'none',
    resize: 'vertical',
    minHeight: '100px',
  };

  const fileInputStyles = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    outline: 'none',
    cursor: 'pointer',
  };

  const buttonStyles = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  };

  
  return (
    <>
    
<form onSubmit={handleSubmit} style={formStyles}>
  <div style={inputContainer}>
    <label htmlFor="title" style={labelStyles}>Title:</label>
    <input
      type="text"
      id="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      style={inputStyles}
      required
    />
  </div>

  <div style={inputContainer}>
    <label htmlFor="description" style={labelStyles}>Description:</label>
    <textarea
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      style={textareaStyles}
      required
    ></textarea>
  </div>

  <div style={inputContainer}>
    <label htmlFor="thumbnail" style={labelStyles}>Thumbnail:</label>
    <input
      type="file"
      id="thumbnail"
      accept="image/*"
      onChange={(e) => setThumbnail(e.target.files[0])}
      style={fileInputStyles}
      required
    />
  </div>

  <div style={inputContainer}>
    <label htmlFor="video" style={labelStyles}>Video:</label>
    <input
      type="file"
      id="video"
      accept="video/*"
      onChange={(e) => setVideo(e.target.files[0])}
      style={fileInputStyles}
      required
    />
  </div>

  <button type="submit" style={buttonStyles}>UPLOAd</button>
</form>


   

<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {Data?.map((product, index) => (
          <div
            key={index}
            style={{
              width: '300px',
              margin: '20px',
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              position: 'relative',
            }}
          >
            <img
              src={product.thumbnailUrl}
              alt={product.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.5';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
              }}
              onClick={() => {
                window.open(product.videoUrl, '_blank');
              }}
            />
            <h3 style={{ marginTop: '10px' }}>{product.title}</h3>
            <p style={{ marginTop: '10px' }}>{product.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductForm;
