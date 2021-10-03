const User = require('./User');
const Post = require('./post');
const Vote = require('./Vote');
const Comment = require('./comment');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// Here, we indicate that the Vote table needs a row of data to be a unique pairing so that it knows which data to pull in when queried on.
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});
// However, the above associations are only saying that Posts and Users are associated via
// the vote model. It doesn't say anything yet about votes in relation to users or posts
//  ----------------------------------------------------------------------------------------------
// These associations below actually create the relationships between votes, users, and posts

// Create association of a vote to a user
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

// Create association of a vote to a post
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

// Create association of a user to a vote
User.hasMany(Vote, {
    foreignKey: 'user_id'
});

// Create association of a post to a vote
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});
// -----------------------------------------------------------------------------------------------
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment };

// With those two .belongsToMany() methods in place, we're allowing both the User and Post models 
// to query each other's information in the context of a vote. If we want to see which users voted 
// on a single post, we can now do that. If we want to see which posts a single user voted on, we 
// can see that too. This makes the data more robust and gives us more capabilities for visualizing 
// this data on the client-side.