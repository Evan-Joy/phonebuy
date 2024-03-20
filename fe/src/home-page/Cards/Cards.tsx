import { useEffect, useState } from 'react';
import './Cards.css';
import { Apis, Funcs, UI } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterProduct } from '../../app-reducers/FilterProductReducer';
import { LOCAL_STORAGE_KEYs } from '../../utils/Consts';
import { updateQuantity } from '../../app-reducers/CommonReducer';

const Cards = () => {
  const [product, setProduct] = useState<any[]>([]);
  const selectFilter = useSelector(selectFilterProduct);
  const dispatch = useDispatch();

  console.log(selectFilter);


  useEffect(() => {
    loadProduct();
  }, [selectFilter])//[selectFilter]

  const loadProduct = async () => {
    const dataRes = await Funcs.fun_get(Apis.API_HOST + Apis.API_TAILER.PRODUCT.ROOT + `?categoryId=${selectFilter.categoryId}&name=${selectFilter.productName}`);//?categoryId = 3&name=5S
    if (!dataRes.success) {
      UI.toastError(dataRes.message);
      return;
    }
    setProduct(dataRes.result);
    console.log(dataRes.result);

  }
  //log product when clicked
  //save to localstorage

  //check array is null
  //if null push object to array
  // if not null check object is already exists
  //if object is already exist plus quantity.
  const handleBtnClick = (v: any) => {
    // console.log(v);
    //get cart from local
    const cart = Funcs.fun_getItemFromLocalStorage(LOCAL_STORAGE_KEYs.CART_ITEMS);
    //if cart is string
    if (cart) {
      //convert string into array object
      const cartArray = JSON.parse(cart);
      console.log(cartArray);
      //find object in array object
      const findIndex = cartArray.findIndex((value: any) => value.product.id === v.id)
      //if not found object in array object
      if (findIndex === -1) {
        //push object into array object
        cartArray.push({
          product: v,
          quantity: 1,
        })

      } //if found increase quantity 1
      else {
        cartArray[findIndex].quantity += 1;
      }


      Funcs.fun_saveProductToLocalStorage(cartArray)

    }//if cart is null
    else {
      Funcs.fun_saveProductToLocalStorage([{
        product: v,
        quantity: 1
      }])

    }
    dispatch(updateQuantity())


    // Funcs.fun_saveProductToLocalStorage([{
    //   product: v,
    //   quantity: 1
    // }]);

  }
  return (
    <div className="container">
      <div className="row">
        {
          product.map((v, k) => {
            return (
              <div key={k} className="col-12 col-md-4 col-lg-3 mt-3">
                <div className="card">
                  <img className="card-img-top card-image" src={v.image} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">{v.title}</h5>
                    <p className="card-text card-description">
                      {v.description}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Suscipit necessitatibus aliquam ipsam commodi sapiente dolor possimus neque tempore eos! Dicta, doloremque.
                      Ab amet vitae doloremque consequatur commodi culpa dolores ullam.
                    </p>
                    <p>${v.price}</p>
                    <a onClick={() => handleBtnClick(v)} href="#" className="btn btn-primary btn-buy">
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default Cards;