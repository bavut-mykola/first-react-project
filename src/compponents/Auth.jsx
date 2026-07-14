import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Auth({ onLogin }) {
    const navigation = useNavigate()

    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    
    const [isWrittingThePassword, setIsWrittingThePassword] = useState(false)
    
    const [error, setError] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const EyeOpen = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
    )

    const EyeClosed = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
    )

    const EyeButton = ({ show, toggle }) => (
        <button type="button" onClick={toggle}>
            {show ? <EyeClosed />: <EyeOpen />}
        </button>
    )

    function handleSubmit(e) {
        e.preventDefault();
        setError('') 

        if (isLogin) {
            if (!email.trim()) {
                setError('Please fill the email field')
                return
            }

            if (!email.includes('@')) {
                setError('Your email is invalid')
                return
            }

            const parts = email.split('@')
            if (parts.length !== 2 || !parts[0] || !parts[1] || !parts[1].includes('.')) {
                setError('Your email is invalid')
                return
            }

            if (!password.trim()) {
                setError('Please fill the password field')
                return
            }

            if (password.length < 8 || !/[A-Z]/.test(password)) {
                setError('Password must contain required symbols')
                return
            }

            const accounts = JSON.parse(localStorage.getItem('accounts')) || []
            const registered = accounts.find(a => a.email === email)

            if (!registered) {
                setError('Please register first')
                return
            }

            if (registered.password !== password) {
                setError('Invalid email or password')
                return
            }

            onLogin(registered)
            navigation('/')
        } else {
            if (!email.trim() || !password.trim() || !confirmPassword.trim() || !name.trim()) {
                setError('Please fill all of fields')
                return
            }

            if (!email.includes('@') || email.split('@').length !== 2 || !email.split('@')[1].includes('.')) {
                setError('Your email is invalid')
                return
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match')
                return
            }

            const accounts = JSON.parse(localStorage.getItem("accounts")) || []
            const exist = accounts.find(acc => acc.email === email)
            
            if (exist) {
                setError('Account with this email already exists')
                return
            }

            const newAccount = { name, email, password }
            accounts.push(newAccount)
            localStorage.setItem('accounts', JSON.stringify(accounts))

            setIsLogin(true)
        }
    }

    return (
        <div>
            <div className="auth-container">
            {isLogin ? (
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
            
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email" 
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setError('')
                        }}
                        style={{border: error.toLowerCase().includes('email') ? '1px solid red' : '1px solid #ccc'}}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="Enter your password"
                        value={password} 
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setError('')
                        }}
                        onFocus={() => setIsWrittingThePassword(true)}
                        onBlur={() => setIsWrittingThePassword(false)}
                        style={{border: (error.toLowerCase().includes('password') || (error.includes('field') && !password)) ? '1px solid red' : '1px solid #ccc'}}
                    />
                    <EyeButton show={showPassword} toggle={() => setShowPassword(!showPassword)}/>

                    {isWrittingThePassword && (
                        <p className="hint-text">Min 8 characters, at least 1 uppercase letter</p>
                    )}
                    
                    {error && <p className="error-text" style={{color: 'red', fontSize: '14px', marginTop: '5px'}}>{error}</p>}
                </div>

                <button type="submit" className="auth-btn">Log In</button>
        
                <p className="auth-toggle-text">
                    Don't have an account? <span style={{cursor: 'pointer'}} onClick={() => { setIsLogin(false); setError(''); }}>Register</span>
                </p>
            </form> 
            ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Your name" 
                    value={name}
                    onChange={(e) => { 
                        const value = e.target.value

                        if (value.length !== 0) {
                            const nameValue = value[0].toUpperCase() + value.slice(1)
                            setName(nameValue);
                        } else {
                            setName('')
                        }

                        setError('');
                     }}/>
                </div>
        
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password" 
                    value={password} 
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}/>
                    <EyeButton show={showPassword} toggle={() => setShowPassword(!showPassword)}/>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type={showConfirmPassword ? 'text' : 'password'} 
                    placeholder="Repeat your password" 
                    value={confirmPassword} 
                    onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}/>
                    <EyeButton show={showConfirmPassword} toggle={() => setShowConfirmPassword(!showConfirmPassword)}/>
                    
                    {error && <p className="error-text" style={{color: 'red', fontSize: '14px', marginTop: '5px'}}>{error}</p>}
                </div>

                <button type="submit" className="auth-btn">Create Account</button>
        
                <p className="auth-toggle-text">
                    Already have an account? <span style={{cursor: 'pointer'}} onClick={() => { setIsLogin(true); setError(''); }}>Log In</span>
                </p>
            </form>
            )}
            <button onClick={() => navigation('/')}>Back to Home</button>
            <hr />
            </div>
        </div>
    )
}

export default Auth