import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import logo from '@/assets/images/logo.png';

const cx = classNames.bind(styles);

function Tooltip({ headerRef }) {
    const history = useNavigate();
    return (
        <div className={cx('tooltip')}>
            <div className={cx('info')}>
                <div className={cx('info__avatar')}>
                    <img src={logo} alt='' />
                </div>
                <div className={cx('info__item')}>
                    <span className={cx('info__item--name')}>
                        Ton Duc Thang
                    </span>
                    <span className={cx('info__item--phone')}>0911710056</span>
                </div>
            </div>

            <Link to='/' onClick={headerRef.current._tippy.hide()}>
                <div className={cx('tooltip__item')}>
                    <i className={cx('fa-duotone', 'fa-credit-card')}></i>
                    <span>Tuition/Payment</span>
                </div>
            </Link>

            <hr />

            {/* <Link to='/login'> */}
            <div
                className={cx('tooltip__item')}
                onClick={() => {
                    history('/login');
                }}
            >
                <i className={cx('fa-regular', 'fa-right-from-bracket')}></i>
                <span>Log out</span>
            </div>
            {/* </Link> */}
        </div>
    );
}

export default Tooltip;
