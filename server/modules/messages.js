const notFound = (searchParam) => {
  return {
    status: 404,
    message: `We found no match for the requested resource ${searchParam}`
  }
}



module.exports = {
  notFound,
}