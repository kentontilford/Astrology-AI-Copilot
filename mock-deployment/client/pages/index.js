export default function Home() {
  return (
    <div style={{ 
      padding: '0', 
      margin: '0',
      fontFamily: "'Google Sans', 'Roboto', sans-serif",
      color: '#333',
      background: 'linear-gradient(to bottom, #f9f9ff, #f1f1f9)',
      minHeight: '100vh'
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{ margin: 0, color: '#6D28D9' }}>Astrology AI Copilot</h1>
        <div>
          <a href="/auth/sign-in" style={{
            padding: '0.5rem 1rem',
            marginRight: '0.5rem',
            background: 'transparent',
            border: '1px solid #6D28D9',
            borderRadius: '4px',
            color: '#6D28D9',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block'
          }}>Log In</a>
          <a href="/auth/sign-up" style={{
            padding: '0.5rem 1rem',
            background: '#6D28D9',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block'
          }}>Sign Up</a>
        </div>
      </nav>
      
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '4rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '1.5rem',
          background: 'linear-gradient(to right, #6D28D9, #9F7AEA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Your Personal Astrological Guide
        </h2>
        
        <p style={{ 
          fontSize: '1.25rem', 
          marginBottom: '2rem',
          maxWidth: '800px',
          lineHeight: '1.6'
        }}>
          Astrology AI Copilot combines the ancient wisdom of astrology with cutting-edge AI to provide personalized insights for your journey.
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          marginBottom: '4rem'
        }}>
          <a href="/auth/sign-up" style={{
            padding: '1rem 2rem',
            fontSize: '1.25rem',
            background: '#6D28D9',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(109, 40, 217, 0.2)',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            Start Your Free Trial
          </a>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          width: '100%'
        }}>
          {/* Feature 1 */}
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'left'
          }}>
            <h3 style={{ color: '#6D28D9', marginTop: 0 }}>Personal Growth Dashboard</h3>
            <p>Understand your natal chart and current transits to navigate life's journey with confidence.</p>
          </div>
          
          {/* Feature 2 */}
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'left'
          }}>
            <h3 style={{ color: '#6D28D9', marginTop: 0 }}>Relationships Dashboard</h3>
            <p>Explore relationship dynamics through composite charts and AI-driven compatibility insights.</p>
          </div>
          
          {/* Feature 3 */}
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'left'
          }}>
            <h3 style={{ color: '#6D28D9', marginTop: 0 }}>AI Guidance</h3>
            <p>Chat with our astrological AI copilot for personalized guidance based on your unique chart.</p>
          </div>
        </div>
        
        {/* Status Banner */}
        <div style={{ 
          marginTop: '4rem', 
          padding: '1rem',
          backgroundColor: '#F3F4F6', 
          borderRadius: '0.5rem',
          width: '100%',
          textAlign: 'left'
        }}>
          <h2>Development Status:</h2>
          <ul>
            <li>Client: Running on port 3000</li>
            <li>Server: Running on port 3001</li>
            <li>Database: PostgreSQL on port 5432</li>
          </ul>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Configure your environment variables</li>
            <li>Set up Clerk authentication</li>
            <li>Configure Stripe payment processing</li>
            <li>Set up OpenAI integration</li>
          </ol>
        </div>
      </div>
      
      <footer style={{
        background: '#333',
        color: 'white',
        padding: '2rem',
        textAlign: 'center',
        marginTop: '4rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p>&copy; 2025 Astrology AI Copilot</p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
