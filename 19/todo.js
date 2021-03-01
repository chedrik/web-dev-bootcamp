// Commands
// new - add
// list - show all
// delete - remove by index
// quit - quit app

const list = []
// TODO: Prompt only once even with th
let response = prompt("Whatchu want?").toLowerCase();
while (response !== 'quit') {
    if (response === 'new') {
        response = prompt("What do you want to add?")
        list.push(response)
        response = prompt("Whatchu want?").toLowerCase();
    } else if (response === 'list') {
        console.log('********')
        for (let i = 0; i < list.length; i++) {
            console.log(`${i}: ${list[i]}`)
        }
        console.log('********')
        response = prompt("Whatchu want?").toLowerCase();
    } else if (response === 'delete') {
        if (list.length === 0) {
            console.log('The list is empty! You cannot delete anything')
            response = prompt("Whatchu want?").toLowerCase()
            continue
        }
        console.log('********')
        for (let i = 0; i < list.length; i++) {
            console.log(`${i}: ${list[i]}`)
        }
        console.log('********')
        response = parseInt(prompt("What do you want to remove?"))
        while (isNaN(response) || response >= list.length || response < 0) {
            response = parseInt(prompt("Enter something valid. What do you want to remove?"))
        }
        list.splice(response, 1)
        response = prompt("Whatchu want?").toLowerCase()
    } else {
        response = prompt("Enter a valid command!").toLowerCase()
    }
}
console.log('You quit!')

