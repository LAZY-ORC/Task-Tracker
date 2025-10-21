#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Initialize tasks file if it doesn't exist
function initTasksFile() {
  if (!fs.existsSync(TASKS_FILE)) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify({ tasks: [], nextId: 1 }, null, 2));
  }
}

// Read tasks from file
function readTasks() {
  initTasksFile();
  const data = fs.readFileSync(TASKS_FILE, 'utf8');
  return JSON.parse(data);
}

// Write tasks to file
function writeTasks(data) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(data, null, 2));
}

// Add a new task
function addTask(description) {
  const data = readTasks();
  const newTask = {
    id: data.nextId,
    description,
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  data.tasks.push(newTask);
  data.nextId++;
  writeTasks(data);
  console.log(`Task added successfully (ID: ${newTask.id})`);
}

// Update a task
function updateTask(id, description) {
  const data = readTasks();
  const task = data.tasks.find(t => t.id === parseInt(id));
  if (!task) {
    console.error(`Task with ID ${id} not found`);
    return;
  }
  task.description = description;
  task.updatedAt = new Date().toISOString();
  writeTasks(data);
  console.log(`Task ${id} updated successfully`);
}

// Delete a task
function deleteTask(id) {
  const data = readTasks();
  const initialLength = data.tasks.length;
  data.tasks = data.tasks.filter(t => t.id !== parseInt(id));
  if (data.tasks.length === initialLength) {
    console.error(`Task with ID ${id} not found`);
    return;
  }
  writeTasks(data);
  console.log(`Task ${id} deleted successfully`);
}

// Mark task status
function markTask(id, status) {
  const validStatuses = ['todo', 'in-progress', 'done'];
  if (!validStatuses.includes(status)) {
    console.error(`Invalid status. Valid statuses are: ${validStatuses.join(', ')}`);
    return;
  }
  const data = readTasks();
  const task = data.tasks.find(t => t.id === parseInt(id));
  if (!task) {
    console.error(`Task with ID ${id} not found`);
    return;
  }
  task.status = status;
  task.updatedAt = new Date().toISOString();
  writeTasks(data);
  console.log(`Task ${id} marked as ${status}`);
}

// List tasks
function listTasks(statusFilter = null) {
  const data = readTasks();
  let tasks = data.tasks;
  
  if (statusFilter) {
    tasks = tasks.filter(t => t.status === statusFilter);
  }
  
  if (tasks.length === 0) {
    console.log('No tasks found');
    return;
  }
  
  console.log('\nTasks:');
  console.log('─'.repeat(80));
  tasks.forEach(task => {
    const statusEmoji = {
      'todo': '⭕',
      'in-progress': '🔄',
      'done': '✅'
    }[task.status];
    console.log(`${statusEmoji} [${task.id}] ${task.description}`);
    console.log(`   Status: ${task.status} | Updated: ${new Date(task.updatedAt).toLocaleString()}`);
    console.log('─'.repeat(80));
  });
}

// Display help
function displayHelp() {
  console.log(`
Task Tracker CLI

Usage:
  task-cli add <description>              Add a new task
  task-cli update <id> <description>      Update a task description
  task-cli delete <id>                    Delete a task
  task-cli mark-in-progress <id>          Mark a task as in-progress
  task-cli mark-done <id>                 Mark a task as done
  task-cli mark-todo <id>                 Mark a task as todo
  task-cli list                           List all tasks
  task-cli list done                      List all done tasks
  task-cli list todo                      List all todo tasks
  task-cli list in-progress               List all in-progress tasks

Examples:
  task-cli add "Buy groceries"
  task-cli update 1 "Buy groceries and cook dinner"
  task-cli mark-in-progress 1
  task-cli mark-done 1
  task-cli list
  task-cli delete 1
`);
}

// Main CLI logic
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    displayHelp();
    return;
  }
  
  const command = args[0];
  
  switch (command) {
    case 'add':
      if (args.length < 2) {
        console.error('Error: Please provide a task description');
        console.log('Usage: task-cli add <description>');
        return;
      }
      addTask(args.slice(1).join(' '));
      break;
      
    case 'update':
      if (args.length < 3) {
        console.error('Error: Please provide task ID and new description');
        console.log('Usage: task-cli update <id> <description>');
        return;
      }
      updateTask(args[1], args.slice(2).join(' '));
      break;
      
    case 'delete':
      if (args.length < 2) {
        console.error('Error: Please provide task ID');
        console.log('Usage: task-cli delete <id>');
        return;
      }
      deleteTask(args[1]);
      break;
      
    case 'mark-in-progress':
      if (args.length < 2) {
        console.error('Error: Please provide task ID');
        console.log('Usage: task-cli mark-in-progress <id>');
        return;
      }
      markTask(args[1], 'in-progress');
      break;
      
    case 'mark-done':
      if (args.length < 2) {
        console.error('Error: Please provide task ID');
        console.log('Usage: task-cli mark-done <id>');
        return;
      }
      markTask(args[1], 'done');
      break;
      
    case 'mark-todo':
      if (args.length < 2) {
        console.error('Error: Please provide task ID');
        console.log('Usage: task-cli mark-todo <id>');
        return;
      }
      markTask(args[1], 'todo');
      break;
      
    case 'list':
      const statusFilter = args[1];
      if (statusFilter && !['todo', 'in-progress', 'done'].includes(statusFilter)) {
        console.error('Error: Invalid status filter. Use: todo, in-progress, or done');
        return;
      }
      listTasks(statusFilter);
      break;
      
    default:
      console.error(`Unknown command: ${command}`);
      displayHelp();
  }
}

main();
