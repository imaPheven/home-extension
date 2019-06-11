const HOST = "http://localhost:3000"

function postBookmarks(bookmarks) {


  // progress on transfers from the server to the client (downloads)
  function updateProgress (oEvent) {
    if (oEvent.lengthComputable) {
      var percentComplete = oEvent.loaded / oEvent.total * 100;
      // ...
    } else {
      // Unable to compute progress information since the total size is unknown
    }
  }

  function transferComplete(evt) {
    console.log("The transfer is complete.");
  }

  function transferFailed(evt) {
    console.log("An error occurred while transferring the file.");
  }

  function transferCanceled(evt) {
    console.log("The transfer has been canceled by the user.");
  }

  var xhr = new XMLHttpRequest()
  let url = `${HOST}/api/bookmarks`
  console.log(url)
  xhr.open("PUT", url, true)
  xhr.addEventListener("progress", updateProgress);
  xhr.addEventListener("load", transferComplete);
  xhr.addEventListener("error", transferFailed);
  xhr.addEventListener("abort", transferCanceled);
  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          console.log('done')
      }
  }
  let body = JSON.stringify(bookmarks)
  xhr.send(body)

}
/*
Open a new tab, and load "my-page.html" into it.
*/
function openMyPage() {

    onCreated = (tab) => {
      console.log(`Created new tab: ${tab.id}`)
      browser.bookmarks.getTree().then(t=>{
        postBookmarks(t)
      })
    }

    onError = (error) => {
      console.log(`Error: ${error}`)
    }
    
 
      var creating = browser.tabs.create({
        "url": HOST
      })
      .then(onCreated, onError)
 
  }
  /*
  Add openMyPage() as a listener to clicks on the browser action.
  */
  browser.browserAction.onClicked.addListener(openMyPage)