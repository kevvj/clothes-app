import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const PaymentGateway = () => {
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')

  const router = useRouter()

  const handlePayment = (e) => {
    e.preventDefault()
    setPaymentStatus('Payment Successful!')
    UserPanelButton()
  }

  const UserPanelButton = () => {
      router.push('/orders')
  }

  return (
    <div className="payment-container">
      <h2>Pasarela de Pago</h2>
      <form onSubmit={handlePayment} className="payment-form">
        <div className="input-group">
          <label htmlFor="cardNumber">Número de tarjeta</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Ingrese el número de tarjeta"
            maxLength="16"
          />
        </div>
        <div className="input-group">
          <label htmlFor="expiryDate">Fecha de expiración</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/AA"
            maxLength="5"
          />
        </div>
        <div className="input-group">
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="Código de seguridad"
            maxLength="3"
          />
        </div>
        <button type="submit" className="pay-button">Pagar</button>
      </form>
      {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
    </div>
  )
}

export default PaymentGateway
