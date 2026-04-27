import { Outlet } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';

export default function AppLayout() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-base)',
      position: 'relative',
      overflow: 'hidden'
    }} className="premium-gradient-bg">
      {/* Decorative Orbs */}
      <div className="orb orb-accent" style={{ width: 400, height: 400, top: -100, right: -100, opacity: 0.03 }} />
      <div className="orb orb-violet" style={{ width: 400, height: 400, bottom: -100, left: -100, opacity: 0.03 }} />
      
      <AppNavbar />
      
      <main style={{ 
        paddingTop: '80px', // More space for fixed navbar
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ 
          maxWidth: 1200, 
          width: '100%', 
          margin: '0 auto', 
          padding: '0 40px 60px',
          flex: 1,
          position: 'relative',
          zIndex: 1
        }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
