let backgroundImg,
  img,
  imgData,
  data,
  sliderPreviousValue;

const imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');


// load image
function handleImage(e) {
  var reader = new FileReader();
  reader.onload = function(event) {
    img = new Image();

    img.onload = () => {
      canvas.width = 599;
      canvas.height = 313;
      ctx.drawImage(img, 0, 0, 599, 313);

      // if mouse moves over slider at all - do this!
      slider.addEventListener("mousemove", () => {
        if (slider.value !== sliderPreviousValue) {
          filter(Number(slider.value));
        }
        sliderPreviousValue = Number(slider.value);
      }); //end slider event listener

      // add blue progress bar to slider's css
      slider.addEventListener('mousemove', blueSlider, false);

    }
    img.src = event.target.result;
    // copy image source to background variable
    backgroundImg = img.src;
    // attach image with css blurring style
    $('#backgroundImg').css('background-image', 'url(' + backgroundImg + ')');

  }

  reader.readAsDataURL(e.target.files[0]);
  // make slider appear
  $('#sliderContainer').css('display', 'block');
  // $('.custom-file-upload').css('display', 'none');
} // end load image

// add filter to image
// reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

function filter(value) {
  // redraw the image
  ctx.drawImage(img, 0, 0, 599, 313);
  // save the default state
  ctx.save();
  // check to see whether slider is increasing or decreasing
  // if decreasing add darken filter to canvas
  if (value < 0) {
    ctx.globalCompositeOperation = "darken";
    // convert negative value to positive number with -value and set opacity overlay
    ctx.globalAlpha = -value / 100;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // if increasing add a white overlay to canvas
  } else if (value) {
    ctx.fillStyle = "white";
    ctx.drawImage(img, 0, 0, 599, 313);
    ctx.globalAlpha = value / 100;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.restore(); // restore to the default state
}

// slider css progress blue
function blueSlider() {
  var val = ($('#slider').val() - $('#slider').attr('min')) / ($('#slider').attr('max') - $('#slider').attr('min'));

  $('#slider').css('background-image',
    '-webkit-gradient(linear, left top, right top, ' +
    'color-stop(' + val + ', #007aff), ' +
    'color-stop(' + val + ', #C5C5C5)' +
    ')'
  );

}
