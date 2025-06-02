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
        
        // Удаляем пробелы в начале и конце
        const trimmedValue = value.trim();
        
        // Проверка на наличие хотя бы одного числа
        if (!/\d/.test(trimmedValue)) {
            return { valid: false, message: 'Введите хотя бы одно число!' };
        }
        
        // Проверка на пробелы между числами без запятых
        if (/(?<=\d)\s+(?=\d)/.test(trimmedValue)) {
            return { valid: false, message: 'Между числами должны быть запятые!' };
        }
        
        // Извлекаем все числа (игнорируя пробелы и лишние запятые)
        const numbers = trimmedValue.split(/[\s,]+/)
            .filter(num => num !== '' && !isNaN(num))
            .map(num => parseInt(num, 10));
        
        // Проверка каждого числа
        for (const num of numbers) {
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