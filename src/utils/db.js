import { openDB } from 'idb';

// Инициализация базы данных
const DB_NAME = 'ImageGalleryDB';
const STORE_NAME = 'images';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('timestamp', 'timestamp');
        console.log('IndexedDB инициализирована');
      }
    },
  });
};

// Сохранить изображение в DB
export const saveImage = async (imageData) => {
  try {
    const db = await initDB();
    const id = await db.add(STORE_NAME, {
      data: imageData,        // base64 строка
      timestamp: Date.now(),
    });
    console.log('Изображение сохранено, id:', id);
    return id;
  } catch (error) {
    console.error('Ошибка сохранения:', error);
    return null;
  }
};

// Получить все изображения из DB
export const getAllImages = async () => {
  try {
    const db = await initDB();
    const images = await db.getAll(STORE_NAME);
    return images;
  } catch (error) {
    console.error('Ошибка получения:', error);
    return [];
  }
};

// Удалить изображение по id
export const deleteImage = async (id) => {
  try {
    const db = await initDB();
    await db.delete(STORE_NAME, id);
    console.log('Изображение удалено, id:', id);
    return true;
  } catch (error) {
    console.error('Ошибка удаления:', error);
    return false;
  }
};

// Получить случайное изображение
export const getRandomImage = async () => {
  const images = await getAllImages();
  if (images.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};