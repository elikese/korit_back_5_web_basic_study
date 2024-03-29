async function handleSearchClick() {
    try {
        const response = await fetch("http://localhost:8080/insert_and_select/data/list");
        if (!response.ok) {
            throw await response.json();
        }

        const responseData = await response.json();

        const studentList = document.querySelector(".student-list");
        for (let student of responseData.data) {
            studentList.innerHTML += `
            <li>studentId: ${student.studentId} / name: ${student.name} / age: ${student.age} </li>
            `;

            console.log(responseData.data);

        }
    } catch (error) {
        console.log(error);
    }
}