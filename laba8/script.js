
const tabs = [
    {
        title: "Седани",
        text: "Класичні автомобілі з окремим багажним відділенням. Підходять для щоденних поїздок і подорожей.",
        models: ["Toyota Camry", "Honda Civic", "Hyundai Elantra"],
        image: "images/camry.jpg"
    },
    {
        title: "Хетчбеки",
        text: "Компактні та практичні автомобілі для міста з об'єднаним салоном і багажником.",
        models: ["Volkswagen Golf", "Ford Focus", "Peugeot 308"],
        image: "images/golf.jpg"
    },
    {
        title: "Кросовери",
        text: "Автомобілі з високим кліренсом, що поєднують комфорт легковика та прохідність позашляховика.",
        models: ["Toyota RAV4", "Kia Sportage", "Nissan Qashqai"],
        image: "images/rav4.jpg"
    },
    {
        title: "Електромобілі",
        text: "Автомобілі з електричним двигуном: тиха їзда, нульові викиди та низька вартість обслуговування.",
        models: ["Tesla Model 3", "Nissan Leaf", "Hyundai Ioniq 5"],
        image: "images/tesla3.jpg"
    },
    {
        title: "Бюджетні авто",
        text: "Недорогі автомобілі з простим обслуговуванням та доступними запчастинами.",
        models: ["Chevrolet Lanos", "Daewoo Sens", "ЗАЗ Forza"],
        image: "images/lanos.jpg"
    }
];

function info_for_tab(n) {
    const tab = tabs[n - 1];


    document.getElementById("tabContent").innerHTML =
        '<img src="' + tab.image + '" alt="' + tab.title + '">' +
        "<div>" +
        "<h3>" + tab.title + "</h3>" +
        "<p>" + tab.text + "</p>" +
        "<p><b>Популярні моделі:</b></p>" +
        "<ul><li>" + tab.models.join("</li><li>") + "</li></ul>" +
        "</div>";

    // Змінюємо стиль: активний таб - темний, інші - світлі
    for (let i = 1; i <= tabs.length; i++) {
        document.getElementById("tab" + i).style.backgroundColor = "#e1edf5";
        document.getElementById("tab" + i).style.color = "#19344d";
    }
    document.getElementById("tab" + n).style.backgroundColor = "#244b68";
    document.getElementById("tab" + n).style.color = "white";
}

info_for_tab(1); // при завантаженні відкривається перший таб


//  Завдання 3. 


const slides = [
    { image: "images/elantra.jpg", text: "Hyundai Elantra" },
    { image: "images/civic.jpg", text: "Honda Civic" },
    { image: "images/focus.jpg", text: "Ford Focus" },
    { image: "images/sportage.jpg", text: "Kia Sportage" },
    { image: "images/ioniq5.jpg", text: "Hyundai Ioniq 5" }
];

let slideIndex = 0;  // індекс першого видимого слайда
const visible = 3;   // скільки слайдів видно одночасно

function plusSlide() {
    showSlides(slideIndex + 1);
}

function minusSlide() {
    showSlides(slideIndex - 1);
}

function showSlides(n) {
 
    if (n >= slides.length) {
        n = 0;
    }
    if (n < 0) {
        n = slides.length - 1;
    }
    slideIndex = n;

    const container = document.getElementById("slides");
    container.innerHTML = ""; // очищуємо слайдер


    for (let i = 0; i < visible; i++) {
        const slide = slides[(slideIndex + i) % slides.length];

        const item = document.createElement("div");
        item.className = "item";

        const img = document.createElement("img");
        img.src = slide.image;
        img.alt = slide.text;

        const caption = document.createElement("p");
        caption.textContent = slide.text;

        item.appendChild(img);
        item.appendChild(caption);
        container.appendChild(item);
    }
}

showSlides(slideIndex);


//  Завдання 4. Валідація форми підбору авто 

// Кожна функція перевіряє одне поле і виводить повідомлення під ним.
// Викликаються під час введення (oninput) та при відправленні форми.

function checkSurname() {
    let x = document.forms["form"]["surname"].value.trim();
    if (x.length == 0) {
        document.getElementById("surnamef").innerHTML = "*дане поле обов'язкове для заповнення";
        return false;
    }
    document.getElementById("surnamef").innerHTML = "";
    return true;
}

function checkName() {
    let x = document.forms["form"]["name"].value.trim();
    if (x.length == 0) {
        document.getElementById("namef").innerHTML = "*дане поле обов'язкове для заповнення";
        return false;
    }
    document.getElementById("namef").innerHTML = "";
    return true;
}

function checkEmail() {
    let y = document.forms["form"]["email"].value.trim();
    // Перевіряємо, чи містить email символи @ і . (крапка)
    let at = y.indexOf("@");
    let dot = y.lastIndexOf(".");
    if (at < 1 || dot < at + 2) {
        document.getElementById("emailf").innerHTML = "*email введено не вірно";
        return false;
    }
    document.getElementById("emailf").innerHTML = "";
    return true;
}

function checkPhone() {
    let phone = document.forms["form"]["phone"].value.trim();
    // Формат: +380 і ще 9 цифр
    if (!/^\+380\d{9}$/.test(phone)) {
        document.getElementById("phonef").innerHTML = "*формат: +380501234567";
        return false;
    }
    document.getElementById("phonef").innerHTML = "";
    return true;
}

function checkBody() {
    if (document.forms["form"]["body"].value == "") {
        document.getElementById("bodyf").innerHTML = "*оберіть тип кузова";
        return false;
    }
    document.getElementById("bodyf").innerHTML = "";
    return true;
}

// Перевірка всієї форми при натисканні "Відправити"
function validate() {
    // Викликаємо всі перевірки, щоб показати всі помилки одразу
    let ok1 = checkSurname();
    let ok2 = checkName();
    let ok3 = checkEmail();
    let ok4 = checkPhone();
    let ok5 = checkBody();

    if (ok1 && ok2 && ok3 && ok4 && ok5) {
        document.getElementById("formResult").innerHTML = "Заявку відправлено! Ми підберемо для вас автомобіль.";
    } else {
        document.getElementById("formResult").innerHTML = "";
    }

    return false; // сторінка не перезавантажується
}

// Очищення повідомлень при натисканні "Скасувати"
function clearErrors() {
    const errors = document.getElementsByClassName("error");
    for (let i = 0; i < errors.length; i++) {
        errors[i].innerHTML = "";
    }
    document.getElementById("formResult").innerHTML = "";
    document.getElementById("priceValue").innerHTML = "20000$";
}