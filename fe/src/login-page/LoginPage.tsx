import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import loadjs from 'loadjs';
import { Apis, Funcs, UI } from '../utils';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigate();
  useEffect(() => {
    loadjs('/assets/js/custom.js', () => {
      console.log("load customjs successfully");

    })
  }, [])
  const handleLogin = async (event: any) => {
    if (event && event.preventDefault()) {
      event.preventDefaut();
    }

    //validate password
    if (password.length <= 5) {
      UI.toastWarning('Password must have at least 5 characters')
      return;
    }
    const dataRes = await Funcs.fun_post(Apis.API_HOST + Apis.API_TAILER.AUTH.ROOT, {
      "email": email,
      "password": password,
    });
    if (!dataRes.success) {
      UI.toastError(dataRes.message);
      return;
    }
    UI.toastSuccess("Login successfully!")
    console.log(dataRes.result);

    //save user login into localstorage
    Funcs.fun_saveUserLogin(dataRes.result.user);
    // console.log(dataRes.result);

    //navigate to home page.
    navigation('/home');


  }

  return (
    <div className="container">
      <div className="center-element h100vh">
        <div className="login-container">
          <h2 className='text-center text-muted'>Login</h2>
          <form onSubmit={(event) => handleLogin(event)} className="row g-3 needs-validation" noValidate>
            <div className="col-12">
              <label htmlFor="validationCustom02" className="form-label">
                Email
              </label>
              <input onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="validationCustom03"
                required={true}
              />
              <div className="invalid-feedback">Please provide a valid email</div>
            </div>

            <div className="col-12">
              <label htmlFor="validationCustom03" className="form-label">
                Password
              </label>
              <input onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="validationCustom03"
                required={true}
              />
              <div className="invalid-feedback">Please provide a valid city.</div>
            </div>

            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id="invalidCheck"
                  required={true}
                />
                <label className="form-check-label" htmlFor="invalidCheck">
                  Agree to terms and conditions
                </label>&nbsp;<span><Link to={'/signup'}>Sign Up</Link></span>
                <div className="invalid-feedback">You must agree before submitting.</div>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Submit form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;