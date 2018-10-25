import React from 'react';
import '../css/Table.css';


export default class Table extends React.Component {

  render() {
    
    return (
      <div className='container'>
        <div className='tableScroll'>
          <table>
            <thead>
              <tr className='tableHeader'>
                <th>Name</th>
                <th>Description</th>
                <th><button onClick={this.props.sortList}>Forks</button></th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {

                this.props.list.map(function(repo, index) {
                return <tr key={index} className={index % 2 === 0 ? 'evenRow' : 'oddRow'}>
                  <td>{repo.name} </td>
                  <td>{repo.description} </td>
                  <td>{repo.forks}</td>
                  <td><a href={repo.html_url}>{repo.html_url}</a></td>
                </tr>
              })
              }
          </tbody>
          </table>
        </div>
      </div>
    );
  }
}
