import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Apis, Funcs, UI } from "../utils";

const ActiveAccount = () => {
  const [useSearchPr] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = useSearchPr.get('token');
    console.log(token);
    if (!token) {
      UI.toastWarning("You cant access account")
      return;
    }
    activeAccount(token);

    funcA(5);
  }, [])

  const funcA = (a: number) => {
    console.log(a + 10);

  }
  const activeAccount = async (token: string) => {
    const dataRes = await Funcs.fun_post(Apis.API_HOST + Apis.API_TAILER.USER.ACTIVE_ACCOUNT + `/${token}`)
    if (!dataRes.success) {
      UI.toastWarning('You cant access account')
      navigate('/home');
      return;
    }
    UI.toastSuccess("Active successfully!")
    navigate('/login');
  }

  return (
    <div>
      Chao Viet
    </div>
  )

}
export default ActiveAccount;