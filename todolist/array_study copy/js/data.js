// spread 연산
// []...기존까지의 data, 새로 추가된 자료]로 새로운배열을 만들어 대입
// ex) let array = [1, 2, 3, 4];
// array = [...array, 5, 6, ...array];

// 객체도 spread 연산 가능.
// let obj = {
//     name: '박화목',
//     age: 33
// }

// 키값이 중복되면 제일 마지막 키의 밸류값을 가져온다
// let obj2 = {
//     ...obj,
//     name: "박수목",
//     name: "박목목"
// }  -> obj2의 name에 해당하는 밸류값은 박목목이됨


// 비구조할당
// let obj = {
//     id: 1,
//     name: "박화목",
//     age: 33
// }

// let { id, name } = obj;

// console.log(age);


let dataList = [];

window.onload = () => {
    getDataList();

    const addInput = document.querySelector(".add-input");

    addInput.onkeyup = (e) => {
        if (e.keyCode === 13) {
            const inputValue = addInput.value;

            const lastId = dataList.length === 0 ? 0 : dataList[dataList.length - 1].id;

            const dataObject = {
                id: lastId + 1,
                content: inputValue
            }

            // fetch("서블릿에서 지정한 주소",{정보를 담은 객체})
            // 객체의 정보는
            /*
                method : post / get / put / delete
                         headers: 컨텐츠 타입을 지정함
                         body   : 지정된 컨텐츠타입으로 만들어서 담아줌
                         cors(cross origin resource sharing)정책 위반 경우
                            1. http / https(ssl 인증서로 header를 암호화해놓음) 다름
                            2. domain이 다름(ip/포트번호를 포함한 주소)
                            3. 포트가 다른경우
            */

            fetch("http://localhost:8080/data_array/data/addition", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataObject)
            });

            dataList = [...dataList, dataObject]
            addInput.value = "";
            getDataList();
        }
    }
}

// 컴포넌트 함수는 대문자로 시작
// 매개변수로 전달받은 객체를 비구조할당으로 필요부분만 변수화해서 파라미터로 사용
function ContentData({ id, content }) {

    return `
        <li>
            <span>${id}번 </span>
            <span>${content}</span>
            <input type="text" class="edit-inputs" value="${content}">
            <button onclick="editData(${id})">수정</button>
            <button onclick="removeData(${id})">삭제</button>
        </li>
            `;
}

function getDataList() {
    const contentList = document.querySelector(".content-list");
    contentList.innerHTML = "";

    for (let dataObj of dataList) {
        contentList.innerHTML += ContentData(dataObj);
    }
}

function removeData(id) {
    dataList = dataList.filter(dataObj => dataObj.id !== id);
    getDataList();
}

function editData(id) {
    let findIndex = -1;
    // 선형으로 탐색
    // for (let i = 0; i < dataList.length; i++) {
    //     if (dataList[i].id === id) {
    //         findIndex = i;
    //         break;
    //     }
    // }

    // 필터 & indexOf()사용
    let findObj = dataList.filter(dataObj => dataObj.id === id)[0];
    findIndex = dataList.indexOf(findObj);

    dataList[findIndex].content = document.querySelectorAll(".edit-inputs")[findIndex].value;
    getDataList();
}