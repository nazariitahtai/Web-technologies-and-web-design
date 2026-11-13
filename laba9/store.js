// Батьківський клас товару
class Product {
    constructor(name, category, image) {
        this.name = name;
        this.category = category;
        this.image = image;
    }

    addToBasket() {
        console.log(`Product with name ${this.name} has been added to the basket`);
    }
}

// Взуття: категорія завжди 'shoe'
class Shoe extends Product {
    constructor(name, image) {
        super(name, "shoe", image);
    }
}

// Продукти: категорія завжди 'grocerie'
class Grocerie extends Product {
    constructor(name, image) {
        super(name, "grocerie", image);
    }
}

// Створює об'єкт Shoe або Grocerie з сутності json-файлу
function productFactory(item) {
    if (item.category === "shoe") {
        return new Shoe(item.name, item.image);
    }
    if (item.category === "grocerie") {
        return new Grocerie(item.name, item.image);
    }
    return null;
}

class Basket {
    products = [];

    add(product) {
        product.time = new Date();   // час додавання товару
        this.products.push(product);
        product.addToBasket();

        // Виводимо доданий товар і час на сторінку
        const li = document.createElement("li");
        li.innerHTML = `<span>${product.time.toLocaleTimeString("uk-UA")}</span> ${product.name}`;
        document.getElementById("basketList").appendChild(li);

        document.getElementById("basketCount").textContent = this.products.length;
        document.getElementById("emptyBasket").style.display = "none";
    }
}

class Store {
    products = [];

    constructor() {
        this.basket = new Basket();
    }

    // Створює масив products: кожна одиниця товару - окремий об'єкт
    fillStoreWithProducts(data) {
        this.products = [];
        data.forEach(item => {
            for (let i = 0; i < item.amount; i++) {
                const product = productFactory(item);
                if (product) {
                    this.products.push(product);
                }
            }
        });
    }

    // Скільки одиниць товару з такою назвою залишилось у магазині
    count(name) {
        return this.products.filter(p => p.name === name).length;
    }

    // Забирає один товар з магазину і додає його в кошик
    addToBasket(name) {
        const index = this.products.findIndex(p => p.name === name);

        if (index === -1) {
            alert(`Товар "${name}" закінчився`);
            return;
        }

        const product = this.products.splice(index, 1)[0];
        this.basket.add(product);
    }
}


// ===================== Робота зі сторінкою =====================

const store = new Store();
let data = []; // сутності з json-файлу

// Виведення товарів магазину на сторінку
function showProducts() {
    document.getElementById("shoes").innerHTML = "";
    document.getElementById("groceries").innerHTML = "";

    data.forEach(item => {
        const left = store.count(item.name);

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>В наявності: <b>${left}</b> шт.</p>
            <button ${left === 0 ? "disabled" : ""}>${left === 0 ? "Немає в наявності" : "Додати в кошик"}</button>
        `;

        card.querySelector("button").onclick = function () {
            store.addToBasket(item.name);
            showProducts();
        };

        const section = item.category === "shoe" ? "shoes" : "groceries";
        document.getElementById(section).appendChild(card);
    });
}

// Завантаження товарів з products.json
async function loadProducts() {
    try {
        const response = await fetch("products.json");
        data = await response.json();

        store.fillStoreWithProducts(data);
        showProducts();
    } catch (error) {
        document.getElementById("error").textContent =
            "Не вдалося завантажити products.json. Відкрийте сторінку через сервер (наприклад, XAMPP).";
    }
}

loadProducts();
