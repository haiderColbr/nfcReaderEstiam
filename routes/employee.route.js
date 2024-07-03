var express = require("express");
var router = express.Router();

// Middleware
const authMiddle = require("../middleware/auth.middleware");

// Controller
const employeeController = require("../controllers/employee.controller");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// ***************** Api Register for formation *****************
router.post("/add", (req, res) => {
  employeeController
    .add(req)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// ***************** Api update for formation *****************
router.put("/update/:id", (req, res) => {
  employeeController
    .update(req)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// ***************** Api delete for formation *****************
router.delete("/delete/:id", (req, res) => {
  employeeController
    .delete(req)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// ***************** Api get   by id  *****************
router.get("/get/:id", (req, res) => {
  employeeController
    .get(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// ***************** Api list formations *****************
router.get("/list", (req, res) => {
  employeeController
    .getList()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
