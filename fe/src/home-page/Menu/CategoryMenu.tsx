import { useEffect, useState } from "react";
import "./CategoryMenu.css";
import { Apis, Funcs, UI } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterProduct, userClickCategory } from "../../app-reducers/FilterProductReducer";

const CategoryMenu = () => {
  const [cateMenu, setCateMenu] = useState<any[]>([]);
  const dispatch = useDispatch();
  const selectFilter = useSelector(selectFilterProduct);

  useEffect(() => {
    loadCateMenu();
  }, [])


  const loadCateMenu = async () => {
    const dataRes = await Funcs.fun_get(Apis.API_HOST + Apis.API_TAILER.CATEGORY.ROOT)
    if (!dataRes.success) {
      UI.toastError(dataRes.message);
      return;
    }
    setCateMenu(dataRes.result);
    console.log(dataRes.result);

  }

  return (
    <div className="cate-menu mb-5">
      {cateMenu.map((v, k) => {
        return (
          <span onClick={() => dispatch(userClickCategory({ categoryId: v.id }))} key={k} className={`menu-item ${(selectFilter.categoryId === v.id) ? "active" : ""}`}>{v.name}</span>
        )
      })}
    </div>
  )
}
export default CategoryMenu;