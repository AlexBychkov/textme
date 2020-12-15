import React from 'react';

import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import { IconButton } from '@material-ui/core';

import { storage } from '../../../../services/firebase';
import { connect } from 'react-redux';

const Voice = (props) => {
  const device = navigator.mediaDevices.getUserMedia({audio: true});
  let recorder;
  let chunk;

  
  const start = () => {
    device
      .then((stream) => {
        chunk = [];
        recorder = new MediaRecorder(stream);
        recorder.start();

      })
      .catch((e) => {
        console.log(e);
      });
  };

  const stop = () => {
    console.log(recorder);
    if (recorder !== undefined) {
      recorder.stop();

      recorder.ondataavailable = (e) => {
        chunk.push(e.data);

        let blob = new Blob(chunk, { type: 'audio/webm' });
        let voice = storage
          .ref()
          .child(`users/${props.user.uid}/voices/${recorder.stream.id}`);
        voice.put(blob).then(() => {
          voice.getDownloadURL().then((url) => props.createMessage('audio', false, url));
        });
      };
    }

  };

  return (
    <div>
        <IconButton onClick={start}>
          <MicIcon />
        </IconButton>

        <IconButton onClick={stop}>
          <StopIcon />
        </IconButton>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Voice);


// here i trying to solve render problem... 

// const [recording, setRecording] = useState(false);
// const [initial, setInitial] = useState(false);


// const superHandler = useCallback(() => {
//   const device = navigator.mediaDevices.getUserMedia({ audio: true });
//   let recorder;
//   let chunk;

//   if (!recording) {
//     device
//       .then((stream) => {
//         chunk = [];
//         recorder = new MediaRecorder(stream);
//         recorder.start();
//         console.log(recording);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//       setInitial(true);
//       return;
//   }
//   console.log(recording, recorder)
//   if (recording && recorder) {
//     console.log('here?')
//     recorder.stop();

//     recorder.ondataavailable = (e) => {
//       chunk.push(e.data);

//       let blob = new Blob(chunk, { type: 'audio/webm' });
//       let voice = storage
//         .ref()
//         .child(`users/${props.user.uid}/voices/${recorder.stream.id}`);
//       voice.put(blob).then(() => {
//         voice.getDownloadURL().then((url) => props.createMessage('audio', false, url));
//       });
//     };
//   }
//   setRecording((prev) => !prev);
// }, []);
// console.log('render');

// {recording && (
//   <IconButton onClick={superHandler}>
//     <StopIcon />
//   </IconButton>
// )}

// {!recording && (
//   <IconButton onClick={superHandler}>
//     <MicIcon />
//   </IconButton>
// )}