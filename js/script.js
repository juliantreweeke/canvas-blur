

// let BLUR = 50;

let backgroundImg;
let img;
let imgData;
let data;
var sliderPreviousValue;
// var amount = 200;

      const imageLoader = document.getElementById('imageLoader');
      imageLoader.addEventListener('change', handleImage, false);
      const canvas = document.getElementById('imageCanvas');
      const ctx = canvas.getContext('2d');


      function handleImage(e){
          var reader = new FileReader();
          reader.onload = function(event){
              img = new Image();

              img.onload = () => {
                  canvas.width = 599;
                  canvas.height = 313;
                  ctx.drawImage(img,0,0,599,313);

                  slider.addEventListener("mousemove", () => {
                  if(slider.value !== sliderPreviousValue){
                    filter(Number(slider.value));
                  }
                  sliderPreviousValue = Number(slider.value);
                  }); //slider event listener


              }
              img.src = event.target.result;
              backgroundImg = img.src;
              $('#backgroundImg').css('background-image', 'url(' + backgroundImg + ')');

          }
          alert(e.target.files[0]);
          reader.readAsDataURL(e.target.files[0]);

          $('#sliderContainer').css('display', 'block');
          $('.custom-file-upload').css('display', 'none');

      }






// add filter to image
// reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

      function filter(value) {
        ctx.drawImage(img, 0, 0,599,313);
        // save the default state
        ctx.save();
        // check to see whether slider is increasing or decreasing
        if (value < 0) {
          ctx.fillStyle = "black";
          ctx.globalCompositeOperation = "darken";
          ctx.globalAlpha = -value / 100;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

        } else if (value) {
          ctx.fillStyle = "white";
          ctx.globalCompositeOperation = "lighten";
          ctx.globalAlpha = 1;
          ctx.drawImage(img, 0, 0,599,313);
          ctx.globalAlpha = value / 100;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.restore(); // restore to the default state
      }







        // alternative option for brightness function increasing pixel data in canvas

        var brighten = function(imgData,amount) {

        for (var i = 0; i < imgData.data.length; i += 4) { // we are jumping every 4 values of RGBA for every pixel
        imgData.data[i] = imgData.data[i] + amount; // the red color channel
        imgData.data[i + 1] = imgData.data[i + 1] + amount; // the green color channel
        imgData.data[i + 2] = imgData.data[i + 2] + amount; // the blue color channel
        }
        ctx.putImageData(imgData,0,0);
        // return imgData;
        return;

       }

      // brighten(imgData,100);

      // alternative blurring function, blurring directly into canvas using StackBlur.js

      //   var drawBlur = function() {
      //   var w = canvas.width;
      //   var h = canvas.height;
      //   ctx.drawImage(img, 0, 0, w, h);
      //   stackBlurCanvasRGBA('imageCanvas', 0, 0, w, h, BLUR);
      // };
