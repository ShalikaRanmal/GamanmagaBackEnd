var details_db = require("../databases/job-details")

class DetailReq {
    constructor(){}

    getJobDetailsAll(req, res){
        try{
            //SQL query to select all data
            var sql = "select * from jobDetails ORDER BY t_id, sortNu";
            var sql2 = "select * from jobRoads ORDER BY t_id, road_id, sortNu";
            var params = [];

            //Running the SQL query
            details_db.all(sql, params, (err, rows)=>{
                //error response
                if (err){
                    console.log("error by detail data getting");
                    res.status(400).json({error: err.message});
                    return;
                }
            
            
            details_db.all(sql2, params, (err, row)=>{
                //error response
                if (err){
                    console.log("error by road data getting");
                    res.status(400).json({error: err.message});
                    return;
                }
                //console.log("data got from road table");
                //console.log("going to send response");
            //Success resoponse
            res.status(200).json({
                message: "success",
                data: rows,
                road:row,
            });
        });
            });
        }catch(E){
            console.log("exception when try")
            res.status(400).send(E);
        }
    }

    getJobDetails(req, res){
        try{
            //SQL query to select all data
            var sql = "select * from jobDetails WHERE t_id = ? ORDER BY t_id, sortNu";
            var sql2 = "select * from jobRoads WHERE t_id = ? ORDER BY t_id, road_id, sortNu";
            var params = req.params.id;

            //Running the SQL query
            details_db.all(sql, [params], (err, rows)=>{
                //error response
                if (err){
                    console.log("error by detail data getting");
                    res.status(400).json({error: err.message});
                    return;
                }
            
            
            details_db.all(sql2, [params], (err, row)=>{
                //error response
                if (err){
                    console.log("error by road data getting");
                    res.status(400).json({error: err.message});
                    return;
                }
                console.log("data got from road table");
                console.log("going to send response");
                //console.log(rows)
                //console.log(row);
            //Success resoponse
            res.status(200).json({
                message: "success",
                data: rows,
                road:row,
            });
        });

            
            });
            console.log("uccesfully send response");
        }catch(E){
            console.log("exception when try")
            res.status(400).send(E);
        }
    }

    addJobDetails(req, res){
        try{
            const {
                t_id,
                sortNu,
                name,
                description
            } = req.body;
    
            //SQL query to insert data into the database
            var sql = "INSERT INTO jobDetails (t_id, sortNu, name, description) VALUES (?,?,?,?)";
            var params = [t_id, sortNu, name, description];
    
            //Running the SQL query
            details_db.run(sql, params, function(err, result) {
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

    updateJobDetails(req, res){
        try{
            const {
                id,
                t_id,
                sortNu,
                name,
                description
            } = req.body;
    
            //SQL query to insert data into the database
            var sql = "UPDATE jobDetails set t_id = ?, sortNu = ?, name = ?, description = ? WHERE id = ?";
            var params = [t_id, sortNu, name, description, id];
    
            //Running the SQL query
            details_db.run(sql, params, function(err, result) {
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

    deleteJobDetails(req,res){
        try{
            //Running the SQL query
            details_db.run(`DELETE FROM jobDetails WHERE id = ?`,
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

module.exports = DetailReq ;