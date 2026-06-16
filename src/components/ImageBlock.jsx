import React, { useState, useEffect } from 'react';
import { saveImage, deleteImage, getAllImages } from '../utils/db';
import '../styles/ImageBlock.css';

function ImageBlock() {
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageId, setCurrentImageId] = useState(null);
  const [currentFileType, setCurrentFileType] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Загружаем случайное изображение
  useEffect(() => {
    loadRandomImage();
  }, []);

  const loadRandomImage = async () => {
    const images = await getAllImages();
    if (images.length === 0) {
      setCurrentImage(null);
      setCurrentImageId(null);
      setCurrentFileType(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * images.length);
    const image = images[randomIndex];
    setCurrentImage(image.data);
    setCurrentImageId(image.id);
    if (image.data.startsWith('data:video/')) {
      setCurrentFileType('video');
    } else {
      setCurrentFileType('image');
    }
  };

  // Обработка drag & drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      alert('Пожалуйста, перетащите изображение или видео!');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target.result;
      const id = await saveImage(base64);
      if (id) {
        setCurrentImage(base64);
        setCurrentImageId(id);
        if (file.type.startsWith('video/')) {
          setCurrentFileType('video');
        } else {
          setCurrentFileType('image');
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Обработка клика
  const handleClick = () => {
    loadRandomImage();
  };

  // Удаление
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (currentImageId) {
      await deleteImage(currentImageId);
      await loadRandomImage();
    }
  };

  return (
    <div
      className="image-container"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      {currentImage ? (
        <>
          {currentFileType === 'video' ? (
            <video 
              src={currentImage} 
              className="image" 
              autoPlay 
              muted 
              loop 
              playsInline
            />
          ) : (
            <img src={currentImage} alt="Gallery" className="image" />
          )}
          {showDelete && (
            <button className="delete-btn" onClick={handleDelete}>
              ✕
            </button>
          )}
        </>
      ) : (
        <div className="image-placeholder">
          <span>Перетащите картинку или гифку сюда</span>
        </div>
      )}

      {isDragging && (
        <div className="drag-overlay">
          <span>Отпустите, чтобы загрузить</span>
        </div>
      )}
    </div>
  );
}

export default ImageBlock;