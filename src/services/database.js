const Database = require('better-sqlite3');
const db = new Database('log.db');


const stmt = db.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`
    );

// Define row using `get()` from better-sqlite3
let row = stmt.get();
// Check if there is a table. If row is undefined then no table exists.
if (row === undefined) {
// Echo information about what you are doing to the console.
    console.log('Your database appears to be empty. I will initialize it now.');
// Set a const that will contain your SQL commands to initialize the database.
    const sqlInit = `
    CREATE TABLE accesslog ( id INTEGER PRIMARY KEY, 
        remoteaddr TEXT, remoteuser TEXT, time INTEGER, 
        method TEXT, url TEXT, protocol TEXT, 
        httpversion TEXT, secure TEXT, status INTEGER, 
        referer TEXT, useragent TEXT);
    `;
    // Execute SQL commands that we just wrote above.
    db.exec(sqlInit);
    // Echo information about what we just did to the console.
    console.log('Your database has been initialized with a new table.');
} else {
    // Since the database already exists, echo that to the console.
    console.log('Database exists.')
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = db
//should be finishededed

