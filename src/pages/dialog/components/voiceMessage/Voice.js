import React from 'react';

import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import { IconButton } from '@material-ui/core';

import { storage } from '../../../../services/firebase';
import { connect } from 'react-redux';

const device = navigator.mediaDevices.getUserMedia({ audio: true });

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

const stop = (uid, createMessage) => {
  if (recorder !== undefined) {
    recorder.stop();
    recorder.ondataavailable = (e) => {
      chunk.push(e.data);

      let blob = new Blob(chunk, { type: 'audio/webm' });
      let voice = storage.ref().child(`users/${uid}/voices/${recorder.stream.id}`);
      voice.put(blob).then(() => {
        voice.getDownloadURL().then((url) => createMessage('audio', false, url));
      });
    };
  }
};

const Voice = (props) => {
  const [recording, setRecording] = React.useState(false);

  return (
    <div>
      {recording ? (
        <IconButton
          onClick={() => {
            stop(props.user.uid, props.createMessage);
            setRecording(false);
          }}
        >
          <StopIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            start();
            setRecording(true);
          }}
        >
          <MicIcon />
        </IconButton>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Voice);
