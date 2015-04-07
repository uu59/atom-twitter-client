# Features

- User page
  - follow / unfollow
  - block / report as spam
- Minimize to open external browser
  - Click hashtag link to search it in app
- Lists management
- Auto reload
  - with WebWorker?
- Setting something with setting component
  - fetching tweets count
  - font size
  - etc
- Remove account?

# Fix

- Adding new twitter account then refresh sidebar

# Refactor

- Unite "User" and "Account" words to be "Account"
- `Storage` is too low level, build more higher API such as `AccountStorage`.
- Rename "Sidebar"
- Remove "Main" component maybe that is unnecessary
- `build/main.js` handling
- Many action/event names, possibly with explicit rule
