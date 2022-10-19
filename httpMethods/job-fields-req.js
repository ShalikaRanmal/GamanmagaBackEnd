
var field_db = require("../databases/job-fields");

class FieldReq {
    constructor(){}

    getJobFields(req, res){
        try{
            //SQL query to select all data
            var sql = "select * from jobFields ORDER BY sortNu";
            var params = [];
    
            //Running the SQL query
            field_db.all(sql, params, (err, rows)=>{
                //error response
                if (err){
                    res.status(400).json({error: err.message});
                    return;
                }
                //Success resoponse
                res.status(200).json({
                    message: "success",
                    data: rows,
                });
            });
        }catch(E){
            res.status(400).send(E);
        }
    }

    addJobFields(req, res){
        try{
            const {
                sortNu,
                jobSin,
                jobEng
            } = req.body;
    
            //SQL query to insert data into the database
            var sql = "INSERT INTO jobFields (sortNu, jobSin, jobEng) VALUES (?, ?,?)";
            var params = [sortNu, jobSin, jobEng];
    
            //Running the SQL query
            field_db.run(sql, params, function(err, result) {
                //Error response
                if(err) {
                    res.status(400).json({ "error": err.message});
                    return;
                }else{
                    //Success response
                    res.status(200).json({
                        message: "success",
                        id:this.lastID,
                    });
                }
            });
        } catch(E) {
            res.status(400).send(E);
        }
    }

    updateJobFields(req, res){
        try{
            const {
                id,
                sortNu,
                jobSin,
                jobEng
            } = req.body;
    
            //SQL query to insert data into the database
            var sql = "UPDATE jobFields set sortNu = ?, jobSin = ?, jobEng = ? WHERE id = ?";
            var params = [sortNu, jobSin, jobEng, id];
    
            //Running the SQL query
            field_db.run(sql, params, function(err, result) {
                //Error response
                if(err) {
                    res.status(400).json({ "error": err.message});
                    return;
                }else{
                    //Success response
                    res.status(200).json({ updated: this.changes });
                }
            });
        } catch(E) {
            res.status(400).send(E);
        }
    }

    deleteJobField(req,res){
        try{
            //Running the SQL query
            field_db.run(`DELETE FROM jobFields WHERE id = ?`,
            req.params.id,
            function(err, result){
                //error response
                if (err){
                    res.status(400).json({error: err.message});
                    return;
                }
                //Success resoponse
                res.status(200).json({
                    message: "deleted",
                    rows:this.changes,
                });
            });
        }catch(E){
            res.status(400).send(E);
        }
    }


}




module.exports = FieldReq;
//------------------------------------