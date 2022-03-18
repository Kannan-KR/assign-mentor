var express = require("express");
const { response } = require("../app");
var router = express.Router();
const { dbUrl, mongodb, MongoClient } = require("../dbSchema");
const { ObjectId } = require("mongodb");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Assign mentor" });
});

// Create new mentor
router.post("/create-mentor", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db("assign-mentor");
    let mentor = await db.collection("mentors").insertOne(req.body);
    res.json({
      statusCode: 201,
      message: "Mentor created successfully!",
      data: mentor,
    });
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
});

// create new student
router.post("/create-student", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db("assign-mentor");
    let student = await db.collection("students").insertOne(req.body);
    res.json({
      statusCode: 201,
      message: "Student created successfully!",
      data: student,
    });
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
});

// list all students
router.get("/all-students", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db("assign-mentor");
    let allStudents = await db.collection("students").find().toArray();
    res.json({
      statusCode: 200,
      data: allStudents,
    });
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
});

// assign mentor to multiple students
router.put("/assign-mentor", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db("assign-mentor");
    let data = await db
      .collection("students")
      .updateMany(
        { Name: { $in: req.body.names } },
        { $set: { mentorId: ObjectId(req.body.mentorId) } }
      );
    res.json({
      statusCode: 201,
      message: "Mentor updated for multiple students",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
});

// displaying all the students for a mentor
router.get("/getMentor/:mentorId", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db("assign-mentor");
    let getMentorData = await db
      .collection("students")
      .find({ mentorId: ObjectId(req.params.mentorId) })
      .toArray();
    res.send(getMentorData);
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
});

// change mentor for the selected student
router.put("/all-students/:_id", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db("assign-mentor");
    let changedMentor = await db
      .collection("students")
      .findOneAndUpdate(
        { _id: ObjectId(req.params._id) },
        { $set: { mentorId: ObjectId(req.body.mentorId) } },
        { returnNewDocument: true }
      );
    res.send(changedMentor);
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal server error",
    });
  } finally {
    client.close();
  }
});

module.exports = router;
