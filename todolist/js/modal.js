window.onkeyup = (e) => {
    if (e.keyCode === 27) {
        handleCancelClick();
    }
}

function handleAddTodoModalOpen() {
    const modal = document.querySelector(".root-modal");
    const title = modal.querySelector(".modal-title");
    const todoInput = modal.querySelector(".todo-input");
    const submitButton = modal.querySelector(".modal-button");
    title.innerHTML = "추가하기";
    todoInput.value = "";
    submitButton.onclick = handleAddTodoSubmit;

    modal.classList.add("modal-show");
}

function handleEditTodoModalOpen(todoId) {
    const modal = document.querySelector(".root-modal");
    const title = modal.querySelector(".modal-title");
    const todoInput = modal.querySelector(".todo-input");
    const submitButton = modal.querySelector(".modal-button");
    title.innerHTML = "수정하기";

    // localStorage에서 List 가져오기
    let todoListJson = localStorage.getItem("todoList");
    let todoList = todoListJson !== null ? JSON.parse(todoListJson) : new Array();

    // filter로 파라미터로 받아온 todoId와 동일한 Id를 가지는 todo객체 가져옴
    let findTodoByTodoId = todoList.filter(todo => todo.todoId === todoId)[0];

    todoInput.value = findTodoByTodoId.content;
    submitButton.onclick = handleEditTodoSubmit;

    modal.classList.add("modal-show");
}

function convertDateKor(curruntDate) {
    const dayKor = ["일", "월", "화", "수", "목", "금", "토"];
    const year = curruntDate.getFullYear();
    const month = curruntDate.getMonth() + 1;
    const date = curruntDate.getDate();
    const day = dayKor[curruntDate.getDay()];
    return `${year}년 ${month}월 ${date}일(${day})`;
}

function handleAddTodoSubmit() {
    const modal = document.querySelector(".root-modal");
    const todoInput = modal.querySelector(".todo-input");
    modal.classList.remove("modal-show");

    let todoListJson = localStorage.getItem("todoList");
    let todoList = todoListJson !== null ? JSON.parse(todoListJson) : new Array();

    let lastTodoId = todoList.length === 0 ? 0 : todoList[todoList.length - 1].todoId;

    let todoObject = {
        todoId: lastTodoId + 1,
        content: todoInput.value,
        date: convertDateKor(new Date())
    }
    todoList.push(todoObject);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    getTodoList();
}

function handleEditTodoSubmit() {
    const modal = document.querySelector(".root-modal");
    modal.classList.remove("modal-show");
}

function handleCancelClick() {
    const modal = document.querySelector(".root-modal");
    modal.classList.remove("modal-show");
}