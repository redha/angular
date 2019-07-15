# todo 

## Download the Project
```
git clone https://github.com/redha/Todo.git
```

## Project setup
```
cd todo
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## Working on
### Design (CSS & HTML)
- [ ] Set the font size in proportion of the viewport's height (or width ?)
- [ ] If user clicks on the add button, the keyboard disappears and the input looses focus
- [ ] Add a little margin on the bottom, the last item sticks to the window's bottom 
- [ ] All Form inputs should have associated labels (assistive technologies), add alt attr to all images
- [ ] Buttons are too close to each other (UX on mobile sucks)
- [ ] Get rid of the vertical scroll
- [ ] About & Credits (flaticon, vue, github, ...)
- [X] Replace the restore Btn or change its color (coz it's too light)
- [X] mask the add button if the form is invalid
- [X] Issue: On chromium, the input got borders onfocus 

### Dev
- [X] Database: OnAdd
- [X] Database: Refresh All data
- [X] Database: EmptyRecycleBin
- [ ] Database: OnUpdate (Complete, ToggleDelete)
- [ ] PWA - issue: unlike icons, buttons are not cached automatically. They should
- [ ] AUTO UPDATE THE APP.
- [ ] Issue: On mobile it freezes or the buttons are almost unclickable how to know
- [ ] Options: Add newest task to the top, Enable RecylceBin, Confirm Before Delete, adjust task's label when taping...
- [X] Enable auto caps (the first letter)
- [X] Issue: User shouldn't be able to add empty tasks nor extra whitespaces
- [X] Add visibility property to the task
- [X] Do not delete task, mark it as invisible instead
- [X] PWA: Add manifest.js
- [X] PWA: Page load is not fast enough !! should I cache index.html ?
- [X] PWA: current page does not repond with 200 when offline
- [X] PWA: Unable to fetch start URL via service worker (related with )
- [X] PWA: Offline Intgration (Basic)
- [X] PWA: Cache every file at fetch (js, image, ico, html)
- [X] PWA: fetch index.html or '/' instead of offline.html
- [X] Add Action: Empty Recylle Bin

### Version 0.3.0 
* PWA capable

### Version 0.2.0 
* Dock the add button to the right of the input area (nowrap)

### Version 0.1.0 
* Add, Complete and delete (Cancel) a Task
* Styling

Made by @redha with ♥ ♥ to [vuejs.org](https://vuejs.org).
Released under the [MIT License](https://opensource.org/licenses/MIT).
Copyright © 2019 [Redha Achour](https://github.com/redha)
