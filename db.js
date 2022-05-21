// 1. Open a database
// 2. Create objectstore 
// objectstore can be created only when DB is upgraded
// 3. Transaction
let db;
let openRequest = indexedDB.open("myDatabase");
openRequest.addEventListener("success", (e) => {
    console.log("DB success")
    db = openRequest.result;
})
openRequest.addEventListener("error", (e) => {
    console.log("error")
})
openRequest.addEventListener("upgradeneeded", (e) => {
    console.log("DB upgraded")
    db = openRequest.result;

    // creating ObjectStore
    db.createObjectStore("video", {keyPath: "id"});
    db.createObjectStore("image", {keyPath: "id"});
}) 