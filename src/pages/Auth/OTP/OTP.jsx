import classNames from 'classnames/bind';
import { useState } from 'react';
import OtpInput from 'react-otp-input';

import styles from './OTP.module.scss';

const cx = classNames.bind(styles);

const style = {
    separaStyle: {
        color: 'rgba(22,24,35,0.2)',
    },

    inputStyle: {
        width: '100%',
        height: '40px',
        fontSize: '20px',
        border: '1px solid rgba(22,24,35,0.2)',
        borderRadius: '5px',
        color: 'black',
    },
};

console.log(style.inputStyle);

function OTP() {
    const [opt, setOtp] = useState('');

    const handleChangeOtp = (otp) => {
        setOtp(otp);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <div className={cx('header__title')}>
                        Email verification
                    </div>
                    <p className={cx('header__des')}>
                        We have sent a verification code to your email &nbsp;
                        <span>jungjung.now@gmail.com</span>.
                    </p>
                </div>

                <div className={cx('otp__form')}>
                    <OtpInput
                        inputStyle={style.inputStyle}
                        value={opt}
                        onChange={handleChangeOtp}
                        numInputs={6}
                        separator={<span>&nbsp; &nbsp;</span>}
                        hasErrored
                        shouldAutoFocus
                        isInputNum
                    />
                </div>

                <div className={cx('btn__confirm')}>
                    <button>Confirm</button>
                </div>

                <div className={cx('footer')}>
                    <div className={cx('footer__item')}>
                        <div className={cx('footer__item--des')}>
                            Don't receive code?
                        </div>

                        <button>Resend</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OTP;
