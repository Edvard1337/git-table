import React from 'react';
import '../css/PageNavigator.css';

export default class PageNavigator extends React.Component {


  render() {
    return (
    <div className='navContainer'>
      <ul>
        {
          this.props.pages.map(nbr => {
            return (
              <li
                key={nbr}
                id={nbr}
                className={(this.props.currentPage === nbr) ? "selectedListItem" : null  }
              >
              <button onClick={() => this.props.handleClick(nbr)}>
                {/*Adding one for representational purposes*/}
                {nbr + 1}
              </button>
              </li>
            )
          })
        }
      </ul>
    </div>
  );}
}
