import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import { Login, refreshToken } from '@/api/userApi';
import { login } from '@/_redux/features/user/userSlice';

import styles from './SignIn.module.scss';
import logo from '@/assets/images/logo.png';
import tip_image from '@/assets/images/tip.png';
import login_img from '@/assets/images/login.png';
import useEnterKeyListener from '@/hooks/useEnterKeyListener';

const cx = classNames.bind(styles);

function SignIn() {
    useEffect(() => {
        document.title = 'Login';
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEnterKeyListener({
        querySelectorToExecuteClick: '#submitLoginBtn',
    });

    const handleSubmit = async () => {
        if (!username) {
            toast.error('Please enter username!');
            userInputRef.current.focus();
            return;
        }

        if (!password) {
            toast.error('Please enter password!');
            passwordInputRef.current.focus();
            return;
        }

        try {
            setLoading(true);
            let res;
            res = await Login(username, password);

            if (res.error === 'Token invalid') {
                refreshToken();
                res = await Login(username, password);
                setLoading(false);
            }

            if (res.error) {
                toast.error('Invalid username or password!');
                setLoading(false);
                return;
            }

            dispatch(login(res.data));
            setLoading(false);
            navigate('/');
            toast.success('Login successfully!');
        } catch (error) {
            refreshToken();
            await Login(username, password);
            setLoading(false);
            console.log('Test loading: ', loading);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('image')}>
                    <div className={cx('image__action')}>
                        <img src={login_img} alt='login' />
                    </div>
                    <div className={cx('logo')}>
                        <img src={logo} alt='' />
                    </div>
                </div>
                <div className={cx('form')}>
                    <div className={cx('form__container')}>
                        <h3 className={cx('form__title')}>Sign in</h3>
                        <div className={cx('logo')}>
                            <div>
                                <img src={logo} alt='' />
                            </div>
                        </div>

                        <input
                            type={'text'}
                            value={username}
                            ref={userInputRef}
                            placeholder={'Email'}
                            className={cx('form-control')}
                            onChange={(e) => setUsername(e.target.value.trim())}
                        />

                        <input
                            value={password}
                            type={'password'}
                            ref={passwordInputRef}
                            placeholder={'Password'}
                            className={cx('form-control')}
                            onChange={(e) => setPassword(e.target.value.trim())}
                        />

                        <button
                            id={'submitLoginBtn'}
                            onClick={handleSubmit}
                            className={cx('form-control', 'form-btn')}
                            disabled={loading}
                        >
                            {loading && (
                                <i
                                    className={cx(
                                        'fa-solid',
                                        'fa-circle-notch',
                                        'fa-spin'
                                    )}
                                ></i>
                            )}
                            Sign in
                        </button>

                        <div className={cx('footer')}>
                            <div className={cx('tip')}>
                                <img src={tip_image} alt='' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
