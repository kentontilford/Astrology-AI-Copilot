export default function Chat() {
  // Mock chat messages
  const mockMessages = [
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your Astrology AI Copilot. How can I help you with astrological insights today?'
    },
    {
      id: 2,
      role: 'user',
      content: 'What does it mean that I have my Sun in Taurus?'
    },
    {
      id: 3,
      role: 'assistant',
      content: 'Having your Sun in Taurus suggests you likely have a grounded, practical, and steady nature. Taurus is an Earth sign ruled by Venus, which gives you a strong appreciation for beauty, comfort, and material security. You tend to be reliable, patient, and persistent—often sticking with projects and relationships for the long term.\n\nSome key Taurus Sun traits include:\n\n• Determination and persistence\n• Practicality and resourcefulness\n• Appreciation for sensory pleasures and comfort\n• Loyalty and reliability\n• Preference for stability and routine\n\nYou may also sometimes exhibit the shadow side of Taurus: stubbornness, resistance to change, possessiveness, or occasional indulgence.\n\nWould you like to know more about how your Taurus Sun might interact with other planets in your chart?'
    }
  ];
  
  return (
    <div style={{ 
      padding: '0', 
      margin: '0',
      fontFamily: "'Google Sans', 'Roboto', sans-serif",
      color: '#333',
      background: '#f9fafb',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ margin: 0, color: '#6D28D9', marginRight: '2rem' }}>Astrology AI Copilot</h1>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/dashboard/personal" style={{ 
              color: '#6B7280', 
              textDecoration: 'none'
            }}>
              Personal Growth
            </a>
            <a href="/dashboard/relationships" style={{ 
              color: '#6B7280', 
              textDecoration: 'none'
            }}>
              Relationships
            </a>
            <a href="/chat" style={{ 
              color: '#6D28D9', 
              textDecoration: 'none',
              fontWeight: 'bold',
              borderBottom: '2px solid #6D28D9',
              paddingBottom: '0.5rem'
            }}>
              AI Chat
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#6B7280'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            background: '#6D28D9', 
            borderRadius: '50%', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            JD
          </div>
        </div>
      </nav>
      
      {/* Chat UI */}
      <div style={{ 
        display: 'flex', 
        flexGrow: 1,
        height: 'calc(100vh - 64px)'
      }}>
        {/* Sidebar */}
        <div style={{
          width: '260px',
          background: 'white',
          borderRight: '1px solid #E5E7EB',
          padding: '1rem'
        }}>
          <button style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: '#6D28D9',
            color: 'white',
            borderRadius: '4px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500',
            marginBottom: '1.5rem'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Chat
          </button>
          
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ 
              margin: '0 0 0.5rem 0', 
              fontSize: '0.75rem', 
              fontWeight: '500',
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Recent Chats
            </p>
            
            <div style={{
              padding: '0.75rem',
              borderRadius: '4px',
              background: '#EDE9FE',
              marginBottom: '0.5rem',
              cursor: 'pointer'
            }}>
              <p style={{ 
                margin: '0', 
                fontWeight: '500',
                color: '#6D28D9'
              }}>
                Sun in Taurus meaning
              </p>
              <p style={{ 
                margin: '0.25rem 0 0 0', 
                fontSize: '0.75rem',
                color: '#6B7280'
              }}>
                Just now
              </p>
            </div>
            
            <div style={{
              padding: '0.75rem',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              cursor: 'pointer'
            }}>
              <p style={{ 
                margin: '0', 
                fontWeight: '500'
              }}>
                Career transit analysis
              </p>
              <p style={{ 
                margin: '0.25rem 0 0 0', 
                fontSize: '0.75rem',
                color: '#6B7280'
              }}>
                Yesterday
              </p>
            </div>
            
            <div style={{
              padding: '0.75rem',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              cursor: 'pointer'
            }}>
              <p style={{ 
                margin: '0', 
                fontWeight: '500'
              }}>
                Saturn return questions
              </p>
              <p style={{ 
                margin: '0.25rem 0 0 0', 
                fontSize: '0.75rem',
                color: '#6B7280'
              }}>
                3 days ago
              </p>
            </div>
          </div>
        </div>
        
        {/* Chat Main */}
        <div style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#F9FAFB'
        }}>
          {/* Messages */}
          <div style={{ 
            flexGrow: 1, 
            padding: '1.5rem', 
            overflowY: 'auto'
          }}>
            {mockMessages.map(message => (
              <div 
                key={message.id}
                style={{
                  marginBottom: '1.5rem',
                  display: 'flex'
                }}
              >
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  marginRight: '1rem',
                  background: message.role === 'assistant' ? '#6D28D9' : '#E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: message.role === 'assistant' ? 'white' : '#4B5563',
                  fontWeight: 'bold',
                  flexShrink: 0,
                  fontSize: '0.75rem'
                }}>
                  {message.role === 'assistant' ? 'AI' : 'JD'}
                </div>
                <div style={{
                  background: 'white',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  maxWidth: '85%'
                }}>
                  <p style={{ 
                    margin: 0,
                    whiteSpace: 'pre-wrap'
                  }}>
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Input */}
          <div style={{
            borderTop: '1px solid #E5E7EB',
            padding: '1rem 1.5rem',
            background: 'white'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative'
            }}>
              <input 
                type="text" 
                placeholder="Ask about your birth chart..."
                style={{
                  width: '100%',
                  padding: '0.75rem 3rem 0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #D1D5DB',
                  outline: 'none',
                  fontSize: '1rem'
                }}
              />
              <button style={{
                position: 'absolute',
                right: '0.75rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6D28D9'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
            
            <div style={{
              marginTop: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6B7280',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                  </svg>
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6B7280',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </button>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <input 
                    type="checkbox" 
                    id="includeChart" 
                    style={{ cursor: 'pointer' }}
                    defaultChecked={true}
                  />
                  <label 
                    htmlFor="includeChart" 
                    style={{ 
                      fontSize: '0.875rem', 
                      color: '#6B7280',
                      cursor: 'pointer'
                    }}
                  >
                    Include my chart context
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}