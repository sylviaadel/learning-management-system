export function coursesReducer(state, action) {
  switch (action.type) {
    case "create":
      return onCreate(state, action);
    case "delete":
      return onDelete(state, action);
    case "initializeArray":
      return onInitializeArray(action);
    default:
      throw new Error("Unhandled action:", action.type);
  }
}

function onCreate(state, action) {
  const newCourse = action.payload;
  return [...state, newCourse];
}

function onDelete(state, action) {
  const id = action.payload;
  const clonedCourses = [...state];
  const itemIndex = clonedCourses.findIndex((item) => item.id === id);
  clonedCourses.splice(itemIndex, 1);

  return clonedCourses;
}

function onInitializeArray(action) {
  const newCourses = action.payload;

  return newCourses;
}
