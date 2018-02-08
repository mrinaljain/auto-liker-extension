'use strict'


function click(e) {
  chrome.tabs.executeScript(null,
      {
        code:`(() => {
        if(window.location.href !== "https://tinder.com/") {
          alert("Go to tinder.com first!");
        }

        function getBase64Image(img) {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          let dataURL = canvas.toDataURL("image/jpeg");
          console.log("dataURL", dataURL)
          let omg = dataURL.replace('data:image/png;base64,', "");
          console.log("dataURL after ", omg);
          return JSON.stringify(dataURL);
        }

        let img = new Image();
        img.src = './ppp.jpg'
        img.width = 10
        img.height = 10
        // let dirtyUrl = img.style.backgroundImage;
        // let cleanUrl = dirtyUrl.replace('url("', "").replace('")', "");
        // let imgElement = new Image();
        // imgElement.src = cleanUrl;
        let imgData = getBase64Image(img)
        localStorage.setItem("imgData", imgData);

        let worked = localStorage.getItem("imgData")
        console.log(worked)

        let url = "https://api.haystack.ai/api/image/analyze?output=json&apikey=5b958b123ae6930ba13f62b2a000c887";
        let formData = new FormData();
        formData.append("image", worked);


        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
          }
        };

        xhttp.open("POST", url, true);
        xhttp.send(formData);

        const likeButton = document.getElementsByClassName("recsGamepad__button--like");
        setInterval(() => {
          // likeButton[0].click();
          let keepSwiping = document.getElementsByClassName("button Lts($ls-s) Z(0) Whs(nw) Cur(p) Tt(u) Bdrs(100px) Px(24px) Py(0) H(54px) Mih(54px) Lh(50px) button--outline Bdw(2px) Bds(s) Trsdu($fast) Bdc($c-gray) C($c-gray) Bdc($c-base):h C($c-base):h Fw($semibold) Bdc($c-pink) Bdc($c-orange):h C(#fff)!:h Bg(t):h W(100%) D(b) C(#fff) Bg(t) Mt(24px) Mt(12px)--xs Mt(10px)--lsh");
          if (keepSwiping[0]) {
            keepSwiping[0].click()
          }
        }, 1);
      })()`
    });
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('a');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});
