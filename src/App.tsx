import "./App.css";
import { shoppingItems } from "./data/shoppingItems";
import Receipts from "./components/Receipts";
import { useSelector } from "react-redux";
import ShoppingItem from "./components/ShoppingItem";
import { RootState } from "./store/store";
function App() {

const bankAcc=useSelector((state:RootState)=>state.shoppingSlice.bank)

  return (
    <div className="App">
      <h1>Gates spendin study</h1>
      <div>My Money is : {bankAcc} </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        {shoppingItems.map((item, idx) => (
         <ShoppingItem key={idx} item={item} />
        ))}
      </div>
      <Receipts />
    </div>
  );
}

export default App;
