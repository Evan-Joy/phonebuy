import { Avatar, Button, Dropdown, Menu, MenuProps, Space } from "antd";
import { useDispatch } from "react-redux";
import { userTyping } from "../../app-reducers/FilterProductReducer";
import Cart from "./Cart";
import { Apis, Funcs, UI } from "../../utils";
import { LOCAL_STORAGE_KEYs } from "../../utils/Consts";
import { Link, useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const navigate = useNavigate();
  const getUserName = () => {
    const user = Funcs.fun_getItemFromLocalStorage(LOCAL_STORAGE_KEYs.USER_LOGIN);
    //check string
    //convert string to object
    if (!user) {
      return '';
    }
    const newUser = JSON.parse(user);
    return newUser.userName;

  }
  const getEmailAddress = () => {
    const user = Funcs.fun_getItemFromLocalStorage(LOCAL_STORAGE_KEYs.USER_LOGIN);
    //check string
    //convert string to object
    if (!user) {
      return user;
    }
    const newUser = JSON.parse(user);
    return newUser.email;
  }
  const handleLogout = async () => {
    const dataRes = await Funcs.fun_delete(Apis.API_HOST + Apis.API_TAILER.AUTH.ROOT);
    if (!dataRes.success) {
      UI.toastError(dataRes.message);
      return;
    }
    UI.toastSuccess('Logout successfully!')
    navigate('/login');
  }

  const menu = (
    <Menu>
      <Menu.Item key={1}>Email Address:{getEmailAddress()}</Menu.Item>
      <Menu.Item key={3}>
        <Button onClick={handleLogout} danger block ghost>Logout <LogoutOutlined /></Button>
      </Menu.Item>
    </Menu>
  )

  const renderAvatarOrButtonLogin = () => {
    const userName = getUserName();
    if (!userName) {
      return <Link className="btn btn-outline-success" to={'/login'}>Login</Link>
    }
    return (
      <div className="pointer">
        Hi! &nbsp;
        <Dropdown overlay={menu}>
          <Avatar>
            {userName}
          </Avatar >
        </Dropdown>
      </div>
    )
  }

  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">HOME</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <input onChange={(e) => dispatch(userTyping({ productName: e.target.value }))} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            </li>
          </ul>
          <form className="d-flex" role="search">
            <Space direction='horizontal' size={16}>
              <Cart />
              {renderAvatarOrButtonLogin()}
            </Space>
          </form>
        </div>
      </div>
    </nav>

  )
}
export default Header;