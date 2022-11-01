import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { sendOTP, verifyOTP, getNewSurplus } from '@/api/tuitionApi';
import { updateSurplus } from '@/_redux/features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';

import { refreshToken } from '@/api/userApi';

import styles from './OTP.module.scss';
import { toast } from 'react-toastify';
import useEnterKeyListener from '@/hooks/useEnterKeyListener';

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

function OTP() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [opt, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const user = useSelector((state) => state.user.user);
    const studentID = useSelector(
        (state) => state.tuition.tuition_data.student_id
    );

    const handleChangeOtp = (otp) => {
        setOtp(otp);
    };

    useEnterKeyListener({
        querySelectorToExecuteClick: '#btn_veryfy_otp',
    });

    const handleConfirmOPT = async () => {
        if (opt.length !== 6) {
            toast.error('OTP must be 6 digits');
            return;
        }

        try {
            let res;
            setLoading(true);
            res = await verifyOTP(user.id, opt);

            console.log(res);

            if (res.error === 'Token invalid') {
                refreshToken();
                res = await verifyOTP(user.id, opt);
            }

            if (res.error) {
                toast.error('Invalid OTP. Please try again!');
                setLoading(false);
                return;
            }
            let updateBalanceUser;
            updateBalanceUser = await getNewSurplus(user.id);
            console.log('New balance:', updateBalanceUser.data.surplus);
            // if (updateBalanceUser.error === 'Token invalid') {
            //     refreshToken();
            //     updateBalanceUser = await getNewSurplus(user.id);
            // }
            dispatch(updateSurplus(updateBalanceUser.data.surplus));
            navigate('/');
            toast.success('Tuition payment successfully!');
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        let res;
        res = await sendOTP(user.id, studentID);

        if (res.error === 'Token invalid') {
            refreshToken();
            res = await sendOTP(user.id, studentID);
        }

        toast.success('OTP re-sent successfully!');
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
                        <span>{user.email}</span>.
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
                    <button
                        id={'btn_veryfy_otp'}
                        onClick={handleConfirmOPT}
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
                        Confirm
                    </button>
                </div>

                <div className={cx('footer')}>
                    <div className={cx('footer__item')}>
                        <div className={cx('footer__item--des')}>
                            Don't receive code?
                        </div>

                        <button onClick={handleResendOTP}>Resend</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OTP;
