let tasks = [
  {
    id: 1,
    title: "delectus aut autem",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
    completed: false,
  },
  {
    id: 2,
    title: "quis ut nam facilis et officia qui",
    body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
    completed: false,
  },
  {
    id: 3,
    title: "fugiat veniam minus",
    body: "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in",
    completed: false,
  },
  {
    id: 4,
    title: "et porro tempora",
    body: "ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque",
    completed: false,
  },
];

const themes = {
  default: {
    "--base-text-color": "#020124",
    "--header-bg": "#052659",
    "--title-color": "#052659",
    "--delete-btn": "#5483b3",
    "--done-btn": "#7DA0CA",
    "--disabled-btn": "#afacac",
    "--text-done": "#4771af",
    "--bg-color-btn": "#307cbe",
    "--white": "#f0f8ff",
    '--header-logo': "#c1e8ff",
    "--bg": "#f0f8ff",
    "--light": "#c1e8ff",
 

  },
  light: {
    "--base-text-color": "#191D23",
    "--header-bg": "#57707A",
    "--title-color": "#57707A",
    "--delete-btn": "#C5BAC4",
    "--done-btn": "#7B919C",
    "--disabled-btn": "#989DAA",
    "--text-done": "#191D23",
    "--bg-color-btn": "#7B919C",
    "--white": "#DEDCDC",
    '--header-logo': "#C5BAC4",
    "--bg": "#DEDCDC",
    "--light": "#FFFFFF",

  },
  dark: {
    "--base-text-color": "#0f969c",
    "--header-bg": "rgba(255, 255, 255, 0.2)",
    "--title-color": "#0f969c",
    "--delete-btn": "#913946",
    "--done-btn": "#0c7075",
    "--disabled-btn": "#afacac",
    "--text-done": "#6da5c0",
    "--bg-color-btn": "#0f969c",
    "--white": "#f0f8ff",
    '--header-logo': "#0f969c",
    "--bg": "#05161a",
    "--light": "#072e33",
    '--placeholder': '#afacac',
    '--hover': 'rgba(255, 255, 255, 0.3)'
   
  },
};


// let tasks=[]
const list = document.querySelector(".list-group");
const form = document.querySelector(".form");
const select = document.getElementById("themeSelect");
let lastSelectedTheme = localStorage.getItem('app_theme') || "default";


(function (arrOfTasks) {
  renderMarkup(arrOfTasks);
})(tasks);

form.addEventListener("submit", onAddTask);

function onAddTask(e) {
  e.preventDefault();

  const title = e.currentTarget.title.value;
  const body = e.currentTarget.body.value;
  if (!title || !body) {
    return alert("Fill fields");
  }
  const newTask = createNewTask(title, body);
  tasks.push(newTask);

  renderMarkup([newTask]);
  form.reset();
}

function renderMarkup(arr) {
  const markup = arr
    .map(
      ({ id, title, body }) =>
        `<li data-task-id=${id} class="list-item"><h2 class="task-title">${title}</h2><p class="task-body">${body}</p><div class="wrap-btn"><button class="btn delete-btn btn-default">Delete</button> <button data-action="done" class="btn done-btn btn-default">Done</button></div></li>`
    )
    .join("");
  list.insertAdjacentHTML("afterbegin", markup);
}

function createNewTask(title, body) {
  const newTask = {
    title,
    body,
    id: Math.round(Math.random() * 100),
    completed: false,
  };
  return newTask;
}

list.addEventListener("click", onDelete);

function onDelete(e) {
  if (e.target.classList.contains("delete-btn")) {
    const parent = e.target.closest("[data-task-id]");
    const id = parent.dataset.taskId;
    deleteTask(id);
  }
}

function deleteTask(id) {
  const filterTasks = tasks.filter((task) => task.id !== parseInt(id));
  const listItem = document.querySelector(`[data-task-id="${id}"]`);

  if (listItem) {
    listItem.remove();
    tasks = filterTasks;
  }
}
list.addEventListener("click", onCheck);

function onCheck(e) {
  if (e.target.dataset.action === "done") {
    const parent = e.target.closest("[data-task-id]");
    const id = parent.dataset.taskId;
    console.log(parent);
    parent.classList.add("green");
    // e.target.disabled = true;
    e.target.classList.add("disabled");

    const task = tasks.find((task) => task.id === parseInt(id));
    if (task) {
      task.completed = true;
    }
  }
}
setTheme(lastSelectedTheme)
//зміна теми
select.addEventListener('change',onThemeSelect )

function onThemeSelect(e){
const selectedTheme = select.value
setTheme(selectedTheme)
lastSelectedTheme = selectedTheme
localStorage.setItem('app_theme', selectedTheme)
}

function setTheme(name){
  const selectedThemeObj = themes[name]
  Object.entries(selectedThemeObj).forEach(([key, value])=>{
    document.documentElement.style.setProperty(key, value)
  })

}
