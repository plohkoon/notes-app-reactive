const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const { ipcMain } = require('electron');

const fs = require('fs'),
      sqlite = require('sqlite3'),
      util = require('util');


//gets the number of day differences between 2 dates
const dateDiff = (origin, current) => {
    //converts string to date objects
    const   originDate = new Date(origin),
            currentDate = new Date(current),

            originTime = originDate.getTime(),
            currentTime = currentDate.getTime(),
            //gets the difference between times and then converts it to days
            diffTime = currentTime - originTime,
            diffDay = Math.round(diffTime / (1000 * 60 * 60 * 24));

    console.log(originDate);
    console.log(currentDate);
    console.log(diffDay);
    //if the day is after last track returns it
    if(diffDay >= 0) {
        return diffDay.toString();
    }
    else {
        return "n/a";
    }

}
//simple function to clean sql query
const sqlEscape = (query) => {
    //changes how apostrphe escaping is handled as SQL does differently
    let     escapedQuery = query.replace("\'", "''"),
            cleansedQuery = sqlstring.escape(escapedQuery);
    //cleans up after the sql escape gets a bit to OCD in its cleanse
    cleansedQuery = cleansedQuery.replace(/\\/g, "");
    console.log(cleansedQuery);

    return cleansedQuery;

}

let mainWindow,
    db;

async function prepareDB() {
  return new Promise((resolve, reject) => {
    //pomisifies the database creation and writeFile function
    const writeFile = util.promisify(fs.writeFile),
          Database = (dbPath, sqlType) => {
            return new Promise((res, rej) => {
              //creates the database
              let initializedDB = new sqlite.Database(dbPath, sqlType, (err) => {
                //if errored then rejects promise
                if(err) {
                  console.log("failed to intialize databse connection");
                  rej(err);
                }
                //if succeeds returns database
                res(initializedDB);
              });
            });
          };

      let dbPath = electron.app.getPath('userData') + "/NOTES.db";

      writeFile(dbPath,  "", { flag : 'wx' })
        .catch(err => {
          console.log("file already there");
        })
        .then(res => {
          console.log("file exists");
          Database(dbPath, sqlite.OPEN_READWRITE)
            .then(db => {
              console.log("database exists");
              db.all("create table  if not exists notes(id INTEGER PRIMARY KEY AUTOINCREMENT, note_id TEXT, note TEXT, date TEXT);", [], (err, res) => {
                if(err) {
                  console.log(err);
                  throw err;
                }
                resolve(db);
              })
            })
            .catch(err => {
              console.log("there was an error with the database")
            })
        })

  });

}

async function createWindow() {
  db = await prepareDB();
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    icon: __dirname + '/resources/Geek.ico',
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/*
Now begins the CRUD operations, has a listener for
each of the 4 CRUD operations
*/

ipcMain.on('getRows', (event, arg) => {
  let query="select * from notes where date=? order by note_id";
  db.all(query, arg, (err, rows) => {
    if(err) {
      console.log(err);
    }
    event.sender.send('sendRows', rows);
  });
});

ipcMain.on('addRow', (event, arg) => {
  let query="insert into notes (date, note_id, note) values (?,?,?);"
  let values = JSON.parse(arg);
  db.all(query, values, (err, res) => {
    if(err) {
      console.log(err);
    }
    event.returnValue = true;
  });
});

ipcMain.on('deleteRow', (event, arg) => {
  let query="delete from notes where date=? and id=?;";
  let value=JSON.parse(arg);
  db.all(query, value, (err, res) => {
    if(err) {
      console.log(err);
    }
    event.returnValue = true;
  });
});

ipcMain.on('changeRow', (event, args) => {
  let query="update notes set note=? where date=? and id=?";
  let value=JSON.parse(args);
  db.all(query, value, (err, res) => {
    if(err) {
      console.log(err);
    }
    event.returnValue = true;
  });
});
