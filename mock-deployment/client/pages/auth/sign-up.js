export default function SignUp() {
  return (
    <div style={{ 
      padding: '0', 
      margin: '0',
      fontFamily: "'Google Sans', 'Roboto', sans-serif",
      color: '#333',
      background: 'linear-gradient(to bottom, #f9f9ff, #f1f1f9)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        padding: '2rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        margin: '2rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            color: '#6D28D9',
            fontSize: '1.8rem',
            marginBottom: '0.5rem'
          }}>Create Your Account</h1>
          <p style={{ color: '#6B7280', margin: 0 }}>Start your astrological journey</p>
        </div>
        
        <form>
          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              htmlFor="email" 
              style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '500',
                color: '#374151'
              }}
            >
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              placeholder="your@email.com" 
              style={{ 
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #D1D5DB',
                outline: 'none',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              htmlFor="password" 
              style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '500',
                color: '#374151'
              }}
            >
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              style={{ 
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #D1D5DB',
                outline: 'none',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <button 
            type="button" 
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#6D28D9',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              marginBottom: '1.5rem'
            }}
          >
            Sign Up
          </button>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '1.5rem 0', color: '#6B7280' }}>Or continue with</p>
            
            <button 
              type="button" 
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'white',
                color: '#374151',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ color: '#6B7280' }}>
              Already have an account? <a href="/auth/sign-in" style={{ color: '#6D28D9', textDecoration: 'none' }}>Sign in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}