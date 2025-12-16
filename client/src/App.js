import React, { useState, useEffect } from 'react';
import './App.css';
import ApiService from './services/api';
import SEOHead from './components/SEOHead';
import HealthCheck from './components/HealthCheck';

function App() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [availableSlots, setAvailableSlots] = useState(47);
  const [loading, setLoading] = useState(false);
  // const [scrollY, setScrollY] = useState(0); // Removed unused state
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    experience: ''
  });

  // Fetch available slots on component mount
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await ApiService.getAvailableSlots();
        setAvailableSlots(response.availableSlots);
      } catch (error) {
        console.error('Failed to fetch available slots:', error);
        // Keep default value if API fails
      }
    };

    fetchAvailableSlots();
  }, []);

  useEffect(() => {
    const targetDate = new Date('2025-12-29T00:00:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const createFireworks = () => {
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#f7971e'];
    const fireworks = [];
    
    for (let i = 0; i < 6; i++) {
      fireworks.push(
        <div
          key={i}
          className="firework"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      );
    }
    return fireworks;
  };

  const [rockets, setRockets] = useState([]);
  const [explosions, setExplosions] = useState([]);


  useEffect(() => {
    const createRocket = () => {
      const newRocket = {
        id: Date.now() + Math.random(),
        left: Math.random() * 90 + 5,
        delay: Math.random() * 2
      };
      
      setRockets(prev => [...prev, newRocket]);
      
      setTimeout(() => {
        const sparkles = [];
        for (let i = 0; i < 25; i++) {
          const angle = Math.random() * 2 * Math.PI;
          const distance = 30 + Math.random() * 120;
          const colors = ['#ffd700', '#ff6b35', '#ff4757', '#00d2d3', '#ff9ff3'];
          sparkles.push({
            id: `${newRocket.id}-${i}`,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
        setExplosions(prev => [...prev, {
          id: newRocket.id,
          left: newRocket.left,
          top: 20 + Math.random() * 20,
          sparkles
        }]);
        // Create sparkle burst instead of light flash
        const sparkleContainer = document.createElement('div');
        sparkleContainer.className = 'sparkle-screen-burst';
        sparkleContainer.style.position = 'fixed';
        sparkleContainer.style.top = '0';
        sparkleContainer.style.left = '0';
        sparkleContainer.style.width = '100%';
        sparkleContainer.style.height = '100%';
        sparkleContainer.style.pointerEvents = 'none';
        sparkleContainer.style.zIndex = '999';
        
        // Create multiple sparkles across the screen
        for (let i = 0; i < 50; i++) {
          const sparkle = document.createElement('div');
          sparkle.className = 'screen-sparkle';
          sparkle.style.position = 'absolute';
          sparkle.style.left = Math.random() * 100 + '%';
          sparkle.style.top = Math.random() * 100 + '%';
          sparkle.style.width = '4px';
          sparkle.style.height = '4px';
          sparkle.style.background = ['#ffd700', '#ff6b35', '#ff4757', '#00d2d3', '#ff9ff3'][Math.floor(Math.random() * 5)];
          sparkle.style.borderRadius = '50%';
          sparkle.style.animation = `sparkle-screen-burst ${0.8 + Math.random() * 0.4}s ease-out forwards`;
          sparkle.style.boxShadow = `0 0 8px ${sparkle.style.background}`;
          sparkleContainer.appendChild(sparkle);
        }
        
        document.body.appendChild(sparkleContainer);
        setTimeout(() => {
          document.body.removeChild(sparkleContainer);
        }, 1200);
        
        setTimeout(() => {
          setExplosions(prev => prev.filter(exp => exp.id !== newRocket.id));
        }, 1000);
      }, 2100 + newRocket.delay * 1000);
      
      setTimeout(() => {
        setRockets(prev => prev.filter(r => r.id !== newRocket.id));
      }, 3000 + newRocket.delay * 1000);
    };
    
    const interval = setInterval(createRocket, 2000);
    return () => clearInterval(interval);
  }, []);

  // Scroll tracking removed as it was unused
  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY);
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.tc-animate').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleBooking = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const order = await ApiService.createOrder({
        amount: 24999, // ₹24,999
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        userData: bookingData
      });
      
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Together Club',
        description: 'New Year Mountain Trip 2024-25',
        order_id: order.id,
        handler: async function (response) {
          try {
            await ApiService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            alert('Payment successful! Welcome to the club!');
            setShowBookingModal(false);
            setAvailableSlots(prev => Math.max(0, prev - 1));
            // Reset form
            setBookingData({
              name: '',
              email: '',
              phone: '',
              instagram: '',
              experience: ''
            });
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: bookingData.name,
          email: bookingData.email,
          contact: bookingData.phone
        },
        theme: {
          color: '#667eea'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  const handleInviteRequest = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      await ApiService.submitInviteRequest(bookingData);
      alert('Invite request submitted! We\'ll review and get back to you.');
      setShowInviteModal(false);
      // Reset form
      setBookingData({
        name: '',
        email: '',
        phone: '',
        instagram: '',
        experience: ''
      });
    } catch (error) {
      console.error('Invite request error:', error);
      alert('Failed to submit invite request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead />
      <HealthCheck />
      <div className="tc-root">
      {/* HERO SECTION */}
      <section className="tc-hero">
        <div className="fireworks">
          {createFireworks()}
        </div>
        <div className="rocket-container">
          {rockets.map(rocket => (
            <div
              key={rocket.id}
              className="rocket"
              style={{
                left: `${rocket.left}%`,
                animationDelay: `${rocket.delay}s`
              }}
            />
          ))}
          {explosions.map(explosion => (
            <div
              key={explosion.id}
              className="sparkle-burst"
              style={{
                left: `${explosion.left}%`,
                top: `${explosion.top}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {explosion.sparkles?.map(sparkle => (
                <div
                  key={sparkle.id}
                  className="sparkle"
                  style={{
                    left: '50%',
                    top: '50%',
                    backgroundColor: sparkle.color,
                    boxShadow: `0 0 6px ${sparkle.color}`,
                    transform: `translate(${sparkle.x}px, ${sparkle.y}px)`
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="party-lights"></div>
        <div className="tc-hero-content">
          <h1>New Year, but make it elite. 🥂</h1>
          <h2>29 Dec – 3 Jan • Himalayan Luxury • 200 Elite Creators • The Ultimate NYE Experience 🎊</h2>
          
          <div className="countdown-container" style={{margin: '2rem 0'}}>
            <div className="countdown-element">{countdown.days}<br/><small>Days</small></div>
            <div className="countdown-element">{countdown.hours}<br/><small>Hours</small></div>
            <div className="countdown-element">{countdown.minutes}<br/><small>Minutes</small></div>
            <div className="countdown-element">{countdown.seconds}<br/><small>Seconds</small></div>
          </div>
          
          <div className="tc-availability">
            <span className="tc-slots-left">🔥 {availableSlots} exclusive spots remaining</span>
          </div>
          <div className="tc-hero-ctas">
            <button className="tc-btn tc-btn-primary" onClick={() => setShowBookingModal(true)}>🍾 Secure Your Spot</button>
            <button className="tc-btn tc-btn-secondary" onClick={() => setShowInviteModal(true)}>✨ Request Elite Access</button>
          </div>
        </div>
        <div className="tc-hero-bg-vibe"></div>
      </section>

      {/* WHAT IS TOGETHA.CLUB */}
      <section className="tc-about tc-animate">
        <h3>WHAT IS TOGETHER.CLUB?</h3>
        <p>India's most exclusive travel community where elite creators, tastemakers, and visionaries converge for experiences that redefine luxury travel.</p>
        <ul>
          <li>No ordinary experiences. No random connections. No compromises.</li>
          <li>Only curated excellence, influential networks, and journeys worth sharing.</li>
        </ul>
        <p>Your presence here confirms your elite status.</p>
      </section>

      {/* WHY INVITE-ONLY */}
      <section className="tc-inviteonly tc-animate">
        <h3>EXCLUSIVITY BY DESIGN</h3>
        <p>Because influence attracts influence.<br />Extraordinary experiences require extraordinary people.</p>
        <p>Every member is meticulously selected for their impact, creativity, and cultural relevance. This isn't just travel—it's access to India's most influential creative network.</p>
        <p>You're not purchasing a service.<br />You're joining an empire.</p>
      </section>

      {/* MAIN EVENT */}
      <section className="tc-event tc-animate">
        <h3>THE PINNACLE EVENT – HIMALAYAN NEW YEAR</h3>
        <h4>29 Dec – 3 Jan • Private Himalayan Estates • Luxury Concierge • Elite Gathering</h4>
        <p>Envision this: Private helicopter transfers, snow-capped luxury estates, world-class entertainment, India's top creators, premium spirits, and an unforgettable countdown surrounded by the Himalayas.</p>
        <p>This transcends typical events. This is an exclusive gathering of 200 hand-selected influencers in a pristine mountain sanctuary.<br />The networking opportunities? Priceless.</p>
      </section>

      {/* WHAT'S HAPPENING */}
      <section className="tc-happenings tc-animate">
        <h3>🎉 NEW YEAR'S EVE LUXURY EXPERIENCES</h3>
        <ul>
          <li>🏔️ Private Himalayan estates with heated pools and mountain views</li>
          <li>🎭 Exclusive NYE gala with live DJ sets, celebrity performances, and premium bar</li>
          <li>🤝 Elite creator networking lounges for million-dollar collaborations</li>
          <li>🚁 VIP experiences: helicopter champagne tours, private ski slopes, luxury spa</li>
          <li>🍾 Michelin-star NYE dinner with premium champagne and wine pairings</li>
          <li>📸 Professional party photographers and personal brand content creation</li>
          <li>💎 Guaranteed connections with Forbes-listed entrepreneurs and A-list creators</li>
          <li>🎊 Midnight countdown celebration with fireworks and surprise performances</li>
        </ul>
        <p>🏆 This is India's most prestigious New Year experience of 2024–25.<br />🎯 Your early access to the ultimate NYE party is confirmed.</p>
      </section>

      {/* WHO'S COMING */}
      <section className="tc-whoscoming tc-animate">
        <h3>THE ELITE GUEST LIST</h3>
        <p>200 carefully selected influencers, entrepreneurs, and cultural icons across luxury lifestyle, high fashion, premium travel, wellness, and entertainment. <br/>
        Verified millionaires. Industry leaders. Tomorrow's moguls.<br />
        We maintain discretion, but expect Forbes 30 Under 30 recipients, blue-tick celebrities, and your future business partners.</p>
      </section>

      {/* PRICING */}
      <section className="tc-pricing">
        <h3>PRICING</h3>
        <div className="tc-pricing-tiers">
          <div className="tc-pricing-card tc-pricing-main">
            <div>Starts at <span className="tc-price">₹24,999</span> per person</div>
            <div className="tc-pricing-note">(Prices increase as seats fill.<br />Early birds get the sweetest deals.)</div>
            <ul className="tc-price-includes">
              <li>Luxury villa stay in snowfall zones</li>
              <li>In-house New Year party with premium setup</li>
              <li>Curated creator mixers and networking</li>
              <li>All meals and premium beverages</li>
              <li>Professional media team coverage</li>
              <li>Exclusive community access</li>
            </ul>
          </div>
        </div>
        <div className="tc-pricing-cta">
          <button className="tc-btn tc-btn-primary" onClick={() => setShowBookingModal(true)}>Book Your Spot Before Prices Rise</button>
        </div>
        <div className="tc-pricing-footnote">Exclusive access. Infinite possibilities. <br/>or <button className="tc-btn tc-btn-secondary sm" onClick={() => setShowInviteModal(true)}>Request Elite Access</button></div>
        <div className="tc-note-vibe">Selection criteria: Influence, authenticity, and cultural impact.</div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="tc-social-proof tc-animate">
        <blockquote>"Finally, a travel experience that matches my lifestyle and network."</blockquote>
        <blockquote>"The ROI on connections made here exceeded my expectations."</blockquote>
        <blockquote>"This redefined what luxury travel means to me."</blockquote>
      </section>

      {/* FAQ SECTION */}
      <section className="tc-faq tc-animate">
        <h3>ELITE ACCESS INQUIRIES</h3>
        <div className="tc-faq-qs">
          <div>
            <strong>What are the membership criteria?</strong><br/>
            Verified social influence, cultural impact, or entrepreneurial success. We prioritize quality over quantity.
          </div>
          <div>
            <strong>Is this networking or leisure?</strong><br/>
            Both. Strategic relationship building in a luxury leisure environment.
          </div>
          <div>
            <strong>Can I attend independently?</strong><br/>
            Most members do. Our curation ensures instant compatibility and meaningful connections.
          </div>
          <div>
            <strong>Are travel arrangements included?</strong><br/>
            Premium transport packages available from major cities. Helicopter transfers optional.
          </div>
          <div>
            <strong>What's the group size?</strong><br/>
            Exactly 200 verified members for optimal networking and exclusivity.
          </div>
          <div>
            <strong>How do you ensure member safety?</strong><br/>
            Comprehensive background verification, 24/7 security, and medical support on-site.
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="tc-footer">
        <div className="tc-footer-brand">Together.Club</div>
        <div className="tc-footer-desc">Where influence meets excellence.</div>
        <div className="tc-footer-socials">
          <a href="https://instagram.com/together.club" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <button className="tc-footer-invite" onClick={() => setShowInviteModal(true)} style={{background: 'none', border: 'none', color: 'inherit', textDecoration: 'none', cursor: 'pointer', fontSize: 'inherit', fontWeight: 'inherit'}}>Elite Access</button>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {showBookingModal && (
        <div className="tc-modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="tc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tc-modal-header">
              <h3>Secure Your Elite Access</h3>
              <button className="tc-modal-close" onClick={() => setShowBookingModal(false)}>×</button>
            </div>
            <div className="tc-modal-body">
              <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Instagram Handle (@username)"
                  value={bookingData.instagram}
                  onChange={(e) => setBookingData({...bookingData, instagram: e.target.value})}
                  required
                />
                <textarea
                  placeholder="Describe your influence, achievements, and what you'll bring to this elite community"
                  value={bookingData.experience}
                  onChange={(e) => setBookingData({...bookingData, experience: e.target.value})}
                  rows="4"
                  required
                />
                <div className="tc-modal-footer">
                  <div className="tc-price-display">Total: ₹24,999</div>
                  <button type="submit" className="tc-btn tc-btn-primary" disabled={loading}>
                    {loading ? 'Processing...' : 'Secure Elite Access'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* INVITE MODAL */}
      {showInviteModal && (
        <div className="tc-modal-overlay" onClick={() => setShowInviteModal(false)}>
          <div className="tc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tc-modal-header">
              <h3>Apply for Elite Membership</h3>
              <button className="tc-modal-close" onClick={() => setShowInviteModal(false)}>×</button>
            </div>
            <div className="tc-modal-body">
              <form onSubmit={(e) => { e.preventDefault(); handleInviteRequest(); }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Instagram Handle"
                  value={bookingData.instagram}
                  onChange={(e) => setBookingData({...bookingData, instagram: e.target.value})}
                  required
                />
                <textarea
                  placeholder="Detail your influence metrics, notable achievements, brand partnerships, and why you deserve elite access to India's most exclusive creator community"
                  value={bookingData.experience}
                  onChange={(e) => setBookingData({...bookingData, experience: e.target.value})}
                  rows="4"
                  required
                />
                <div className="tc-modal-footer">
                  <button type="submit" className="tc-btn tc-btn-primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Elite Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default App;