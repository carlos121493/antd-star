// use jsx to render html, do not modify simple.html

import 'rc-antd-star/assets/index.less';
import AntdStar from 'rc-antd-star';
import React from 'react';
import ReactDOM from 'react-dom';

const options = {
  'animate': 'top', 
};

ReactDOM.render( < AntdStar {...options}/>, document.getElementById('__react-content'));
