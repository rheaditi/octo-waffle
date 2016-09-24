# octo-waffle

## Requirements 
Build an AngularJS app which meets the following requirements

- [ ] Display list of rooms as grids
- [ ] Each room should be accessed by a unique URI (Use UI router)
- [ ] `Add room` button should add a room
- [ ] Each room could have a todo list which is specific to that room
- [ ] Store all the todo entries in local storage namespaced with room ids

Additional:

- [ ] ngAnnotate
- [ ] build with minify

## Data Structure

#### Room Schema
Rooms stored as an array of `room` objects. The `room` object looks like:

```json
{
	id: 1234, //a unique integer id,
	name: 'RedRoom', //a friendly name for each room
	todos: [ ...list of todo objects... ]
}
```

### Todo Schema
{
	id: 0234, //a unique integer id
	text: 'Paint the room red.', //todo text
	complete: false //boolean to represent done or undone
}