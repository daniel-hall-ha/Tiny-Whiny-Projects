const activeTaskCount = () => {
    return (JSON.parse(localStorage.getItem('tasks')) || []).filter(task => task.status === "active").length;
}

function renderFiltered(currentFilter) {  
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    if (currentFilter === "all") {
        filtered_taskList = taskList;
        document.querySelector('#task-list').innerHTML = "";
        filtered_taskList.forEach(task => {
            document.querySelector('#task-list').innerHTML += createTaskItem(task,true);
        });

    } else {
        filtered_taskList = taskList.filter(task => {
            return task.status === currentFilter;
        });
        document.querySelector('#task-list').innerHTML = "";
        filtered_taskList.forEach(task => {
            document.querySelector('#task-list').innerHTML += createTaskItem(task,false);
        });
    }
    document.querySelector('.app > span').innerHTML = `${activeTaskCount()} tasks active.`;
}

function renderAdded(task) {
    const currentFilter = document.querySelector('.filters button.active').textContent.toLowerCase();
    if (currentFilter === "all" || currentFilter === "active") {
        document.querySelector('#task-list').innerHTML += createTaskItem(task,false);
    }
    document.querySelector('.app > span').innerHTML = `${activeTaskCount()} tasks active.`;
}

const createTaskItem = (task, distinct) => {
    if (distinct)
        if (task.status === "active")
            return `
                <li id="${task.id}" class="task-item">
                    <input type="checkbox" name="status">
                    <label for="status">${task.taskName}</label>
                    <i class="fa-regular fa-circle-xmark"></i>
                </li>
                `;
        else
            return `
                <li id="${task.id}" class="task-item">
                    <input type="checkbox" name="status" checked>
                    <label for="status" style="text-decoration:line-through">${task.taskName}</label>
                    <i class="fa-regular fa-circle-xmark"></i>
                </li>
                `;
    else
        if (task.status === "active")
            return `
                <li id="${task.id}" class="task-item">
                    <input type="checkbox" name="status">
                    <label for="status">${task.taskName}</label>
                    <i class="fa-regular fa-circle-xmark"></i>
                </li>
                `;
        else
            return `
                <li id="${task.id}" class="task-item">
                    <input type="checkbox" name="status" checked>
                    <label for="status">${task.taskName}</label>
                    <i class="fa-regular fa-circle-xmark"></i>
                </li>
                `;
}

document.querySelector('#task-form').addEventListener('submit', (event) =>{
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.target); // Create a FormData object from the form
    if (formData.get('taskName') !== "") {
        const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = {
            'id' : Date.now(),
            'taskName': formData.get('taskName'),
            'status' : "active"
        };
        taskList.push(task);
        localStorage.setItem('tasks',JSON.stringify(taskList));
        renderAdded(task);
    }
})

document.querySelectorAll('.filters button').forEach((button) => {
    button.addEventListener('click', (event)=>{
        event.preventDefault();
        document.querySelectorAll('.filters button').forEach((btn)=>{
            if (event.target !== btn)
                btn.className = "";
        })
        event.target.className = "active";
        renderFiltered(event.target.textContent.toLowerCase());
    })
})

document.querySelector('#task-list').addEventListener('click', (event) => {

    if (event.target.closest('li.task-item')) {
        const currentList = JSON.parse(localStorage.getItem('tasks')) || [];
        const clicked_task = currentList.find(task => {
            return task.id == event.target.closest('li.task-item').id;
        });
        clicked_task.status = clicked_task.status === "completed" ? "active" : "completed";
        localStorage.setItem('tasks',JSON.stringify(currentList));
        renderFiltered(document.querySelector('.filters .active').textContent.toLowerCase());
        console.log('Item Clicked!');
    }

    if (event.target.closest('.fa-circle-xmark')) {
        const tb_removed = event.target.closest('li.task-item');
        const tb_removed_id = tb_removed.id;
        console.log(tb_removed_id)
        const currentList = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedList = currentList.filter(task => {
            return task.id != tb_removed_id;
        });
        console.log(updatedList)
        localStorage.setItem('tasks',JSON.stringify(updatedList))
        renderFiltered(document.querySelector('.filters .active').textContent.toLowerCase());
    }

})

renderFiltered("all");


