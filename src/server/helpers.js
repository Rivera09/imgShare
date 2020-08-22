const moment = require("moment");

exports.timeAgo = (timestamp) =>
  moment(timestamp).startOf("minute").fromNow();
