#!/usr/bin/env node

const { stat } = require('fs');
const Task_Tracker = require('./Task_Tracker.js');

const args = process.argv.slice(2);
const command = args[0];

const Tasks = new Task_Tracker();

switch (command) {
    case("help"):{
        console.log('Unknown command. Available commands:');
        console.log('  add <description>');
        console.log('  update <id> <description>');
        console.log('  delete <id>');
        console.log('  mark-in-progress <id>');
        console.log('  mark-done <id>');
        console.log('  list [done|todo|in-progress]');
        break;
    }
    case ("add"):{
        const description = args[1];
        if(!description||description.length===0){
            console.log("Error: Please provide a task description");
        }
        else{
            Tasks.add(description);
        }
        break;
    }
    
    case("update"):{
        const id = args[1];
        if(!id){
            console.log("Error: Please provide a task id");
            break;
        }
        const description = args[2];
        if(!description||description.length===0){
            console.log("Error: Please provide a task description");
            break;
        }
        Tasks.update(id,description);
        break;
    }

    case("delete"):{
        const id = args[1];
        if(!id){
            console.log("Error: Please provide a task id");
            break;
        }
        if(id==="*"){
            const allTasks = Task_Tracker.loadTasksFromFile();
        
            // Xóa từng task
            for(let task of allTasks){
                Tasks.delete(task.id);
            }
            console.log("All tasks deleted successfully");
            break;
        }
        else{
            Tasks.delete(id);
            break;
        }
    }

    case("mark-in-progress"):{
        const id = args[1];
        if(!id){
            console.log("Error: Please provide a task id");
            break;
        }
        Tasks.mark_in_progress(id);
        break;
    }

    case("mark-done"):{
        const id = args[1];
        if(!id){
            console.log("Error: Please provide a task id");
            break;
        }
        Tasks.mark_done(id);
        break;
    }

    case("list"):{
        if(Tasks.length===0){
            console.log("Task is empty");
            break;
        }
        const status = args[1];
        if(!status){
            Tasks.list();
            break;
        }
        else if(status==="done"){
            Tasks.list_done();
            break;
        }
        else if(status==="todo"){
            Tasks.list_todo();
            break;
        }
        else if(status==="in-progress"){
            Tasks.list_in_progress();
            break;
        }
        else{
            console.log(`This task hasn't ${status} status`);
            break;
        }
        
    }

    default:
        console.log('Unknown command. Available commands:');
        console.log('  add <description>');
        console.log('  update <id> <description>');
        console.log('  delete <id>');
        console.log('  mark-in-progress <id>');
        console.log('  mark-done <id>');
        console.log('  list [done|todo|in-progress]');
        break;
}