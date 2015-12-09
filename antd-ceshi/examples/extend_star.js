// use jsx to render html, do not modify simple.html
import 'rc-antd-star/assets/extend.less';
import AntdStar from 'rc-antd-star';
import React from 'react';
import ReactDOM from 'react-dom';

const ExtendStar = React.createClass({
    getInitialState:function(){
      return {
        num:3.5
      }
    },
    hoverHandler:function(event,num){
        this.setState({num:num});
    },
    render:function(){
      const hover = this.hoverHandler;
      return (<div className="extend-starbar">
          <AntdStar prefixCls="extend" hover={hover}/>
          <div className="warn-info">{this.state.num}</div>
        </div>);
    }
})

ReactDOM.render(<ExtendStar />, document.getElementById('__react-content'));
