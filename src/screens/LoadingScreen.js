import React from 'react';
import '../css/LoadingScreen.css';
import logo from '../icons/cloud_icon.svg';


export default class LoadingScreen extends React.Component {

  render() {
    return (
      <div className='container'>
        <div>
          <h1>Loading...</h1>
        </div>
        <div>
          <img src={logo} className="logo" alt="logo" />
        </div>
      </div>
    );
  }
}
