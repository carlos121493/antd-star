// use jsx to render html, do not modify simple.html

import 'rc-antd-star/assets/index.less';
import AntdStar from 'rc-antd-star';
import React from 'react';
import ReactDOM from 'react-dom';

const options = {
  'initNum': 3.5,
  'starNum': 20,
  'half': true,
  'style': {
    'backGround': '#000',
  },
};

ReactDOM.render( < AntdStar {...options}/>, document.getElementById('__react-content'));
