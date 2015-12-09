// use jsx to render html, do not modify simple.html
import 'rc-antd-star/assets/index.less';
import AntdStar from 'rc-antd-star';
import React from 'react';
import ReactDOM from 'react-dom';

var options = {
    "initNum":3.5,
    "disableClick":true,
    "disableHover":true
}

ReactDOM.render(<AntdStar {...options} />, document.getElementById('__react-content'));
