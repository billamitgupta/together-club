const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const Booking = require('../models/Booking');
const InviteRequest = require('../models/InviteRequest');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, userData } = req.body;

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency: currency || 'INR',
      receipt: receipt,
    };

    const order = await razorpay.orders.create(options);

    // Save booking with pending status
    const booking = new Booking({
      ...userData,
      amount: amount,
      orderId: order.id,
      status: 'pending'
    });

    await booking.save();

    res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Verify payment
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
      // Payment is valid, update booking status
      await Booking.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { 
          status: 'paid',
          paymentId: razorpay_payment_id
        }
      );

      res.json({ status: 'success' });
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Submit invite request
router.post('/request-invite', async (req, res) => {
  try {
    const inviteRequest = new InviteRequest(req.body);
    await inviteRequest.save();
    
    res.json({ 
      message: 'Invite request submitted successfully',
      id: inviteRequest._id 
    });
  } catch (error) {
    console.error('Error submitting invite request:', error);
    res.status(500).json({ error: 'Failed to submit invite request' });
  }
});

// Get available slots (mock endpoint)
router.get('/available-slots', async (req, res) => {
  try {
    const totalSlots = 200;
    const bookedSlots = await Booking.countDocuments({ status: 'paid' });
    const availableSlots = totalSlots - bookedSlots;
    
    res.json({ availableSlots: Math.max(0, availableSlots) });
  } catch (error) {
    console.error('Error getting available slots:', error);
    res.status(500).json({ error: 'Failed to get available slots' });
  }
});

// Get all bookings (admin endpoint)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error getting bookings:', error);
    res.status(500).json({ error: 'Failed to get bookings' });
  }
});

// Get all invite requests (admin endpoint)
router.get('/invite-requests', async (req, res) => {
  try {
    const requests = await InviteRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error('Error getting invite requests:', error);
    res.status(500).json({ error: 'Failed to get invite requests' });
  }
});

module.exports = router;