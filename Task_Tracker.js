const fs = require('fs');
const { takeCoverage } = require('v8');
class Task_Tracker{
    static nextId = 0;
    static tasks = [];
    constructor(id,description,status,createdAt,updateAt){
        this.id = id;
        this.description = description;
        this.status=status;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
    }

    static initialize(){
        const tasks = Task_Tracker.loadTasksFromFile();
        if(tasks.length>0){
            Task_Tracker.nextId = Math.max(...tasks.map(t=>t.id));
        }
        Task_Tracker.tasks = tasks
    }

    static loadTasksFromFile(){
        try {
            const data = fs.readFileSync('data.json','utf-8');
            return JSON.parse(data);
        } catch(e) {
            return []; // Nếu file không tồn tại, trả về mảng rỗng
        }
    }
    
    static findTaskById(id){
        const tasks = Task_Tracker.loadTasksFromFile();
        return {tasks,task: tasks.find(t=>t.id===id)};
    }

    getDescription(id){
        const {task} = Task_Tracker.findTaskById(id);
        if(task){
            return task.description; // Return the description from the found task
        }
        else{
            return "Task does not exist";
        }
    }

    getStatus(id){
        const task = Task_Tracker.findTaskById(id);
        if(task){
            return task.status; // Return the description from the found task
        }
        else{
            return "Task does not exist";
        }
    }


    add(description){
        const date = new Date().toISOString()
        const newdata = new Task_Tracker(
            Task_Tracker.nextId+=1,
            description,
            'todo',
            date,
            date
        );
        Task_Tracker.tasks.push(newdata);
        Task_Tracker.savetoFile()
        console.log(`Task added successfully (ID: ${Task_Tracker.nextId})`);
        return newdata;
    }

    delete(id){
        id = Number(id);
        const tasks = Task_Tracker.loadTasksFromFile()
        const taskIndex = tasks.findIndex(t=>t.id===id);
        if(taskIndex!==-1){
            tasks.splice(taskIndex,1);
            const memory = Task_Tracker.tasks.findIndex(t=>t.id===id);
            if(memory!==-1){
                Task_Tracker.tasks.splice(memory,1);
            }
            fs.writeFileSync('data.json',JSON.stringify(tasks,null,2),'utf-8');
            console.log(`Task ${id} deleted successfully`)
        }
        else{
            console.log(`Can not find task ${id}, please try again`);
        }
    }

    update(id,description){
        id = Number(id);
        const {tasks,task} = Task_Tracker.findTaskById(id);
        if(task){
            task.updateAt = new Date().toISOString();
            task.description = description;
            fs.writeFileSync('data.json',JSON.stringify(tasks,null,2),'utf-8');
            console.log(`Task ${id} updated successfully`);
        }
        else{
            console.log(`Can not find task ${id}, please try again`);
        }
    }

    mark_in_progress(id){
        id = Number(id);
        const {tasks,task} = Task_Tracker.findTaskById(id);
        if(task){
            task.updateAt = new Date().toISOString();
            task.status = "in-progress";
            fs.writeFileSync('data.json',JSON.stringify(tasks,null,2),'utf-8');
            console.log(`Task ${id} : in-progress`);
        }
        else{
            console.log(`Can not find task ${id}, please try again`);
        }
    }

    mark_done(id){
        id = Number(id);
        const {tasks,task} = Task_Tracker.findTaskById(id);
        if(task){
            task.updateAt = new Date().toISOString();
            task.status = 'done';
            fs.writeFileSync('data.json',JSON.stringify(tasks,null,2),'utf-8');
            console.log(`Task ${id} : done`);
        }
        else{
            console.log(`Can not find task ${id}, please try again`);
        }
    }

    
    list(){
        const tasks = Task_Tracker.loadTasksFromFile();
        for(let task of tasks){
            console.log(`Task ${task.id}`);
            console.log(`Description ${task.description}`);
            console.log(`Status ${task.status}`);
            console.log(`CreatedAt ${task.createdAt}`);
            if(task.createdAt!==task.updateAt){
                console.log(`UpdateAt ${task.updateAt}`);
            }
            console.log(`-----------------------------`);
        }
    }

    list_in_progress(){
        const tasks = Task_Tracker.loadTasksFromFile();
        for(let task of tasks){
            if(task.status==="in-progress"){
                console.log(`Task ${task.id}`);
                console.log(`Description ${task.description}`);
                console.log(`Status ${task.status}`);
                console.log(`CreatedAt ${task.createdAt}`);
                if(task.createdAt!==task.updateAt);{
                    console.log(`UpdateAt ${task.updateAt}`);
                }
                console.log(`-----------------------------`);
            }
            
        }
    }

    list_done(){
        const tasks = Task_Tracker.loadTasksFromFile();
        for(let task of tasks){
            if(task.status==="done"){
                console.log(`Task ${task.id}`);
                console.log(`Description ${task.description}`);
                console.log(`Status ${task.status}`);
                console.log(`CreatedAt ${task.createdAt}`);
                if(task.createdAt!==task.updateAt);{
                    console.log(`UpdateAt ${task.updateAt}`);
                }
                console.log(`-----------------------------`);
            }
        }
    }

    list_todo(){
        const tasks = Task_Tracker.loadTasksFromFile();
        for(let task of tasks){
            if(task.status==="todo"){
                console.log(`Task ${task.id}`);
                console.log(`Task ${task.description}`);
                console.log(`Task ${task.status}`);
                console.log(`Task ${task.createdAt}`);
                if(task.createdAt!==task.updateAt);{
                    console.log(`Task ${task.updateAt}`);
                }
                console.log(`-----------------------------`);
            }
        }
    }

    


    static savetoFile(){
        fs.writeFileSync(
            'data.json',JSON.stringify(Task_Tracker.tasks,null,2),
            'utf-8'
        );
    }
}
Task_Tracker.initialize();
module.exports = Task_Tracker;

// const Tasks = new Task_Tracker();
// Tasks.add("Buy groceries")
// Tasks.update(1,"Buy groceries and cook dinner")