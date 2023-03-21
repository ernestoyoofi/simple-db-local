module.exports = function (text = "") {
  const __text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-_.".split("")
  if(typeof text != "string") {
    return ""
  }
  let datatoname = ""
  for(let nt of text.split("")) {
    if(__text.indexOf(nt) != -1) {
      datatoname += nt
    }
  }
  return datatoname
}