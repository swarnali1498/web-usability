
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
    localStorage.setItem("page_list", "");
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
  start_time = new Date();
  startRecording();


});

stop.addEventListener("click", async () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");
  show.removeAttribute("disabled");
  recorder.stop();
  stream.getVideoTracks()[0].stop();
  var end_time = new Date();
  // var url_post = server_address + "task/mouse_coords/" + task_id;
  try {
    page_list = JSON.parse(localStorage.getItem("page_list"));
    console.log(page_list);
    $.each(page_list, async function (key, value) {
      /* 
        POST page/
        {
          URL:
          Mouse_coords:
        }  

      */
      console.log(key);

      console.log(value["mouse_coords"]);
      let form = {};
      form["mouse_coords"] = value["mouse_coords"];
      form["URL"] = key;
      console.log(form);
      const responseObj = await postDataAsJson(server_address + "page", form);
      console.log(responseObj);
    });
    const form = new FormData();
    form.append("start_time", start_time);
    form.append("end_time", end_time);
    form.append("video_url", test_id);
    const responseObj = await postFormDataAsJson(server_address + "test/end/" + test_id, form);
    console.log(responseObj);
  } catch (error) {
    console.error(error);
  }

});
async function postFormDataAsJson(url, formData) {
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);
  console.log(plainFormData);
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
  } else {
    // window.location.href = "projectdashboard.html";
    //reload
  }
  return await response.json();
}


async function postDataAsJson(url, formData) {
  const formDataJsonString = JSON.stringify(formData);
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
  } else {
    // window.location.href = "projectdashboard.html";
    //reload
  }
  return await response.json();
}

