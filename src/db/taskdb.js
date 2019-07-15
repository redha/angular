'use strict';

const DB_NAME = `tasksdb001`;
const DB_CURRENT_VERSION = 2;
const DB_TASKS_STORE = "Tasks";
let database = null;
let errored = false;

// Create the database
console.log(`init...`, database);

if (!window.indexedDB){
    console.log(`Error: Browser does not support indexedDB !!`);
    errored = true;
}
else{
    console.log(`IndexedDB supported. OK ...`);
    let req = window.indexedDB.open(DB_NAME, DB_CURRENT_VERSION);
    // Management OnSuccess
    req.onsuccess = function(event){
        database = event.target.result; // OLD CODE ?
        // database = req.result;
        console.log(`Database successfully Opened !!`);
    };
    // Management OnError
    req.onerror = function(event){
        console.log(`Error: Permission denied !!`, event.target.errorCode);
    };
    // Management OnUpgradeNeeded
    req.onupgradeneeded = function(event){
        console.log(`the current database's version is ${event.oldVersion}`);
        if(!event.oldVersion || event.oldVersion < 1){
            console.log(`Creating database ${DB_NAME} (Version ${DB_CURRENT_VERSION})...`);
            let store = event.currentTarget.result.createObjectStore(DB_TASKS_STORE, { keyPath: "id", autoIncrement: true});
            store.createIndex("labelIdx", "label", {unique: false});
            store.createIndex("idIdx", "id", {unique: true});
        }

        if (!event.oldVersion || event.oldVersion < 2){
            console.log(`Migrating the database ${DB_NAME} from V. ${event.oldVersion} to V.2)`);
            let tx = req.transaction;
            let store = tx.objectStore(DB_TASKS_STORE);

            store.createIndex("deletedIdx", "deleted", {unique: false});
            store.createIndex("doneIdx", "done", {unique: false});
        }

        
    };
    // Management ONSUCCESS
    req.onblocked = function(event){
        console.log(`database migration blocked. Please close all other instance and reload the app.`);
    };
}

// Creating the Store
console.log('Creating the store...');

function AddATask (tasktoAdd){
    if (errored)
        throw "ERROR: Cannot proceed we already had an error";
    if (!database)
        throw "ERROR: No database to work with";
    let report = null; // nothing happened !
    console.log(`Adding task: `);
    console.log(tasktoAdd);

    if (tasktoAdd && tasktoAdd.label && tasktoAdd.label.trim().length > 0){
        console.log(`Creating the objectStore with readwrite mode`);
        let tx = database.transaction(DB_TASKS_STORE, "readwrite");
        let tasksRW = tx.objectStore(DB_TASKS_STORE);
        console.log("Task ObjectStore: ", tasksRW);
        if(tasksRW){
            let req = tasksRW.add(tasktoAdd);
            console.log(`Adding task ....`);
            req.onsuccess = function(event){
                console.log(`task Added successfully`, event);
                report = `task Added successfully`;
            };
            req.onerror = function(event){
                console.log(`ERROR: can't add new task !`, req.error);
                report = `ERROR: can't add new task ${req.error}`;
            };
        }
        else{
            console.log('Sorry, I got no ObjectStore!');
        }
    }
}

function ReadAllTasks(){
    if(!database)
        throw "The Database object is empty !!";
    let allTasks = [];
    let tx = database.transaction(DB_TASKS_STORE, "readonly");
    if(!tx)
        throw "Cannot get transaction for reading all tasks";
    let tasksR = tx.objectStore(DB_TASKS_STORE);
    let req = tasksR.openCursor();
    req.onsuccess = function(event){
        // let cursor = req.result;
        let cursor = event.target.result;
        if (cursor){
            allTasks.push(cursor.value);
            cursor.continue();
        }
        console.log("Cursor Opened");
    }
    req.onerror = function (event){
        console.log("Cannot get a cursor", event);
    } 
    return allTasks;
}

function EmptyTheTrash(){
    let tx = database.transaction(DB_TASKS_STORE, "readwrite");
    if(!tx)
        throw "Cannot get transaction to empty the trash";
    console.log("Transaction created to EMPTY THE RECYCLEBIN");

    let tasksRWStore = tx.objectStore(DB_TASKS_STORE);
    console.log("Got the ObjectStore. OK");

    let deleteIndex = tasksRWStore.index("deletedIdx");
    let rq = deleteIndex.openKeyCursor(IDBKeyRange.only(1)); // get the tasks keys marked for deletion only
    console.log(`Got the ${deleteIndex.count()} tasks marked as deleted`);

    rq.onsuccess = function(event){
        let cursor = rq.result;
        if(cursor){
            tasksRWStore.delete(cursor.primaryKey);
            cursor.continue();
        }
    }

    rq.onerror = function(event){
        return false;
    }

    return true;
}

let dbMgr = {
    AddThisTask: function(task){
        AddATask(task);
    },
    GetAllTasks: function(){
        return ReadAllTasks();
    },
    EmptyTrash: function(){
        return EmptyTheTrash();
    },
    Errored: () => errored
}

export default dbMgr;