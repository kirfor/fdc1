document.getElementById('textForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const errorMessage = document.getElementById('error-message');
    
    // Сбрасываем предыдущие ошибки
    input1.classList.remove('error');
    input2.classList.remove('error');
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
    
    // Проверка на пустые поля
    if (!input1.value.trim() || !input2.value.trim()) {
        if (!input1.value.trim()) {
            input1.classList.add('error');
            input1.focus();
        }
        if (!input2.value.trim()) {
            input2.classList.add('error');
            if (!input1.value.trim()) input2.focus();
        }
        errorMessage.textContent = 'Оба поля должны быть заполнены!';
        errorMessage.style.display = 'block';
        return;
    }
    
    // Функция проверки последовательности чисел
    const validateNumberSequence = (value, inputElement) => {
        // Разбиваем строку по запятым
        const numbers = value.split(',');
        
        // Проверка каждого числа
        for (let numStr of numbers) {
            numStr = numStr.trim();
            
            // Проверка на пустые элементы (например, если введено "1,,2")
            if (numStr === '') {
                return { valid: false, message: 'Обнаружена пустая позиция между запятыми!' };
            }
            
            // Проверка что это целое число
            if (!/^\d+$/.test(numStr)) {
                return { valid: false, message: 'Допустимы только целые числа!' };
            }
            
            const num = parseInt(numStr, 10);
            
            // Проверка диапазона
            if (num < 1 || num > 254) {
                return { valid: false, message: 'Числа должны быть от 1 до 254!' };
            }
        }
        
        return { valid: true };
    };
    
    // Проверка обоих полей
    const validation1 = validateNumberSequence(input1.value, input1);
    const validation2 = validateNumberSequence(input2.value, input2);
    
    if (!validation1.valid || !validation2.valid) {
        let errorText = '';
        if (!validation1.valid) errorText += `Поле 1: ${validation1.message} `;
        if (!validation2.valid) errorText += `Поле 2: ${validation2.message}`;
        
        errorMessage.textContent = errorText.trim();
        errorMessage.style.display = 'block';
        
        if (!validation1.valid) input1.focus();
        else if (!validation2.valid) input2.focus();
        return;
    }
    
    // Если все проверки пройдены
    alert(`Проверка успешна!\nПоле 1: ${input1.value}\nПоле 2: ${input2.value}`);
    
    // Очистка полей (опционально)
    input1.value = '';
    input2.value = '';
});