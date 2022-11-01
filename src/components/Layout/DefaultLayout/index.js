import classNames from 'classnames/bind';
import style from './DefaultLayout.module.scss'
import Header from '~/components/Layout/DefaultLayout/Header';

const cx =classNames.bind(style)

function DefaultLayout({children}) {
    return ( 
        <div className={cx('wrapper')}>
            <div>
                <Header />
                    <div className="mainPage">
                        <div className="content">{children}</div>
                    </div>
            </div>
        </div>
     );
}

export default DefaultLayout;
