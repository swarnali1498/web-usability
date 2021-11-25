const start = document.getElementById("start");
  const stop = document.getElementById("stop");
  const video = document.querySelector("video");
  let recorder, stream;
  function play_recording()
  {
      video.style.display="block";
      video.play();
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
    };
  
    recorder.start();
  }
  start.addEventListener("click", () => {
    start.setAttribute("disabled", true);
    stop.removeAttribute("disabled");
  
    startRecording();
  });
  
  stop.addEventListener("click", () => {
    stop.setAttribute("disabled", true);
    //start.removeAttribute("disabled");
    show.removeAttribute("disabled");
    
   recorder.stop();
   // stream.getVideoTracks()[0].stop();
  });