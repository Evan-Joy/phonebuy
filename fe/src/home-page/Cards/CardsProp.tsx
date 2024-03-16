import { PropsWithChildren, useEffect, useState } from "react";
import { Apis, Funcs, UI } from "../../utils";
import './Cards.css';

type cardProps = PropsWithChildren<{
  title: string;
  image: string;
  description: string;
  price: number;
}>
const CardCallApi = () => {
  const [product, setProduct] = useState<any[]>([]);
  useEffect(() => {
    loadProduct();
  }, [])
  const loadProduct = async () => {
    const dataRes = await Funcs.fun_get(Apis.API_HOST + Apis.API_TAILER.PRODUCT.ROOT);
    if (!dataRes.result) {
      UI.toastError(dataRes.message);
      return;
    }
    setProduct(dataRes.result);

  }

  return (
    <>
      <div className="container">
        <div className="row">
          {

            product.map((v, k) => {
              return <CardsProp key={k} title={v.title} image={v.image} description={v.description} price={v.price}>
              </CardsProp>

            })
          }
        </div>
      </div>
    </>
  )

}

const CardsProp = (props: cardProps) => {
  return (

    <div className="col-12 col-md-4 col-lg-3 mb-3 ">
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top card-image" src={props.image} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
            {props.description}
          </p>
          <p>{props.price}</p>
          <a href="#" className="btn btn-primary">
            Buy Now
          </a>
        </div>
      </div>
    </div>
  )

}
export default CardCallApi;