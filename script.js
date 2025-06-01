document.getElementById('textForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const value1 = document.getElementById('input1').value;
    const value2 = document.getElementById('input2').value;
    alert(`Поле 1: ${value1}\nПоле 2: ${value2}`);
    // Очистка полей после отправки (опционально)
    document.getElementById('input1').value = '';
    document.getElementById('input2').value = '';
});