import { ShoppingCartOutlined } from "@ant-design/icons";
import { Funcs } from "../../utils";

const Cart = () => {
  return (
    <>
      <ShoppingCartOutlined /><span>{Funcs.count_QuantityProduct()}</span>
    </>
  )
}
export default Cart;