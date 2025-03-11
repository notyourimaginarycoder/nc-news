const app = require("./app");

app.listen(9000, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Listening on 9000");
  }
});