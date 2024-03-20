import { DeleteOutlined, MinusSquareOutlined, PlusSquareOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Funcs, UI } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { selectCommon, updateQuantity } from "../../app-reducers/CommonReducer";
import { Checkbox, Divider, Modal, Space } from "antd";
import { useState } from "react";
import { LOCAL_STORAGE_KEYs } from "../../utils/Consts";



const Cart = () => {
  const selector = useSelector(selectCommon);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const dispatch = useDispatch();
  const [checkeds, setCheckeds] = useState<boolean[]>([]);

  // console.log(selector);
  const showModal = () => {
    setIsModalOpen(true);
  }

  const handeCancle = () => {
    setIsModalOpen(false);
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleIconPlus = (productId: any) => {
    //take item from localstorage
    const cart = Funcs.fun_getItemFromLocalStorage(LOCAL_STORAGE_KEYs.CART_ITEMS);
    //Check if no such cart
    if (!cart) {
      UI.toastWarning('noting');
      return;
    }
    const newCart = JSON.parse(cart);
    const findIndex = newCart.findIndex((value: any) => value.product.id === productId)
    if (findIndex === -1) {
      UI.toastWarning('not found item to remove')
      return;
    }
    newCart[findIndex].quantity += 1;
    Funcs.fun_saveProductToLocalStorage(newCart);
    dispatch(updateQuantity());
    if (checkeds[newCart[findIndex].product.id]) {
      setTotalPrice(totalPrice + newCart[findIndex].product.price);
    }


  }
  const handleIconMinus = (productId: any) => {
    //take item from localstorage
    const cart = Funcs.fun_getItemFromLocalStorage(LOCAL_STORAGE_KEYs.CART_ITEMS);
    //Check if no such cart
    if (!cart) {
      UI.toastWarning('noting');
      return;
    }
    const newCart = JSON.parse(cart);
    const findIndex = newCart.findIndex((value: any) => value.product.id === productId)
    if (findIndex === -1) {
      UI.toastWarning('not found item to remove')
      return;
    }
    if (newCart[findIndex].quantity === 1) {
      handleIconDelete(productId)
      return;
    }
    newCart[findIndex].quantity -= 1;
    Funcs.fun_saveProductToLocalStorage(newCart);
    dispatch(updateQuantity());
    if (checkeds[newCart[findIndex].product.id]) {
      setTotalPrice(totalPrice - newCart[findIndex].product.price);
    }


  }

  const handleIconDelete = (productId: any) => {
    // take item from localstorage
    const cart = Funcs.fun_getItemFromLocalStorage(LOCAL_STORAGE_KEYs.CART_ITEMS);
    //Check if no such cart
    if (!cart) {
      UI.toastWarning('nothing ');
      return;
    }
    const newCart = JSON.parse(cart);
    const findIndex = newCart.findIndex((value: any) => value.product.id === productId)
    if (findIndex === -1) {
      UI.toastWarning("not found item for deleting");
      return;
    }
    //If you want to remove element at position x, use:
    //someArray.splice(x, 1);
    console.log({ findIndex });

    const updateCart = newCart.filter((value: any) => value.product.id !== productId)
    Funcs.fun_saveProductToLocalStorage(updateCart);
    dispatch(updateQuantity())

    // update total price
    let total = totalPrice - newCart[findIndex].product.price * newCart[findIndex].quantity;
    if (total < 0) total = 0;
    setTotalPrice(total);

    setCheckedsWithId(newCart[findIndex].product.id, false);

  }

  const setCheckedsWithId = (productId: number, isChecked: boolean) => {
    const newCheckes = [...checkeds];
    newCheckes[productId] = isChecked;
    setCheckeds(newCheckes);
  }

  const handleCheckboxChecked = (isChecked: boolean, v: any) => {
    let total = 0;

    // doan nay la de su ly loi checked
    setCheckedsWithId(v.product.id, isChecked);

    if (isChecked) {
      total = totalPrice + (v.product.price * v.quantity);
    } else {
      total = totalPrice - (v.product.price * v.quantity);
    }
    setTotalPrice(total);
  }
  const renderCart = () => {
    //get items from localstorage
    const cartItem = Funcs.fun_getItemFromLocalStorage(LOCAL_STORAGE_KEYs.CART_ITEMS);
    //check cartitem 
    //if cartitem is null return cartitem is null
    if (!cartItem) {
      return <div>Gio hang rong!</div>
    }
    //convert cartitem into cart arrayobject
    const newCartItem = JSON.parse(cartItem);
    //do for
    console.log(newCartItem);

    return newCartItem.map((v: any, k: number) => {
      return (
        <div key={k}>

          <div className="space-between">
            <div>
              <Space>
                <Checkbox checked={checkeds[v.product.id]} onChange={(e) => handleCheckboxChecked(e.target.checked, v)}>
                </Checkbox>
                <img width={50} src={v.product.image} alt="image0" />
                {v.product.title}
                <span>${v.product.price}</span>
                Quantity:
                <span>
                  <PlusSquareOutlined onClick={() => handleIconPlus(v.product.id)} className="pointer" />
                  {v.quantity}
                  <MinusSquareOutlined onClick={() => handleIconMinus(v.product.id)} className="pointer" />
                </span>
              </Space>
            </div>
            <span onClick={() => handleIconDelete(v.product.id)} className="pointer"><DeleteOutlined /></span>
          </div>

          <Divider />
        </div>
      )
    })
  }

  return (
    <>
      <Modal title='Shoping Cart' visible={isModalOpen} onCancel={() => handeCancle()} onOk={() => handleOk()} >
        {renderCart()}
        <h4>Total: {totalPrice}</h4>
      </Modal>
      <div onClick={() => showModal()}><ShoppingCartOutlined /><span>{selector.totalQuantity}</span></div>
    </>
  )
}
export default Cart;