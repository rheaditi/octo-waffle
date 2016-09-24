# octo-waffle

## Requirements 
Build an AngularJS app which meets the following requirements

- [ ] Display list of rooms as grids
- [x] Each room should be accessed by a unique URI (Use UI router)
- [ ] `Add room` button should add a room
- [x] Each room could have a todo list which is specific to that room
- [x] Store all the todo entries in local storage namespaced with room ids

Additional:

- [ ] ngAnnotate
- [ ] build with minify
- [ ] Better UI, pls

## Run Locally

1. Clone this repository and go into its root folder.
2. Run `npm install`
3. Run `node server.js`
4. Go to `http://localhost:1337/#/` to view the app

## Data Structures Used

#### Room Schema
Rooms stored as an array of `room` objects. The `room` object looks like:

```js
{
	id: 1234, //a unique integer id
	name: 'RedRoom', //a friendly name for each room
}
```

#### Todo Schema
Each todo is stored in the `room.id` namespace.
```js
{
	id: 0234, //a unique integer id
	text: 'Paint the room red.', //todo text
	complete: false //boolean to represent done or undone
	completedAt: null, //date it was completed if complete is true, else null
}
```
