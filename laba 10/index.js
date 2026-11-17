const categoriesList = document.getElementById('categories');
const productsBlock = document.getElementById('products');
const title = document.getElementById('title');
const seeAllButton = document.getElementById('see-all');

async function fetchProducts() {
    try {
        productsBlock.textContent = 'Завантаження...';
        const res = await fetch('https://dummyjson.com/products?limit=0');
        const data = await res.json();

        console.log(data);

        title.textContent = 'Усі товари';
        showProducts(data.products);
    } catch (error) {
        console.error(error);
        productsBlock.textContent = 'Не вдалося завантажити товари';
    }
}

async function fetchProductsByCategory(category) {
    try {
        productsBlock.textContent = 'Завантаження...';
        const res = await fetch(`https://dummyjson.com/products/category/${category.slug}`);
        const data = await res.json();

        title.textContent = category.name;
        showProducts(data.products);
    } catch (error) {
        console.error(error);
        productsBlock.textContent = 'Не вдалося завантажити товари';
    }
}

async function fetchProductById(id) {
    try {
        productsBlock.textContent = 'Завантаження...';
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const product = await res.json();

        showProduct(product);
    } catch (error) {
        console.error(error);
        productsBlock.textContent = 'Не вдалося завантажити товар';
    }
}

async function fetchCategories() {
    try {
        const res = await fetch('https://dummyjson.com/products/categories');
        const categories = await res.json();

        showCategories(categories);
    } catch (error) {
        console.error(error);
        categoriesList.textContent = 'Не вдалося завантажити категорії';
    }
}

function showCategories(categories) {
    categoriesList.innerHTML = '';

    for (const category of categories) {
        const item = document.createElement('li');
        item.textContent = category.name;

        item.addEventListener('click', () => {
            setActive(item);
            fetchProductsByCategory(category);
        });

        categoriesList.append(item);
    }
}

function setActive(activeItem) {
    const items = categoriesList.querySelectorAll('li');

    for (const item of items) {
        item.classList.remove('active');
    }

    if (activeItem) {
        activeItem.classList.add('active');
    }
}

function showProducts(products) {
    productsBlock.innerHTML = '';

    for (const product of products) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="rating">Рейтинг: ${product.rating}</p>
            <p class="price">${product.price} $</p>
        `;

        card.addEventListener('click', () => fetchProductById(product.id));

        productsBlock.append(card);
    }
}

function showProduct(product) {
    title.textContent = product.title;
    productsBlock.innerHTML = `
        <div class="details">
            <img src="${product.images[0]}" alt="${product.title}">
            <div>
                <p>${product.description}</p>
                <p><b>Категорія:</b> ${product.category}</p>
                <p><b>Бренд:</b> ${product.brand || '-'}</p>
                <p><b>Рейтинг:</b> ${product.rating}</p>
                <p><b>В наявності:</b> ${product.stock} шт.</p>
                <p class="price">${product.price} $</p>
            </div>
        </div>
    `;
}

seeAllButton.addEventListener('click', () => {
    setActive(null);
    fetchProducts();
});

fetchCategories();
fetchProducts();
