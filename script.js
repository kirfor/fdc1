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
    
    // Функция проверки последовательности
    const validateSequence = (value) => {
        // Проверка на нечисловые символы (кроме пробелов и запятых)
        if (/[^\d\s,]/.test(value)) {
            return { valid: false, message: 'Допустимы только цифры, пробелы и запятые!' };
        }
        
        // Получаем все числа
        const numbers = value.match(/\d+/g) || [];
        
        // Проверка на наличие чисел
        if (numbers.length === 0) {
            return { valid: false, message: 'Введите хотя бы одно число!' };
        }
        
        // Если чисел больше одного - проверяем разделители
        if (numbers.length > 1) {
            // Создаем регулярное выражение для проверки разделителей между числами
            const separatorRegex = new RegExp(
                numbers.map(num => `${num}\\s*[,]+\\s*`).join('|').slice(0, -8) + 
                `${numbers[numbers.length-1]}$`
            );
            
            if (!separatorRegex.test(value)) {
                return { valid: false, message: 'Между числами должны быть запятые!' };
            }
        }
        
        // Проверка каждого числа
        for (const numStr of numbers) {
            const num = parseInt(numStr, 10);
            if (num < 1 || num > 254) {
                return { valid: false, message: 'Числа должны быть от 1 до 254!' };
            }
        }
        
        return { valid: true, numbers: numbers };
    };
    
    // Проверка обоих полей
    const validation1 = validateSequence(input1.value);
    const validation2 = validateSequence(input2.value);
    
    // Собираем ошибки
    const errors = [];
    if (!validation1.valid) errors.push(`Поле 1: ${validation1.message}`);
    if (!validation2.valid) errors.push(`Поле 2: ${validation2.message}`);
    
    // Показываем ошибки
    if (errors.length > 0) {
        errorMessage.textContent = errors.join(' ');
        errorMessage.style.display = 'block';
        
        if (!validation1.valid) input1.classList.add('error');
        if (!validation2.valid) input2.classList.add('error');
        return;
    }
    
    // Если все проверки пройдены
    alert(`Проверка успешна!\nПоле 1: ${validation1.numbers.join(', ')}\nПоле 2: ${validation2.numbers.join(', ')}`);
});