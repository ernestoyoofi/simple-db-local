const CreateInitDB = require("./")

const db = new CreateInitDB({
  path: "{run_dir}/database", // {run_dir} Variable untuk mencari directory untuk koleksi pada proses
  logs: true // Untuk memastikan logs data yang masuk
})

// ============= [ 📂 Koleksi ] ===============

// 📂 Buat Koleksi Database "user"
const setCollect = db.setCollection("user")
console.log("create-collect", setCollect)
// 📂 Hapus Koleksi Database "users"
const delCollect = db.delCollection("users")
console.log("remove-collect", delCollect)
// 📂 Dapatkan Semua Koleksi Database
const allcollect = db.getAllCollection()
console.log("all-collect", allcollect)
// 📂 Pilih Salah Satu Koleksi Untuk Melakukan Aksi Data
const collection = db.collection() // By Default Akan Terisi Sebagai "test"
console.log("select-collect", collection)

// ============ [ 📝 Dokument ] ===============

// 📂 Dapatkan Semua Dokument Pada Koleksi
const getDocs = db.collection("user").getAll()
// 📂 Dapatkan Satu Data Koleksi
const getDoc = db.collection("user").get("123test")
// 📂 Buat
const createDoc = db.collection("user").set("123test", {
  name: "Asep Kepangs",
  phone: "1234567890",
  card_prabayar: "313,322,332,332"
})
// 📂 Ganti
const editDoc = db.collection("user").edit("123test", {
  name: "Asep Naurudin"
})
// 📂 Hapus
const delDoc = db.collection("user").del("123testa")