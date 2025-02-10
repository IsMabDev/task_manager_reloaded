import {Task} from "../tasksUtils/tasksTypeAndDB";
// api.d.ts
declare module "api" {
  // Define the types here, e.g., functions or variables exported by api.js
  export function fetchTasks(): Promise<Task[]>;
  export function saveTask(task: Task): void;
}
