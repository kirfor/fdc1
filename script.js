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
    
    // Функция нормализации ввода (удаление пробелов)
    const normalizeInput = (value) => {
        return value
            .replace(/\s*,\s*/g, ',')  // Удаляем пробелы вокруг запятых
            .replace(/^\s+|\s+$/g, ''); // Удаляем пробелы в начале и конце
    };
    
    const normValue1 = normalizeInput(input1.value);
    const normValue2 = normalizeInput(input2.value);
    
    // Проверка на пустые поля после нормализации
    if (!normValue1 || !normValue2) {
        if (!normValue1) input1.classList.add('error');
        if (!normValue2) input2.classList.add('error');
        errorMessage.textContent = 'Оба поля должны содержать числа!';
        errorMessage.style.display = 'block';
        return;
    }
    
    // Функция проверки последовательности чисел
    const validateNumberSequence = (value, inputElement) => {
        // Проверка формата (только цифры, запятые и пробелы, которые уже обработаны)
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
        for (let numStr of numbers) {
            const num = parseInt(numStr, 10);
            
            if (num < 1 || num > 254) {
                return { valid: false, message: 'Числа должны быть от 1 до 254!' };
            }
        }
        
        return { valid: true };
    };
    
    // Проверка обоих полей
    const validation1 = validateNumberSequence(normValue1, input1);
    const validation2 = validateNumberSequence(normValue2, input2);
    
    if (!validation1.valid || !validation2.valid) {
        let errorText = '';
        if (!validation1.valid) errorText += `Поле 1: ${validation1.message} `;
        if (!validation2.valid) errorText += `Поле 2: ${validation2.message}`;
        
        errorMessage.textContent = errorText.trim();
        errorMessage.style.display = 'block';
        
        if (!validation1.valid) input1.classList.add('error');
        if (!validation2.valid) input2.classList.add('error');
        return;
    }
    
    // Если все проверки пройдены
    alert(`Проверка успешна!\nПоле 1: ${normValue1}\nПоле 2: ${normValue2}`);
});

// Автоматическая очистка пробелов при вводе
[document.getElementById('input1'), document.getElementById('input2')].forEach(input => {
    input.addEventListener('input', function() {
        // Сохраняем позицию курсора
        const cursorPos = this.selectionStart;
        
        // Удаляем пробелы вокруг запятых
        this.value = this.value
            .replace(/\s*,\s*/g, ',')
            .replace(/^\s+/, '');
            
        // Восстанавливаем позицию курсора
        this.setSelectionRange(cursorPos, cursorPos);
    });
});