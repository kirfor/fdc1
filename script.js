// Автоматическое открытие модального окна при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    // Закрытие модального окна при клике на крестик
    document.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Обработка отправки формы
    document.getElementById('textForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const userText = document.getElementById('userInput').value;
        alert(`Вы ввели: ${userText}`);
        modal.style.display = 'none';
    });
});
