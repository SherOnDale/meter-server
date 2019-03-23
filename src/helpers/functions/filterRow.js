module.exports = row => {
  let rowBody = {};
  rowBody.firstName = row['first_name'];
  rowBody.lastName = row['last_name'];
  rowBody.email = row['email'];
  rowBody.avatarUrl = row['avatar_url'];
  rowBody.referrer = row['referrer'];
  rowBody.hasVerified = row['verified'];
  rowBody.hashProfile = row['profile'];
  return rowBody;
};
