const req = require("express/lib/request");
//const employeeModel = require("../models/formations/formation.model");
const employeeModel = require("../models/employee.model");

// ***************** function add employee *****************
module.exports.add = (req) => {
  return new Promise((resolve, reject) => {
    console.log("add employee ==> ");
    let body = req.body;
    if (body) {
      employeeDB = new employeeModel(body);
      //employeeDB.image = req.file ? req.file.path : "";
      // employeeDB.save((err,data)=>{
      //     if(!err){
      //         resolve({
      //             response: true,
      //             token: null,
      //             message: 'Employee added successfully',
      //             data: data
      //         });
      //     }else{
      //         resolve({
      //             response: false,
      //             token: null,
      //             message: 'You have missed data',
      //             data: err
      //         });
      //     }
      // })
    } else {
      reject();
    }
  });
};

// ***************** function update employee *****************
module.exports.update = (req) => {
  return new Promise((resolve, reject) => {
    let body = req.body;
    if (body) {
      employeeModel
        .findOneAndUpdate({ _id: req.params.id }, body)
        .then((res) => {
          resolve({
            response: true,
            message: "Employee modified successfully",
            data: res,
          });
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject();
    }
  });
};

// ***************** function delete employee *****************
module.exports.delete = (req) => {
  return new Promise((resolve, reject) => {
    employeeModel.findOneAndDelete(
      { _id: req.params.id },
      function (err, data) {
        if (err) {
          reject({
            response: false,
            message: "error",
            data: err,
          });
        } else {
          resolve({
            response: data != null,
            message:
              data != null ? "Deleted employee" : "employee doesnt exist",
            data: data,
          });
        }
      }
    );
  });
};

// ***************** Function get   by id  *****************
module.exports.get = (id) => {
  return new Promise((resolve, reject) => {
    employeeModel
      .findOne({ _id: id })
      .then((employee) => {
        condition = false;
        if (employee) condition = true;
        resolve({
          response: condition,
          message: condition ? "Get data successfully" : "No data",
          data: employee,
        });
        if (condition) {
          employee.forEach((e, index) => {
            e.image = "http://localhost:3000/" + e.image;

            if (employee.length == index + 1) {
              resolve({
                response: condition,
                message: condition ? "Get data successfully" : "No data",
                data: employee,
              });
            }
          });
        }
      })
      .catch((err) => {
        reject({
          response: false,
          message: "No ID provided",
          data: err,
        });
      });
  });
};

// ***************** function list  *****************
module.exports.getList = (req) => {
  return new Promise(async (resolve, reject) => {
    let employees = await employeeModel.find({});
    let condition = employees.length > 0;
    if (condition) {
      employees.forEach((e, index) => {
        e.image = "http://localhost:3000/" + e.image;

        if (employees.length == index + 1) {
          resolve({
            response: condition,
            message: condition ? "Get data successfully" : "No data",
            data: employees,
          });
        }
      });
    }
    resolve({
      response: condition,
      message: condition ? "Get data successfully" : "No data",
      data: employees,
    });
  });
};
