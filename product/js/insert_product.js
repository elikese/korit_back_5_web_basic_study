//
// servlet 프로젝트명 : product
// group_id com.study
// artifact_id: product
// name: product
// jdk: ver 11
// dependencies 1. lombok, 2.jsp, 3.gson, 4.mysql
//
// pakage
// com.study.product
// 
// config - DBConfig / entity - Product / filter- CommonFilter /
// servlet - InsertProductServlet(/product, POST) & SearchProductServlet(/products, GET) 
// dao - ProductDao

// DB - db_study
// table(product_tb) -  product_id, product_name(unique - 중복확인), 
//                      product_price, product_size(SS,S,M,L,XL,XXL)

async function handleAddClick() {
    const inputProduct = document.querySelectorAll(".product-inputs");

    const product = {
        productName: inputProduct[0].value,
        productPrice: parseInt(inputProduct[1].value),
        productSize: inputProduct[2].value
    }

    const JsonProduct = JSON.stringify(product);
    console.log(JsonProduct);

    try {
        const response = await fetch("http://localhost:8080/product/product", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JsonProduct
        });

        if (!response.ok) {
            throw await response.json();
        }

        const responseData = await response.json();
        console.log(responseData);
        alert(`${responseData.successCount}건의 상품 추가 완료`);

    } catch (error) {
        alert(error?.errorMessage);
        // ?. -> errorMessage key값이 없는경우 참조하지 않음
        // -> 참조하지않으면 error만 띄움
    }

}