const products = [
    { code: "001", name: "Зошит", price: 35, quantity: 4 },
    { code: "002", name: "Ручка", price: 12, quantity: 5 },
    { code: "003", name: "Олівець", price: 8, quantity: 3 },
    { code: "004", name: "Лінійка", price: 20, quantity: 2 },
    { code: "005", name: "Пенал", price: 150, quantity: 1 }
];

function showProducts() {
    let total = 0;

    document.write('<table>');
    document.write('<caption>Вартість товарів</caption>');
    document.write('<thead>');
    document.write('<tr>');
    document.write('<th scope="col">Код</th>');
    document.write('<th scope="col">Найменування</th>');
    document.write('<th scope="col">Ціна, грн</th>');
    document.write('<th scope="col">Кількість</th>');
    document.write('<th scope="col">Сума, грн</th>');
    document.write('</tr>');
    document.write('</thead>');
    document.write('<tbody>');

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const sum = product.price * product.quantity;

        total += sum;

        document.write('<tr>');
        document.write('<td>' + product.code + '</td>');
        document.write('<td>' + product.name + '</td>');
        document.write('<td>' + product.price.toFixed(2) + '</td>');
        document.write('<td>' + product.quantity + '</td>');
        document.write('<td>' + sum.toFixed(2) + '</td>');
        document.write('</tr>');
    }

    document.write('</tbody>');
    document.write('<tfoot>');
    document.write('<tr>');
    document.write('<th scope="row" colspan="4">Всього</th>');
    document.write('<td>' + total.toFixed(2) + '</td>');
    document.write('</tr>');
    document.write('</tfoot>');
    document.write('</table>');
}

showProducts();