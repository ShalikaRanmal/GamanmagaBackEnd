var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "field_db.sqlite";

let field_db = new sqlite3.Database(DBSOURCE, (err)=>{
    if(err){
        //cannot open database
        console.error(err.message);
        throw err;
    }else{
      console.log("Connected to the sqlite database.jobFields");
      field_db.run(
          `CREATE TABLE jobFields(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sortNu INTEGER,
                jobSin text,
                jobEng text
              )`,
            (err) => {
              if (err) {
                // This error occure when table already created. No Issue
              } 
            }
          );
    }
});

module.exports = field_db;