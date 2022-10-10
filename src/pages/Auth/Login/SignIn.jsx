import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';

import login from '@/assets/images/login.jpg';

const cx = classNames.bind(styles);

function SignIn() {
    useEffect(() => {
        document.title = 'Login';
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('image')}>
                    <img
                        className={cx('image__action')}
                        src={login}
                        alt='login'
                    />
                </div>
                <div className={cx('form')}>
                    <div className={cx('form__container')}>
                        <h3 className={cx('form__title')}>Sign in</h3>
                        <input
                            className={cx('form-control')}
                            type='text'
                            placeholder='Email'
                        />

                        <input
                            className={cx('form-control')}
                            type='password'
                            placeholder='Password'
                        />

                        <button className={cx('form-control', 'form-btn')}>
                            Sign in
                        </button>

                        {/* <div className={cx('hr')}>
                            <div className={cx('hr-custom')}>
                                <span className={cx('hr-custom__title')}>
                                    Or sign in with
                                </span>
                            </div>
                        </div>

                        <div className={cx('form__footer')}>
                            <div className={cx('form__footer-container')}>
                                <img
                                    className={cx(
                                        'form__footer-icon',
                                        'facebook'
                                    )}
                                    src={facebookIcon}
                                    alt='facebook'
                                />
                                <img
                                    className={cx(
                                        'form__footer-icon',
                                        'google'
                                    )}
                                    src={googleIcon}
                                    alt='google'
                                />
                            </div>
                        </div>

                        <div className={cx('register')}>
                            <span>
                                New to PlayerDual?
                                <Link
                                    className={cx('resgister__direct')}
                                    to='/register'
                                >
                                    Create an account.
                                </Link>
                            </span>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
