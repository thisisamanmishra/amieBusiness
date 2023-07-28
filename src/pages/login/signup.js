import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpAction } from '../../redux/actions/restaurantAction';
import Loader from '../../components/Loader';
import Meta from '../../utils/Meta';
import './login.scss';
const SignUp = () => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fssaiNo, setFssaiNo] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [panId, setPanId] = useState('');
    const [mobile, setMobile] = useState('');
    const dispatch = useDispatch();
    const { isAuthenticated, isLoading } = useSelector((state) => state.restaurantState);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [dispatch, isAuthenticated, navigate])

    const signupHandler = () => {
        dispatch(signUpAction({ name, email, password, fssaiNo, bankAccount,panId, mobile }));

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFssaiNo('');
        setBankAccount('');
        setMobile('');
        setPanId('');
        
    }

    return (
        <Fragment>
            <Meta title="Sign Up" />
            <Fragment>
                {isLoading ? <Loader /> : (
                    
                    <div className="main">
                      <p className="sign" align="center">Register</p>
                          <form className="form1">
                           <input className="un" type="text" align="center" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input className="pass" align="center" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type={isPasswordHidden ? "password" : "text"} />
                                 <button className="submit" align="center" onClick={signupHandler}>Sign in</button>
                               <p class="forgot" align="center"><a href="/">Forgot Password?</a></p>
                          </form> 
                          </div>
                )}
            </Fragment>
        </Fragment>
    )
}
export default SignUp;

{/* <div className="mx-auto px-4 md:px-10 lg:px-20 xl:px-48 mt-4">
                        <h2 className="text-center text-4xl font-semibold text-gray-800">Create New Account</h2>
                        <div className="flex flex-col items-center mt-12">
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your Name" required className=" bg-stone-50 w-full sm:w-2/4 md:w-2/3 lg:w-1/3  p-3 border border-solid border-slate-900 focus:outline-none rounded" />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" required className=" bg-stone-50 w-full sm:w-2/4 md:w-2/3 lg:w-1/3  p-3 border border-solid border-slate-900 focus:outline-none rounded mt-6" />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required className="focus:outline-nonebg-stone-50 w-full sm:w-2/4 md:w-2/3 lg:w-1/3  p-3 border border-solid border-slate-900 rounded mt-6 flex justify-between" />
                            <div className="bg-stone-50 w-full sm:w-2/4 md:w-2/3 lg:w-1/3  p-3 border border-solid border-slate-900 rounded mt-6 flex justify-between">
                                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={isPasswordHidden ? "password" : "text"} placeholder="Confirm password" required className="focus:outline-none w-3/4 bg-transparent" />
                                <VisibilityIcon className={`cursor-pointer ${isPasswordHidden ? "text-orange-400" : "text-orange-800"}`} onClick={() => setIsPasswordHidden(!isPasswordHidden)} />
                            </div>                            <input value={fssaiNo} onChange={(e) => setFssaiNo(e.target.value)} type="number" placeholder="Fssai Number" required className=" bg-stone-50 w-full sm:w-2/4 md:w-2/3 lg:w-1/3  p-3 border border-solid border-slate-900 focus:outline-none rounded mt-6" />
                            <input value={panId} onChange={(e) => setPanId(e.target.value)} type="string" placeholder="Pan Card" required className=" bg-stone-50 w-full sm:w-2/4 md:w-2/3 lg:w-1/3  p-3 border border-solid border-slate-900 focus:outline-none rounded mt-6" />
                            <input value={mobile} onChange={(e) => setMobile(e.target.value)} type="number" placeholder="Mobile Number" required className=" bg-stone-50 w-full sm:w-2/4 md:w-2/3 lg:w-1/3  p-3 border border-solid border-slate-900 focus:outline-none rounded mt-6" />
                            <input value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} type="number" placeholder="Enter Bank Account Number" required className="focus:outline-nonebg-stone-50 w-full sm:w-2/4 md:w-2/3 lg:w-1/3  p-3 border border-solid border-slate-900 rounded mt-6 flex justify-between" />

                            

                            <p className="mt-5 w-full sm:w-2/4 md:w-2/3 lg:w-1/3 text-center">By signing up, I agree to the Amie <button className="text-blue-500">Terms and Conditions </button> and <button className="text-blue-500">Privacy Statement</button>.</p>
                            <button onClick={signupHandler} type="button" className=" mt-12 p-3 w-2/3 sm:w-2/4 md:w-1/3 lg:w-1/5 text-white rounded-3xl hover:bg-blue-900 bg-blue-700 disabled:bg-blue-500">Sign Up</button>
                            <p className="mt-4">Already have an account? <Link to="/signin" className="text-blue-700" >Sign in</Link></p>
                        </div>
                    </div> */}