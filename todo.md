this app is a test essentially to make sure I better understand socket.io. Goal should be some sort of good looking MVP. Users can choose their icon and username, enter a room or create a room and play customizable rounds of hangman. There wont be any user accounts, multiple modes ( besides maybe singleplayer mode), detailed faq

- [x] fix dynamic route not accept game code from server and breaking app
- begin watching guides on how to properly setup the initial socket.io events so they are completely stable, error free ( as much as possible ) and typesafe
- update styling and add dark mode toggle ( maybe for later )
- create figma mockups of what the pages will look like before coding them
- create a event timeline of how the game will work ( high level first and then go into greater details as I figure them out)
- [x] players can still be present in the same room multiple times so all their messages are duplicated
- [x] rooms are not properly distinguished
- [x] work on improving the socket connection one part at a time so right now the focus is on making sure that players can easily join and leave rooms
- figure out how to fix cors error for non host
- figure out state to be able to share username, messages and other data between components that require it
  List of Changes I made since start

- changed from options api to composition api
- changed from vanillajs to typescript
- changed from vue3 to nuxt3
- changed from express server to nuxt server
- changed from npm workspaces to pnpm
- changed from fontawesome to heroicons
- changed from socket.io service function to vue plugin to nuxt plugin

socket.io improvement tips

- [x] instead of having the send message events nested in the join room event, have them separate and pass the roomCode aas part of the message?
- [x] figure out if to use spread or .push() for updating arrays
- when players try to join a room, there should be checks in place to make sure that the player is not part of any room already ( outside of their default id room) and that the room isn't at capacity
- if someone enters the url for a room, the app should get the code from the url, prompt the user to enter a username if one isn't yet set and add them to the room if it isnt full
- set messages to an empty array whenever join room happens so only messages for this room is shown to socket
- send timestamps in message
- functional ready checks
- setting isHost
- create setting component
- [x] scroll on chatbox
- scroll to bottom on chatbox
- add min and max values to setting
- [x] typing the data that should be sent in each event
- [x] leave room whenever user navigates away from [id] routes
- figure out how to break up server code and how to get it game functionality on server
- figure out what way the hangman game will be built( svg, canvas etc)
- automate pushing to heroku
- get words from api ( figure out how words api works)

## Bugs

- [x] if two people click on create room, the second create room overrides the first and puts both people in the same room **socket.emit instead of io.emit**
- if someone tries to play from a vscode live share ( only version tested so far) they get a cors error
- [x] user list doesnt show on server change ( intended?) **changed since list would get reset for a new room anyways**
- [x] when second user leaves, user list disappears
- [x] user list is being called everytime the component mounts
- only first player can see playerlist
- [x] neither heroku or render deployment is working
