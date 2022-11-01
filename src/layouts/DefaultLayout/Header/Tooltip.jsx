import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/_redux/features/user/userSlice';
import { Logout, refreshToken } from '@/api/userApi';
import { toast } from 'react-toastify';
import { resetTuitionData } from '@/_redux/features/tuition/tuitionSlice';

import styles from './Header.module.scss';
import logo from '@/assets/images/logo.png';

const cx = classNames.bind(styles);

function Tooltip({ headerRef }) {
    const history = useNavigate();

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            let res;
            res = await Logout();
            if (res.error === 'Token invalid') {
                refreshToken();
                res = await Logout();
            }
            dispatch(resetTuitionData());
            dispatch(logout());
            history('/login');
            toast.success('Logout successfully!');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={cx('tooltip')}>
            <div className={cx('info')}>
                <div className={cx('info__avatar')}>
                    <img src={logo} alt='' />
                </div>
                <div className={cx('info__item')}>
                    <span className={cx('info__item--name')}>
                        {user.fullname}
                    </span>
                    <span className={cx('info__item--phone')}>
                        {user.phone}
                    </span>
                </div>
            </div>

            <hr />

            {/* <Link to='/login'> */}
            <div className={cx('tooltip__item')} onClick={handleLogout}>
                <i className={cx('fa-regular', 'fa-right-from-bracket')}></i>
                <span>Log out</span>
            </div>
            {/* </Link> */}
        </div>
    );
}

export default Tooltip;
