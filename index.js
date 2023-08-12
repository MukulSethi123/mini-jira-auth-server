const express = require("express");
const admin = require("firebase-admin");
const firebase = require("firebase/app");
const getSpecificDoument = require("./firebaseHelpers");
const createJWTPayload = require("./jwtHelpers");
var serviceAccount = require("./mini-jira-auth-server-firebase-adminsdk-tbwqs-183caabe71.json");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Generate a random 256-bit key (32 bytes)
const secretKey = crypto.randomBytes(32).toString("hex");

const PORT = 3070;
app = express();
app.use(express.json());

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
//get db reference
const db = admin.firestore();
// create collection reference
const authCollectionRef = db.collection("Auth");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const payload = createJWTPayload();

  try {
    const userDocument = await getSpecificDoument(authCollectionRef, email);
    if (userDocument === null) {
      res.status(403).send("not registered");
      throw new Error("user not found");
    }
    if (userDocument.password === password) {
      const token = jwt.sign(payload, secretKey, { algorithm: "HS256" });
      res.status(200).send({ ...userDocument, authToken: token });
    } else {
      res.status(403).send("Wrong password");
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/sign-up", (req, res) => {
  // 1. check if email id is in correct format
  // 2. check if password is strong
  // 3. login user and generate auth token
  // 4. send user details back
});
app.listen(PORT, () => {
  console.log("running on port 3070 ");
});
