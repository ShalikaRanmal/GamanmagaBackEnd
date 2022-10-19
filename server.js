//import Modules and Classes
const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const FieldReq = require("./httpMethods/job-fields-req");
const TitleReq = require("./httpMethods/job-titles-req");
const DetailReq = require("./httpMethods/job-details-req");
const RoadsReq = require("./httpMethods/job-roads-req")

//Creating class objects
const app = express();
const fieldReq = new FieldReq();
const titleReq = new TitleReq();
const detailsReq = new DetailReq();
const roadsReq = new RoadsReq();

//Enabaling json file transfer
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Enabaling CORS
app.use(
    cors({
        exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
        credentials : true,
        origin: "*"
    })
);

//Creating server listner..
var HTTP_PORT = 8000;

app.listen(HTTP_PORT, ()=>{
    console.log("server listning on port %PORT%".replace("%PORT%", HTTP_PORT));
});

//HTTP Methods for Job Fields......................................................................
//HTTP GET method
app.get("/api/job/fields",function(req, res){
    fieldReq.getJobFields(req, res);
});

//HTTP POST method
app.post("/api/add/jobs", (req, res)=>{
    fieldReq.addJobFields(req,res);
});

//HTTP PUT method
app.put("/api/edit/jobs", (req, res)=>{
    fieldReq.updateJobFields(req,res);
});

//HTTP DELETE method
app.delete("/api/delete/jobs/:id",function(req, res){
    console.log("delete reqest recieved")
    fieldReq.deleteJobField(req,res);
});
//Methods for Job Fields end................................................................

//HTTP Methods for Job Titles..............................................................
//HTTP GET method
app.get("/api/job/titles",function(req, res){
    titleReq.getJobTitlesAll(req, res);
});
app.get("/api/job/titles/:id",function(req, res){
    titleReq.getJobTitles(req, res);
});

//HTTP POST method
app.post("/api/add/job/titles", (req, res)=>{
    titleReq.addJobTitles(req,res);
});

//HTTP PUT method
app.put("/api/edit/job/titles", (req, res)=>{
    titleReq.updateJobTitles(req,res);
});

//HTTP DELETE method
app.delete("/api/delete/job/title/:id",function(req, res){
    titleReq.deleteJobTitles(req,res);
});
//Methods for Job Titles end.................................................................

//HTTP Methods for Job Details..............................................................
//HTTP GET method for both job details and roads
app.get("/api/job/details",function(req, res){
    detailsReq.getJobDetailsAll(req, res);
});
app.get("/api/job/details/:id",function(req, res){
    detailsReq.getJobDetails(req, res);
});

//HTTP POST method
app.post("/api/add/job/details", (req, res)=>{
    detailsReq.addJobDetails(req,res);
});

//HTTP PUT method
app.put("/api/edit/job/details", (req, res)=>{
    detailsReq.updateJobDetails(req,res);
});

//HTTP DELETE method
app.delete("/api/delete/job/details/:id",function(req, res){
    detailsReq.deleteJobDetails(req,res);
});
//Methods for Job Fields end.................................................................

//HTTP Methods for Job Roads..............................................................
//get method done in JOb Details method
//HTTP POST method 
app.post("/api/add/job/roads", (req, res)=>{
    roadsReq.addJobRoads(req,res);
});

//HTTP PUT method
app.put("/api/edit/job/roads", (req, res)=>{
    roadsReq.updateJobRoads(req,res);
});

//HTTP DELETE method
app.delete("/api/delete/job/roads/:id",function(req, res){
    roadsReq.deleteJobRoads(req,res);
});
//Methods for Job Fields end.................................................................

