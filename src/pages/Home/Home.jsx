import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import { Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getTuitionById } from '@/api/tuitionApi';

import styles from './Home.module.scss';
import Modal from '@/components/Modal';
import useEnterKeyListener from '@/hooks/useEnterKeyListener';

const cx = classNames.bind(styles);

function Home() {
    // Redux
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const naviga = useNavigate();

    const [tuitionId, setTuitionId] = useState('');
    const [loading, setLoading] = useState(false);
    const [userTuiTionByID, setUserTuiTionByID] = useState(null);
    const [paymentContainer, setPaymentContainer] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [openModal]);

    const handleOpenModal = () => {
        console.log('User balance: ', user.surplus);
        console.log('Tuition fee: ', userTuiTionByID.tuition_fee);
        console.log(user.surplus < userTuiTionByID.tuition_fee);
        if (user.surplus < userTuiTionByID.tuition_fee) {
            console.log('test');
            toast.error('Please check your balance!');
            return;
        } else {
            setOpenModal((prev) => !prev);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    useEnterKeyListener({
        querySelectorToExecuteClick: '#btn_search',
    });

    const handleClickFoundTuitionByID = async () => {
        if (!tuitionId) {
            toast.error('Please enter tuition ID!');
            return;
        }
        setLoading(true);
        const data = await getTuitionById(tuitionId);

        if (data) {
            setUserTuiTionByID(data);
            setPaymentContainer(true);
            setLoading(false);
        }

        if (data && data.error !== 0) {
            toast.error(data.error);
            setLoading(false);
            return;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <div className={cx('container__item', 'information')}>
                        <div className={cx('heading')}>
                            <span className={cx('title')}>
                                Account information
                            </span>
                            <div className={cx('status')}>
                                Status: <span>Tuition debt</span>
                            </div>
                        </div>

                        <div className={cx('form-control')}>
                            <Box
                                component='form'
                                sx={{
                                    display: 'flex',
                                }}
                            >
                                <TextField
                                    value={
                                        user.fullname
                                            .split(' ')
                                            .slice(0, -1)
                                            .join(' ') || ''
                                    }
                                    label='First name'
                                    variant='standard'
                                    sx={{ flexGrow: 1, marginBottom: '12px' }}
                                    disabled
                                />

                                <TextField
                                    value={user.fullname.split(' ').pop() || ''}
                                    label='Last name'
                                    variant='standard'
                                    sx={{ flexGrow: 1 }}
                                    disabled
                                />
                            </Box>

                            <Box
                                component='form'
                                sx={{
                                    display: 'flex',
                                }}
                            >
                                <TextField
                                    value={user.phone || ''}
                                    label='Phone number'
                                    variant='standard'
                                    sx={{ flexGrow: 1, marginBottom: '12px' }}
                                    disabled
                                />
                            </Box>

                            <Box
                                component='form'
                                sx={{
                                    display: 'flex',
                                }}
                            >
                                <TextField
                                    value={user.email || ''}
                                    label='Email'
                                    variant='standard'
                                    sx={{ flexGrow: 1 }}
                                    disabled
                                />
                            </Box>
                        </div>
                    </div>

                    {/* Get Student By ID */}
                    <div className={cx('container__item', 'tuition__id')}>
                        <div className={cx('title')}>Tuition student by ID</div>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 0 0 0',
                            }}
                            required
                        >
                            <TextField
                                value={tuitionId}
                                label='Student ID'
                                variant='outlined'
                                type={'search'}
                                sx={{ flexGrow: 1 }}
                                onChange={(e) =>
                                    setTuitionId(e.target.value.trim())
                                }
                            />
                        </Box>

                        <div className={cx('btn-search')}>
                            <button
                                id={'btn_search'}
                                onClick={handleClickFoundTuitionByID}
                            >
                                {loading && (
                                    <i
                                        className={cx(
                                            'fa-solid',
                                            'fa-spinner',
                                            'fa-spin-pulse',
                                            'fa-spin-reverse'
                                        )}
                                    ></i>
                                )}
                                Enter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Payment Container */}
                {paymentContainer && (
                    <div className={cx('tuition__container')}>
                        <div className={cx('title')}>Tuition/Payment</div>
                        <div className={cx('tuition')}>
                            <div className={cx('tuition__info')}>
                                <div className={cx('form-control')}>
                                    <Box
                                        component='form'
                                        sx={{
                                            display: 'flex',
                                            gap: 2,
                                        }}
                                    >
                                        <TextField
                                            value={
                                                userTuiTionByID.student_id || ''
                                            }
                                            label='Student ID'
                                            variant='standard'
                                            sx={{ flexGrow: 1 }}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                        <TextField
                                            value={
                                                userTuiTionByID.full_name || ''
                                            }
                                            label='Student name'
                                            variant='standard'
                                            sx={{ flexGrow: 1 }}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Box>
                                </div>

                                {/* Payment Container - Tuition */}
                                <div className={cx('form-control')}>
                                    <Box sx={{ display: 'flex' }}>
                                        <TextField
                                            value={
                                                userTuiTionByID.tuition_fee ||
                                                ''
                                            }
                                            label='Tuition'
                                            type={'number'}
                                            variant='standard'
                                            sx={{ flexGrow: 1 }}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Box>
                                </div>
                            </div>

                            <div className={cx('tuition__payment')}>
                                <div className={cx('tuition__payment--item')}>
                                    <span>Your balance:</span>
                                    <span>{user.surplus} VND</span>
                                </div>
                                <div className={cx('tuition__payment--item')}>
                                    <span>Semester Tuition:</span>
                                    <span>
                                        {userTuiTionByID.tuition_fee || 0} VND
                                    </span>
                                </div>

                                <div className={cx('tuition__payment--item')}>
                                    <span>Reduction:</span> 0
                                </div>

                                <hr />

                                <div
                                    className={cx(
                                        'tuition__payment--item',
                                        'total__tuition'
                                    )}
                                >
                                    <span>Total tuition unpaid:</span>
                                    {userTuiTionByID.tuition_fee || 0} VND
                                </div>
                            </div>
                        </div>

                        <div className={cx('btn__submit')}>
                            <button onClick={handleOpenModal}>Submit</button>
                        </div>

                        {openModal && (
                            <Modal
                                title={'Confirm payment'}
                                showModal={handleOpenModal}
                                setShowModal={handleCloseModal}
                            >
                                <div className={cx('modal')}>
                                    <p className={cx('modal__content')}>
                                        Make sure you have fully checked the
                                        payer information and the tuition fee
                                        information
                                        <span>
                                            . We will not be responsible for any
                                            omissions tuition.
                                        </span>
                                    </p>

                                    <div className={cx('modal__action')}>
                                        <button onClick={handleCloseModal}>
                                            Close
                                        </button>
                                        <button onClick={() => naviga('/otp')}>
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
