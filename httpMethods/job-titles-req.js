var title_db = require("../databases/job-titles")

class TitleReq {
    constructor(){}

    getJobTitlesAll(req, res){
        try{
            //SQL query to select all data
            var sql = "select * from jobTitles ORDER BY fieldId, sortNu";
            var params = [];
    
            //Running the SQL query
            title_db.all(sql, params, (err, rows)=>{
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

    getJobTitles(req, res){
        try{
            //SQL query to select all data
            var sql = "select * from jobTitles WHERE fieldId = ? ORDER BY fieldId, sortNu";
            var params = req.params.id;
    
            //Running the SQL query
            title_db.all(sql, [params], (err, rows)=>{
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

    addJobTitles(req, res){
        try{
            const {
                fieldId,
                sortNu,
                jobSin,
                jobEng
            } = req.body;
    
            //SQL query to insert data into the database
            var sql = "INSERT INTO jobTitles (fieldId, sortNu, jobSin, jobEng) VALUES (?,?,?,?)";
            var params = [fieldId, sortNu, jobSin, jobEng];
    
            //Running the SQL query
            title_db.run(sql, params, function(err, result) {
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

    updateJobTitles(req, res){
        try{
            const {
                id,
                fieldId,
                sortNu,
                jobSin,
                jobEng
            } = req.body;
    
            //SQL query to insert data into the database
            var sql = "UPDATE jobTitles set fieldId = ?, sortNu = ?, jobSin = ?, jobEng = ? WHERE id = ?";
            var params = [fieldId, sortNu, jobSin, jobEng, id];
    
            //Running the SQL query
            title_db.run(sql, params, function(err, result) {
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

    deleteJobTitles(req,res){
        try{
            //Running the SQL query
            title_db.run(`DELETE FROM jobTitles WHERE id = ?`,
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

module.exports = TitleReq;