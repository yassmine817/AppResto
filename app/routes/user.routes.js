
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  }); 

  //crud student routes
  app.post(
    "/api/users/addstudent",
    controller.addstudent
  );
 
 app.put("/api/users/updatestudent/:id", controller.updatestudent);
      
 
  app.delete("/api/users/Delete/:id", console.log(controller.delete));
  

  
};


