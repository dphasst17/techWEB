import classNames from "classnames/bind";
import styles from './Header.module.scss';
import React from 'react';
const cx = classNames.bind(styles)
function Header() {
    return <div className={cx('header')}>
        <div className={cx('nav')}>
            <ul>
                <li>
                    <div className={cx('nav_text')}>
                        <a href="/"><div className={cx('text')}>Home</div></a>
                    </div>    
                </li>
                <li>
                    <div className={cx('nav_text')}>
                        <a href="/product"><div className={cx('text')}>Product</div></a>
                    </div>    
                </li>
                <li>
                    <div className={cx('nav_text')}>
                        <a href="/accessory"><div className={cx('text')}>Accessory</div></a>
                    </div>    
                </li>
                <li>
                    <div className={cx('nav_text')}>
                        <a href="/contact"><div className={cx('text')}>Contact</div></a>
                    </div>    
                </li>
            </ul>
        </div>
        <div className={cx('logo')}>
            <a href="/"><img src={require('./img/logo.jpeg')} alt=""></img></a>
        </div>
        <div className={cx('search')}>
            <input placeholder="    Search......" spellCheck="false"/>  
        </div>
    </div>;
}

export default Header;