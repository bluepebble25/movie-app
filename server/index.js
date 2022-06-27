const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth')
const { User } = require('./models/User');

// config
require('dotenv').config({ path: './config/.env'});
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// DB connection
const mongoose = require('mongoose');
mongoose.connect(MONGO_URI)
  .then(() => { console.log('MongoDB connected...'); })
  .catch(err => console.log(err));

// Routing
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

app.get('/api/hello', (req, res) => {
  res.send('안녕');
});

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err});
    return res.status(200).json({
      success: true
    });
  });
});

app.post('/api/users/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.'
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) {
        return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."});
      }

      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        res.cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id});
      });
    });
  });
});

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user_id,
    isAdmin: req.user.role === 0 ? false: true, //0이면 일반, 아니면 관리자
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id},
    {token: ""}
    , (err, user) => {
      if(err) return res.json({ success: false, err });
      return res.status(200)
                .send({ success: true });
    })
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});