import React from 'react';
import { connect } from 'react-redux';

import { Button } from '@material-ui/core';

import { messaging, db } from '../../services/firebase';

function Settings(props) {
  const { user } = props;
  const [is_subscribe, changeSubscribe] = React.useState(user.token ? true : false);

  const unsubscribe = (uid) => {
    db.ref('/users/' + uid + '/token').remove();
    changeSubscribe(false);
  };

  const subscribe = (uid) => {
    messaging
      .getToken({
        vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
      })
      .then((currentToken) => {
        if (currentToken) {
          const update = {};
          update['/users/' + uid + '/token'] = currentToken;
          db.ref().update(update);
          changeSubscribe(true);
        } else {
          // Show permission request.
        }
      })
      .catch((err) => {
        // Error retrieving registration token.
      });
  };

  let btn = is_subscribe ? (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        unsubscribe(user.uid);
      }}
    >
      Disable Push
    </Button>
  ) : (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => {
        subscribe(user.uid);
      }}
      className="btn"
    >
      Enable Push
    </Button>
  );
  return (
    <div>
      <h1>Settings</h1>
      {btn}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Settings);
