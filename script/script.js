let body = document.body
let inputChanged = document.querySelector('input')
let form = document.forms.reminders
let section = document.createElement("section")
let container = document.createElement("div")
let all_about = document.createElement("div");
// let box = document.createElement("div");

let todos = [
    {
        id: Math.random(),
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        isDone: false,
        task: "todo home task"
    },
]

form.onsubmit = (event) => {
    event.preventDefault();
    let taskDescription = inputChanged.value.trim();

    if (taskDescription === '') {
        inputChanged.style.border = "3px solid red"
        return;
    } else {
        inputChanged.style.border = "3px solid #007FFF"
    }

    let task = {
        id: Math.random(),
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        isDone: false,
        task: taskDescription
    };

    todos.push(task);
    reload(todos, section);

    console.log(task);
};


function reload(arr) {
    all_about.innerHTML = "";

    for (let item of arr) {
        let box = document.createElement("div");
        let all_boxes = document.createElement("div");
        let title_with_cancel = document.createElement("div");
        let cancel = document.createElement("div");
        let title = document.createElement("p");
        let time = document.createElement("div");

        section.classList.add("about")
        container.classList.add("container")

        all_about.classList.add("all_about");
        box.classList.add("box");
        all_boxes.classList.add("all_boxes");
        title_with_cancel.classList.add("title_with_cancel");
        cancel.classList.add("cancel");
        title.classList.add("title");
        time.classList.add("time");

        title.textContent = item.task;
        time.textContent = item.time;

        body.append(section);
        section.append(container);
        container.append(all_about);
        all_about.append(box);
        box.append(all_boxes);
        all_boxes.append(title_with_cancel, time);
        title_with_cancel.append(title, cancel);

        cancel.onclick = () => {
            let realy = confirm('вы правда хотите удалить задачу ' + item.task + "?")

            if (realy) {
                box.classList.add('fade')
                todos = todos.filter(el => el.id !== item.id)
                reload(todos, section)
            }
        }
        box.ondblclick = () => {
            let change = prompt("Введите новое описание задачи:");
            if (change !== null && change.trim() !== '') {
                title.textContent = change;
                item.task = change;
            }
        }
        title.onclick = () => {
            if (!item.isDone) {
                title.style.textDecoration = "line-through";
                item.isDone = true;
            } else {
                title.style.textDecoration = "none";
                item.isDone = false;
            }
            console.log(item);
        }

        if (item.isDone) {
            title.style.textDecoration = "line-through";
        } else {
            title.style.textDecoration = "none";
        }
    }
}

reload(todos, section);


// `
//     <div class="box">

//         <div class="all_boxes">
//             <div class="title_with_cancel">
//                 <p class="title">
//                    ${title}
//                 </p>
//                 <div class="cancel"></div>
//             </div>
//             <div class="time">
//                 ${todos.date}
//             </div>
//         </div>
//     </div>
// `
