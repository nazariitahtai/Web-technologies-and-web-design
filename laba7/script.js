// Завдання 1
// Парна кількість параметрів  сума, непарна  віднімання від останнього до першого
function sumOrMinus() {
    if (arguments.length % 2 === 0) {
        let sum = 0;
        for (let i = 0; i < arguments.length; i++) {
            sum += arguments[i];
        }
        return sum;
    }

    let result = arguments[arguments.length - 1];
    for (let i = arguments.length - 2; i >= 0; i--) {
        result -= arguments[i];
    }
    return result;
}

function task1() {
    const text = document.getElementById("numbers").value;
    const numbers = text.split(",").map(Number);

    if (text.trim() === "" || numbers.some(isNaN)) {
        document.getElementById("result1").textContent = "Помилка! Введіть числа через кому.";
        return;
    }

    const result = sumOrMinus(...numbers);
    document.getElementById("result1").textContent = "Результат: " + result;
    console.log("sumOrMinus(" + numbers.join(", ") + ") =", result);
}


//Завдання 2
// Факторіал 
function factorialRecursion(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorialRecursion(n - 1);
}

function task2() {
    const n = Number(document.getElementById("factorialNumber").value);

    if (!Number.isInteger(n) || n < 0) {
        document.getElementById("result2").textContent = "Помилка! Введіть ціле невід'ємне число.";
        return;
    }

    const result = factorialRecursion(n);
    document.getElementById("result2").textContent = n + "! = " + result;
    console.log(n + "! =", result);
}


// Завдання 3
let numberOfRecusrionCalls = 0;
let numberOfMemoCalls = 0;

// Звичайна рекурсія
function fibonachiRecursion(numberInRow) {
    numberOfRecusrionCalls++;

    if (numberInRow <= 1) {
        return 1;
    }
    return fibonachiRecursion(numberInRow - 1) + fibonachiRecursion(numberInRow - 2);
}

// Мемоїзація за допомогою замикання
function createFibonachiMemo() {
    const cache = {}; // об'єкт для кешування

    return function fibonachiMemo(numberInRow) {
        numberOfMemoCalls++;

        if (numberInRow in cache) {
            return cache[numberInRow];
        }

        if (numberInRow <= 1) {
            cache[numberInRow] = 1;
        } else {
            cache[numberInRow] = fibonachiMemo(numberInRow - 1) + fibonachiMemo(numberInRow - 2);
        }
        return cache[numberInRow];
    };
}

function task3() {
    const n = Number(document.getElementById("fibNumber").value);

    if (!Number.isInteger(n) || n < 0 || n > 35) {
        document.getElementById("result3").textContent = "Помилка! Введіть ціле число від 0 до 35.";
        return;
    }

    // Обнуляємо лічильники перед новим обчисленням
    numberOfRecusrionCalls = 0;
    numberOfMemoCalls = 0;
    const fibonachiMemo = createFibonachiMemo();

    const recursionResult = fibonachiRecursion(n);
    const memoResult = fibonachiMemo(n);

    console.log(recursionResult, numberOfRecusrionCalls);
    console.log(memoResult, numberOfMemoCalls);

    document.getElementById("result3").innerHTML =
        "Рекурсія: результат " + recursionResult + ", викликів - " + numberOfRecusrionCalls + "<br>" +
        "Мемоїзація: результат " + memoResult + ", викликів - " + numberOfMemoCalls;
}