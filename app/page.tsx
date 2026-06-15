'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashScreen() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Fade in
    const showTimer = setTimeout(() => setVisible(true), 100)

    // Start fade out after 2.2s
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200)

    // Redirect after 2.8s
    const redirectTimer = setTimeout(() => {
      router.replace('/home')
    }, 2800)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(fadeTimer)
      clearTimeout(redirectTimer)
    }
  }, [router])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f2027 0%, #1a3a2a 50%, #0f2027 100%)',
        opacity: fadeOut ? 0 : visible ? 1 : 0,
        transition: fadeOut
          ? 'opacity 0.6s ease-out'
          : 'opacity 0.5s ease-in',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Círculos decorativos de fundo */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)',
        top: '-100px',
        right: '-100px',
        animation: 'pulse 3s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)',
        bottom: '-80px',
        left: '-80px',
        animation: 'pulse 3s ease-in-out infinite 1.5s',
      }} />

      {/* Container central */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        transform: visible && !fadeOut ? 'translateY(0)' : 'translateY(16px)',
        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        {/* Logo / Ícone */}
        <div style={{
          width: '96px',
          height: '96px',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 40px rgba(52,211,153,0.5), 0 20px 60px rgba(0,0,0,0.4)',
          fontSize: '48px',
          animation: 'floatLogo 3s ease-in-out infinite',
        }}>
          🌿
        </div>

        {/* Nome */}
        <div style={{
          fontFamily: '"Inter", "Geist", system-ui, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #34d399 0%, #6ee7b7 50%, #a7f3d0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.1,
          textAlign: 'center',
        }}>
          FitoEdu
        </div>

        {/* Linha divisora animada */}
        <div style={{
          width: visible && !fadeOut ? '120px' : '0px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #34d399, transparent)',
          borderRadius: '2px',
          transition: 'width 0.8s ease 0.4s',
        }} />

        {/* Frase de impacto */}
        <p style={{
          fontFamily: '"Inter", "Geist", system-ui, sans-serif',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          fontWeight: 400,
          color: 'rgba(167, 243, 208, 0.8)',
          letterSpacing: '0.05em',
          textAlign: 'center',
          maxWidth: '320px',
          lineHeight: 1.6,
          margin: 0,
        }}>
          Aprendendo com a natureza,<br />
          <span style={{ color: '#34d399', fontWeight: 600 }}>crescendo com o conhecimento.</span>
        </p>
      </div>

      {/* Indicador de carregamento */}
      <div style={{
        position: 'absolute',
        bottom: '48px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#34d399',
              opacity: 0.4,
              animation: `dotPulse 1.2s ease-in-out infinite ${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.7; }
        }
        @keyframes floatLogo {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes dotPulse {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.3; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  )
}