var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "titles_db.sqlite";

let titles_db = new sqlite3.Database(DBSOURCE, (err)=>{
    if(err){
        //cannot open database
        console.error(err.message);
        throw err;
    }else{
      console.log("Connected to the sqlite database.jobTitles");
      titles_db.run(
          `CREATE TABLE jobTitles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fieldId number,
                sortNu INTEGER,
                jobSin text,
                jobEng text
              )`,
            (err) => {
              if (err) {
                // Table already created
              } 
            }
          );
    }
  });

  
module.exports = titles_db;