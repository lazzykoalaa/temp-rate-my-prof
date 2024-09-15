import './App.css';
import ChatInput from './components/ChatInput'; 


function App() {
  const features = [
    { title: 'Real-Time Feedback', description: 'Instant feedback powered by AI for accurate and timely insights.' },
    { title: 'Generative AI Insights', description: 'Leverage the power of OpenAI to analyze and synthesize feedback.' },
    { title: 'Vector Database Retrieval', description: 'Advanced retrieval system with Pinecone for optimized performance.' },
    { title: 'Personalized Ratings', description: 'Get ratings tailored to your preferences and learning needs.' },
    { title: 'Next.js Powered', description: 'Fast and responsive platform built with Next.js for smooth experience.' },
  ];

  return (
    <div className="App">    
      <div className="main">
          <div className="home-page">
            
      <header className="header" >
        <div className="logo">
          <img src="../main-logo.png" alt="Lazzy Koalaa Logo" className="logo-img" />
        </div>
        <h1 className="title">Lazzy Koalaa</h1>
      </header>

      <main className="main-content">
        <h2 className="sub-title">Welcome to LazzyAI!</h2>
        <p className="description">
          Use our AI-driven platform to share your feedback and get real-time insights
          on teacher performance. Powered by cutting-edge Generative AI and vector databases.
        </p>

        

        <div className="features-container">
      <div className="features-row">
        {features.slice(0, 2).map((feature, index) => (
          <div key={index} className="feature-box">
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="features-row">
        {features.slice(2, 4).map((feature, index) => (
          <div key={index} className="feature-box">
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="centered-box">
        {features.slice(4).map((feature, index) => (
          <div key={index} className="feature-box">
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>

        {/* <button className="start-button">Get Started</button> */}
      </main>
    
    </div>

      <main>
        <ChatInput />  
      </main>
    </div>
    </div>
  );
}

export default App;