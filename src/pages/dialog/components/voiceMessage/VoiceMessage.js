import React from 'react';

const VoiceMessage = () => {
  window.onload = function () {
    let start = document.querySelector('#start');
    let stop = document.querySelector('#stop');
    let audio = document.querySelector('audio');
    let chunks = [];
    let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
    let mediaRecorder;

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.webkitGetUserMedia;
    if (navigator.getUserMedia) {

      const start = () => {
        let constraints = { audio: true };
        navigator.getUserMedia(constraints, onSuccess, onError);
      };

      const stop = () => {
        mediaRecorder.stop();
        start.disbled = false;
      };

      let onError = function (err) {
        console.log('The following error occured: ' + err);
      };

      let onSuccess = function (stream) {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        start.disabled = true;

        mediaRecorder.onstop = function (e) {
          let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
          let audioURL = window.URL.createObjectURL(e.data);
          audio.src = audioURL;
          console.log('recorder stopped');
          chunks = [];
        };

        mediaRecorder.ondataavailable = function (e) {
          let blob = new Blob([e.data], { type: 'audio/mp3; codecs=opus' });
          let audioURL = window.URL.createObjectURL(e.data);
          audio.src = audioURL;
        };
      };
    }
  };
  return (
    <div>
      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
    </div>
  );
};

export default VoiceMessage;
