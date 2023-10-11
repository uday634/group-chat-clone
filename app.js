const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/users');
const messagedata = require('./models/messagedata');
const Group = require('./models/group'); // Import the Group model
const GroupUser = require('./models/groupuser'); // Import the GroupUser model

const routuser = require('./routes/user');
const routmessage = require('./routes/message');

const sequelize = require('./util/database');
const port = 4000;

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use('/user', routuser);
app.use('/message', routmessage);

// Define associations
User.belongsToMany(Group, {
  through: GroupUser,
  foreignKey: 'userId', // Corrected the spelling of 'foreignKey'
  otherKey: 'groupId',
});

Group.belongsToMany(User, {
  through: GroupUser,
  foreignKey: 'groupId', // Corrected the spelling of 'foreignKey'
  otherKey: 'userId',
});

User.hasMany(messagedata, {
  foreignKey: 'userId',
});

Group.hasMany(messagedata, {
  foreignKey: 'groupId',
});

messagedata.belongsTo(User);
User.hasMany(messagedata);

sequelize
  .sync() // Remove { force: true } to avoid dropping tables
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
