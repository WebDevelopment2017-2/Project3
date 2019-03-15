import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNavBar">
    <div className="container">
      <Link className="navbar-brand" id="oi" to='/projects'>Diccionario de la lengua indígena</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
              aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarResponsive">
        <div className="text-grey navBartext" style={{marginTop: '5px'}}>
          <AccountsUIWrapper id="hol"/>
        </div>
        <ul className="navbar-nav ml-auto">
          {/*<li className="nav-item">*/}
            {/*<Link className="navBartext " id="projectLink" to='/projects'>Proyectos</Link>*/}
          {/*</li>*/}
          {/*<li className="nav-item">*/}
            {/*<Link className="navBartext" id="optLink" to='/ideas'>Oportunidades</Link>*/}
          {/*</li>*/}
          <li className="nav-item">
            <Link className="navBartext" id="createLink" to='/projects/create'>Agregar palabra</Link>
          </li>
          <li className="nav-item">
            <Link className="navBartext" to='/ideas/create'>Buscar palabra</Link>
          </li>
          {/*<li className="nav-item" style={{textAlign:'left'}}>*/}
          {/*<div id="loginWrapper" className="pull-left">*/}
          {/*/!*<AccountsUIWrapper className="dropdown-menu-left !important" style={{position: 'static'}}/>*!/*/}
          {/*</div>*/}
          {/*</li>*/}
        </ul>
      </div>
    </div>
  </nav>
);

export default NavBar;