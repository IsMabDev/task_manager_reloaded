const arrayOfObjects = [
  { id: 1, name: 'John', cat: 'cat1' },
  { id: 2, name: 'Jane', cat: 'cat2' },
  { id: 3, name: 'Bob', cat: 'cat2' },
  { id: 4, name: 'Alice', cat: 'cat3' },
  { id: 5, name: 'Charlie', cat: 'cat1' }
];

const tasks  = [
  {id: 1, title: "Task 1", description: "Task 1 description", category: 1, user: 1,status: "done", dueDate: new Date()},
  {id: 2, title: "Task 2", category: 1, user: 1,status: "todo", dueDate: new Date()},
  { createAt: new Date(),
    id: 3, title: "Task 3", description: "Task 3 description", category: 2, user: 1,status: "in progress", dueDate: new Date()},
  {id: 4, title: "Task 4", description: "Task 4 description", category: 3, user: 1,status: "inqsdf progress"},
  {id: 5, title: "Task 5", description: "Task 5 description", category: 3, user: 1,status: "todo"},
]


// group objects by key the result is an object with the key as the key and the value as the array of objects 
const groupObjectsByKey= ((arrayOfObjects,keyToGroup)=> {
  const result= arrayOfObjects.reduce((groupedObjects,object)=>{
  if (!groupedObjects[object[keyToGroup]]) groupedObjects[object[keyToGroup]]=[]
  groupedObjects[object[keyToGroup]].push(object)
  return groupedObjects
},{})
return result})

const groupTasksByCategory = groupObjectsByKey(tasks,'status')
console.log("groupTasksByCategory: ", groupTasksByCategory);
  
 