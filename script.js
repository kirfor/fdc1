document.getElementById('textForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const errorMessage = document.getElementById('error-message');
    
    // Сбрасываем ошибки
    input1.classList.remove('error');
    input2.classList.remove('error');
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
    
    // Проверка на пустые поля
    if (!input1.value.trim() || !input2.value.trim()) {
        if (!input1.value.trim()) input1.classList.add('error');
        if (!input2.value.trim()) input2.classList.add('error');
        errorMessage.textContent = 'Оба поля должны быть заполнены!';
        errorMessage.style.display = 'block';
        return;
    }
    
    // Функция проверки последовательности
    const validateNumbers = (value, inputElement) => {
        // Проверка формата (только цифры и запятые)
        if (!/^[\d,]+$/.test(value)) {
            return { valid: false, message: 'Допустимы только цифры и запятые!' };
        }
        
        // Проверка на запятые в начале/конце или подряд
        if (/^,|,$|,,/.test(value)) {
            return { valid: false, message: 'Неправильное использование запятых!' };
        }
        
        // Разбиваем на числа
        const numbers = value.split(',');
        
        // Проверка каждого числа
        for (const numStr of numbers) {
            const num = parseInt(numStr, 10);
            if (num < 1 || num > 254) {
                return { valid: false, message: 'Числа должны быть от 1 до 254!' };
            }
        }
        
        return { valid: true };
    };
    
    // Проверка полей
    const validation1 = validateNumbers(input1.value, input1);
    const validation2 = validateNumbers(input2.value, input2);
    
    if (!validation1.valid || !validation2.valid) {
        let errors = [];
        if (!validation1.valid) errors.push(`Поле 1: ${validation1.message}`);
        if (!validation2.valid) errors.push(`Поле 2: ${validation2.message}`);
        
        errorMessage.textContent = errors.join(' ');
        errorMessage.style.display = 'block';
        
        if (!validation1.valid) input1.classList.add('error');
        if (!validation2.valid) input2.classList.add('error');
        return;
    }
    
    // Успех
    alert(`Проверка пройдена!\nПоле 1: ${input1.value}\nПоле 2: ${input2.value}`);
});