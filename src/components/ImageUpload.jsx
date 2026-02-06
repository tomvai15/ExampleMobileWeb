import { useState } from 'react';
import './ImageUpload.css';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className="image-upload-container">
      <h1>Image Upload</h1>
      <p className="subtitle">Upload and preview your images</p>

      <div className="upload-section">
        {!previewUrl ? (
          <label className="upload-box">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            <div className="upload-content">
              <svg
                className="upload-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="upload-text">Click to upload an image</p>
              <p className="upload-hint">PNG, JPG, GIF up to 10MB</p>
            </div>
          </label>
        ) : (
          <div className="preview-section">
            <div className="image-preview">
              <img src={previewUrl} alt="Preview" className="preview-image" />
            </div>
            <div className="image-info">
              <p className="image-name">{selectedImage?.name}</p>
              <p className="image-size">
                {(selectedImage?.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button onClick={handleClearImage} className="clear-button">
              Clear Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
