
import './App.css';
import Nav from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Private from './components/Private';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/Products';
import UpdateProduct from './components/Update';
import Err404 from './components/Err404';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav></Nav>
      <Routes>

        <Route element = {<Private></Private>}>


        <Route path='/' element={<ProductList></ProductList>}></Route>
        <Route path='*' element={<Err404></Err404>}></Route>
        <Route path='/add' element={<AddProduct></AddProduct>}></Route>
        <Route path='/update/:id' element={<UpdateProduct></UpdateProduct>}></Route>
        <Route path='/profile' element=""></Route>
        </Route>
        <Route path='/login' element={<Login></Login>}></Route>

        <Route path='/signup' element={<SignUp></SignUp>}></Route>
      </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
