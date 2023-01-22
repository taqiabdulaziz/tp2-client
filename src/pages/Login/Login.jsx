import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from './Login.module.css';

import config from '../../../config.json';
import { useLogin } from './Login.hooks';
import useUserStore from '../../repository/user.store';

function Login() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const recaptchaRef = React.createRef();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [recaptchaValue, setRecaptchaValue] = useState();
  const loginMutation = useLogin();
  const { isAuthenticated, nextLoginAttempt } = useUserStore((state) => state);

  if (isAuthenticated()) {
    return <Navigate to="/home" replace />;
  }

  const onSubmit = () => {
    loginMutation.mutate({
      email, password,
    });
  };

  const handleUsernameChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  if (nextLoginAttempt) {
    loginMutation.reset();
  }

  return (
    <div className={styles.container}>
      <div>
        <div className="input-group mb-3" onSubmit={handleSubmit(onSubmit)}>
          <form>
            <div className={styles['form-group']}>
              {loginMutation.error && !nextLoginAttempt && (
                <div className="alert alert-danger" role="alert">
                  {loginMutation.error.message}
                </div>
              )}
              {nextLoginAttempt && (
                <div className="alert alert-danger" role="alert">
                  {`You can login at ${dayjs(nextLoginAttempt).add(30, 'seconds').format('HH:mm:ss')}`}
                </div>
              )}
              <input placeholder="Email" type="text" className={errors.email ? 'form-control is-invalid' : 'form-control'} id="validationServerUsername" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" {...register('email', { required: true })} onChange={handleUsernameChange} />
              <input placeholder="Password" type="text" className={errors.password ? 'form-control is-invalid' : 'form-control'} id="validationServerPassword" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" {...register('password', { required: true })} onChange={handlePasswordChange} />
              <ReCAPTCHA
                size="normal"
                sitekey={config.catpchaSiteKey}
                onChange={setRecaptchaValue}
                onExpired={recaptchaRef.current?.reset}
              />
              <button type="submit" className={recaptchaValue && !nextLoginAttempt ? 'btn btn-primary' : 'btn btn-primary disabled'}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
