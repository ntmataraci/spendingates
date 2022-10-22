import { useSelector } from "react-redux";
import { RootState } from "../store/store";
const Receipts = () => {

const allList=useSelector((state:RootState)=>state.shoppingSlice.shoppingCase)
const bankRemain=useSelector((state:RootState)=>state.shoppingSlice.bank)
const sortedList=allList?.slice()
const sorted2=sortedList?.sort((a,b)=>a.price-b.price)

    return(
<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
<h3>Your Receipt</h3>
{sorted2&&sorted2.map(item=>
    <>
<div style={{display:"flex",justifyContent:"space-between",minWidth:"350px",textAlign:"left"}}><div style={{width:"50%"}}>{item.name}</div><div style={{width:"10%"}}>x{item.qty}</div>
<div  style={{width:"40%",textAlign:"right"}}>

    $ {(item.price*item.qty)>1000000?Math.floor((item.price*item.qty)/1000000)+"m":(item.price*item.qty)>1000?Math.floor((item.price*item.qty)/1000)+"k":(item.price*item.qty).toLocaleString()}</div></div>
</>
)
}
<div style={{borderTop:"1px solid black",minWidth:"350px",display:"flex",justifyContent:"space-between"}}><div>Total Price :</div> <div style={{textAlign:"right"}}>$ {(100000000000-bankRemain).toLocaleString()}</div></div>
</div>

    )
}

export default Receipts