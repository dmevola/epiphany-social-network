const {Users} = require('../models');

// users controller

const usersController = {

    //new user
    createUsers({body}, res) {
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    },

    //get all users
    getAllUsers(req, res) {
        Users.find({})
        //populate users thoughts
        .populate({path: 'thoughts', select: '-__v'})
      // populate user friends
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
      // .sort({_id: -1})
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
         console.log(err);
        res.status(500).json(err);
          });
        },
// Get single user by ID
getUsersById({params}, res) {
    Users.findOne({_id: params.id })
    .populate({path: 'thoughts', select: '-__v'})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
    // return if no user is found 
    .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return; 
        }
        res.json(dbUsersData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    })
},

// Update a User by ID
updateUsers({params, body}, res) {
    Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err))
},

// Delete a user by ID
deleteUsers({params}, res) {
    Users.findOneAndDelete({_id: params.id})
    .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => res.status(400).json(err));
},

// add friend by id
addFriend({params}, res) {
    Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
    .populate({path: 'friends', select: ('-__v')})
    .select('-__v')
    .then(dbUsersData => {
        if (!dbUsersData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return;
        }
    res.json(dbUsersData);
    })
    .catch(err => res.json(err));
},

// Delete a single Friend
deleteFriend({ params }, res) {
    Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
    .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => res.status(400).json(err));
}

};

// Export module users controller
module.exports = usersController; 
