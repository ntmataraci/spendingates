import { createSlice,current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface shoppingList {
  bank: number,
  shoppingCase:null|{
    name:string,
    qty:number,
    price:number
  }[]
}

const initialState: shoppingList = {
  bank: 100000000000,
  shoppingCase:[],
}

const calculateBank =(bank:number,payment:number) => {
    bank=100000000000+payment
    return bank
}

const allPayments = (arr:{name:string,qty:number,price:number}[]|null)=>{
    let totalize:number=0
    arr!.map(item=>
      totalize-=item.qty*item.price
        )
        console.log(totalize)
    return totalize
}

export const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    buyState: (state,action:PayloadAction<{brand:string,qty:number,type:"buy"|"sell",price:number}>)=>{
    const filter=current(state.shoppingCase)?.findIndex(item=>item.name===action.payload.brand)
    if (filter===undefined||filter<0){
        state.shoppingCase?.push({name:action.payload.brand,qty:action.payload.qty,price:action.payload.price})
    }else{
        if(action.payload.type==="buy"){
      state.shoppingCase![filter].qty+=action.payload.qty
      }
      else if((action.payload.type==="sell")){
        state.shoppingCase![filter].qty-=action.payload.qty}
        if(state.shoppingCase![filter].qty<1){
          const removeZeroQty=current(state.shoppingCase)?.filter(item=>item.qty>0)
          console.log(removeZeroQty?.length)
          if(removeZeroQty!==undefined){
          state.shoppingCase=[...removeZeroQty]
           }
         
        }
        console.log((state.shoppingCase))
      }  
   state.bank= calculateBank(state.bank,allPayments(state.shoppingCase))

    }
    }
  }

)

export const { buyState } = shoppingSlice.actions

export default shoppingSlice.reducer