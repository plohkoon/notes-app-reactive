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

let mainWindow,
    db,
    stats;

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
                  console.log("failed to intialize database connection");
                  rej(err);
                }
                //if succeeds returns database
                res(initializedDB);
              });
            });
          };

      let dbPath = electron.app.getPath('userData') + "//NOTES.db";
      //attempts to write DB file will fail if exists
      writeFile(dbPath,  "", { flag : 'wx' })
        //erros if db exists
        .catch(err => {
          console.log("file already there");
        })
        //continuse on
        .then(res => {
          console.log("file exists");
          //attempts to open DB file
          Database(dbPath, sqlite.OPEN_READWRITE)
            //ensures that the table exists properly
            .then(db => {
              console.log("database exists");
              db.all("create table  if not exists notes(id INTEGER PRIMARY KEY AUTOINCREMENT, note_id TEXT, note TEXT, date TEXT);", [], (err, res) => {
                if(err) {
                  console.log(err);
                  throw err;
                }
                //finally returns the database
                resolve(db);
              })
            })
            .catch(err => {
              console.log("there was an error with the database")
            })
        })

  });

}

async function prepareStats() {
  return new Promise((resolve, reject) => {
    //promisifies read and write file
    const writeFile=util.promisify(fs.writeFile),
          readFile=util.promisify(fs.readFile);
    let filePath = electron.app.getPath('userData') + "/stats.json";
    //initializes default values
    let defaultValues= {
      dataWipe: '2100-01-01',
      nps: '2100-01-01',
      detractor: '2100-01-01',
    }
    //attempts to write file with no oeverwrite
    writeFile(filePath, JSON.stringify(defaultValues), { flag: 'wx' })
      //if errored the file exists
      .catch(err => {
        console.log("file already there");
      })
      //proceeds to read the file
      .then(res => {
        readFile(filePath)
          //once file is read verifies that the data is in a healthy state
          .then(res => {
            //parses JSON and creates the regex
            let values=JSON.parse(res);
            let regex=new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}");
            //verifies that every value exists and that it matches pattern
            if(!values.dataWipe || !regex.test(values.dataWipe)) {
              values.dataWipe='2100-01-01';
            }
            if(!values.nps || !regex.test(values.nps)) {
              values.nps='2100-01-01';
            }
            if(!values.detractor || !regex.test(values.detractor)) {
              values.detractor='2100-01-01';
            }
            //resolves the JSON object
            resolve(values);
          })
          .catch(err => {
            console.log(err);
            throw err;
          })
      })
  })
}

async function createWindow() {
  //creates and saves database variable
  db = await prepareDB();
  //creates and saves stats
  stats = await prepareStats();
  //initializes window
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    icon: __dirname + './/Geek.ico',
  });
  //loads the file depending on if dev or if prod
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}
//on ready opens window
app.on('ready', createWindow);
//on closed quits
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
//mac detail
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/*
Basic get and return for the 3 extra stats being tracked
*/
//basic get operation for stats from the stats variable
ipcMain.on('getStats', (event, arg) => {
  event.sender.send('sendStats', JSON.stringify(stats));
});
//update operation
ipcMain.on('setStats', (event, arg) => {
  //setting initial variables
  let value = JSON.parse(arg),
      path =  electron.app.getPath('userData') + "/stats.json";
  //updates the stat in the stats object
  stats = Object.assign(stats, value);
  //sends the new object
  event.sender.send('sendStats', JSON.stringify(stats));
  //writes the new object to file to save it
  fs.writeFile(path, JSON.stringify(stats), (err) => {
    if(err) {
      console.log(err);
      throw err;
    }
    console.log("Stats file updated");
  })
})
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
  let values = JSON.parse(arg)
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
