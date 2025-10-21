# Task-Tracker
A simple command-line task tracker built with Node.js. Track your daily tasks with features like add, update, delete, and status management (todo, in-progress, done).

## Features
- ✅ Add new tasks
- ✏️ Update task descriptions
- 🗑️ Delete tasks
- 📊 Manage task status (todo, in-progress, done)
- 📋 List all tasks or filter by status
- 💾 Persistent JSON storage

## Installation

1. Clone the repository:
```bash
git clone https://github.com/LAZY-ORC/Task-Tracker.git
cd Task-Tracker
```

2. Install dependencies (if any):
```bash
npm install
```

3. Make the CLI executable (on Unix-based systems):
```bash
chmod +x task-cli.js
```

## Usage

### Add a new task
```bash
node task-cli.js add "Your task description"
```
Example:
```bash
node task-cli.js add "Buy groceries"
```

### Update a task
```bash
node task-cli.js update <task-id> "New description"
```
Example:
```bash
node task-cli.js update 1 "Buy groceries and cook dinner"
```

### Delete a task
```bash
node task-cli.js delete <task-id>
```
Example:
```bash
node task-cli.js delete 1
```

### Mark task as in-progress
```bash
node task-cli.js mark-in-progress <task-id>
```
Example:
```bash
node task-cli.js mark-in-progress 1
```

### Mark task as done
```bash
node task-cli.js mark-done <task-id>
```
Example:
```bash
node task-cli.js mark-done 1
```

### Mark task as todo
```bash
node task-cli.js mark-todo <task-id>
```
Example:
```bash
node task-cli.js mark-todo 1
```

### List all tasks
```bash
node task-cli.js list
```

### List tasks by status
```bash
node task-cli.js list todo
node task-cli.js list in-progress
node task-cli.js list done
```

## Data Storage

Tasks are stored in a `tasks.json` file in the project root directory. The file is automatically created when you add your first task.

### JSON Structure
```json
{
  "tasks": [
    {
      "id": 1,
      "description": "Buy groceries",
      "status": "todo",
      "createdAt": "2025-10-21T12:00:00.000Z",
      "updatedAt": "2025-10-21T12:00:00.000Z"
    }
  ],
  "nextId": 2
}
```

## Task Properties
- **id**: Unique identifier for each task
- **description**: Task description
- **status**: Current status (todo, in-progress, done)
- **createdAt**: Timestamp when the task was created
- **updatedAt**: Timestamp when the task was last updated

## Requirements
- Node.js (v12 or higher)

## License
ISC
