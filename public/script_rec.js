
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const video = document.querySelector("video");
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
    link.download = count.toString() + ".webm";
    link.click();
    localStorage.setItem("url", link.href);
  };
  recorder.start();
}


/* 
 
POST /test/end/{test_id}
{ 
    start_time: Date()
    end_time: Date()
    mouse_coords:{
      URL: Task.URL,
      mouse_coords: [1, 2, 3, 4, 5, 6, ...]
    }
}
POST 
 
*/
start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");
  show.setAttribute("disabled", true);
  // let start_time = new Date();
  startRecording();
});

stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");
  show.removeAttribute("disabled");

  recorder.stop();
  stream.getVideoTracks()[0].stop();
});
