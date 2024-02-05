let index = 1;

const appendButton = document.querySelector(".append-button");

appendButton.onclick = () => {
    const textInputs = document.querySelectorAll(".text-inputs");
    const dataTableBody = document.querySelector(".data-table-body");
    
    dataTableBody.innerHTML += `
        <tr>
            <td>${index}</td>
            <td>${textInputs[0].value}</td>
            <td>${textInputs[1].value}</td>
            <td>${textInputs[2].value}</td>
        </tr>
    `;

    index++;

    for(let input of textInputs) {
        input.value = "";
    }
}