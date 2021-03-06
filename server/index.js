require("dotenv").config();
const { DB_CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, DEV } = process.env;

const express = require("express");
const session = require("express-session");
const massive = require("massive");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const authorization = require("./controllers/authorization");
const questions = require("./controllers/questions");
const Mail = require("./controllers/mailer");
const tinyTag = require("./controllers/tinyTags");
const users = require("./controllers/users");
const ads = require("./controllers/ads");

const app = express();
// *** TOPLEVEL MIDDLEWARE *** //

app.use(express.static(`${__dirname}/../build`));
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  })
);
massive(DB_CONNECTION_STRING).then(db => {
  app.set("db", db);
  app.listen(SERVER_PORT, () =>
    console.log(`Listening on PORT: ${SERVER_PORT}`)
  );
  console.log("database connected");
});

// *** ENDPOINTS *** //
// User Start
app.get("/auth/callback", authorization.authCallback);
app.post("/api/user-data", authorization.checkUser);
app.get("/api/user/indv", users.getFullUserData);
// User End

// HOME START
app.get("/api/search", questions.search);
app.get("/api/home/:auth_id", questions.homeStart);
app.get("/api/questions/interesting", questions.questionsInteresting);
app.get("/api/questions/world", questions.worldQuestions);
app.post("/api/questions/ask", questions.askQuestions);
// HOME END
// TAGS START
app.put("/api/tags/watch", questions.watchTag);
app.post("/api/tags/tinytag", tinyTag.getTag);
app.get("/api/tags/alltinytags", tinyTag.getAllTags);
app.get("/api/tags/indv", tinyTag.getTagQuestions);
// TAGS END
// USERS START
app.get("/api/users/allusers", users.getUsers);
app.get("/api/users/indv", users.getFullUserData);
// USERS END
// QUESTIONS START
app.post("/api/bounty", questions.createBounty);
app.put("/api/bounty", questions.acceptBounty);
app.get("/api/question/indv", questions.questionById);
app.get("/api/answer/indv", questions.answerById);
app.get("/api/comment/indv", questions.commentById);
app.post("/api/question/favorite", questions.addFavorite);
app.post("/api/page-edits", questions.getEdits);
app.put("/api/edits", questions.acceptEdit);
app.delete("/api/edits", questions.declineEdit);
app.post("/api/edits", questions.createEdit);
app.post(
  "/api/question/vote",
  (req, res, next) => {
    const { value } = req.body;
    const { reputation } = req.session.user;
    if (value === -1) {
      if (reputation >= 125) {
        next();
      } else {
        res
          .status(401)
          .send("You Need 125 reputation to compleate this action.");
      }
    } else if (value === 1) {
      if (reputation >= 15) {
        next();
      } else {
        res
          .status(401)
          .send("You Need 15 reputation to compleate this action.");
      }
    }
  },
  questions.addVote
);
app.post("/api/answer", questions.createAnswer);
app.post(
  "/api/comment",
  (req, res, next) => {
    const { reputation } = req.session.user;
    if (reputation >= 50) {
      next();
    } else {
      res.status(401).send("You need 50 reputation to compleate this action.");
    }
  },
  questions.createComment
);
// QUESTIONS END
// ADS START
app.get("/api/adsapi", ads.Ads);
// ADS END
//
// Engine Setup
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/send/mail", Mail.SendMail);
// *** IM LISTENING! *** //
