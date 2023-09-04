import {BrowserRouter ,  Routes , Route} from 'react-router-dom';
import Homepage from '../pages/finalHomePage.js';
import Login from '../pages/login.js';
import SignUp from '../pages/signUp.js';
import TodoListPage from '../pages/Todolist.js';
// import Login from '../pages/login.js';
let AppRouter = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Homepage/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/home' element={<TodoListPage/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}
export default AppRouter