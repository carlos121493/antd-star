'use strict'

import React,{PropTypes} from 'react';
import Animate from 'rc-animate';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';

var noop = function(){};
//star
const Star = React.createClass({
	getClassName:function(){
		var num = this.props.num;
		var choosed = this.props.choosed;
		const prefixCls = this.props.prefixCls;
		if(num+0.5===choosed && this.props.ifHalf){
			
			return `${prefixCls}-half-star active`;
		}
		return num<choosed?`${prefixCls}-all-star`:`${prefixCls}-zero-star`;
	},
	handleHover:function(e){
		this.props.starHover({event:e,num:this.props.num});
	},
	handleClick:function(e){
		this.props.starClick({event:e,num:this.props.num});
	},
	render:function(){
		// body...
		const {prefixCls,starClick,starHover,num} = this.props;
		const {handleHover,handleClick} = this;
		return (<li ref="star_item" className={this.getClassName()} data-num={num} onClick={handleClick} onMouseOver={handleHover} onMouseOut={handleHover} onMouseMove={handleHover}></li>);
	}
})

//stars collections
const AntdStar = React.createClass({
	PropTypes:{
		initNum:PropTypes.number,
		starNum:PropTypes.number,
		color:PropTypes.string,
		half:PropTypes.bool,
		size:PropTypes.number,
		style:PropTypes.object,
		className:PropTypes.string,
		beforeRender:PropTypes.func,
		init:PropTypes.func,
		hover:PropTypes.func,
		click:PropTypes.func,
		useHover:PropTypes.bool,
		prefixCls:PropTypes.string,
		disableClick:PropTypes.bool,
		disableHover:PropTypes.bool 
	},
	getDefaultProps:()=>{
		return  {
			initNum:0,
			starNum:5,
			color:'#ff8208',
			half:true,//todo
			size:15,
			prefixCls:"rc",
			style:{},
			className:"",
			hover:noop,
			click:noop,
			useHover:false,
			disableClick:false,
			disableHover:false 
		}
	},
	//生命周期
	getInitialState:function(){
		this.currentStar = this.props.initNum
		return {
			num:this.props.initNum
		}
	},
	getOffsetL:function(dom){
		// if(dom.parentElement){
		// 	return dom.offsetLeft + this.getOffsetL(dom.parentElement);
		// }
		return dom.offsetLeft;
	},
	componentDidMount:function(){
		var self = this;
		self.container = self.refs.stars_container.getDOMNode();
		self.containerL = self.getOffsetL(self.container.children[0]);
	},
	getSingleW:function(){
		return this.singleW || (this.getOffsetL(this.container.children[1])-this.containerL)
	},
	shouldComponentUpdate:function(){
		return !(this.props.disableClick && this.props.disableHover);
	},
	ifHalfNum:function(num,x,isRemember){
		var self = this;
		var choose_num = num+1;
		if(self.props.half && (x-self.containerL-self.getSingleW()*num)<self.getSingleW()/2){
			choose_num -= 0.5
		}
		isRemember && (self.currentStar = choose_num);
		return choose_num;
	},
	handleClick:function(props){
		var self = this;
		var event = props.event;
		var num = self.ifHalfNum.call(self,props.num,event.clientX);
		self.setState({num:num});

	},
	handleHover:function(props){
		var self = this;
		var event = props.event;
		var num = self.ifHalfNum.call(self,props.num,event.clientX);

		//如果是移出事件
		if(event.type=="mouseout"){
			num = self.currentStar;
			!self.props.useHover && self.setState({num:self.currentStar});
		} else {
			self.setState({num:num});
		}
		self.props.hover && self.props.hover(event,num);
	},
	getStyles:function(){
		return _.extend({},this.props.style,{
			fontSize:this.props.size,
			color:this.props.color
		});
	},
	render:function(){
		var self = this;
		const props = this.props;
		const {handleClick,handleHover} = this;
		const {half,num,prefixCls} = props;
		const stars = _.range(self.props.starNum);
		
		return (
			<Animate component="div" transitionName="fade" transitionAppear={true} className={`${prefixCls}-star-wrapper`+' iconfont'} style={self.getStyles()}>
			<ReactCSSTransitionGroup transitionName="fade"  transitionEnterTimeout={500} transitionLeaveTimeout={300} ref="stars_container" component="ul">
			{stars.map(function(index){
				return <Star num={index} prefixCls={prefixCls} ifHalf={self.props.half} choosed={self.state.num} starClick={handleClick} starHover={handleHover} key={index} />;
			})}
			</ReactCSSTransitionGroup>
			</Animate>
		)
	}
})

export default AntdStar;