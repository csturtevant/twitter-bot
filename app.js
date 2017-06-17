const Twitter = require('twitter');
const config = require('./config.js');
const T = new Twitter(config);

// Set up your search parameters
const params = {
    q: '#inspiration',
    count: 1,
    result_type: 'popular',
    lang: 'en'
};

T.get('search/tweets', params, function (err, data, response) {
    if (!err) {
        // This is where the magic will happen
        // Loop through the returned tweets
        for (let i = 0; i < data.statuses.length; i++) {
            // Get the tweet Id from the returned data
            let id = {id: data.statuses[i].id_str};
            // Try to Retweet the selected Tweet
            T.post('statuses/retweet/', id, function (err, response) {
                // If the retweet fails, log the error message
                if (err) {
                    console.log(err[0].message);
                }
                // If the retweet is successful, log the url of the tweet
                else {
                    let username = response.user.screen_name;
                    let tweetId = response.id_str;
                    console.log('Retweeted: ', `https://twitter.com/${username}/status/${tweetId}`)
                }
            });
        }
    } else {
        console.log(err);
    }
});