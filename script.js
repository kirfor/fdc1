document.getElementById('textForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const errorMessage = document.getElementById('error-message');
    
    // Сбрасываем стили ошибок
    input1.classList.remove('error');
    input2.classList.remove('error');
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
    
    // Проверка на пустые поля
    if (!input1.value.trim() || !input2.value.trim()) {
        if (!input1.value.trim()) {
            input1.classList.add('error');
        }
        if (!input2.value.trim()) {
            input2.classList.add('error');
        }
        errorMessage.textContent = 'Оба поля должны быть заполнены!';
        errorMessage.style.display = 'block';
        return;  // Прерываем выполнение, если есть ошибки
    }
    
    // Если всё заполнено, выводим результат
    alert(`Проверка пройдена!\nПоле 1: ${input1.value}\nПоле 2: ${input2.value}`);
    
    // Очистка полей после успешной проверки (опционально)
    input1.value = '';
    input2.value = '';
});