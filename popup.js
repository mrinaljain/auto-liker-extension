'use strict'


function click(e) {
  chrome.tabs.executeScript(null,
      {
        code:`(() => {
        if(window.location.href !== "https://tinder.com/") {
          alert("Go to tinder.com first!");
        }

        function dataURItoBlob(dataURI) {
          var binary = atob(dataURI.split(',')[1]);
          var array = [];
          for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
          }
          let what = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
          return what;
        }

        function getBase64Image(img) {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          canvas.getContext("2d").drawImage(img, 0, 0)

          let dataURL = canvas.toDataURL("image/jpeg");
          let omg = dataURL.replace('data:image/jpeg;base64,', "");
          console.log("dataURL after ", omg);
          return dataURL;
        }

        let imgDiv = document.getElementsByClassName('recCard__img Bgz(cv) Bgp(c) StretchedBox StretchedBox::a Cnt($blank)::a')[0];
        console.log(imgDiv.style.backgroundImage)
        let dirtyUrl = imgDiv.style.backgroundImage;
        let cleanUrl = dirtyUrl.replace('url("', "").replace('")', "");
        let img = new Image();
        img.src = cleanUrl;
        img.width = 10
        img.height = 10
        console.log(img)
        let imgData = getBase64Image(img)
        let bitData = dataURItoBlob(imgData)
        localStorage.setItem("imgData", bitData);

        let worked = localStorage.getItem("imgData")

        let url = "https://api.haystack.ai/api/image/analyze?output=json&apikey=5b958b123ae6930ba13f62b2a000c887";
        let formData = new FormData();
        formData.append("image", bitData);


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
