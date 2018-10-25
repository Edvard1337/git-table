import React, {
  Component
} from 'react';
import './App.css';
import LoadingScreen from './screens/LoadingScreen.js';
import Table from './components/Table.js';
import PageNavigator from './components/PageNavigator.js';

const API_ROUTE = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100';
const reposPerPage = 10;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      repoList: [],
      isLoading: true,
      currentPage: 0,
      totalPages: [],
      reversed: false
    };

    this.sortList = this.sortList.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this.getList();
  }


  getList() {
    fetch(API_ROUTE)
      .then(response => response.json())
      .then(responseJson => this.setState({
        repoList: responseJson.items,
        isLoading: false
      }))
      .then(() => this.calcNumberOfPages())
      .catch(error => alert("Error!"))
  }

  handleClick = (nbr) => {
    this.setState({
      currentPage: nbr
    });
  }

  calcNumberOfPages() {
    const arrayOfPages = [];

    //Rounding up to always have room
    let nbrOfPages = Math.ceil(this.state.repoList.length / reposPerPage);

    for (let i = 0; i < nbrOfPages; i++) {
      arrayOfPages.push(i);
    }

    this.setState({
      totalPages: arrayOfPages
    })
  }

  splitList(nbr) {

    let startIndex = nbr * reposPerPage;
    let endIndex = startIndex + reposPerPage;

    this.setState({
      splitList: this.state.repoList.slice(startIndex, endIndex),
      isLoading: false
    })
  }

  sortList() {
    let reversed = this.state.reversed;
    this.setState({
      repoList: this.state.repoList.sort(function(a, b) {
        return (reversed ? (a.forks - b.forks) : (b.forks - a.forks))
      }),
      reversed: reversed ? false : true
    });
  }

  render() {
      const {
        isLoading,
        currentPage,
        totalPages,
      } = this.state;

    if(isLoading) {
      return <LoadingScreen/>
    }
    else {
      let startIndex = currentPage * reposPerPage;
      let endIndex = startIndex + reposPerPage;

      let splitList = this.state.repoList.slice(startIndex, endIndex);

      return (
        <div className="mainContainer">
          <div className="header">
            <h1>Git-repo tabell</h1>
            <h3>Side {currentPage + 1} av {totalPages.length}</h3>
          </div>
          <Table list={splitList} sortList={this.sortList}/>
          <PageNavigator pages={totalPages} currentPage={currentPage} handleClick={this.handleClick}/>
        </div>
      );
    }
  }
}

export default App;
