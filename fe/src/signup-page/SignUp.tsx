import { useState } from 'react';
import './SignUp.css';
import { Apis, Funcs, UI } from '../utils';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const navigation = useNavigate();

  const handleSignUp = async (event: any) => {
    if (event && event.preventDefault()) {
      event.preventDefaut();
    }
    //validate password and confirm password
    if (!(/[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password) &&
      password.length > 5)) {
      UI.toastWarning('Please enter a strong password')
      return;
    }
    if (password !== confirmPass) {
      UI.toastWarning("Password is not mark")
      return;
    }

    const dataRes = await Funcs.fun_post(Apis.API_HOST + Apis.API_TAILER.USER.ROOT, {
      'email': email,
      'displayName': displayName,
      'password': password,
    });
    if (!dataRes.success) {
      UI.toastError(dataRes.message);
      return;
    }
    UI.toastSuccess("Sign Up successfully!")
    navigation('/login');
  }

  return (
    <div className="container">
      <div className="center-element h100vh">
        <div className="signup-container">
          <h2 className='text-center text-muted'>Sign Up</h2>
          <form onSubmit={(e) => handleSignUp(e)} className="row g-3 needs-validation" noValidate>
            <div className="col-12">
              <label htmlFor="validationCustom03" className="form-label">
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
                Display Name
              </label>
              <input onChange={(e) => setDisplayName(e.target.value)}
                type="text"
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
              <label htmlFor="validationCustom03" className="form-label">
                Confirm password
              </label>
              <input onChange={(e) => setConfirmPass(e.target.value)}
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
                </label>&nbsp;<span><Link to={'/login'} >Login</Link></span>
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
  )
}
export default SignUpPage;