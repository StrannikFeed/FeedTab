/*document.addEventListener("DOMContentLoaded", function() {
  // Генерируем случайное число от 0 до 9
  var randomNumber = Math.floor(Math.random() * 10);

  // Получаем корневой элемент (:root)
  var root = document.documentElement;

  // Получаем переменную --xxx и заменяем ее на случайное число
  var varValue = "var(--" + randomNumber + ")";
  
  // Устанавливаем новое значение переменной --var
  root.style.setProperty('--var', varValue);
});*/

document.addEventListener('DOMContentLoaded', () => {
    const totalImages = 13; // Укажите общее количество изображений
    const images = [];

    for (let i = 0; i < totalImages; i++) {
        images.push(`${i}.gif`);
    }

    if (images.length > 0) {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.style.setProperty('--image', `url(image/${randomImage})`);
    }
});

function updateDateTime() {
    const now = new Date();
    
    // Получаем компоненты даты
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Месяцы с 0
    const year = String(now.getFullYear()).slice(-2); // Последние 2 цифры года
    
    // Получаем день недели
    const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dayOfWeek = daysOfWeek[now.getDay()];
    
    // Получаем компоненты времени
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Форматируем строку в нужном формате
    const formattedDateTime = `${day}.${month}.${year} ${dayOfWeek} ${hours}:${minutes}:${seconds}`;
    
    // Находим div и обновляем его содержимое
    const timeElement = document.querySelector('.time');
    if (timeElement) {
        timeElement.textContent = formattedDateTime;
    }
}

// Обновляем время сразу при загрузке
updateDateTime();

// Обновляем время каждую секунду
setInterval(updateDateTime, 1000);