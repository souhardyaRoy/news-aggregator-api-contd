const User = require("../model/User.schema");
const bcrypt = require("bcrypt");
const jwt= require('jsonwebtoken');
const { fetchNews } = require("../helper/fetchNews");


let newsArr =[{
  email:"souhardyaroy79@gmail.com",
  newPrefs :["sports","politics","finance"]
},
{
  email:"sid@gmail.com",
  newPrefs :["tech","bollywood","finance"]
}
]

const userRegistration = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPasscode = bcrypt.hashSync(password, 10);

    let user = await User.create({
      username,
      email,
      password: hashedPasscode,
    });

    return res.status(201).send(user);
  } catch (error) {
    return res.status(201).send(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { password, email } = req.body;

   let loggedInUser= await User.findOne({ email: email });
   if(loggedInUser){
    const hashedPasscodeExist = bcrypt.compareSync(password,loggedInUser.password);
    if(hashedPasscodeExist){
        const secret_key = process.env.PASSWORD_HASH;
        const payload = {_id: loggedInUser._id, role: 'user',username:loggedInUser.username,email:loggedInUser.email};
        const token = jwt.sign(payload, secret_key, { expiresIn: "3h" });
        return res.status(200).json(
           {token}
        );
    }
   }


    return res.status(201).send(user);
  } catch (error) {
    return res.status(201).send(error);
  }
};

const getPref =  (req, res) => {
  try {
    if (req.user) {
    console.log(req.user.email)
      const userPrefs = newsArr.filter(val => val.email === req.user.email);
      if (userPrefs.length > 0) {
        return res.status(200).json(userPrefs[0].newPrefs);
      }
    }
    return res.status(404).json({ message: 'Preferences not found' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updatePref = (req, res) => {
  try {
    if (!req.body.newPrefs) {
      return res.status(400).json({ message: 'Invalid request. newPrefs field is required.' });
    }

    if (req.user) {
      const indexToUpdate = newsArr.findIndex(val => val.email === req.user.email);
      if (indexToUpdate !== -1) {
        newsArr[indexToUpdate].newPrefs = req.body.newPrefs;
        return res.status(200).json(newsArr[indexToUpdate].newPrefs);
      } else {
        return res.status(404).json({ message: 'User not found in preferences list.' });
      }
    }
    return res.status(401).json({ message: 'Unauthorized' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

 const getNews = async (req, res) => {

if(req.user){
  const indexToget = newsArr.findIndex(val => val.email === req.user.email);
  if (indexToget !== -1) {
    const userPreferences = newsArr[indexToget].newPrefs 
  try {
    const newsArticles = await fetchNews(userPreferences);
    res.json(newsArticles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
}
 
};


module.exports = {
  userRegistration,
  userLogin,
  getPref,
  updatePref,
  getNews
};
