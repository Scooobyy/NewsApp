import React, { Component } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { keyword: '' };
  }

  handleChange = (e) => {
    this.setState({ keyword: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.keyword);
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">DailyIndianTimes</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 nav-ul"> {/* Center the nav items */}
              <li className="nav-item">
                <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/General" className="nav-link" activeClassName="active">General</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/Business" className="nav-link" activeClassName="active">Business</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/Health" className="nav-link" activeClassName="active">Health</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
              </li>
            </ul>

            {/* Optional search */}
            <form className="d-flex" role="search" onSubmit={this.handleSubmit}>
              <input className="form-control me-2" type="search" placeholder="Search" value={this.state.keyword} onChange={this.handleChange} />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}
