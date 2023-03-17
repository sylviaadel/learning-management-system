export function usersReducer(state, action) {
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
  const newUser = action.payload;
  return [...state, newUser];
}

function onDelete(state, action) {
  const id = action.payload;
  const clonedUsers = [...state];
  const itemIndex = clonedUsers.findIndex((item) => item.id === id);
  clonedUsers.splice(itemIndex, 1);

  return clonedUsers;
}

function onInitializeArray(action) {
  const newUsers = action.payload;

  return newUsers;
}
