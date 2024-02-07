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
    title.innerHTML = "추가하기(Ctrl + Enter : 입력)";
    todoInput.value = "";
    submitButton.onclick = handleAddTodoSubmit;

    todoInput.onkeydown = (e) => {
        // ctrl + enter
        // e.ctrlKey -> ctrl누르고 있으면 true
        // keyCode(13) -> enter키
        if (e.ctrlKey && e.keyCode === 13) {
            submitButton.click();
        }
    }

    modal.classList.add("modal-show");
}

function handleEditTodoModalOpen(todoId) {
    const modal = document.querySelector(".root-modal");
    const title = modal.querySelector(".modal-title");
    const todoInput = modal.querySelector(".todo-input");
    const submitButton = modal.querySelector(".modal-button");
    title.innerHTML = "수정하기(Ctrl + Enter : 입력)";

    // localStorage에서 List 가져오기
    let todoListJson = localStorage.getItem("todoList");
    let todoList = todoListJson !== null ? JSON.parse(todoListJson) : new Array();

    // filter로 파라미터로 받아온 todoId와 동일한 Id를 가지는 todo객체 가져옴
    let findTodoByTodoId = todoList.filter(todo => todo.todoId === todoId)[0];

    todoInput.value = findTodoByTodoId.content;
    submitButton.onclick = () => handleEditTodoSubmit(todoId);

    todoInput.onkeydown = (e) => {
        // ctrl + enter
        if (e.ctrlKey && e.keyCode === 13) {
            submitButton.click();
        }
    }

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

function handleEditTodoSubmit(todoId) {
    const modal = document.querySelector(".root-modal");
    modal.classList.remove("modal-show");

    let todoListJson = localStorage.getItem("todoList");
    let todoList = todoListJson !== null ? JSON.parse(todoListJson) : new Array();

    // 인덱스번호 찾아 바꿀거임
    let findIndex = -1;
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].todoId === todoId) {
            findIndex = i;
            break;
        }
    }

    // -1이면 못찾은것임
    if (findIndex === -1) {
        alert("수정오류!")
        return;
    }
    // 꺼내온 List 수정
    todoList[findIndex].content = document.querySelector(".todo-input").value;
    todoList[findIndex].date = convertDateKor(new Date());
    // 다시 localStorage에 덮어쓰기

    localStorage.setItem("todoList", JSON.stringify(todoList));
    // 새로 불러오기(f5)
    getTodoList();
}

function handleCancelClick() {
    const modal = document.querySelector(".root-modal");
    modal.classList.remove("modal-show");
}