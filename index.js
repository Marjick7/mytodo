//declare elememts here
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAll = document.querySelector(".footer button");
inputBox.onkeyup = ()=> {
    let userData = inputBox.value;//getting user entered value
    if(userData.trim() != 0){//if user values arent only spaces
        addBtn.classList.add("active");//active the add button
    }
    else{
        addBtn.classList.remove("active"); //unactive the add button
    }

}
showTasks();//calling task function

//if clickon the on add button
addBtn.onclick = ()=>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New todo");//getting LocalStroge
    if(getLocalStorage == null){//if localStroge is null
        listArr = []; //creating blank Arr
    }
    else{
        listArr = JSON.parse(getLocalStorage);//transforming json string into a js object
    }
    listArr.push(userData);//pushing or adding userData
    localStorage.setItem("New todo", JSON.stringify(listArr));//transforming js object into a json string
    showTasks(); // calling showtask() function
}
//function add the task inside the ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New todo"); //getting localstorage
    if(getLocalStorage == null){//if localStorage is null
        listArr = [];//create a blankm arr
    }
    else{
        listArr = JSON.parse(getLocalStorage);//transform json sting into js object
    }
    //pending number span
    const pending = document.querySelector(".pending");
    pending.textContent = listArr.length;//passing the length value is pending number
    let newLiTag =''; 
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><button>delete</button></span></li>`;
    });
    todoList.innerHTML = newLiTag;//adding new li tag inside ul tag
    inputBox.value = "";
}
//delete
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);//delete or remove the particular indexed li
    //after remove the li again update the local storage
    localStorage.setItem("New todo", JSON.stringify(listArr));
    showTasks();//calling showTasks function   
}

//delete all task btn
deleteAll.onclick = ()=>{
    listArr = [];
    //after deleteall and update again the local storage
    localStorage.setItem("New todo", JSON.stringify(listArr));
    showTasks();//calling showTasks function 
}