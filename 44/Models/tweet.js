// One to a ton
const mongoose = require('mongoose');

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/relationshipDemo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'Error connecting to mongodb:'));
mongoose.connection.once('open', () => {
    console.log('Successfully connected to mongodb')
})


const userSchema = new mongoose.Schema({
    username: String,
})

const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    //For 1:many many, better to store ref on the child instead of the parent
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async () => {
    // const u = new User({ username: 'Me' });
    const u = await User.findOne({ username: 'Me' });

    // const tweet = new Tweet({ text: 'Hello world', likes: 0 });
    const tweet = new Tweet({ text: 'Hello twirld', likes: 10 });

    tweet.user = u; // add parent ref to child
    u.save();
    tweet.save();
}

// makeTweets();

const findTweets = async () => {
    // you can populate only certain fields if you want!
    // Here, only username
    const tweet = await Tweet.findOne({}).populate('user', 'username');
    console.log(tweet)
}

console.log(findTweets())