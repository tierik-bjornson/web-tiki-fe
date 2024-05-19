import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import tiki_logo from '../../assets/image/Tiki-logo.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.css';

function Header() {
    return (
        <header className="header bg-white">
            <div className="container-fluid d-flex align-items-center justify-content-between" style={{ height: '96px' }}>
                <div className="d-flex align-items-center">
                    <img src={tiki_logo} alt="Tiki logo" className="header-logo me-3" />
                </div>
                <div className="header-center d-flex align-items-center flex-grow-1">
                    <div className="header-search input-group search-container">
                        <span className="input-group-text bg-white border-end-0 rounder-start">
                            <i className="bi bi-search"></i>
                        </span>
                        <input type="text" className="form-control border-start-0 header-search" placeholder="Freeship đến 30k" />
                        <button className="btn btn-outline-secondary search-button rounded-end">Tìm kiếm</button>
                    </div>
                </div>
                <div className="header-right d-flex align-items-center">
                    <button className="btn btn-link">
                    <i className="bi bi-house-door-fill"></i> Trang chủ
                    </button>
                    <button className="btn btn-link">
                    <i className="bi bi-emoji-wink"></i> Tài khoản
                    </button>
                    <div className="vr mx-2"></div>
                    <button className="btn btn-link">
                    <i className="bi bi-cart"></i>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
 