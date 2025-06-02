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
        
        // Нормализуем строку (удаляем все пробелы)
        const cleanValue = value.replace(/\s/g, '');
        
        // Проверка на наличие хотя бы одного числа
        if (!/\d/.test(cleanValue)) {
            return { valid: false, message: 'Введите хотя бы одно число!' };
        }
        
        // Извлекаем все числа (игнорируем пустые элементы между запятыми)
        const numbers = cleanValue.split(',').filter(num => num !== '');
        
        // Проверка каждого числа
        for (const numStr of numbers) {
            const num = parseInt(numStr, 10);
            if (isNaN(num)) {
                return { valid: false, message: 'Допустимы только целые числа!' };
            }
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