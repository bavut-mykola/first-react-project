import { useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { CURRENT_YEAR } from "../constant"
import { MIN_EXPIRY_YEAR } from "../constant"
import '../styles/checkout.scss'

function Checkout({ cart, clearCart}) {
    const navigate = useNavigate()

    const topRef = useRef()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [office, setOffice] = useState('')
    const [houseAddress, setHouseAddress] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvv, setCvv] = useState('')

    const [delivery, setDelivery] = useState('office')
    const [payment, setPayment] = useState('cash')

    const [error, setError] = useState('')

    useEffect(() => {
        if (error) {
            topRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [error])

    function handleSubmit(e) {
        e.preventDefault()

        setError('')

        if (name.trim().length < 2) {
            setError('Please enter a valid full name (at least 3 characters).')
            return
        }

        if (!/^\+380[0-9]{9}$/.test(phone)) {
            setError('Please enter a valid phone number (e.g., +380XXXXXXXXX).')
            return
        }

        if (!/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'’\s-]{2,30}$/.test(address)) {
            setError('Please enter your city or town.')
            return
        }

        if (delivery === 'office') {
             if (!/[0-9]/.test(office)) {
                setError('Please enter your post office number.')
                return
             }
        } else {
            if (!/^[A-ZА-ЩЬЮЯІЇЄҐ][a-zа-щьюяіїєґ']+(?:\s[A-ZА-ЩЬЮЯІЇЄҐ][a-zа-щьюяіїєґ']+)*,\s\d+[a-zа-щьюяіїєґ']*,?\s?\d*$/.test(houseAddress)) {
                setError('Please enter a valid address format: Street Name, House Number, Apartment (e.g., Khreshchatyk, 12, 45). Each word must start with a capital letter.')
                return
            }
        }

        if (payment !== 'cash') {

        const cleanCardNumber = cardNumber.replace(/\s+/g, '');

        if (!/^\d{16}$/.test(cleanCardNumber)) {
            setError('Card number must contain 16 numbers.');
            return
        }

        const expiryClean = expiry.replace(/\D/g, '')

        if (expiryClean.length < 4) {
            setError('Please enter a valid expiry date.')
            return
        }

        if (!cvv) {
            setError('CVV is required.')
            return
        }

        if (cvv.length !== 3) {
            setError('CVV must contain 3 numbers.')
            return
        }
        }

        const userString = localStorage.getItem('user')
        const user = userString ? JSON.parse(userString) : null
        const userEmail = user ? user.email : 'unknown'

        const orderData = {
            orderId: Date.now(),
            name: name,
            phone: phone,
            delivery: delivery,
            payment: payment,
            email: userEmail,

            products: cart.map(item => ({
                productName: item.name,
                productPrice: item.price,
                productCount: item.count,
                productImage: item.img
            })),

            totalPrice: cart.reduce((acc, curr) => acc + curr.price * curr.count, 0),
            totalAmount: cart.reduce((acc, curr) => acc + curr.count, 0)
        }

        const existingOrderString = localStorage.getItem('ordersHistory')
        const existingOrders = existingOrderString ? JSON.parse(existingOrderString) : []

        existingOrders.push(orderData)

        const savedOrder = JSON.stringify(existingOrders)
        localStorage.setItem('ordersHistory', savedOrder)
        
        clearCart()
        navigate('/order-details')
    }

    function handlePaymentChange(method) {
        if (method === 'cash') {
            setPayment('cash')
            setCardNumber('')
            setExpiry('')
            setCvv('')
            setError('')
        } else {
            setPayment('card')
        }
    }

    function handleAddressChange(method) {
        if (method === 'office') {
            setDelivery('office')
            setHouseAddress('')
            setError('')
        } else {
            setDelivery('courier')
            setOffice('')
        }
    }

    return (
    <div className="checkout-page">
        <div className="checkout-navigation">
            <button className="back-btn" onClick={() => navigate('/cart')}>
                ← Return to Cart
            </button>
        </div>

        <h2 ref={topRef}
        className="checkout-title" >Checkout</h2>

        <div className="checkout-container">
            <form className="checkout-form"
            onSubmit={handleSubmit}>
                <h3 className="section-title">Shipping Information</h3>

                {error && <p
                style={{color: 'rgb(226, 55, 55)'}}
                >{error}</p>}

                <div className="disclaimer-checkout-box">
                    <h2 className="disclaimer-checkout-text">
                        Demo only - do not use real data!
                    </h2>
                </div>
                
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" value={name}
                    onChange={(e) => {
                        const nameValue = e.target.value

                        const firstLetter = nameValue.charAt(0).toUpperCase() + nameValue.slice(1)

                        setName(firstLetter)

                        if (firstLetter.trim().length >= 2) {
                            setError('')
                        }
                    }} 
                    onBlur={() => {
                        if (name.trim().length < 2) {
                            setError('Please enter a valid full name (at least 3 characters).')
                            return 
                        }
                    }} />
                </div>

                <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" className="form-input" placeholder="+380 00 000 0000"
                    value={phone}
                    onChange={(e) => {
                        const phoneValue = e.target.value

                        if (phoneValue.length < 3 && phone.startsWith('+38')) {
                            setPhone('+38')
                        } else {
                            setPhone(phoneValue)
                        }

                        if (/^\+380[0-9]{9}$/.test(phone)) {
                            setError('')
                        }
                    }}
                    onFocus={() => {
                        if (!phone) {
                            setPhone('+38')
                        }
                    }}
                    onBlur={(e) => {
                        const phoneValue = e.target.value

                        if (!/^\+380[0-9]{9}$/.test(phoneValue)) {
                            setError('Please enter a valid phone number (e.g., +380XXXXXXXXX).')
                            return
                        } else {
                            setError('')
                        }
                    }} />
                </div>

                <div className="form-group">
                    <label className="form-label">City / Village</label>
                    <input type="text" className="form-input" value={address}
                    onChange={(e) => {
                        const cityValue = e.target.value

                        const firstLetter = cityValue.charAt(0).toUpperCase() + cityValue.slice(1)

                        setAddress(firstLetter)

                        if (/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'’\s-]{2,30}$/.test(firstLetter)) {
                            setError('')
                        }
                    }}
                    onBlur={() => {
                        if (!/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'’\s-]{2,30}$/.test(address)) {
                            setError('Please enter your city or town.')
                            return
                        }
                    }} />
                </div>

                <div className="form-group delivery-methods">
                    <label className="form-label">Delivery Method</label>
                    
                    <div className="radio-group">
                        <label className="radio-label">
                            <input type="radio" name="delivery"
                            checked={delivery === "office"} className="form-radio"
                            onChange={() => handleAddressChange('office')} />
                            Post Office
                        </label>
                        
                        <label className="radio-label">
                            <input type="radio" name="delivery" 
                            checked={delivery === "courier"} className="form-radio"
                            onChange={() => handleAddressChange('courier')} />
                            Courier to Home
                        </label>
                    </div>
                </div>

                {delivery === 'office' && (
                    <div className="form-group">
                        <label className="form-label">Post Office Number</label>
                        <input type="text" className="form-input" placeholder="№15"
                        value={office} onChange={(e) => {
                            const officeValue = e.target.value

                            if (officeValue.length < 2 && office.startsWith('№')) {
                                setOffice('№')
                            } else {
                                setOffice(officeValue)
                            }
                        }}
                        onFocus={() => {
                            if (!office) {
                                setOffice('№')
                            }
                        }} />
                    </div>
                )}

                {delivery === 'courier' && (
                <div className="form-group">
                    <label className="form-label">Home Address</label>
                    <input type="text" className="form-input"
                    placeholder="Street, house number, apartment number"
                    value={houseAddress}
                    onChange={(e) => {
                        const addressValue = e.target.value

                        if (addressValue.length === 0) {
                            setHouseAddress('')
                            return
                        }

                        const firstLetter = addressValue.charAt(0).toUpperCase() + addressValue.slice(1)

                        setHouseAddress(firstLetter)

                        if (/^[A-ZА-ЩЬЮЯІЇЄҐ][a-zа-щьюяіїєґ']+(?:\s[A-ZА-ЩЬЮЯІЇЄҐ][a-zа-щьюяіїєґ']+)*,\s\d+[a-zа-щьюяіїєґ']*,?\s?\d*$/.test(firstLetter)) {
                            setError('')
                        }
                    }} 
                    onBlur={() => {
                        if (!/^[A-ZА-ЩЬЮЯІЇЄҐ][a-zа-щьюяіїєґ']+(?:\s[A-ZА-ЩЬЮЯІЇЄҐ][a-zа-щьюяіїєґ']+)*,\s\d+[a-zа-щьюяіїєґ']*,?\s?\d*$/.test(houseAddress)) {
                            setError('Please enter a valid address format: Street Name, House Number, Apartment (e.g., Khreshchatyk, 12, 45). Each word must start with a capital letter.')
                            return
                        } 
                    }} />
                </div>
                )}

                <div className="form-group payment-methods">
                    <label className="form-label">Payment Method</label>
                    
                    <div className="radio-group">
                        <label className="radio-label">
                            <input type="radio" name="payment"
                            checked={payment === 'cash'} className="form-radio"
                            onChange={() => handlePaymentChange('cash')} />
                            Cash on delivery
                        </label>
                        
                        <label className="radio-label">
                            <input type="radio" name="payment" 
                            checked={payment === 'card'} className="form-radio"
                            onChange={() => handlePaymentChange('card')} />
                            Card online
                        </label>
                    </div>
                </div>

                {payment === 'card' && (
                    <div className="card-details-block">
                    <div className="form-group">
                        <label className="form-label">Card Number</label>
                        <input type="text" className="form-input" placeholder="0000 0000 0000 0000"
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={(e) => {
                            const input = e.target.value;
                            const rawValue = input.replace(/\D/g, '');
  
                            if (rawValue.length <= 16) {
                                setCardNumber(rawValue.match(/.{1,4}/g)?.join(' ') || '');
    
                                if (rawValue.length === 16) {
                                    setError('');
                                }
                            }
                        }}
                        onBlur={(e) => {
                            const rawValue = e.target.value.replace(/\s/g, '');
                            
                            if (rawValue.length !== 16) {
                                setError('Card number must contain 16 numbers.');
                            }
                        }} />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Expiry Date</label>
                            <input type="text" className="form-input" placeholder="MM/YY"
                            inputMode="numeric"
                            value={expiry}
                            onChange={(e) => {
                                const expiryValue = e.target.value

                                let validValue = expiryValue.replace(/\D/g, '').slice(0, 4)

                                if (validValue === '00') {
                                    setError('Month cannot be 00.')
                                    return
                                }

                                if (validValue.length === 1 && validValue[0] > '1') {
                                    validValue = '0' + validValue
                                    }

                                if (validValue.length >= 2) {
                                    const month = validValue.slice(0, 2)

                                    if (month > '12') {
                                        validValue = '12'
                                    }
                                }

                                let finalValue = ''

                                if (validValue.length <= 2) {
                                    finalValue = validValue
                                } else {
                                    let month = validValue.slice(0, 2)
                                    let year = validValue.slice(2, 4)

                                    if (year.length === 2 && Number(year) < CURRENT_YEAR) {
                                        setError('Card is expired.')
                                        return
                                    }

                                    if (year.length === 2 && Number(year) < MIN_EXPIRY_YEAR) {
                                        setError(`Please enter a valid expiry date.`)
                                        return
                                    }

                                    finalValue = month + (year ? '/' + year : '')
                                }

                                setExpiry(finalValue)
                                setError('')
                                }}
                                onBlur={(e) => {
                                    const value = e.target.value
                                    const expiryValue = value.replace(/\D/g, '')

                                    if (!expiryValue) {
                                        setError('Please do not leave fields empty.')
                                        return
                                    }

                                    if (expiryValue.length < 4) {
                                        setError('All fields are required.')
                                        return
                                    }
                                }} />
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">CVV</label>
                            <input type="password" className="form-input" placeholder="123"
                            inputMode="numeric"
                            value={cvv}
                            onChange={(e) => {
                                const value = e.target.value

                                const maxValue = value.slice(0, 3)

                                if (/\D/g.test(maxValue)) {
                                    setError('Please enter a valid CVV (numbers only).')
                                } else if (/\d/g.test(maxValue)) {
                                    setError('')
                                }

                                const validValue = maxValue.replace(/\D/g, '')
                                setCvv(validValue)
                            }}
                            onBlur={(e) => {
                                const value = e.target.value

                                if (!value) {
                                    setError('')
                                    return
                                }
                                if (value.length < 3) {
                                    setError('CVV must contain 3 numbers.')
                                }
                            }} />
                        </div>
                    </div>
                    </div>
                )}

            <div className="order-summary">
                <h3 className="section-title">Your Order</h3>
                
                <div className="summary-items">
                    {
                        cart.map(p => (
                            <div key={p.id} className="summary-item">
                                <div className="summary-item-info">
                                    <span className="item-name">{p.name}</span>
                                    <span className="item-qty">x{p.count}</span>
                                </div>
                                <span className="item-price">{p.price * p.count} UAH</span>
                            </div>
                        ))
                    }
                </div>

                <div className="summary-total">
                    <h4>Total to pay:</h4>
                    <span className="total-amount">
                        {cart.reduce((acc, curr) => acc + curr.price * curr.count, 0)} UAH
                    </span>
                </div>

                <button type="submit" className="confirm-order-btn">
                    Confirm Order
                </button>
            </div>
            </form>
        </div>
    </div>
    )
}

export default Checkout