const timeFunc = {};

timeFunc.getLastDay = function() {
  const currentTime = Date.now()
  return currentTime - 24 * 60 * 60 * 1000
}


timeFunc.getHoursAgo = function(hour) {
  const currentTime = 1663955307067
  return currentTime - 24 * hour*2 * 60 * 1000
}

timeFunc.getLastWeek= function() {
  const currentTime = Date.now()
  return currentTime - 24 * 60 * 60 * 1000 * 7
  
}
timeFunc.getLastYear = function() {
  const currentTime = Date.now()
  return currentTime - 24 * 60 * 60 * 1000 * 365
}

module.exports = timeFunc;
///after:before
