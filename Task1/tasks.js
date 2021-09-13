const fs = require('fs')
const chalk = require('chalk')
const validator = require('validator')
const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } = require('constants')

//read data from json file
readDataFromJsonFile = () => {
        let data
        try {
            data = JSON.parse(fs.readFileSync('./tasks.json').toString())
            if (!Array.isArray(data)) throw new Error('msh array')
        } catch (e) {
            data = []
        }
        return data
    }
    //write data to Json File
writeDataToJsonFile = (data) => {
        try {
            fs.writeFileSync('./tasks.json', JSON.stringify(data))
        } catch (e) {
            console.log(chalk.red('error writing data'))
        }
    }
    //add new task
addTask = (data) => {
    let tasks = readDataFromJsonFile()
        // found = filterTasks('title', data.title);
        // if (found) { return chalk.red('the title is previosly exist') }

    let task = {
        status: false,
        id: parseInt((Date.now()) * Math.random()),
        ...data
    }
    tasks.push(task)
    writeDataToJsonFile(tasks)
    console.log(chalk.green(data inserted successfuly and you task id is ${task.id}))
}

//show All Tasks 
showAll = () => {
    tasks = readDataFromJsonFile()
    tasks.forEach(task => {
        console.table(task)
    })
}


//search for task
searchTask = (taskId) => {
        let tasks = readDataFromJsonFile()
        let result = tasks.find(t => {
            return taskId == t.id;
        })
        console.log(result);
        // tasks = tasks.filter(t => taskId != t.id);
        // writeDataToJsonFile(tasks);

    }
    
deleteTask = (taskId) => {
    let tasks = readDataFromJsonFile()
    tasks = tasks.filter(t => taskId != t.id);
    writeDataToJsonFile(tasks);

}


//edit task
editTask = (taskId, editobject) => {

        deleteTask(taskId);
        let tasks = readDataFromJsonFile();

        let editTask = {
            status: false,
            id: taskId,
            ...editobject
        };
        tasks.push(editTask);
        writeDataToJsonFile(tasks);

    }
    //change status
changeStatus = (taskId, changestatus) => {

        let tasks = readDataFromJsonFile()

        let result = tasks.find(t => {
            if (taskId == t.id) {
                t.status = changestatus;
            };
        })
        writeDataToJsonFile(tasks);
        console.log("the status is changed");

    }
    //get tasks due date > today date
gettasksfordate = () => {
    let tasks = readDataFromJsonFile()
    tasks.forEach(task => {

        var date2 = task.dueDate;
        date1 = new Date();
        date2 = new Date(date2);

        if (date2 > date1) {
            console.table(task);

        }
    })

}
module.exports = {
    addTask,
    showAll,
    searchTask,
    deleteTask,

    editTask,
    changeStatus,
    gettasksfordate


}