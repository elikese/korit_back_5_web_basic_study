async function handleSearchClick() {
    try {
        const response = await fetch("http://localhost:8080/product/products");

        const responseData = await response.json();

        const productList = document.querySelector(".product-list");
        productList.innerHTML = "";
        for (let product of responseData) {
            productList.innerHTML += productInfoTr(product);
        }

    } catch (error) {
        console.log(error);
    }
}

function productInfoTr({ productId, productName, productPrice, productSize }) {
    return `
        <tr>
                <th>${productId}</th>
                <th>${productName}</th>
                <th>${productPrice}</th>
                <th>${productSize}</th>
        </tr>
    `;
}