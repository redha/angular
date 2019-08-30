'use strict';

const DB_NAME = `tasksdb001`;
const DB_CURRENT_VERSION = 2;
const DB_TASKS_STORE = "Tasks";
let database = null;
let errored = false;

if (!window.indexedDB){
    console.log(`[DB] Error: Your browser does not support indexedDB !!`);
    errored = true;
}
else{
    console.log(`[DB] IndexedDB supported. OK ...`);
    let req = window.indexedDB.open(DB_NAME, DB_CURRENT_VERSION);
    // Management OnSuccess
    req.onsuccess = function(event){
        database = event.target.result; // OLD CODE ?
        // database = req.result;
        console.log(`[DB] Database successfully Opened !!`);
    };
    // Management OnError
    req.onerror = function(event){
        console.log(`[DB] Error: Permission denied !!`, event.target.errorCode);
    };
    // Management OnUpgradeNeeded
    req.onupgradeneeded = function(event){
        console.log(`the current database's version is ${event.oldVersion}`);
        let tasksStore = event.currentTarget.result.createObjectStore(DB_TASKS_STORE, { keyPath: "id", autoIncrement: true});
        if(!event.oldVersion || event.oldVersion < 1){
            console.log(`Creating database ${DB_NAME} (Version ${DB_CURRENT_VERSION})...`);
            tasksStore.createIndex("labelIdx", "label", {unique: false});
            tasksStore.createIndex("idIdx", "id", {unique: true});
        }

        if (!event.oldVersion || event.oldVersion < 2){
            console.log(`Migrating the database ${DB_NAME} from V. ${event.oldVersion} to V.2)`);
            let tx = req.transaction;
            // let store = tx.objectStore(DB_TASKS_STORE); // I was not sober when I wrote that !!
            tasksStore.createIndex("deletedIdx", "deleted", {unique: false});
            tasksStore.createIndex("doneIdx", "done", {unique: false});
        }

        
    };
    // Management ONSUCCESS
    req.onblocked = function(event){
        console.log(`[DB] database migration blocked. Please close all other instance and reload the app.`);
    };
}

// Creating the Store
console.log('[DB] Creating the store...');

function CheckDB(){
    if (!database)
        throw "[DB] The Database object is empty !!";
    if (errored)
        throw "[DB] The DB Connector is in ERRORED State. I Can't continue.";
}

let dbMgr = {
    addTask: function(tasktoAdd, tasksList){
        if (errored)
         throw "[DB] ERROR: Cannot proceed we already had an error";
        if (!database)
            throw "[DB] ERROR: No database to work with";
        let report = null; // nothing happened !
        console.log(`[DB] Init Adding task `, tasktoAdd);

        if (tasktoAdd && tasktoAdd.label && tasktoAdd.label.trim().length > 0){
            console.log(`[DB] Creating the objectStore with readwrite mode`);
            let tx = database.transaction(DB_TASKS_STORE, "readwrite");
            let tasksRW = tx.objectStore(DB_TASKS_STORE);
            console.log("[DB] Task ObjectStore: ", tasksRW);
            if(tasksRW){
                let req = tasksRW.add(tasktoAdd);
                req.onsuccess = function(event) {
                    console.log(`task added successfully`);
                    tasktoAdd.id = req.result;
                    tasksList.push(tasktoAdd);
                };
                req.onerror = function(error){
                    console.log(`ERROR: the task cannot be added !`);
                    throw `ERROR: The task cannot be added !`;
                }
            }
            else{
                console.log(`[DB] Error: Can't access the 'Tasks Store'`);
                throw "Error: Can't access the 'Tasks Store'";
            }
        }
    },
    GetOneTask: function(){
        throw "GetOneTask: Not implemented yet";
    },
    GetAllTasks: function(){
        CheckDB();
        let allTasks = [];
        let tx = database.transaction(DB_TASKS_STORE, "readonly");
        if(!tx)
            throw "[DB] Cannot get transaction for reading all tasks";
        let tasksR = tx.objectStore(DB_TASKS_STORE);
        let req = tasksR.openCursor();
        req.onsuccess = function(event){
            // let cursor = req.result;
            let cursor = event.target.result;
            if (cursor){
                allTasks.push(cursor.value);
                cursor.continue();
            }
        }
        req.onerror = function (event){
            console.log("[DB] Cannot get a cursor", event);
        }
        return allTasks;
    },
    EmptyTrash: function(){
        let tx = database.transaction(DB_TASKS_STORE, "readwrite");
        if(!tx)
            throw "[DB] Cannot get transaction to empty the trash";
        console.log("[DB] Transaction created to EMPTY THE RECYCLEBIN");
    
        let tasksRWStore = tx.objectStore(DB_TASKS_STORE);
        console.log("[DB] Got the ObjectStore. OK");
    
        let deleteIndex = tasksRWStore.index("deletedIdx");
        let rq = deleteIndex.openKeyCursor(IDBKeyRange.only(1)); // get the tasks keys marked for deletion only
        console.log(`[DB] Got tasks marked as deleted`);
    
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
    },
    UpdateTask: function (task, property, newValue){
        if (!task || !task.id)
            throw "the task Object is not valid";
        let id = task.id;
        let newTask = null;
        console.log(`[DB] Set task (id = ${id}), property: ${property} = ${newValue}`);
        CheckDB();

        // Get the task from database
        // Create a transaction on tasks objects store on readwrite mode
        let tx = database.transaction(DB_TASKS_STORE, "readwrite")
        if (!tx)
            throw "[DB] cannot create a transaction !!";
        
            //console.log(`Successfully create a transaction !!`, tx);
        
        // The object store
        let tasksRWObjectStore = tx.objectStore(DB_TASKS_STORE);
        if (!tasksRWObjectStore)
            throw "[DB] cannot create an objectstore fro the transaction !!";
        //console.log(`Successfully create an object store !!`, tasksRWObjectStore);
        
        // The cursor, if there is one, use a teporary intermediate variable to run the update command
        let req = tasksRWObjectStore.openCursor(IDBKeyRange.only(id));

        console.log(`[DB] The Cursor is: `,req);

        req.onsuccess = function(event){
            let cursor = req.result;
            if (cursor){
                console.log(`[DB] Cursor is on  @ ${cursor.value.id}`);

                newTask = cursor.value;
                // console.log(`[DB] BEFORE newTask from cursor is .....`, newTask);
                newTask[property] = newValue;
                console.log(`[DB] AFTER newTask  is .....`, newTask);

                let updateReq = cursor.update(newTask);
                updateReq.onsuccess = function(event){
                    console.log("[DB] Update successfully!");

                    // THIS CODE IS DEACTIVATED
                    // updateReq.result will contain the updated record's primary key
                    // Here we try to read the whole updated updated record, in case the record had been updated from another tab

                    // let theNewTaskRequest = tasksRWObjectStore.get(updateReq.result);
                    // theNewTaskRequest.onsuccess = function(event){
                    //     console.log(`The new Record now is :`, theNewTaskRequest.result);
                    //     newTask = theNewTaskRequest.result;
                    // }

                    // END OF DEACTIVATED CODE
                }
                cursor.continue();
            }
            return newTask;
        };
        //console.log(`[DB] the task now is:.........`, newTask)
        return newTask;
    },
    Errored: () => errored
}

export default dbMgr;