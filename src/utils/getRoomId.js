// utils/getRoomId.js
const getRoomId = (user1, user2) => {
  return [user1.toString(), user2.toString()].sort().join("_");
};

export default getRoomId;
