# Features

- **Hierarchical task structure** - easily define complex tasks and projects with simple indenting to nest tasks within tasks. When indenting/unindenting, the task list knows where to move your task so that it makes sense in terms of task relationships, and also produces a clear visual experience.
- **Elegant interface** - Material Design interface with smooth ui transitions for indenting and visual touch feedback for clicks/taps on input fields and buttons.
- **Intuitive UI** - tasks behave like lines in a text editor: use `enter` to create a new task, `backspace` on an empty task to delete it, `up` and `down` arrows to move focus up and down, `cmd+up` and `cmd+down` to move tasks up and down, `tab` and `shift+tab` to indent/nest tasks under one another. There is also a button to add tasks and a trash/recycle bin icon to delete.
- **Smart task completion logic** - when a task is completed, all its sub-tasks are recursively completed. When a task is not-yet-complete, its parent tasks are marked not-yet-complete back to the root (ie when a project is completed its subtasks are as well).
- **Filter completed tasks** - ability to show all tasks (completed and not), active tasks (incomplete), or completed tasks.

# Install / Run in dev mode

From the root of the project directory:

```
npm install
npm start
open http://localhost:3000
```

Or if you're a `yarn` person:

```
yarn
yarn start
open http://localhost:3000
```

# Design Considerations

My intention in building this was to create the following:

> A purely client-side (web only) implementation of hierarchical task-list interface, demonstrating good code design and organization.

> Specifically: an elegant "blank sheet" UI (e.g., think Google Docs or simple Todo list app where people can just type freely) that enables vertically nested Tasks as indented bulleted lists. A Task can contain text (as the title) and nested Tasks.

I chose to build this in React, using MobX to manage the application state and the react component library material-ui for basic ui functionality.

**Why React?** - It's flexible, exceedingly powerful and well-suited to a project like this with with a simple core design but with lots to add in terms of functionality.

**Why MobX?** - I actually started the project using Redux but found the design of actions -> reducers -> store to be burdensome. One of MobX's great features is its intuitive design & logic, and its simplicity. Create an observable TodoListStore store with observable TodoNodes. Check. ✓

**Why Material-UI** - The authors have done a fantastic job creating components that are visually attractive, precise and also functional. I knew it would be a great library to get me up and running quickly.

### Style

This project uses the [Airbnb Javascript + React Style Guide](https://github.com/airbnb/javascript) for coding style, and is configured for linting using ESLint. 

## Project Structure

For a project of this scale one of the primary considerations was keeping the design simple and understandable. Hence we have:

- **Entry Point** - `src/index.jsx` and `src/App.jsx` provide the entry point to the App. `index` provides a hot reloading wrapper for dev, while `App` provides the material theme and access to the store.
- **Stores** - `src/stores/TodoListStore.js` and `src/stores/TodoNode.js` provide the state management and define the essential actions to manipulate the tree that represents the visual nested task list.
- **Layouts** - `src/layouts/Primary.jsx` is currently the sole layout (alternatively called a screen/scene/view depending on who you talk to) for the app, but this structure allows for other layouts in the future like menus/drawers, settings screens, etc.
- **Components** - `src/components/TodoList.jsx`, `Todo.jsx`, `AddTodo.jsx`, and `Footer.jsx` are the React building block components for the app.
  - I chose inline styling (of which there is fairly little) for simplicity. If the app were to grow, a more robust styling arrangement could be easily put in place.
  - Since the user interactions are almost all based on clicking, typing or keyboard shortcuts that pertain to one particular todo node, I put the main user interaction logic in `Todo.jsx`, which has worked great.

Contributions are welcome! Feel free to send a pull request and/or contact me as per below.

# License

MIT

# Contact

I enjoy hearing from people checking out my projects. Get in touch on twitter [@justinhaaheim](https://twitter.com/justinhaaheim) or email me at `io` @ `justinh` dot `org`.
