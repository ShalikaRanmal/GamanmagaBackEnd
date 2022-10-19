var details_db = require("../databases/job-details")

class RoadsReq {
    constructor(){}

    addJobRoads(req, res){
        try{
            const {
                road_id,
                t_id,
                sortNu,
                road,
                path
            } = req.body;
    
            //SQL query to insert data into the database
            var sql = "INSERT INTO jobRoads (road_id, t_id, sortNu, road, path) VALUES (?,?,?,?,?)";
            var params = [road_id, t_id, sortNu, road, path];
    
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

    updateJobRoads(req, res){
        try{
            const {
                id,
                road_id,
                t_id,
                sortNu,
                road,
                path
            } = req.body;
    
            //SQL query to insert data into the database
            var sql = "UPDATE jobRoads set road_id = ?, t_id = ?, sortNu = ?, road = ?, path = ? WHERE id = ?";
            var params = [road_id, t_id, sortNu, road, path, id];
    
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

    deleteJobRoads(req,res){
        try{
            //Running the SQL query
            details_db.run(`DELETE FROM jobRoads WHERE id = ?`,
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

module.exports = RoadsReq ;