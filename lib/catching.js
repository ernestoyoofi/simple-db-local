module.exports = function catchingAppDb(catching = false, message, argv) {
  if(catching === true) {
    throw new Error(message)
  }

  return {
    isError: true,
    ...argv,
    message: message
  }
}