import React, {PropTypes, Component} from 'react';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ent from 'ent';
import moment from 'moment';
import * as colors from 'material-ui/styles/colors';
import * as Utils from '../utils';

moment.locale('zh-TW');

const style = {
  date: {float: 'right', color: colors.grey600, fontSize: '14px'},
  messageText: {whiteSpace: 'normal', height: 'auto', color: colors.grey700, marginTop: 8},
  divider: {marginLeft: 16, marginRight: 16}
};

export default class MessageItem extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {message} = this.props;
    const rgb = Utils.getColorFromToeknId(message.payload.senderColorToken, message.payload.senderPublicId);
    const color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    const date = moment(parseInt(message.payload.date, 10)).format('YYYY-MM-DD HH:mm:ss');
    const text = ent.decode(message.payload.content);
    const images = Utils.extractImages(text);
    const videos = Utils.extractYoutubes(text);

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
              {images.map((url, key) => <img key={`img-${key}`} src={Utils.toHttps(url)}/>)}
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
