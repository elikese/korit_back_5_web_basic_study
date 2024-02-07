window.onload = () => {
    getSavedData();
}


function handleAddClick() {
    const inputData = document.querySelector(".input-text").value;
    const addButton = document.querySelector(".add-btn")
    addButton.onclick = () => AddtoStorage(inputData);
}

function handleEditClick(dataId) {
    const dataListJson = localStorage.getItem("dataList");
    const dataList = dataListJson !== null ? JSON.parse(dataListJson) : new Array();
    const editButton = document.querySelector(".edit-btn");

    let findIndex = -1;
    for (let i = 0; i < dataList.length; i++) {
        if (dataList[i].dataId === dataId) {
            findIndex = i;
            break;
        }
    }

    if (findIndex === -1) {
        alert("수정오류!")
        return;
    }

    dataList[findIndex].content = editButton.previousElementSibling.value;

    localStorage.setItem("dataList", JSON.stringify(dataList));
    getSavedData();
}

function handleRemoveClick(dataId) {
    const dataListJson = localStorage.getItem("dataList");
    const dataList = dataListJson !== null ? JSON.parse(dataListJson) : new Array();

    let newDataList = dataList.filter(data => data.dataId !== dataId);
    localStorage.setItem("dataList", JSON.stringify(newDataList));
    getSavedData();
}


function AddtoStorage(data) {
    const inputData = data;

    const dataListJson = localStorage.getItem("dataList");
    const dataList = dataListJson !== null ? JSON.parse(dataListJson) : new Array();

    let lastDataId = dataList.length === 0 ? 0 : dataList[dataList.length - 1].dataId;

    let dataObject = {
        dataId: lastDataId + 1,
        content: inputData
    }
    console.log(dataObject);
    dataList.push(dataObject);
    localStorage.setItem("dataList", JSON.stringify(dataList));
    getSavedData();
}

function getSavedData() {
    const textList = document.querySelector(".savedList");

    const dataListJson = localStorage.getItem("dataList");
    const dataList = dataListJson !== null ? JSON.parse(dataListJson) : new Array();


    textList.innerHTML = "";

    for (let data of dataList) {
        textList.innerHTML += `<li><span>id:${data.dataId}</span> <span>내용:${data.content}</span> <input type="text" id="${data.dataId}">
        <button class="edit-btn" onclick="handleEditClick(${data.dataId})">수정</button> <button class="del-btn" onclick="handleRemoveClick(${data.dataId})">삭제</button></li>`;
    }
}
