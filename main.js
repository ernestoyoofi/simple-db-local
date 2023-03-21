const fs = require("fs")
const _tp = require("./lib/text-parse")
const csln = require("./lib/console")
const cthg = require("./lib/catching")
const enchant = require("./lib/enchant")
const sizeHumanRead = require("./lib/size-human-read")
const _loc = require("path")

class CreateInitDB {
  /**
  * @name CreateInitDB
  * @returns {{}}
  **/
  constructor({ path = process.cwd(), logs = false, catching = false } = {}) {
    this.logs = typeof logs === "boolean"? logs : false
    this.path = _loc.join(path.replace(/{run_dir}/g, process.cwd()))
    this.catching = typeof catching === "boolean"? catching : false
    csln.log(true, "Reading...")
    csln.warn(true, "Pastikan untuk sistem kamu bisa baca tulis file untuk menyimpan data !")
    try {
      const pth = this.path
      fs.writeFileSync(
        _loc.join(this.path, ".uncommon"),
        `date: ${new Date().toISOString()}\nready: Yes\nfile: ${this.path}`,
        "utf-8"
      )
      function clis_dtp() {
        let getSize = 0
        let collectionDocs = []
        fs.readdirSync(pth).map(z => {
          if(fs.lstatSync(_loc.join(pth, z)).isDirectory()) {
            fs.readdirSync(_loc.join(pth, z)).forEach(file => {
              if(fs.lstatSync(_loc.join(pth, z, file)).isFile()) {
                getSize = fs.lstatSync(_loc.join(pth, z, file)).size + getSize
                collectionDocs.push(_loc.join(pth, z, file))
              }
            })
          }
        })
        csln.info(true, `Dapat membaca dokumen dari beberapa koleksi dan mendapatkan ${collectionDocs.length} file dengan besar total adalah ${sizeHumanRead(getSize)}`)
      }
      clis_dtp()
      csln.info(this.logs, "Dapat menulis data !")
    } catch(err) {
      csln.error(this.logs, "Tidak dapat menulis data !")
      console.error(err)
      process.exit()
    }
  }

  /**
   * @name setCollection
   * @param {*} name 
   * Set koleksi data pada database
   */
  setCollection(name = "") {
    const gtNm = _tp(name)
    /// 📬 | Jika data pada parameter tidak terpenuhi
    if(!gtNm) {
      // ✍️ | Maka keluarkan error ini
      csln.error(this.logs, "Masukan nama untuk membuat koleksi !")
      return cthg(this.catching, "Masukan nama untuk membuat koleksi !")
    }
    /// 📬 | Jika data tersebut sudah ada
    if(fs.existsSync(
      _loc.join(this.path, gtNm)
      )? fs.lstatSync(
      _loc.join(this.path, gtNm)
      ).isDirectory() : false
    ) {
      csln.error(this.logs, `Koleksi dengan nama "${gtNm}" sudah ada !`)
      return {
        isError: false,
        isCreate: false,
        info: {
          data: gtNm,
          params_input: name,
        }
      }
    }

    /// 📬 | Membuat data
    fs.mkdirSync(
      _loc.join(this.path, gtNm), { recursive: true }
    )

    return {
      isError: false,
      isCreate: true,
      info: {
        data: gtNm,
        params_input: name,
      }
    }
  }

  delCollection(name = "") {
    /// 📬 | Jika data pada parameter tidak terpenuhi
    const gtNm = _tp(name)
    if(!gtNm) {
      csln.error(this.logs, "Masukan nama untuk menghapus koleksi !")
      return cthg(this.catching, "Masukan nama untuk menghapus koleksi !")
    }
    if(fs.existsSync(
      _loc.join(this.path, gtNm)
      )? fs.lstatSync(
      _loc.join(this.path, gtNm)
      ).isDirectory()? false : true : true
    ) {
      csln.error(this.logs, `Koleksi dengan nama "${gtNm}" tidak ada !`)
      return {
        isError: false,
        isRemoved: false,
        info: {
          data: gtNm,
          params_input: name,
        }
      } 
    }

    fs.rmSync(
      _loc.join(this.path, gtNm),
      { recursive: true, force: true }
    )

    return {
      isError: false,
      isRemoved: true,
      info: {
        data: gtNm,
        params_input: name,
      }
    }
  }

