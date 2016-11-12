import React, {Component, PropTypes} from 'react';
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Masonry from 'react-masonry-component';
import InfiniteScroll from 'redux-infinite-scroll';
import * as Actions from '../actions/index';
import moment from 'moment';
import Lightbox from 'react-images';
import ent from 'ent';

class Image extends Component {
  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handlePlayVideo = this.handlePlayVideo.bind(this);
    this.renderText = this.renderText.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }

  handleTouchTap() {
    this.props.onTouchTap(this.props.imageId);
  }

  handlePlayVideo() {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }

  renderText() {
    const {image} = this.props;
    const text = image.text.replace(image.url, '').trim();
    if (text) {
      return (
        <CardText>
          {ent.decode(text)}
        </CardText>
      );
    }
  }

  renderImage() {
    const {image} = this.props;
    const matches = image.url.match(/^.*\.(png|jpe?g|gif|gifv|mp4)(\?.*)?$/);
    const type = matches ? matches[1] : 'unknown';
    const videoRef = video => {
      this.video = video;
    };
    switch (type) {
      case 'mp4':
        return <video src={image.url} ref={videoRef} onTouchTap={this.handlePlayVideo} loop muted controls/>;
      default:
        return <img src={image.url} onTouchTap={this.handleTouchTap}/>;
    }
  }

  render() {
    const {image} = this.props;
    return (
      <div className="item-wrapper">
        <Card className="item">
          <CardHeader
            title={image.senderNickName}
            subtitle={moment(parseInt(image.date, 10)).fromNow()}
            />
          <CardMedia>
            {this.renderImage()}
          </CardMedia>
        </Card>
      </div>
    );
  }
}

Image.defaultProps = {
  onTouchTap() {}
};

Image.propTypes = {
  image: PropTypes.object.isRequired,
  imageId: PropTypes.number.isRequired,
  onTouchTap: PropTypes.func
};

class ConfiguredMasonry extends Component {
  render() {
    const props = Object.assign({}, this.props, {
      // options: {transitionDuration: 0}
    });
    return (
      <Masonry {...props}/>
    );
  }
}

class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {lightboxIsOpen: false, currentImage: 0};
    this.handleCloseLightbox = this.handleCloseLightbox.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleGotoImage = this.handleGotoImage.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadImages();
  }

  handleCloseLightbox() {
    this.setState({lightboxIsOpen: false});
  }

  handleGotoImage(index) {
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    });
  }

  handleClickPrev() {
    if (this.state.currentImage > 0) {
      this.setState({currentImage: this.state.currentImage - 1});
    }
  }

  handleClickNext() {
    console.log(this.state.currentImage);
    if (this.state.currentImage < this.props.imageApp.loadedImages.length - 1) {
      this.setState({currentImage: this.state.currentImage + 1});
    }
  }

  loadMore() {
    this.props.actions.loadImages();
  }

  render() {
    return (
      <section className="main">
        <Lightbox
          currentImage={this.state.currentImage}
          images={this.props.imageApp.loadedImages.map(x => {
            return {src: x.url};
          })}
          onClickPrev={this.handleClickPrev}
          onClickNext={this.handleClickNext}
          isOpen={this.state.lightboxIsOpen}
          onClose={this.handleCloseLightbox}
          />
        <div className="gallery-wrapper">
          <InfiniteScroll
            containerHeight="100%"
            loadMore={this.loadMore}
            hasMore={this.props.imageApp.hasMore}
            holderType={ConfiguredMasonry}
            className="gallery"
            threshold={200}
            >
            {this.props.imageApp.loadedImages.map((image, key) =>
              <Image image={image} imageId={key} key={key} onTouchTap={this.handleGotoImage}/>
            )}
          </InfiniteScroll>
        </div>
      </section>
    );
  }
}

Images.propTypes = {
  imageApp: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    imageApp: state.imageApp
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Images);
