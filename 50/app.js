// Authentication is 'are you who you say you are'
// IE: username and password, 2FA, etc.

// Authorization is 'does the user have access to a specific asset / view'
// IE: admin / superuser, etc.

// dont store passwords... store the hash! (duh)
// hashes map some input to a fixed size output

/////// cryptographic hash fcns
// 1 way fcn, shouldnt be able to be reversed
// small input change should lead to large output change (ie. you cant look at hash and tell 2 pw are similar)
// deterministic (obvi)
// hash set should be large enough to not get collisions between values
// hash fcns (for pw) are deliberately slow to make harder to break

////// Salts
// Essentially a random value concat-ed to the PW before hashing
// the salt is still included in the hash

// Bcrypt is what we'll use, and very common
// bcrypt vs bcryptjs packages?
// js version is entirely js written, whereas other impl is in C++ so it cant run in browser
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12); // num is the "difficulty" for hashing
    const hash = await bcrypt.hash(password, salt);
    console.log(`Salt: ${salt}`)
    console.log(`hash: ${hash}`)
    return hash;
};

const checkPassword = async (password, hash) => {
    console.log(password)
    console.log(hash)
    const res = await bcrypt.compare(password, hash);
    if (res) {
        console.log('You were right!')
    } else {
        console.log('Try again')
    }
}

hashPassword('password').then(hash => {
    checkPassword('password1', hash)
})
