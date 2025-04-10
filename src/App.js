import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import EmailForm from './components/EmailForm';
import './App.css';

function App() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const effect = NET({
      el: vantaRef.current,
      THREE,
      color: 0x8b5cf6,
      backgroundColor: 0x000000,
      points: 10.0,
      maxDistance: 20.0,
      spacing: 15.0,
    });
    return () => {
      effect && effect.destroy();
    };
  }, []);

  return (
    <div className="App" ref={vantaRef}>
      <EmailForm />
    </div>
  );
}

export default App;
