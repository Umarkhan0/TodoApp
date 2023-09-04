import '../App.css';
import {NavLink} from 'react-router-dom'
// import {NavLink} from './login'

const IndePage = () =>{
    return(
        <div className='index-container'>
            <div className="gidess">
        <p className='heading'>To DO List</p>
        <p className='text'>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit amet et soluta maxime culpa quidem incidunt, esse magni autem ratione fuga eaque nemo, aperiam dolor. Sed officiis hic error magni.
        </p>
        {/* <NavLink to={'/'}>home</NavLink> */}
       <NavLink to={'./login'}><button className='btn-try'>Try now</button></NavLink>
        </div>
       
        
        </div>
    )
}
export default IndePage