import { useEffect, useState } from 'react';
import './Cards.css';
import { Apis, Funcs, UI } from '../../utils';

const Cards = () => {
  const [product, setProduct] = useState<any[]>([]);

  useEffect(() => {
    loadProduct();
  }, [])

  const loadProduct = async () => {
    const dataRes = await Funcs.fun_get(Apis.API_HOST + Apis.API_TAILER.PRODUCT.ROOT);
    if (!dataRes.success) {
      UI.toastError(dataRes.message);
      return;
    }
    setProduct(dataRes.result);
    console.log(dataRes.result);

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
                    <a href="#" className="btn btn-primary btn-buy">
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