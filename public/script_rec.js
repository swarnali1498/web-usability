
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const video = document.querySelector("video");
var start_time = new Date();
var mouse_coorinates = [];
let recorder, stream;

let count = 0

function play_recording() {
  video.style.display = "block";
  video.play();
}

function play_from_localstorage() {
  var url = localStorage.getItem("url");
  const link = document.createElement('a');
  //link.download = "recording.webm";
  //link.click();
  link.href = encodeURI(url);
  window.open(link.href, '_blank');
}

async function startRecording() {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" }
  });
  recorder = new MediaRecorder(stream);

  const chunks = [];
  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = e => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    video.src = URL.createObjectURL(completeBlob);
    const link = document.createElement('a');
    link.href = video.src;
    count = count + 1;
    link.download = test_id + ".webm";
    link.click();
    localStorage.setItem("url", link.href);
  };
  recorder.start();
}


/* 
POST /test/end/{test_id}

{ 
    start_time: Date(),
    end_time: Date(),
    URL: Task.URL,
    mouse_coords: [1, 2, 3, 4, 5, 6, ...]
}
*/
start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");
  show.setAttribute("disabled", true);
  start_time = new Date();
  startRecording();
 
  document.querySelector('body').onclick = function(ev) {
      let x = ev.layerX
      let y = ev.layerY

      cord.push(x,y)

      console.log(x,y);
      console.log(cord)
      console.log(window.location.href)
  }
});

stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");
  show.removeAttribute("disabled");
  recorder.stop();
  stream.getVideoTracks()[0].stop();
  var end_time = new Date();
  try {
    const formData = new FormData();
    let mouse_obj = {};
    mouse_obj["URL"]= task_url;
    mouse_obj["mouse_coords"] = mouse_coorinates;
    form.append("start_time",start_time);
    form.append("end_time",end_time);
    form.append("mouse_coords",mouse_obj);
    const responseObj = await postFormDataAsJson(url_post, formData);
  } catch (error) {
    console.error(error);
  }
  
});
async function postFormDataAsJson(url, formData) {
      const plainFormData = Object.fromEntries(formData.entries());
      const formDataJsonString = JSON.stringify(plainFormData);
      console.log(formDataJsonString);
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "token " + token
        },
        body: formDataJsonString,
      };
      const response = await fetch(url, fetchOptions);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      } else{
        window.location.href = "projectdashboard.html";
        //reload
      }
      return response.json();
    }
    
