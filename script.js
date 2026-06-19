const createTask = document.querySelector(".createtask");
const formContainer = document.querySelector(".form");
const form = document.querySelector("form");
const submitform = document.querySelector(".submit");
const taskContainer = document.querySelector(".right");
const formheading = document.querySelector(".formtaskheading");
const formClose = document.querySelector(".formCloseButton");
const themeIcon = document.querySelector(".themeIcon");
const theme = document.querySelector(".nav-part-2");
const pipeline = document.querySelector('.pipeline');
const pipelineCard = document.querySelector('.pipelinecards');
const totalTaskNumber = document.querySelector('.totalTaskNumber');
const alltask = document.querySelector('.alltask');
const pendingtask = document.querySelector('.pendingtask');
const doneTask = document.querySelector('.completedtask');
const clearAllTask = document.querySelector('.clearAlltask');
const body = document.body;

theme.addEventListener("click", () => {
  theme.innerHTML = "";
  let themeVariable = body.classList.contains("dark");
  if (!themeVariable) {
    body.classList.add("dark");
    theme.innerHTML = `<img class="themeIcon" width="35" src="./icons8-moon-50.png" alt="" />
        <h3>Theme</h3>`;
  } else {
    body.classList.remove("dark");
    theme.innerHTML = `<img class="themeIcon" width="35" src="./icons8-sun-50.png" alt="" />
        <h3>Theme</h3>`;
  }
});

let displayPipeline = true;
let totalTaskCount = true;
pipeline.addEventListener("click", (e) => {
  let browserPipeline = e.target.classList.contains("pipeline1");
  if (browserPipeline && displayPipeline) {
    
    pipelineCard.style.display = "flex";
    e.target.innerHTML = `<li></li>
                Browser Rendering Pipeline
              <img class="pipeline1img" src="./up-arrows.png" alt="" />`
    displayPipeline = false;

  } else if (browserPipeline) {
    pipelineCard.style.display = "none";
    e.target.innerHTML = `<li></li>
    Browser Rendering Pipeline
              <img class="pipeline1img" src="./down.png" alt="" />`
    displayPipeline = true;
  }
  
  let totalTaskClick = e.target.classList.contains("totalTask");

  if(totalTaskCount && totalTaskClick){
    totalTaskNumber.style.display = 'flex';
    e.target.innerHTML = `<li></li>
              Total task
              <img class="pipeline1img" src="./up-arrows.png" alt="">`
    totalTaskCount = false;
    alltask.textContent = taskArr.length
    pendingAndCompletedTaskCount()
  } else if(totalTaskClick){
    totalTaskNumber.style.display = 'none';
    e.target.innerHTML = `<li></li>
              Total task
              <img class="pipeline1img" src="./down.png" alt="">`
    totalTaskCount = true;
    pendingAndCompletedTaskCount()
  }
})

const taskArr = [];

formClose.addEventListener("click", () => {
  formContainer.style.display = "none";
});

const showTask = function () {
  taskContainer.innerHTML = "";
  taskArr.forEach((task) => {
    taskContainer.innerHTML += ` <div class="taskdetail ${task.status === "done" ? "opacity" : ""}"
        data-id="${task.id}"
           data-status="${task.status}"
           data-category="${task.category}">
          <h2 class="taskTitle">${task.taskTitle}</h2>
          <p class="taskDesc">
            ${task.taskDesc}
          </p>
          <div class="taskLastPart">
            <div class="part-1">
              <h3 class="category">${task.category}</h3>
              <h3 class="status" onclick='statusDone("${task.id}")'  >${task.status}</h3>
            </div>
            <div class="part-2">
              <button class="edit" onclick='editTask("${task.id}")'>edit</button>
              <button class="delete" onclick='deleteTask("${task.id}")'>delete</button>
            </div>
          </div>
        </div>`;
  });
};

let editTaskIndex = null;

let noTaskScreen = () => {
  if (taskArr.length === 0) {
    taskContainer.innerHTML = `
        <div class="notaskimg">
            <img width="" src="./icons-notaskyet.png" alt="">
        </div>`;
  }
};
noTaskScreen();
createTask.addEventListener("click", () => {
  formheading.innerHTML = "New task";
  formContainer.style.display = "flex";
});

// input.value => this read live value from input and if user cannot give value then read value that given in html

// input.getAttribute("value") => extract value from directly from html those given in html

submitform.addEventListener("click", (e) => {
  e.preventDefault();
  let taskTitle = e.target.parentElement[0].value;
  let taskDesc = e.target.parentElement[1].value;
  let category = e.target.parentElement[2].value;
  let status = e.target.parentElement[3].value;

  if (
    taskTitle.trim() === "" ||
    taskDesc.trim() === "" ||
    category === "" ||
    status === ""
  )
    return;

  let obj = {
    id: Date.now(),
    taskTitle,
    taskDesc,
    category,
    status,
  };

  if (editTaskIndex !== null) {
    taskArr[editTaskIndex] = obj;
  } else {
    taskArr.push(obj);
  }

  form.reset();
  showTask();

  formContainer.style.display = "none";
});

const editTask = function (id) {
  let taskForEdit = taskArr.find((elem) => Number(elem.id) === Number(id));
  editTaskIndex = taskArr.findIndex((elem) => Number(elem.id) === Number(id));

  let { taskTitle, taskDesc, category, status } = taskForEdit;

  formheading.innerHTML = "Edit task";
  formContainer.style.display = "flex";
  form[0].value = taskTitle;
  form[1].value = taskDesc;
  form[2].value = category;
  form[3].value = status;
};

const deleteTask = function (id) {
  let taskForDelete = taskArr.findIndex(
    (elem) => Number(elem.id) === Number(id),
  );
  taskArr.splice(taskForDelete, 1);
  showTask();

  noTaskScreen();
};

const statusDone = (id) => {
  let statusTask = taskArr.find((elem) => Number(elem.id) === Number(id));
  statusTask.status = "done";

  showTask();
};

const pendingAndCompletedTaskCount = ()=>{
  let completedTaskCount = taskArr.filter((task)=> task.status === "done")
  let pendingTaskCount = taskArr.filter((task)=> task.status === "pending")
  pendingtask.textContent = pendingTaskCount.length;
  doneTask.textContent = completedTaskCount.length;
}

clearAllTask.addEventListener('click',()=>{
  taskArr.length = 0;;
  pendingAndCompletedTaskCount();
  showTask()
  console.log("click")
})