import students from '../tasks.json';
//call modules
const fs = require('fs')
const chalk = require('chalk')
const validator = require('validator')
    //read data from json file
readDataFromJsonFile = () => {
        let data
        try {
            data = JSON.parse(fs.readFileSync('./students.json').toString())
            if (!Array.isArray(data)) throw new Error('msh array')
        } catch (e) {
            data = []
        }
        return data
    }
    //write data to Json File
writeDataToJsonFile = (data) => {
    try {
        fs.writeFileSync('./students.json', JSON.stringify(data))
    } catch (e) {
        console.log(chalk.red('error writing data'))
    }
}


//add new task
//var count = 0;
let avlClasses = ['a', 'b', 'c']
addStudent = (id, name, className) => {
        let students = readDataFromJsonFile()

        if (!avlClasses.includes(className)) {
            return console.log(chalk.red('className is invalid'))
        }

        //count = count + 1;

        let student = {
            id: id,
            name: name,
            className: className,
            subjects
        }
        students.push(student)
        writeDataToJsonFile(students)
        console.log(chalk.green('data inserted successfuly'))
    }
    // get item index by id
searchStudentIndex = (students, key, searchVal) => {
        let result = students.findIndex(student => {
            return searchVal == student[key]
        })
        return result
    }
    //addsubjectsToStudent
addSubject = (studentId, subName, subGrade) => {
        console.log(subject)
        let students = readDataFromJsonFile()
        let studentIndex = searchStudentIndex(students, 'id', studentId)
        if (studentIndex == -1) return console.log(chalk.red('student not found'))
        let subject = {
            subName: subName,
            subGrade: subGrade
        }
        for (n in students) {
            students[studentIndex][n] = subject[n]
        }
        writeDataToJsonFile(students)
        console.log(chalk.green('subject added'))
    }
    //get all students
getAllStudents = () => {
        students = readDataFromJsonFile()
        students.forEach(student => {
            console.table(student)
        })
    }
    //get single student by student id
getStudentbyId = (searchVal) => {
        let students = readDataFromJsonFile()
        let result = students.findIndex(student => {
            return searchVal == student[id]
        })
        return result
    }
    //get students total degrees
totalGrade = 0;
getTotalDegreeforStudents = () => {
    students = readDataFromJsonFile()
    students.forEach(student => {
        for (subject in student) {
            totalGrade += student[subjects][subGrade];
        }
        console.table(student)
    })
}

module.exports = {
    addStudent,
    addSubject,
    getAllStudents,
    getStudentbyId,
    getTotalDegreeforStudents
}