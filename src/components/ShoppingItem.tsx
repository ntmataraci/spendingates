import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { useState } from "react";
import {buyState} from "../store/slice"
const ShoppingItem = ({item}:any) => {
    const dispatch=useDispatch()
    const [qtyHandler,setQtyHandler]=useState(0)
    const [canSell,setCanCell]=useState(false)
    const [canBuy,setCanBuy]=useState(true)
    const shoppingList=useSelector((state:RootState)=>state.shoppingSlice.shoppingCase)
    const bankRemain=useSelector((state:RootState)=>state.shoppingSlice.bank)


    const changeInput = (e:any) => {
      setQtyHandler(+e.target.value)
      if (e.target.value*item.price>bankRemain){
        setCanBuy(false)
      }else{
        setCanBuy(true)
      }
}

const qtyFinder = () => {
  const filter=shoppingList?.filter(finder=>finder.name===item.brand)[0]
  if(filter?.qty===0){
   setCanCell(false)
  }else{
  setCanCell(true)
}
}

    return(
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid",
          width: "150px",
        }}
      >
        <h3>{item.brand}</h3>
        <p>{item.price} $</p>
        <div style={{ display: "flex" }}>
          <button onClick={()=>{dispatch(buyState({brand:item.brand,qty:qtyHandler,type:"sell",price:item.price}));setQtyHandler(0);qtyFinder()}} disabled={!canSell}>Sell</button>
          <div style={{ width: "50px" }}>
            <input type="number"  onChange={changeInput} value={qtyHandler} />
            </div>
          <button onClick={()=>{dispatch(buyState({brand:item.brand,qty:qtyHandler,type:"buy",price:item.price}));setQtyHandler(0);qtyFinder()}} disabled={!canBuy}>Buy</button>
        </div>
      </div>
    )
}

export default ShoppingItem