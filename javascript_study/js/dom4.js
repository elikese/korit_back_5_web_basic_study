const addBoxButton = document.querySelector(".add-box-button");

addBoxButton.onclick = () => {
    const boxContainers = document.querySelectorAll(".box-container");
    boxContainers[0].innerHTML += `<div class="box"></div>`;

    const boxList = document.querySelectorAll(".box");

    for(let box of boxList) {
        box.onclick = () => {
            let isBlueBox = box.classList.contains("blue-box");
            let isRedBox = box.classList.contains("red-box");
    
            if(!isBlueBox && !isRedBox) {
                box.classList.add("blue-box");
            }else if(isBlueBox && !isRedBox) {
                box.classList.remove("blue-box");
                box.classList.add("red-box");
            }else {
                boxContainers[0].removeChild(box);
                boxContainers[1].appendChild(box);
            }
        }
    }
}

