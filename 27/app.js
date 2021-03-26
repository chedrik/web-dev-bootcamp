// JS Stack
// It's a stack.
// Tools to view the stack:
// loupe - no arrow, let, or const...
// chrome debugger! Go to sources tab, which has the debugger

//  JS is single threaded! Hence why we need all this async / promise fun
console.log("Send request ...")
setTimeout(() => {
    console.log("Return your request") // Occurs last!
}, 3000)
console.log("After the request")
// Browser has "WebAPI" that handles some of the longer duration things to prevent threadlocking JS
// Passes the call to JS, then brwoser pushes back onto the stack

// Rainbowify the background.. callback hell!
// Ugly ugly nesting....

// setTimeout(() => {
//     document.body.style.backgroundColor = 'red';
//     setTimeout(() => {
//         document.body.style.backgroundColor = 'orange';
//         setTimeout(() => {
//             document.body.style.backgroundColor = 'yellow';
//             setTimeout(() => {
//                 document.body.style.backgroundColor = 'green';
//             }, 1000)
//         }, 1000)
//     }, 1000)
// }, 1000)

// Nested callback way. STill scurry
// const delayColorChange = (newColor, delay, doNext) => {
//     setTimeout(() => {
//         document.body.style.backgroundColor = newColor;
//         doNext && doNext();
//     }, delay)
// }
// delayColorChange("red", 1000, () => {
//     delayColorChange("orange", 1000, () => {
//         delayColorChange("yellow", 1000, () => {
//             delayColorChange("green", 1000)
//         })
//     })
// })

// This can get out of control when you have pass/fail callbacks and you get something really nested
// Super ugly, 2 callbacks per request heavily nested
// Promises!
// No internet explorer support.... smdh
// Object representing eventual completion or failure of something async
// it has a PromiseStatus and PromiseValue (pending -> resolved / rejected)
// Attach callbacks TO the promise instead of in the fcn
/////// EXAMPLE ////// But still nested....
// const myProm = fcnReturningProm();
// myProm
//     .then(() => {
//         successCallback()!
//     })
//     .catch(() => {
//         failureCallback()!
//     })

// Chaining...
// If you return a promise from then(), you can chain with .then() as follows
// fetchData(google.com/api/getMyData)
//     .then((data) => {
//         return anotherPromise(url2)
//     })
//     .then((data) => {
//         return anotherPromise2(url3)
//     })
//     .then((data) => {
//         return anotherPromise3(url4)
//     })
//     .catch((err) => {
//         console.log('Single catch condition!')
//     })

// Making a promise! Takes 2 fcns
new Promise((resolve, reject) => {
    // defaults to pending until resolve or reject is called
})

const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const rand = Math.random();
        setTimeout(() => {
            if (rand < 0.7) {
                resolve("Data!");
            } else {
                reject("Error!")
            }
        }, 1000)
    })
}
fakeRequest('url')
    .then((data) => {
        console.log(`Promise resolved! ${data}`)
    })
    .catch((err) => {
        console.log(`Promise rejected with ${err}!`)
    })


// Promise version of the rainbow callback!
const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}
delayedColorChange("red", 1000)
    .then(() => delayedColorChange("orange", 1000)) // implicit return of the promise
    .then(() => delayedColorChange("yellow", 1000))
    .then(() => delayedColorChange("green", 1000))

// Async functions
// async keyword automatically returns a promise from a fcn!
// if fcn returns a value, thats the 'resolve value'
// any err thrown leads to 'rejected'
const myAsync = async () => {
    throw new Error('Rejected!') // reject
    return 'data';  // resolve
}
myAsync()
    .then((data) => {
        console.log("Async resolve!")
    })
    .catch((err) => {
        console.log(err)
    })

// await pauses execution, waits for promise to be resolved
// only inside of async fcn
async function rainbow() {
    await delayedColorChange("red", 1000)  // It wont move on until the promise returned from here is resolved!
    await delayedColorChange("orange", 1000)
    await delayedColorChange("yellow", 1000)
    await delayedColorChange("green", 1000)
}

// hanlding async err with try, catch
async function requester() {
    try {
        let d = await fakeRequest('url');
        console.log(d)
    } catch (e) {
        console.log(`Async promise rejected with ${e}!`)
    }
}
requester()