import Button from '../../atom/Button';
import Form from '../../atom/Form';
import Title from '../../atom/Title';
import Container from '../../atom/Container';
import { FormBox, BtnBox } from './styled';
import { useForm } from 'react-hook-form';
import Error from '../../atom/Error';
import axios from 'axios';
import ErrorModal from '../../atom/Modal';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

function Register() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm();
    const [display, setDisplay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const onValid = ({ code, password1, password2 }) => {
        if (password1 !== password2) {
            setError(
                'password1',
                {
                    message: 'π­ λμΌν ν¨μ€μλλ₯Ό μλ ₯ν΄μ£ΌμΈμ!',
                },
                {
                    shouldFocus: true,
                }
            );
            return;
        }
        setIsLoading(true);

        axios
            .post('/api/v1/account/registration/', {
                username: code,
                password1: password1,
                password2: password2,
            })
            .then(() => {
                alert('νμ κ°μμ΄ μλ£λμμ΅λλ€!');
                setIsLoading(false);
                navigate('/login');
            })
            .catch((err) => {
                if (err.response.data.username) {
                    setError('AlreadyExists', {
                        message: 'μ΄λ―Έ κ°μλ κ³μ μλλ€.',
                        type: 'custom',
                    });
                    setIsLoading(false);
                    setDisplay(true);
                    return;
                } else if (err.response.data.password1) {
                    setError('AlreadyExists', {
                        message: 'λ³΄μμ μ·¨μ½ν λΉλ°λ²νΈμλλ€.',
                        type: 'custom',
                    });
                    setIsLoading(false);
                    setDisplay(true);
                    return;
                }

                alert('μ μ μλ μ€λ₯κ° λ°μνμ΅λλ€. Q&Aμ λ¬Έμν΄μ£ΌμΈμ.');
            });
    };

    return (
        <Container>
            <Title text='SNU μμμλ¦¬μ½λ¦¬μ°κ΅¬μ€' />
            <FormBox onSubmit={handleSubmit(onValid)}>
                <Form
                    name='code'
                    placeholder='λ°κΈλ μ½λλ₯Ό μλ ₯ν΄μ£ΌμΈμ.'
                    type='text'
                    {...register('code', {
                        required: 'π­ λ°κΈλ μ½λλ₯Ό μλ ₯ν΄μ£ΌμΈμ!',
                    })}
                    error={errors.code}
                />
                {errors.code ? <Error>{errors.code.message}</Error> : null}

                <Form
                    placeholder='ν¨μ€μλ μλ ₯'
                    name='password1'
                    type='password'
                    {...register('password1', {
                        required: 'π­ λΉλ°λ²νΈλ₯Ό μλ ₯ν΄μ£ΌμΈμ!',
                        minLength: {
                            value: 8,
                            message: 'π­ λΉλ°λ²νΈλ₯Ό 8μ μ΄μ μλ ₯ν΄μ£ΌμΈμ!',
                        },
                    })}
                    error={errors.password1}
                />
                {errors.password1 && errors.code === undefined ? (
                    <Error>{errors.password1.message}</Error>
                ) : null}

                <Form
                    placeholder='ν¨μ€μλ νμΈ'
                    name='password2'
                    type='password'
                    {...register('password2', {
                        required: 'π­ λΉλ°λ²νΈλ₯Ό μλ ₯ν΄μ£ΌμΈμ!',
                    })}
                />

                {display ? (
                    <ErrorModal
                        open={display}
                        closeModal={() => {
                            setDisplay(false);
                            clearErrors();
                        }}
                        message={errors.AlreadyExists.message}
                    />
                ) : null}

                <BtnBox as='div'>
                    {isLoading ? (
                        <CircularProgress sx={{ marginBottom: 5 }} />
                    ) : (
                        <Button
                            text='κ°μνκΈ°'
                            openModal={
                                errors.AlreadyExists
                                    ? () => setDisplay(true)
                                    : null
                            }
                        />
                    )}
                    <Link style={{ textDecoration: 'none' }} to='/login'>
                        <Button text='μ΄λ―Έ κ³μ μ΄ μμΌμ κ°μ?' />
                    </Link>
                </BtnBox>
            </FormBox>
        </Container>
    );
}

export default Register;
