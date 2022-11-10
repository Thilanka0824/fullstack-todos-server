var express = require("express");
var router = express.Router();
const { db } = require("../mongo");
const { v4 } = require("uuid");

const mockTodos = [
  {
    id: "4387f4d8-aeac-4559-9f1b-3c5d537c955c",
    title: "Implement Fullstack ToDo List",
    description: "Implement the fullstack todo list application.",
    isComplete: false,
    priority: "High",
    creationDate: new Date(),
    lastModified: new Date(),
    completedDate: null,
  },
  {
    id: "e365f13c-4c1d-4ee1-8a66-3dbbbab71f0d",
    title: "Create /all route for mock data",
    description:
      "Create an express route that will respond with the mock todo list.",
    isComplete: false,
    priority: "High",
    creationDate: new Date(),
    lastModified: new Date(),
    completedDate: null,
  },
  {
    id: "08dd1f20-7d31-4120-89ed-343d4006a7cb",
    title: "Create a home page in the client",
    description: "Create a Home Page in React that will display all the todos.",
    isComplete: false,
    priority: "High",
    creationDate: new Date(),
    lastModified: new Date(),
    completedDate: null,
  },
  {
    id: "98a06f8f-50c9-4832-9d2d-daa45543db00",
    title: "Create the todo card component",
    description:
      "Create a react ToDoCard component that will be rendered for each todo on the home page.",
    isComplete: false,
    priority: "Medium",
    creationDate: new Date(),
    lastModified: new Date(),
    completedDate: null,
  },
  {
    id: "7c5d70bb-2a00-4009-9bb8-1bb163fb501f",
    title: "Test basic application with mock data",
    description:
      "Visit the client Home Page to see the todo's displayed as a list.",
    isComplete: false,
    priority: "Medium",
    creationDate: new Date(),
    lastModified: new Date(),
    completedDate: null,
  },
];

/* GET todos listing. */
router.get("/all", async function (req, res, next) {
  try {
    const DBtodo = await db().collection("todos").find({}).toArray();
    console.log(DBtodo);
    res.json({
      success: true,
      todo: DBtodo,
    });
  } catch (err) {
    console.log(err.name);
    res.json({
      success: false,
      error: err.toString(),
    });
  }
});

router.post("/create-one", async (req, res) => {
  try {
    console.log(req.body);

    const newTodo = {
      ...req.body,
      id: v4(),
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      isComplete: false,
      creationDate: new Date(),
      lastModified: new Date(),
      completedDate: null,
    };

    const addTodo = db().collection("todos").insertOne(newTodo);
    console.log("addTodo", addTodo);

    res.json({
      success: true,
      todo: newTodo,
    });
  } catch (error) {
    console.error(err);
    res.json({
      success: false,
      error: err.toString(),
    });
  }
});

router.put("/update-one/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const isComplete = req.body.isComplete;
    const lastModified = new Date();
    const completedDate = new Date();

    console.log("this", req.body.isComplete);

    const toggleToDoIsComplete = await db()
      .collection("todos")
      .update(
        { id: id },
        {
          $set: {
            lastModified: lastModified,
            isComplete: isComplete,
            completedDate: completedDate
          },
        }
      );
        console.log(toggleToDoIsComplete)
    res.json({
      success: true,
      todo: updatedToDo,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.toString(),
    });
  }
});

router.delete("/delete-one/:id", async (req,res)=>{
    try {
        const id = req.params.id;

        const deleteToDo = await db().collection('todos').deleteOne({
            id: id
        })

        res.json({
            success: true,
            todo: deleteToDo
        })
    } 
    catch (error) {
        res.json({
            success: false,
            error: error.toString()
        })
    }
}) 

module.exports = router;
