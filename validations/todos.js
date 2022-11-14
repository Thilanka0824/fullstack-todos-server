const validateTodoData = (newTodo) => {

  if (newTodo.title === undefined || typeof newTodo.title !== "string" || newTodo.title.length < 1) {
    console.log(newTodo)
    return {
      isValid: false,
      message: "Title is required",
    };

  }

  if (
    newTodo.description === undefined ||
    typeof newTodo.description !== "string" || newTodo.description.length < 1
  ) {
    return {
      isValid: false,
      message: "Description is required",
    };
  }

  if (
    newTodo.priority !== "high" ||
    newTodo.priority !== "medium" ||
    newTodo.priority !== "low"
  ) {
    return {
      isValid: false,
      message: "Priority is required",
    };
  }
};

module.exports = validateTodoData;
