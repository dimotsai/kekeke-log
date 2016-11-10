import React, {PropTypes, Component} from 'react';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ent from 'ent';
import moment from 'moment';
import * as colors from 'material-ui/styles/colors';

moment.locale('zh-TW');

function hash(str) {
  if (str) {
    return [...str].map(x => x.charCodeAt(0)).reduce((sum, x) => (sum * 31 + x) | 0, 0) | 0;
  }
  return 0;
}

function getColor(colorToken, publicId) {
  const c = 2.549999952316284;
  const v = Math.abs(31 * (31 + hash(colorToken)) + hash(publicId));
  const r = Math.round((v % 70) * c);
  const g = Math.round(((v / 100 | 0) % 70) * c);
  const b = Math.round((((v / 100 | 0) / 100 | 0) % 70) * c);
  return {r, g, b};
}

const style = {
  date: {float: 'right', color: colors.grey600, fontSize: '14px'},
  messageText: {whiteSpace: 'normal', height: 'auto', color: colors.grey700, marginTop: 8},
  divider: {marginLeft: 16, marginRight: 16}
};

const imageRegex = /(https?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)\.(?:png|jpe?g|gif|gifv)/ig;
const youtubeRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/g;

function extractYoutubes(str) {
  let m;
  const results = [];
  while ((m = youtubeRegex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === youtubeRegex.lastIndex) {
      youtubeRegex.lastIndex++;
    }
    // The result can be accessed through the `m`-variable.
    results.push(m[1]);
  }
  return results;
}

export default class MessageItem extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {message} = this.props;
    const rgb = getColor(message.payload.senderColorToken, message.payload.senderPublicId);
    const color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    const date = moment(parseInt(message.payload.date, 10)).format('YYYY-MM-DD HH:mm:ss');
    const text = ent.decode(message.payload.content);
    let images = text.match(imageRegex);
    images = images === null ? [] : images;
    const videos = extractYoutubes(text);

    return (<div>
      <ListItem
        primaryText={
          <div>
            <span style={{color}}>{message.payload.senderNickName}</span>
            <span className="date" style={style.date}>{date}</span>
          </div>
        }
        secondaryText={
          <div className="message-text" style={style.messageText}>
            {text}
            <div className="images">
              {images.map((url, key) => <img key={`img-${key}`} src={url}/>)}
              {videos.map((token, key) =>
                <div className="video-wrapper" key={`vid-${key}`}>
                  <iframe
                    className="youtube"
                    src={`https://www.youtube.com/embed/${token}`}
                    width="854"
                    height="480"
                    frameBorder="0"
                    allowFullScreen
                    >
                  </iframe>
                </div>
              )}
            </div>
          </div>
        }
        disabled
        />
      <Divider style={style.divider}/>
    </div>);
  }
}

MessageItem.propTypes = {
  message: PropTypes.object.isRequired
};
