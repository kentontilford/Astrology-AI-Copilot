export default function PersonalDashboard() {
  // Mock astrological data
  const mockData = {
    date: new Date().toLocaleDateString(),
    user: {
      name: "Jane Doe",
      profile: {
        birthDate: "May 15, 1985",
        birthTime: "7:30 AM",
        birthLocation: "New York, NY"
      }
    },
    insights: [
      {
        title: "Career Opportunities",
        description: "Jupiter's transit through your 10th house brings favorable opportunities for career advancement.",
        favorability: "very_favorable"
      },
      {
        title: "Emotional Wellbeing",
        description: "The Moon in Cancer in your 4th house brings focus to your home life and emotional foundations.",
        favorability: "favorable"
      },
      {
        title: "Relationships",
        description: "Venus in your 7th house highlights partnerships, but square to Mars suggests potential tension.",
        favorability: "neutral"
      },
      {
        title: "Personal Growth",
        description: "Saturn in your 1st house challenges you to redefine your identity and personal goals.",
        favorability: "challenging"
      },
      {
        title: "Communication",
        description: "Mercury retrograde in your 3rd house may lead to miscommunications and delays.",
        favorability: "very_challenging"
      },
      {
        title: "Creative Expression",
        description: "The Sun in your 5th house encourages creative pursuits and self-expression.",
        favorability: "favorable"
      }
    ]
  };
  
  // Helper to get color based on favorability
  const getFavorabilityColor = (favorability) => {
    switch(favorability) {
      case 'very_favorable': return '#059669'; // green
      case 'favorable': return '#10B981'; // light green
      case 'neutral': return '#6B7280'; // gray
      case 'challenging': return '#F59E0B'; // amber
      case 'very_challenging': return '#DC2626'; // red
      default: return '#6B7280'; // gray
    }
  };
  
  // Helper to get icon for favorability
  const getFavorabilityIcon = (favorability) => {
    switch(favorability) {
      case 'very_favorable': return '★★';
      case 'favorable': return '★';
      case 'neutral': return '◯';
      case 'challenging': return '▼';
      case 'very_challenging': return '▼▼';
      default: return '◯';
    }
  };
  
  return (
    <div style={{ 
      padding: '0', 
      margin: '0',
      fontFamily: "'Google Sans', 'Roboto', sans-serif",
      color: '#333',
      background: '#f9fafb',
      minHeight: '100vh'
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
              color: '#6D28D9', 
              textDecoration: 'none',
              fontWeight: 'bold',
              borderBottom: '2px solid #6D28D9',
              paddingBottom: '0.5rem'
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
              color: '#6B7280', 
              textDecoration: 'none'
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
      
      {/* Dashboard Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0 }}>Personal Growth Dashboard</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <p style={{ margin: 0, color: '#6B7280' }}>{mockData.date}</p>
              <select style={{ 
                padding: '0.5rem', 
                borderRadius: '4px', 
                border: '1px solid #D1D5DB' 
              }}>
                <option>Jane's Birth Chart</option>
                <option>Add New Profile</option>
              </select>
            </div>
          </div>
          <p style={{ color: '#6B7280', margin: '0.5rem 0 0 0' }}>
            Birth: {mockData.user.profile.birthDate} at {mockData.user.profile.birthTime} in {mockData.user.profile.birthLocation}
          </p>
        </div>
        
        {/* Insights Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem',
        }}>
          {mockData.insights.map((insight, index) => (
            <div 
              key={index}
              style={{
                background: 'white',
                borderRadius: '8px',
                padding: '1.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h3 style={{ margin: 0 }}>{insight.title}</h3>
                <span style={{ 
                  color: getFavorabilityColor(insight.favorability),
                  fontWeight: 'bold'
                }}>
                  {getFavorabilityIcon(insight.favorability)}
                </span>
              </div>
              <p style={{ margin: 0, color: '#4B5563' }}>{insight.description}</p>
              
              <div style={{ 
                marginTop: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#6D28D9',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.875rem'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                  Ask AI for more
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#6B7280',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.875rem'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                  More options
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}