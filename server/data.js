

let arr = [5,4,3,2,2,3,4,1] // 7


let arr01 = [2,2,3,3,1] // 4
let unique = []
for (let i = 0; i < arr.length; i++) {
    
    if (!unique.includes(arr[i])) {
        unique.push(arr[i])
    }

}

console.log(unique);
