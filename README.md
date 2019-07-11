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
- [ ] buttons are too close to each other (on mobile it sucks)
- [ ] Replace the restore Btn
- [ ] PWA - issue: unlike icons, buttons are not cached automatically. They sould
- [ ] All Form inputs should have associated labels (assistive technologies)
- [ ] Persist all data in Database (or any other storage)
- [ ] Options: Add newest task to the top, Enable RecylceBin, Confirm Before Delete, adjust task's label when taping...
- [ ] About & Credits (flaticon, vue, github, ...)
- [X] Enable auto caps (the first letter)
- [X] Add button when disabled, set the color to gray instead of black
- [X] Issue: User shouldn't be able to add empty tasks nor extra whitespaces
- [X] Add visibility property to the task
- [X] Do not delete task, mark it as invisible instead
- [X] Empty Recylle Bin
- [X] Issue: On chromium, the input got borders onfocus 
- [X] PWA: Add manifest.js
- [X] PWA: Page load is not fast enough !! should I cache index.html ?
- [X] PWA: current page does not repond with 200 when offline
- [X] PWA: Unable to fetch start URL via service worker (related with )
- [X] PWA: Offline Intgration (Basic)
- [X] PWA: Cache every file at fetch (js, image, ico, html)
- [X] PWA: fetch index.html or '/' instead of offline.html

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
