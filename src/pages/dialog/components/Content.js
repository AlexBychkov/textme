import React from 'react';

import { Emoji } from 'emoji-mart';

const replacer = (text) => {
  const pattern = /:[^;\s]*:/g;
  const split = text.split(pattern);
  const matches = text.match(pattern);

  if (!matches) return split;

  const length = split.length + matches.length;
  const res = [];

  for (let i = 0, m = 0; i < length; i += 2, m++) {
    if (length - i === 1) {
      res[i] = split[m];
      break;
    }
    res[i] = split[m];
    res[i + 1] = <Emoji emoji={matches[m]} set="twitter" size={20} key={m} />;
  }
  return res;
};

const Content = (props) => {
  return <>{replacer(props.text)}</>;
};

export default Content;

// :[^:\s]*(?:::[^:\s]*)*:
