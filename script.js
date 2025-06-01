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
    
    // Функция проверки целого числа
    const validateInteger = (value, inputElement) => {
        // Проверка на целое число (дробные не допускаются)
        if (!/^\d+$/.test(value)) {
            inputElement.classList.add('error');
            return { valid: false, message: 'Допустимы только целые числа!' };
        }
        
        const number = parseInt(value, 10);
        
        if (number < 1 || number > 254) {
            inputElement.classList.add('error');
            return { valid: false, message: 'Число должно быть от 1 до 254!' };
        }
        
        return { valid: true };
    };
    
    // Проверка обоих полей
    const validation1 = validateInteger(input1.value, input1);
    const validation2 = validateInteger(input2.value, input2);
    
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