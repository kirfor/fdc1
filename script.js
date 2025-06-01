document.getElementById('textForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const userText = document.getElementById('userInput').value;
    alert(`Вы ввели: ${userText}`);
    // Можно также вывести текст на страницу:
    // document.querySelector('.content').innerHTML += `<p>${userText}</p>`;
});
