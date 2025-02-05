export type Task = {
  createAt?: Date;
  id: number;
  title: string;
  description?: string;
  category?: number;
  user: number;
  status: "todo" | "in progress" | "done";
  dueDate?: Date;
}
export const tasks : Task[] = [
  {id: 1, title: "Task 1", description: "Task 2 description", category: 1, user: 1,status: "done", dueDate: new Date()},
  {id: 2, title: "Task 2", category: 1, user: 1,status: "todo", dueDate: new Date()},
  { createAt: new Date(),
    id: 3, title: "Task 3", description: "Task 3 description", category: 2, user: 1,status: "in progress", dueDate: new Date()},
  {id: 4, title: "Task 4", description: "Task 4 description", category: 3, user: 1,status: "in progress"},
  {id: 5, title: "Task 5", description: "Task 5 description", category: 3, user: 1,status: "todo"},
]