import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';

import './Toastr.scss';

const Toastr = () => (
  <ReduxToastr
    timeOut={4000}
    newestOnTop={false}
    position='bottom-right'
    transitionIn='fadeIn'
    transitionOut='fadeOut'
    progressBar
    closeOnToastrClick
  />
);

export default Toastr;
