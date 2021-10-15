/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';

const Header = () => {
    return (
        <Fragment>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="">
                        <img src="/assets/images/alasco-logo.png" alt="" width="192" height="30" className="d-inline-block align-text-top" />
                    </a>
                </div>
            </nav>
        </Fragment>
    );
}

export default Header;