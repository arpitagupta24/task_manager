//define our UI variables

const form= document.querySelector('#task-form');
const taskList= document.querySelector(' .collection');
const clearBtn= document.querySelector('.clear-tasks');
const filter= document.querySelector('#filter');
const taskInput= document.querySelector('#task'); 

//load all event listeners

loadEventListeners();

function loadEventListeners()
{
    //DOM load event (when loaded data don't get lost)
    //DOMContentLoaded == it get called out right after the DOM is loaded and then we are going to call get tasks
     
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event 
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTasks);
    //filter event
    filter.addEventListener('keyup', filterTask);
}

function getTasks(e)
{
    let tasks;
    if(localStorage.getItem('tasks')===null)
    {
        tasks=[];
    }
    else{
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    //now loop through each task to get stored after getting input
    tasks.forEach(function(task)
    {
        //create li element
    const li=document.createElement('li');
    li.className= "collection-item";
    //create text node and append it to li
    li.appendChild(document.createTextNode(task));
    //create new link element (for delete icon)
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';//"fa fa remove" this is cross(x) mark icon
    li.appendChild(link);
    //add li to UL
    taskList.appendChild(li);
    //clear the input
    });
}
//Add task
function addTask(e)
{
    if(taskInput.value === '')
    {
        alert('Add a Task');
    }
    //create li element
    const li=document.createElement('li');
    li.className= "collection-item";
    //create text node and append it to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element (for delete icon)
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';//"fa fa remove" this is cross(x) mark icon
    li.appendChild(link);
    //add li to UL
    taskList.appendChild(li);
    //clear the input

    //store in local storage
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value='';
    e.preventDefault();
 }
 //local storage can only store strings, so we have to pass JSON
 //store task
 function storeTaskInLocalStorage(task)
 {
     let tasks;
     if(localStorage.getItem('tasks')===null)
     {
         tasks=[];
     }
     else{
         tasks= JSON.parse(localStorage.getItem('tasks'));
     }
    tasks.push(task); // we are adding task to tasks array with the help of JSON.parse.
    //set it back to lacal storage
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
 }

 //remove task
 function removeTask(e)
 {   
    if(e.target.parentElement.classList.contains('delete-item'))//we don't want icon, we want 'a' tag
    {
        // now we have to add confirmation so that you get rethoughts
        if(confirm('Are you sure?'))
        {
            //remove from DOM
            e.target.parentElement.parentElement.remove();
            //remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
 }
 function removeTaskFromLocalStorage(taskItem)
 {
     //console.log(taskItem);
     let tasks;s
     if(localStorage.getItem('tasks')===null)
     {
         tasks=[];
     }
     else{
         tasks= JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.forEach(function (task, index)
     {
         if(taskItem.textContent===task)
         {
             tasks.splice(index, 1);
         }
     });
     localStorage.setItem('tasks', JSON.stringify(tasks));
 }
//we want that when we click on the icon the whole "li" gets deleted
function clearTasks(e)
{
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }
    //delete from local storage
    clearTasksFromLocalStorage();
}
function clearTasksFromLocalStorage()
{
    localStorage.clear();
}
//getElementByClass/Id gives html and need to get converted into array to be used format whereas querySelectorAll gives in node form and we can easily go for "forEach()"
function filterTask(e)
{
    const text= e.target.value.toLowerCase(); //text value inserted in filter tasks lable
    //now we have to read through it
    //we can filter through the task with the help of alphabets. therefor we used smallcaps
    document.querySelectorAll('.collection-item').forEach(function(task)
    {
        const item= task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1)
        {
            task.style.display='block';
        }
        else{
            task.style.display='none';
        }
    });
}

//*** tutorial 3rd of project 1st
// now we will make sure even if the site closed and again when opened we have saved data
// for that we should store the data in ////local storage//// so when we addthe task, it actually stays on the page.
