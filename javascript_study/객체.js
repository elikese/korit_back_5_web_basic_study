// 자바스크립트 객체 형태 = { key: value, key: value }

let student = {
    name: "김준일",
    age: 31
}

console.log(student);
console.log(typeof(student));
console.log(student.name);


class Student {
    name;
    age;

    //생성자
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

let s = new Student("김준이", 32);
// s.name = "김준이";
// s.age = 32;
console.log(s);

class User {
    #username;
    password;

    set setUsername(username) {
        this.#username = username; 
    }

    get username() {
        return this.#username;
    }
}

let user = new User();
user.setUsername = "junil";
console.log(user.username);

let dataMap = new Map();
dataMap.set("username", "junil");
dataMap.set("password", "1234");

console.log(dataMap);
console.log(dataMap.get("password"));