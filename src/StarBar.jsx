import ReactDOM from 'react-dom';
import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';
import Star from './Star';
import { QueueAnim } from 'antd';

function noop() {}

//	stars collections
const AntdStar = React.createClass({
  propTypes: {
    initNum: PropTypes.number,
    starNum: PropTypes.number,
    color: PropTypes.string,
    half: PropTypes.bool,
    size: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string,
    beforeRender: PropTypes.func,
    init: PropTypes.func,
    hover: PropTypes.func,
    click: PropTypes.func,
    useHover: PropTypes.bool,
    prefixCls: PropTypes.string,
    disableClick: PropTypes.bool,
    disableHover: PropTypes.bool,
  },
  getDefaultProps() {
    return {
      initNum: 0,
      starNum: 5,
      color: '#ff8208',
      half: false,
      size: 15,
      prefixCls: 'rc',
      style: {},
      className: '',
      hover: noop,
      click: noop,
      useHover: false,
      disableClick: false,
      disableHover: false,
    };
  },
  getInitialState() {
    this.currentStar = this.props.initNum;
    return {
      num: this.props.initNum,
    };
  },
  componentDidMount() {
    const self = this;
    self.container = ReactDOM.findDOMNode(self.refs.stars_container);
    self.containerL = self.getOffsetL(self.container.children[0]);
  },
  shouldComponentUpdate() {
    return !(this.props.disableClick && this.props.disableHover);
  },
  getStyles() {
    const {style, color, size} = this.props;
    return _.extend({}, style, {
      fontSize: size,
      color: color,
    });
  },
  getOffsetL(dom) {
    return dom.offsetLeft;
  },
  getSingleW() {
    return this.singleW || (this.getOffsetL(this.container.children[1]) - this.containerL);
  },
  handleHover(props) {
    const self = this;
    const event = props.event;
    let num = self.ifHalfNum.call(self, props.num, event.clientX, self.useHover);

	//	如果是移出事件
    if (event.type === 'mouseout') {
      num = self.currentStar;
      if (!self.props.useHover) {
        self.setState({num: self.currentStar});
      }
    } else {
      self.setState({num: num});
    }
    if (self.props.hover) {
      self.props.hover(event, num);
    }
  },
  handleClick(props) {
    const self = this;
    const event = props.event;
    const num = self.ifHalfNum.call(self, props.num, event.clientX, true);
    self.setState({num: num});
    if (self.props.click) {
      self.props.click(event, num);
    }
  },
  ifHalfNum(num, x, isRemember) {
    const self = this;
    let chooseNum = num + 1;
    if (self.props.half && (x - self.containerL - self.getSingleW() * num ) < self.getSingleW() / 2) {
      chooseNum -= 0.5;
    }
    if (isRemember) {
      self.currentStar = chooseNum;
    }
    return chooseNum;
  },
  render() {
    const self = this;
    const props = self.props;
    const {handleClick, handleHover} = self;
    const {half, prefixCls, animate} = props;
    const stars = _.range(self.props.starNum);
    const starContent = stars.map((index) => {
      return <Star num={index} prefixCls={prefixCls} ifHalf={half} choosed={self.state.num} starClick={handleClick} starHover={handleHover} key={index} />;
    })

    if(animate){
      var config = {};
      if(animate == "top"){
        config = [{ opacity: [1, 0], translateY: [0, 50] },{ opacity: [1, 0], translateY: [0, -50]}];
      }
      return (
          <QueueAnim animConfig={config} ease={['easeOutQuart', 'easeInOutQuart']} component="ul" className={`${prefixCls}-star-wrapper iconfont`} style={self.getStyles()} ref="stars_container">
              {starContent}
          </QueueAnim>
      );
    } else {
      return (<ul ease={['easeOutQuart', 'easeInOutQuart']} component="ul" className={`${prefixCls}-star-wrapper iconfont`} style={self.getStyles()} ref="stars_container">
          {starContent}
      </ul>);
    }
    
  },
});

export default AntdStar;
