//Not cmplete
var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db_details.sqlite";

let details_db = new sqlite3.Database(DBSOURCE, (err)=>{
    if(err){
        //cannot open database
        console.error(err.message);
        throw err;
    }else{
      console.log("Connected to the sqlite database.jobDetails");
      details_db.run(
          `CREATE TABLE jobDetails (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                t_id number,
                sortNu number,
                name text,
                description text
              )`,
            (err) => {
              if (err) {
                // Table already created
              } 
            }
          );
      details_db.run(
          `CREATE TABLE jobRoads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                road_id number,
                t_id number,
                sortNu number,
                road text,
                path text
              )`,
            (err) => {
              if (err) {
                // Table already created
              } 
            }
          );
        
    }
  });

  
module.exports = details_db;