  getAllCollection() {
    if(fs.existsSync(
      _loc.join(this.path)
      )? fs.lstatSync(
      _loc.join(this.path)
      ).isDirectory()? false : true : true
    ) {
      csln.error(this.logs, `Data koleksi tidak ada !`)
      return cthg(this.catching, `Data koleksi tidak ada !`)
    }

    let toAppend = []
    fs.readdirSync(_loc.join(this.path)).forEach((value, index) => {
      if(fs.lstatSync(_loc.join(this.path, value)).isDirectory()) {
        toAppend.push(value)
      }
    })

    return {
      isError: false,
      data: toAppend
    }
  }

  collection(name = "test") {
    if((name === ""? "test":name) === "test") {
      if(
        fs.existsSync(_loc.join(this.path, "test"))?
        fs.lstatSync(_loc.join(this.path, "test")).isDirectory()?false:true:true
      ) {
        csln.info(this.logs, "Membuat data testing → /test/[:id-docs]")
        fs.mkdirSync(_loc.join(this.path, "test"))
      }
    }
    const gtNm = _tp(name === ""? "test":name)
    csln.info(this.logs, `Nama koleksi "${gtNm}"`)
    if(fs.existsSync(
      _loc.join(this.path, gtNm)
      )? fs.lstatSync(
      _loc.join(this.path, gtNm)
      ).isDirectory()? false : true : true
    ) {
      csln.error(this.logs, `Koleksi dengan nama "${gtNm}" tidak tersedia !`)
      return cthg(this.catching, `Koleksi dengan nama "${gtNm}" tidak tersedia !`)
    }

    return {
      isError: false,
      /// ✍️ Mengambil salah satu data dengan nama / id docs
      get: (_id) => {
        const named_doc = _tp(_id)
        if(!named_doc || named_doc === "") {
          csln.error(this.logs, "Masukan id untuk membaca dokumen !")
          return cthg(this.catching, "Masukan id untuk membaca dokumen !")
        }
        if(
          fs.existsSync(_loc.join(this.path, gtNm, `${named_doc}.json`))?
          fs.lstatSync(_loc.join(this.path, gtNm, `${named_doc}.json`)).isFile()?false:true:true
        ) {
          csln.error(this.logs, `Dokumen dengan id "${named_doc}" pada koleksi dengan nama "${gtNm}" tidak tersedia !`)
          return {
            isError: false,
            data: {}
          }
        }

        try {
          csln.info(this.logs, "Berhasil membaca files !")
          return {
            isError: false,
            data: JSON.parse(fs.readFileSync(
              _loc.join(this.path, gtNm, `${named_doc}.json`),
              "utf-8"
            ))
          }
        } catch(err) {
          csln.info(this.logs, "Gagal membaca files !")
          console.log(err)
          return {
            isError: false,
            data: {}
          }
        }
      },
      /// ✍️ Mengambil semua data dalam koleksi
      getAll: () => {
        let resultsDocs = []
        fs.readdirSync(_loc.join(this.path, gtNm)).forEach((file, i) => {
          try {
            if(file.split(".").pop() === "json" && fs.lstatSync(_loc.join(this.path, gtNm, file)).isFile()) {
              const isiData = JSON.parse(fs.readFileSync(_loc.join(this.path, gtNm, file), "utf-8"))

              resultsDocs.push({
                _id: enchant.getNameFile(file),
                data: isiData
              })
            }
          } catch(err) {
            csln.error(this.logs, `Kesalahan teknis !, ${err.message}`)
            console.error(err)
          }
        })
        return resultsDocs
      },
      /// ✍️ Menulis data dokument baru
      set: (_id, data) => {
        csln.log(this.logs, "Memuat halaman...")
        const named_doc = _tp(_id)
        if(!named_doc || named_doc === "") {
          csln.error(this.logs, "Masukan id untuk menulis dokumen !")
          return cthg(this.catching, "Masukan id untuk menulis dokumen !")
        }

        csln.log(this.logs, "Nama data: "+named_doc)

        if(
          fs.existsSync(_loc.join(this.path, gtNm, `${named_doc}.json`))?
          fs.lstatSync(_loc.join(this.path, gtNm, `${named_doc}.json`)).isFile()?true:false:false
        ) {
          if(fs.readFileSync(_loc.join(this.path, gtNm, `${named_doc}.json`), "utf-8").trim() != "") {
            csln.error(this.logs, `Dokumen dengan id "${named_doc}" pada koleksi dengan nama "${gtNm}" sudah ada !`)
            return {
              isError: false,
              isCreate: false,
            }
          }
        }

        csln.log(this.logs, "Memulai menyiapkan untuk dapat ditulis !")

        if(!enchant.isJson(data)) {
          csln.error(this.logs, "Data bukan berformat object json !")
          return cthg(this.catching, "Data bukan berformat object json !")
        } else {
          csln.log(this.logs, "Dapat menulis berupa dokumen !")
        }

        fs.writeFileSync(_loc.join(this.path, gtNm, `${named_doc}.json`), enchant.stringJSON(data), "utf-8")

        return {
          isError: false,
          isCreate: true,
        }
      },
      /// ✍️ Mengubah data dokument baru
      edit: (_id, data) => {
        csln.log(this.logs, "Memuat halaman...")
        const named_doc = _tp(_id)
        if(!named_doc || named_doc === "") {
          csln.error(this.logs, "Masukan id untuk menulis dokumen !")
          return cthg(this.catching, "Masukan id untuk menulis dokumen !")
        }

        csln.log(this.logs, "Nama data: "+named_doc)

        if(!enchant.isJson(data)) {
          csln.error(this.logs, "Data bukan berformat object json !")
          return cthg(this.catching, "Data bukan berformat object json !")
        } else {
          csln.log(this.logs, "Dapat menulis berupa dokumen !")
        }

        if(
          fs.existsSync(_loc.join(this.path, gtNm, `${named_doc}.json`))?
          fs.lstatSync(_loc.join(this.path, gtNm, `${named_doc}.json`)).isFile()?false:true:true
        ) {
          csln.log(this.logs, `Dokumen dengan id "${named_doc}" pada koleksi dengan nama "${gtNm}" tidak ada !`)
          return {
            isError: false,
            isChange: false
          }
        }

        csln.log(this.logs, "Memulai mengubah dokument...")

        const docsKeys = Object.keys(data)

        csln.log(this.logs, `Data index yang harus diupdate ada ${docsKeys.length} yaitu ${JSON.stringify(docsKeys)}`)

        const readDocs = JSON.parse(fs.readFileSync(_loc.join(this.path, gtNm, `${named_doc}.json`), "utf-8"))

        for(let keysed of docsKeys) {
          readDocs[keysed] = data[keysed]
        }

        csln.log(this.logs, "Data untuk memastikan !")

        fs.writeFileSync(_loc.join(this.path, gtNm, `${named_doc}.json`), enchant.stringJSON(readDocs), "utf-8")

        csln.info(this.logs, "Data berhasil ditulis !")
        return {
          isError: false,
          isChange: true
        }
      },
      /// ✍️ Menghapus dokumen
      del: (_id) => {
        const named_doc = _tp(_id)
        if(!named_doc || named_doc === "") {
          csln.error(this.logs, "Masukan id untuk membaca dokumen !")
          return cthg(this.catching, "Masukan id untuk membaca dokumen !")
        }
        if(
          fs.existsSync(_loc.join(this.path, gtNm, `${named_doc}.json`))?
          fs.lstatSync(_loc.join(this.path, gtNm, `${named_doc}.json`)).isFile()?false:true:true
        ) {
          csln.error(this.logs, `Dokumen dengan id "${named_doc}" pada koleksi dengan nama "${gtNm}" tidak tersedia !`)
          return {
            isError: false,
            isDel: false,
          }
        }

        fs.rmSync(
          _loc.join(this.path, gtNm, `${named_doc}.json`),
        )

          csln.info(this.logs, "Berhasil menghapus dokumen")

        return {
          isError: false,
          isDel: true
        }
      }
    }
  }
}

module.exports = CreateInitDB