import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Box, TextField } from '@mui/material';

import styles from './Home.module.scss';
import Modal from '@/components/Modal';

const cx = classNames.bind(styles);

function Home() {
    const [paymentContainer, setPaymentContainer] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const naviga = useNavigate();

    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [openModal]);

    const handleOpenModal = () => {
        setOpenModal((prev) => !prev);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleClickFoundInfo = () => {
        setPaymentContainer((prev) => !prev);
    };

    const tuiton = 5999000;
    const balance = 10000000;

    const tuition_format = tuiton.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
    });

    const balace_format = balance.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
    });

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
                                    value={'Ton Duc'}
                                    label='First name'
                                    variant='standard'
                                    sx={{ flexGrow: 1, marginBottom: '12px' }}
                                    disabled
                                />

                                <TextField
                                    value={'Thang'}
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
                                    value={'0983362923'}
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
                                    value={'tonducthang@tdtu.edu.vn'}
                                    label='Email'
                                    variant='standard'
                                    sx={{ flexGrow: 1 }}
                                    disabled
                                />
                            </Box>
                        </div>
                    </div>

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
                                label='Student ID'
                                variant='outlined'
                                type={'search'}
                                sx={{ flexGrow: 1 }}
                            />
                        </Box>

                        <div className={cx('error')}>
                            <span>Error appear hear!</span>
                        </div>

                        <div className={cx('btn-search')}>
                            <button onClick={handleClickFoundInfo}>
                                Enter
                            </button>
                        </div>
                    </div>
                </div>

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
                                            value={'51900044'}
                                            label='Student ID'
                                            variant='standard'
                                            sx={{ flexGrow: 1 }}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                        <TextField
                                            value={'Ton Duc Thang'}
                                            label='Student name'
                                            variant='standard'
                                            sx={{ flexGrow: 1 }}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Box>
                                </div>
                                <div className={cx('form-control')}>
                                    <Box sx={{ display: 'flex' }}>
                                        <TextField
                                            value={tuiton}
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
                                    <span>{balace_format}</span>
                                </div>
                                <div className={cx('tuition__payment--item')}>
                                    <span>Semester Tuition:</span>
                                    <span>{tuition_format}</span>
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
                                    {tuition_format}
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
