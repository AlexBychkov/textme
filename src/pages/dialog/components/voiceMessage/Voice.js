import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import { IconButton } from '@material-ui/core';

import { db as database } from '../../../../services/firebase';



const Voice = () => {
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
  });

  const createMessage = (type) => {
    const objToPush = {};

    objToPush.type = type;
    objToPush.user = this.props.user.uid;

    database.ref().child(`/messages/${this.state.dialogId}`).push(objToPush);
  }


  return (
    <div>
      <IconButton>
        <MicIcon onClick={startRecording} />
      </IconButton>
      <IconButton>
        <StopIcon onClick={stopRecording} />
      </IconButton>
      <audio src={mediaBlobUrl} controls />
    </div>
  );
};

export default Voice;
