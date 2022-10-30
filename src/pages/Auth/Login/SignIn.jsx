import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '@/_redux/features/user/userSlice';

import styles from './SignIn.module.scss';
import { Login } from '@/api/userApi';
import useEnterKeyListener from '@/hooks/useEnterKeyListener';

import login_img from '@/assets/images/login.png';
import logo from '@/assets/images/logo.png';
import tip_image from '@/assets/images/tip.png';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SignIn() {
    // useEffect(() => {
    //     document.title = 'Login';
    // });

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const userInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEnterKeyListener({
        querySelectorToExecuteClick: '#submitLoginBtn',
    });

    const handleSubmit = async () => {
        if (!username) {
            toast.error('Invalid username!');
            userInputRef.current.focus();
            return;
        }

        if (!password) {
            toast.error('Invalid password!');
            passwordInputRef.current.focus();
            return;
        }

        try {
            const res = await Login(username, password);
            // console.log('Data: ', res.data.data);

            if (res.status !== 200) {
                toast.error(res.error);
                // console.log('Error: ', data.error);
                return;
            }

            dispatch(login(res.data.data));
            navigate('/');
            toast.success('Login successfully!');
        } catch (error) {
            toast.error(error.message);
        }

        // console.log('Check>>: ', data.status);

        // if (data && data.status !== 200) {
        //     toast.error('Invalid username or password!');
        //     return;
        // }

        // navigate('/');
        // toast.success('Login successfully!');
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
                            ref={userInputRef}
                            value={username}
                            // name={'username'}
                            className={cx('form-control')}
                            type={'text'}
                            placeholder={'Email'}
                            onChange={(e) => setUsername(e.target.value.trim())}
                        />

                        <input
                            ref={passwordInputRef}
                            value={password}
                            className={cx('form-control')}
                            type={'password'}
                            placeholder={'Password'}
                            // name={'password'}
                            onChange={(e) => setPassword(e.target.value.trim())}
                        />

                        <button
                            id={'submitLoginBtn'}
                            className={cx('form-control', 'form-btn')}
                            onClick={handleSubmit}
                            // disabled={username === '' || password === ''}
                        >
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
