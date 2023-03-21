function getNameFile(path) {
  const named = path.split("/").pop()
  let setnp = named.split(".")

  return setnp.slice(0, setnp.length - 1).join(".")
}

function isJson(data) {
  try {
    if(typeof data != "object") {
      JSON.stringify(JSON.parse(data))
    } else {
      JSON.stringify(data)
    }
    return true
  } catch(err) {
    console.log(err)
    return false
  }
}

function stringJSON(data) {
  try {
    if(typeof data != "object") {
      return JSON.stringify(JSON.parse(data),null,2)
    } else {
      return JSON.stringify(data,null,2)
    }
  } catch(err) {
    return ""
  }
}

module.exports = {
  getNameFile,
  isJson,
  stringJSON
}