setTimeout(() => {
    if (db) {
        // videos retrieval

        let dbTransaction = db.transaction("video", "readonly");
        let videoStore = dbTransaction.objectStore("video");
        let videoRequest = videoStore.getAll();
        videoRequest.onsuccess = (e) => {
            let videoResult = videoRequest.result;
            let videoCont = document.querySelector(".video-cont");
            console.log(videoResult);
            videoResult.forEach((videoObj) => {
                let box = document.createElement("div");
                box.setAttribute("class", "box");
                box.setAttribute("id", videoObj.id);

                let url = URL.createObjectURL(videoObj.blobData);
                box.innerHTML = `
                    <div class="content">
                        <video src="${url}"></video>
                    </div>
                    <div class="action">
                        <i class="fa-solid fa-cloud-arrow-down"></i>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                `
                videoCont.appendChild(box);
            })
            console.log()
        }

        // image retrieval

        let dbTransactionI = db.transaction("image", "readonly");
        let imageStore = dbTransactionI.objectStore("image");
        let imageRequest = imageStore.getAll();
        imageRequest.onsuccess = (e) => {
            let imageResult = imageRequest.result;
            let imageCont = document.querySelector(".photo-cont");
            console.log(imageResult);
            imageResult.forEach((imageObj) => {
                let box = document.createElement("div");
                box.setAttribute("class", "box");
                box.setAttribute("id", imageObj.id);

                let url = imageObj.imageData;
                box.innerHTML = `
                    <div class="content">
                        <img src="${url}"/>
                    </div>
                    <div class="action">
                        <i class="fa-solid fa-cloud-arrow-down"></i>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                `
                imageCont.appendChild(box);
            })
            console.log()
        }
    }
}, 200)


// hover event listener on all media boxes
setTimeout(() => {
    let allbox = document.querySelectorAll(".box");
    console.log(allbox)
    allbox.forEach(box => {
        let actions = box.querySelectorAll(".fa-solid");
        // let content = box.querySelector("video");
        box.addEventListener("mouseover", (e) => {
            // content.setAttribute("autoplay", "true");
            actions.forEach(elem => {
                elem.style.opacity = 1;
            })
            // alert(`${content}`);
            // console.log("download");
        })
        box.addEventListener("mouseout", (e) => {
            // let download = box.querySelectorAll(".fa-solid");
            // content.forEach(elem => {
            // content.removeAttribute("autoplay", "false");
            // })
            actions.forEach(elem => {
                elem.style.opacity = 0;
            })
            // console.log("download")
        })
    })



    let allDelete = document.querySelectorAll(".fa-trash");
    console.log(allDelete);
    allDelete.forEach(elem => {
        elem.addEventListener("click", (e) => {
            let response = confirm("Do you want to delete this file permanently?");
            if (response) {
                // deletion in DB
                let actionCont = elem.parentElement;
                let id = actionCont.parentElement.getAttribute("id");
                let type = id.slice(0, 3);
                if (type === "vid") {
                    let dbTransaction = db.transaction("video", "readwrite");
                    let videoStore = dbTransaction.objectStore("video");
                    videoStore.delete(id);
                } else {
                    let dbTransactionI = db.transaction("image", "readwrite");
                    let imageStore = dbTransactionI.objectStore("image");
                    imageStore.delete(id);
                }
                // console.log(id);

                // deletion in UI
                actionCont.parentElement.remove();
            }

        })
    })

    let allDownload = document.querySelectorAll(".fa-cloud-arrow-down");
    console.log(allDownload);
    allDownload.forEach(elem => {
        elem.addEventListener("click", (e) => {
            let response = confirm("Do you want to download this file?");
            if (response) {
                // deletion in DB
                let actionCont = elem.parentElement;
                let id = actionCont.parentElement.getAttribute("id");
                let type = id.slice(0, 3);
                if (type === "vid") {
                    let dbTransaction = db.transaction("video", "readwrite");
                    let videoStore = dbTransaction.objectStore("video");
                    let videoRequest = videoStore.get(id);
                    videoRequest.onsuccess = (e) => {
                        let videoResult = videoRequest.result;

                        let videoURL = URL.createObjectURL(videoResult.blobData);

                        let a = document.createElement("a");
                        a.href = videoURL;
                        a.download = "stream.mp4";
                        a.click();
                    }
                } else {
                    let dbTransactionI = db.transaction("image", "readwrite");
                    let imageStore = dbTransactionI.objectStore("image");
                    let imageRequest = imageStore.getAll();
                    imageRequest.onsuccess = (e) => {
                        let imageResult = imageRequest.result;

                        let a = document.createElement("a");
                        a.href = imageResult.url;
                        a.download = "image.jpg";
                        a.click();
                    }
                }
            }
        })
    })
}, 1000)

