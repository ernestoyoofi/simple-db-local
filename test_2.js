const InitDb = require("./")

const db = new InitDb({
  path: '{run_dir}/database',
  logs: true,
  catching: false
})

console.log("----------- [ Mulai ] ------------")
db.collection("user").get("data")
db.collection("user").get("data")
db.collection().get("act")
db.collection().getAll()
db.collection().set("adit", {
  nama: "Adit"
})
db.collection().edit("adit", {
  nama: "Aditia Ramadhan",
  umur: 13
})
db.collection().del("adit")