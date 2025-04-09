// const figlet = require("figlet");
const app = require("./app");


//start server
app.listen(process.env.PORT || 8080, () => {
  ///console.log(figlet.textSync('Book-Store', {horizontalLayout:'full'}))
  console.log(`Server running on port ${process.env.PORT || 8080}`)
})