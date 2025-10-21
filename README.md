# Task Tracker CLI

A simple command-line interface (CLI) application to track and manage your tasks. This project helps you organize your to-do list directly from the terminal.

Project URL: https://roadmap.sh/projects/task-tracker

## Features

- ✅ Add, update, and delete tasks
- ✅ Mark tasks as in-progress or done
- ✅ List all tasks or filter by status (todo, in-progress, done)
- ✅ Persistent storage using JSON file
- ✅ Automatic timestamp tracking (creation and update times)
- ✅ Simple and intuitive CLI interface

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 12 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-tracker.git
cd task-tracker
```

2. Initialize the project (if not already done):
```bash
npm init -y
```

3. No external dependencies required - the project uses only Node.js built-in modules!

## Usage

All commands follow this format:
```bash
node Task_Tracker_CLI.js <command> [arguments]
```

### Commands

#### Add a new task
```bash
node Task_Tracker_CLI.js add "Buy groceries"
```
Output: `Task added successfully (ID: 1)`

#### Update a task
```bash
node Task_Tracker_CLI.js update 1 "Buy groceries and cook dinner"
```

#### Delete a task
```bash
node Task_Tracker_CLI.js delete 1
```

#### Delete all tasks
```bash
node Task_Tracker_CLI.js delete *
```

#### Mark a task as in-progress
```bash
node Task_Tracker_CLI.js mark-in-progress 1
```

#### Mark a task as done
```bash
node Task_Tracker_CLI.js mark-done 1
```

#### List all tasks
```bash
node Task_Tracker_CLI.js list
```

#### List tasks by status
```bash
# List only completed tasks
node Task_Tracker_CLI.js list done

# List only pending tasks
node Task_Tracker_CLI.js list todo

# List only in-progress tasks
node Task_Tracker_CLI.js list in-progress
```

## Project Structure

```
Task_Tracker/
├── Dev1/
│   ├── Task_Tracker.js       # Core task management class
│   └── Task_Tracker_CLI.js   # CLI interface
├── data.json                  # Task storage (auto-generated)
├── CentralRepo/               # Git repository
└── README.md                  # This file
```

## Data Storage

Tasks are stored in a `data.json` file in the following format:

```json
[
  {
    "id": 1,
    "description": "Buy groceries",
    "status": "todo",
    "createdAt": "2025-10-21T15:41:35.918Z",
    "updateAt": "2025-10-21T15:41:35.918Z"
  }
]
```

## Task Properties

- **id**: Unique identifier for each task (auto-incremented)
- **description**: Task description
- **status**: Current status (`todo`, `in-progress`, or `done`)
- **createdAt**: ISO timestamp when the task was created
- **updateAt**: ISO timestamp when the task was last modified

## Example Workflow

```bash
# Add some tasks
node Task_Tracker_CLI.js add "Complete project documentation"
node Task_Tracker_CLI.js add "Review pull requests"
node Task_Tracker_CLI.js add "Update dependencies"

# Mark a task as in-progress
node Task_Tracker_CLI.js mark-in-progress 1

# Update task description
node Task_Tracker_CLI.js update 2 "Review and merge pull requests"

# Mark a task as done
node Task_Tracker_CLI.js mark-done 1

# List all tasks
node Task_Tracker_CLI.js list

# List only pending tasks
node Task_Tracker_CLI.js list todo
```

## Development

### File Overview

- **Task_Tracker.js**: Contains the `Task_Tracker` class with methods for task management
- **Task_Tracker_CLI.js**: Command-line interface that processes user input and calls appropriate methods

### Key Methods

- `add(description)`: Create a new task
- `update(id, description)`: Update task description
- `delete(id)`: Remove a task
- `mark_in_progress(id)`: Change task status to in-progress
- `mark_done(id)`: Change task status to done
- `list()`: Display all tasks
- `list_todo()`: Display pending tasks
- `list_in_progress()`: Display in-progress tasks
- `list_done()`: Display completed tasks

## Error Handling

The application includes error handling for:
- Missing task IDs or descriptions
- Invalid task IDs
- File read/write errors
- Missing or corrupted data.json file

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Your Name - [Your GitHub Profile](https://github.com/yourusername)

## Acknowledgments

- Project idea from [roadmap.sh](https://roadmap.sh/projects/task-tracker)
- Built with Node.js
