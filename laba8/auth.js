// ===================== Завдання 5. Валідація реєстрації та авторизації =====================

// Регулярний вираз для перевірки формату email
let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;

// Виведення помилки під полем (порожній текст - помилки немає)
function showError(id, message) {
    document.getElementById(id).innerHTML = message;
}

// ----- Форма реєстрації -----
function validateRegister() {
    let login = document.getElementById("login").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;
    let password2 = document.getElementById("regPassword2").value;
    let valid = true;

    // Логін: 3-20 символів, лише латинські літери та цифри
    if (login == "") {
        showError("loginf", "*дане поле обов'язкове для заповнення");
        valid = false;
    } else if (!/^[a-zA-Z0-9]{3,20}$/.test(login)) {
        showError("loginf", "*від 3 до 20 латинських літер або цифр");
        valid = false;
    } else {
        showError("loginf", "");
    }

    // Email
    if (email == "") {
        showError("regEmailf", "*дане поле обов'язкове для заповнення");
        valid = false;
    } else if (!email.match(emailRegex)) {
        showError("regEmailf", "*email введено не вірно");
        valid = false;
    } else {
        showError("regEmailf", "");
    }

    // Пароль: не менше 6 символів, хоча б одна цифра
    if (password.length < 6) {
        showError("regPasswordf", "*пароль має містити не менше 6 символів");
        valid = false;
    } else if (!/\d/.test(password)) {
        showError("regPasswordf", "*пароль має містити хоча б одну цифру");
        valid = false;
    } else {
        showError("regPasswordf", "");
    }

    // Повтор пароля
    if (password2 != password || password2 == "") {
        showError("regPassword2f", "*паролі не збігаються");
        valid = false;
    } else {
        showError("regPassword2f", "");
    }

    if (valid) {
        document.getElementById("registerResult").innerHTML = "Реєстрація успішна! Вітаємо, " + login + "!";
    } else {
        document.getElementById("registerResult").innerHTML = "";
    }

    return false; // сторінка не перезавантажується
}

// ----- Форма авторизації -----
function validateLogin() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let valid = true;

    if (email == "") {
        showError("emailf", "*дане поле обов'язкове для заповнення");
        valid = false;
    } else if (!email.match(emailRegex)) {
        showError("emailf", "*email введено не вірно");
        valid = false;
    } else {
        showError("emailf", "");
    }

    if (password == "") {
        showError("passwordf", "*введіть пароль");
        valid = false;
    } else {
        showError("passwordf", "");
    }

    if (valid) {
        document.getElementById("loginResult").innerHTML = "Вхід виконано!";
    } else {
        document.getElementById("loginResult").innerHTML = "";
    }

    return false;
}

// Перевірка під час введення: після зміни поля форма перевіряється знову,
// але тільки якщо під цим полем уже показано помилку
document.querySelectorAll("form[name='register'] input").forEach(function (input) {
    input.addEventListener("input", function () {
        if (document.getElementById(input.id + "f") && document.getElementById(input.id + "f").innerHTML != "") {
            validateRegister();
        }
    });
});

document.querySelectorAll("form[name='login'] input").forEach(function (input) {
    input.addEventListener("input", function () {
        if (document.getElementById(input.id + "f") && document.getElementById(input.id + "f").innerHTML != "") {
            validateLogin();
        }
    });
});
