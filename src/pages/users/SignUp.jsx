import { Link, useNavigate } from "react-router";
import signUpImg from '../../assets/signup.svg'
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Spinner from "../../components/ui/Spinner";

const SignUp = () => {

    const { user, createUser, googleSignIn, setUser, updateUser } = useAuth();
    const navigate = useNavigate();

    // Controlled form state
    const [form, setForm] = useState({
        name: '',
        email: '',
        photo: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showValidation, setShowValidation] = useState(false);
    const [errors, setErrors] = useState({});

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    // Password validation
    const validation = {
        length: form.password.length >= 6,
        lowerUpper: /(?=.*[a-z])(?=.*[A-Z])/.test(form.password),
        numberOrSymbol: /(?=.*[0-9])|(?=.*[^A-Za-z0-9])/.test(form.password),
        emailNotIncluded: !form.password.includes(form.email.split('@')[0]),
    };

    // Email error messages
    const emailErrorMessages = {
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/email-already-in-use": "This email is already registered. Please use a different one or log in instead.",
        "auth/user-not-found": "No account found with this email.",
        "auth/missing-email": "Please provide your email address.",
    };

    // Custom validation for all fields
    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required.";
        if (!form.email.trim()) newErrors.email = "Email is required.";
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = "Please enter a valid email address.";
        if (!form.photo.trim()) newErrors.photo = "Photo URL is required.";
        // else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i.test(form.photo)) newErrors.photo = "Please enter a valid image URL.";
        if (!form.password) newErrors.password = "Password is required.";
        else {
            if (!validation.length) newErrors.password = "Password must be at least 6 characters.";
            else if (!validation.lowerUpper) newErrors.password = "Password must contain both lower and upper case letters.";
            else if (!validation.numberOrSymbol) newErrors.password = "Password must contain a number or symbol.";
            else if (!validation.emailNotIncluded) newErrors.password = "Password should not contain your email address.";
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
        if (name === 'password') setShowValidation(true);
    };


    const handleSignup = (e) => {
        e.preventDefault();
        const newErrors = validate();
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            if (newErrors.password) setShowValidation(true);
            return;
        }
        //create user in the firebase
        createUser(form.email, form.password)
            .then((userCredential) => {
                const currentUser = userCredential.user;
                updateUser({ displayName: form.name, photoURL: form.photo })
                console.log(currentUser)
                    .then(() => {
                        const updatedUser = {
                            ...currentUser,
                            displayName: form.name,
                            photoURL: form.photo,
                        };
                        setUser(updatedUser);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Sign Up Success!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        navigate(location.state || '/');
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: `${error.message} || Something went wrong!`,
                        });
                    });
            })
            .catch(error => {
                setErrors((prev) => ({ ...prev, email: emailErrorMessages[error.code] || 'Register failed!' }));
            });
    };

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
                    title: "Sign Up Success!",
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

    //if already sing in return to previous page
    useEffect(() => {
        if (user) {
            navigate(location.state ? location.state : '/');
        }
    }, [user, navigate]);

    if (user) {
        return <Spinner />;
    }

    return (
        <div className="min-h-[calc(100vh-149px)] max-w-5xl mx-auto flex flex-col lg:flex-row">
            {/* Left Column Image */}
            <div className="flex-1 flex items-center justify-center p-8">
                <img
                    src={signUpImg}
                    alt="Animation"
                    className="max-w-full md:w-1/2 lg:w-full object-contain"
                />
            </div>

            {/* Right Column (Form) */}
            <div className="flex-1 w-full flex items-center justify-center p-8">
                <div className="w-full max-w-md border-2 p-10 rounded-lg border-secondary">
                    <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

                    <form
                        onClick={handleSignup}
                        className="space-y-4">
                        {/* name */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                onFocus={() => setErrors((prev) => ({ ...prev, name: undefined }))}
                                placeholder="Your name"
                                className="input input-bordered w-full rounded-3xl focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                        </div>
                        {/* Email */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                onFocus={() => setErrors((prev) => ({ ...prev, email: undefined }))}
                                placeholder="you@example.com"
                                className="input input-bordered w-full rounded-3xl focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                        </div>
                        {/* photo */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Photo Url</span>
                            </label>
                            <input
                                type="text"
                                name="photo"
                                value={form.photo}
                                onChange={handleChange}
                                onFocus={() => setErrors((prev) => ({ ...prev, photo: undefined }))}
                                placeholder="Photo Url"
                                className="input input-bordered w-full rounded-3xl focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            {errors.photo && <p className="text-red-600 text-xs mt-1">{errors.photo}</p>}
                        </div>
                        {/* Password */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    value={form.password}
                                    onFocus={() => { setShowValidation(true); setErrors((prev) => ({ ...prev, password: undefined })); }}
                                    onChange={handleChange}
                                    type={showPassword ? 'text' : 'password'}
                                    className="input input-bordered w-full rounded-3xl focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                                <p
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 z-10 right-3 flex items-center text-secondary"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </p>
                            </div>

                            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                        </div>
                        {/* Password Validation */}
                        {showValidation && (
                            <ul className="mt-2 text-sm space-y-1">
                                <li className={validation.length ? "text-green-600" : "text-red-600"}>
                                    {validation.length ? "✔" : "✘"} at least 6 characters
                                </li>
                                <li className={validation.lowerUpper ? "text-green-600" : "text-red-600"}>
                                    {validation.lowerUpper ? "✔" : "✘"} both lower & upper case
                                </li>
                                <li className={validation.numberOrSymbol ? "text-green-600" : "text-red-600"}>
                                    {validation.numberOrSymbol ? "✔" : "✘"} a number or symbol
                                </li>
                                <li className={validation.emailNotIncluded ? "text-green-600" : "text-red-600"}>
                                    {validation.emailNotIncluded ? "✔" : "✘"} not your email address
                                </li>
                            </ul>
                        )}

                        {/* Sign Up Button */}
                        <button className="btn btn-secondary text-base-100 w-full rounded-full mt-4">
                            Sign Up
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
                        Already have an account?{" "}
                        <Link to="/signin" className="text-secondary font-medium">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;