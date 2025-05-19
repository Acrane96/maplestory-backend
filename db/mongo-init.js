db = db.getSiblingDB('maplestory');

db.users.insertOne({
  userId: "admin",
  username: "admin",
  password: "$2b$10$eL6qeb2b8of/.MQsynlBDuEVmFZMGZD4cwo4sj276/GKAwM06.fN6",
  role: "ADMIN"
});
