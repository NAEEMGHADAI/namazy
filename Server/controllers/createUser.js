const User = require("../model/User");
const sendEmail = require("../services/email");
const successEmailTemplate = require("../utils/successEmailTemplate");

const handleNewUser = async (req, res) => {
  const { user, email, phonenumber, address } = req.body;

  if (!user) {
    return res.status(400).json({ message: "Username is required" });
  }
  if (!phonenumber) {
    return res.status(400).json({ message: "phonenumber is required" });
  }
  if (!address) {
    return res.status(400).json({ message: "Address is required" });
  }
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  //Check for duplicate username in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) {
    return res.sendStatus(409); //Conflict
  }
  try {
    //create and store new user
    const result = await User.create({
      username: user,
      email: email,
      phonenumber: phonenumber,
      address: address,
    });

    console.log(result);
    res.status(201).json({ success: `New User ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { isApproved, user } = req.body;

    if (!isApproved) {
      return res.status(400).json({ message: "isapproved is required" });
    }
    if (!user) {
      return res.status(400).json({ message: "Username is required" });
    }

    if (isApproved === "Approved") {
      let userFound = await User.findOne({ username: user }).exec();
      userFound.isApproved = isApproved;
      sendEmail({
        from: "mohdnaeemghadai@gmail.com",
        to: userFound.email,
        subject: "Ypu are approved",
        text: `${"mohdnaeemghadai@gmail.com"} have a message for you.`,
        html: successEmailTemplate({
          emailFrom: "mohdnaeemghadai@gmail.com",
          username: userFound.username,
          password: userFound.password,
        }),
      })
        .then(async () => {
          await userFound.save();
          res.status(201).json({ success: `User ${user} is approved!` });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: "Error in sending email." });
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { handleNewUser, verifyUser };
