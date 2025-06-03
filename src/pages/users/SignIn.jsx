import { Link, useLocation, useNavigate } from "react-router";
import welcomeImg from '../../assets/welcome.svg'
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Spinner from "../../components/ui/Spinner";

const SignIn = () => {
    const { user, loginUser, googleSignIn, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || '/';

    //handle error
    const [error, setError] = useState('');
    const errorMessages = {
        "auth/invalid-credential": "Invalid email or password.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password. Try again.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/missing-password": "Please enter your password.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
        "auth/network-request-failed": "Network error. Check your internet connection.",
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    };

    //if already logged in then return to previous page.
    useEffect(() => {
        if (user) {
            navigate(location.state ? location.state : '/');
        }
    }, [user, navigate, location.state]);

    if (user) {
        // Only redirect if not in error state
        if (!error) {
            return <Spinner />;
        }
    }


    const handleSignin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        //signin user
        loginUser(email, password)
            .then(userCredential => {
                const currentUser = userCredential.user;
                const userInfo = {
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                }
                setUser(userInfo)
                setError('');
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Sign In Success!",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate(from)

            })
            .catch(error => {
                const message = errorMessages[error.code] || "An unexpected error occurred.";
                setError(message);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${message}`,
                });
            })

    }

    //google signin
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(userCredential => {
                const currentUser = userCredential.user;
                const userInfo = {
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                };
                setUser(userInfo);
                navigate(`${location.state ? location.state : '/'}`);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Sign In Success!",
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .catch(error => {
                const message = error.message;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: message || 'Something went wrong!',
                });
            });
    };

    return (
        <div className="min-h-[calc(100vh-149px)] max-w-5xl mx-auto flex flex-col lg:flex-row">
            {/* Left Column Image */}
            <div className="flex-1 flex items-center justify-center p-8">
                <img
                    src={welcomeImg}
                    alt="Animation"
                    className="max-w-full md:w-1/2 lg:w-full object-contain"
                />
            </div>

            {/* Right Column (Form) */}
            <div className="flex-1 w-full flex items-center justify-center p-8">
                <div className="w-full max-w-md border-2 p-10 rounded-lg border-secondary">
                    <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>

                    <form
                        onSubmit={handleSignin}
                        className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                onFocus={() => setError('')}
                                className="input input-bordered w-full rounded-3xl focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword? 'text' : 'password'}
                                    name="password"
                                    placeholder="Ype Your Password"
                                    className="input input-bordered w-full rounded-3xl focus:outline-none focus:ring-2 focus:ring-secondary"
                                    onFocus={() => setError('')}
                                />
                                <p
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 z-10 right-3 flex items-center text-secondary"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </p>
                            </div>


                        </div>
                        {/* show error message */}
                        {error && <p className='text-red-500'>✗ {error}</p>}

                        {/* Sign In Button */}
                        <button className="btn btn-secondary text-white w-full rounded-full mt-4">
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="divider">OR</div>

                    {/* Sign in with Google */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn btn-outline border-secondary w-full rounded-full">
                        <FcGoogle />
                        Sign in with Google
                    </button>

                    {/* Sign Up Link */}
                    <p className="mt-4 text-center text-sm text-gray-500">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-secondary font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;