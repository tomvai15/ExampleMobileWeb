import { useState } from 'react';
import './ImageUpload.css';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success' or 'error'

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
    setUploadStatus(null);
  };

  const handleUploadToServer = async () => {
    if (!selectedImage) return;

    setUploading(true);
    setUploadStatus(null);

    try {
      // Placeholder: Simulate server upload
      const formData = new FormData();
      formData.append('image', selectedImage);

      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // TODO: Replace with actual server endpoint
      // const response = await fetch('YOUR_API_ENDPOINT', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();

      console.log('Image would be uploaded:', selectedImage.name);
      setUploadStatus('success');
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
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
              capture="environment"
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

            {uploadStatus === 'success' && (
              <div className="status-message success">
                ✓ Image uploaded successfully!
              </div>
            )}
            {uploadStatus === 'error' && (
              <div className="status-message error">
                ✗ Upload failed. Please try again.
              </div>
            )}

            <div className="button-group">
              <button
                onClick={handleUploadToServer}
                className="upload-button"
                disabled={uploading || uploadStatus === 'success'}
              >
                {uploading ? 'Uploading...' : uploadStatus === 'success' ? 'Uploaded' : 'Upload to Server'}
              </button>
              <button onClick={handleClearImage} className="clear-button">
                Clear Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
