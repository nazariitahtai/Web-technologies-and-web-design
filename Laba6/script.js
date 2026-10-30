function showSymbol() {
    const symbols = [")", "!", "@", "#", "$", "%", "^", "&", "*", "("];
    let repeat = true;

    while (repeat) {
        const answer = prompt("Введіть цифру від 0 до 9:");

        if (answer === null) {
            break;
        }

        const value = answer.trim();

        if (value.length !== 1 || value < "0" || value > "9") {
            alert("Помилка! Потрібно ввести одну цифру від 0 до 9.");
            continue;
        }

        const number = Number(value);

        alert(
            "Цифра: " + number +
            "\nСпеціальний символ: " + symbols[number]
        );

        repeat = confirm("Бажаєте перевірити іншу цифру?");
    }
}

showSymbol();