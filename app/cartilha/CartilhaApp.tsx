"use client";

import { useState, useEffect, useCallback } from "react";
import PageController from "./PageController";
import Quiz from "./Quiz";
import LiftTheFlap, { type Flap } from "./LiftTheFlap";
/* ═══════════════════════════════════════════════════════
   CARTILHA STYLES — injected as a JSX <style> tag to
   avoid the broken @tailwindcss/postcss PostCSS pipeline
═══════════════════════════════════════════════════════ */
const CARTILHA_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&display=swap');

.cartilha-root *, .cartilha-root *::before, .cartilha-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

.cartilha-root {
  --c-verde-folha: #2E7D32;
  --c-verde-folha-dark: #1B5E20;
  --c-verde-claro: #66BB6A;
  --c-verde-light-bg: #E8F5E9;
  --c-amarelo: #FBC02D;
  --c-amarelo-dark: #F57F17;
  --c-amarelo-light: #FFF9C4;
  --c-white: #FFFFFF;
  --c-gray-50: #FAFAFA;
  --c-gray-100: #F5F5F5;
  --c-gray-200: #EEEEEE;
  --c-gray-700: #424242;
  --c-gray-800: #212121;
  --c-danger: #C62828;
  --c-danger-bg: #FFEBEE;
  --shadow-card: 0 4px 24px rgba(46,125,50,0.12);
  --shadow-btn: 0 2px 12px rgba(46,125,50,0.3);
  --shadow-quiz: 0 8px 32px rgba(0,0,0,0.10);
  --radius-card: 20px;
  --radius-btn: 14px;
  --radius-pill: 999px;
  --radius-icon: 12px;
  --transition: 0.25s cubic-bezier(0.34, 1.2, 0.64, 1);
  font-family: 'Poppins', system-ui, sans-serif;
  min-height: 100dvh;
  background: linear-gradient(160deg, #F1F8E9 0%, #E8F5E9 50%, #FAFFFE 100%);
  color: var(--c-gray-800);
  position: relative;
  overflow-x: hidden;
}

/* Offline banner */
.offline-banner { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: center; gap: 8px; background: var(--c-amarelo); color: var(--c-gray-800); font-size: 0.82rem; font-weight: 600; padding: 8px 16px; letter-spacing: 0.02em; animation: slideDown 0.4s ease; }
@keyframes slideDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }

/* Header */
.cartilha-header { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(46,125,50,0.12); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.cartilha-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.cartilha-brand-icon { width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, var(--c-verde-claro), var(--c-verde-folha)); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
.cartilha-brand-name { font-weight: 800; font-size: 1.1rem; background: linear-gradient(135deg, var(--c-verde-folha), var(--c-verde-claro)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; }
.cartilha-brand-sub { font-size: 0.65rem; color: var(--c-verde-folha); font-weight: 500; opacity: 0.8; line-height: 1; }

/* Page indicator dots */
.page-indicator { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; font-weight: 600; color: var(--c-verde-folha); }
.page-indicator-dots { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; max-width: 200px; }
.page-indicator-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--c-gray-200); transition: all 0.3s ease; flex-shrink: 0; }
.page-indicator-dot.active { background: var(--c-verde-folha); width: 18px; border-radius: var(--radius-pill); }
.page-indicator-dot.visited { background: var(--c-verde-claro); }

/* Progress bar */
.progress-bar-wrap { height: 3px; background: var(--c-gray-200); position: relative; overflow: hidden; }
.progress-bar-fill { height: 100%; background: linear-gradient(90deg, var(--c-verde-folha), var(--c-verde-claro), var(--c-amarelo)); transition: width 0.5s cubic-bezier(0.4,0,0.2,1); border-radius: 0 2px 2px 0; }

/* Page wrapper */
.cartilha-page-wrapper { max-width: 780px; margin: 0 auto; padding: 32px 20px 120px; animation: pageEnter 0.45s var(--transition) both; }
@keyframes pageEnter { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* Float animation */
@keyframes floatIcon { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

/* Cover page */
.cover-page { text-align: center; padding: 8px 0 24px; }
.cover-badge { display: inline-flex; align-items: center; gap: 6px; background: var(--c-verde-light-bg); color: var(--c-verde-folha-dark); font-size: 0.75rem; font-weight: 700; padding: 6px 16px; border-radius: var(--radius-pill); letter-spacing: 0.06em; text-transform: uppercase; border: 1px solid rgba(46,125,50,0.2); margin-bottom: 24px; }
.cover-illustration { width: 100%; max-width: 480px; margin: 0 auto 32px; border-radius: 24px; overflow: hidden; box-shadow: var(--shadow-card); position: relative; }
.cover-split { display: grid; grid-template-columns: 1fr 1fr; min-height: 260px; }
.cover-half { padding: 32px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; }
.cover-half.healthy { background: linear-gradient(135deg, #C8E6C9, #A5D6A7); }
.cover-half.sick { background: linear-gradient(135deg, #FFCDD2, #EF9A9A); }
.cover-half-icon { font-size: 52px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15)); animation: floatIcon 3s ease-in-out infinite; }
.cover-half.sick .cover-half-icon { animation-delay: -1.5s; }
.cover-half-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
.cover-half.healthy .cover-half-label { color: var(--c-verde-folha-dark); }
.cover-half.sick .cover-half-label { color: var(--c-danger); }
.cover-divider { display: flex; align-items: center; justify-content: center; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: white; border-radius: 50%; width: 40px; height: 40px; font-size: 12px; font-weight: 800; box-shadow: 0 2px 12px rgba(0,0,0,0.15); z-index: 2; }
.cover-title { font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; line-height: 1.1; color: var(--c-verde-folha-dark); margin-bottom: 12px; letter-spacing: -0.02em; }
.cover-title span { background: linear-gradient(135deg, var(--c-amarelo-dark), var(--c-amarelo)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.cover-subtitle { font-size: 1rem; color: var(--c-gray-700); line-height: 1.6; max-width: 440px; margin: 0 auto 20px; }
.cover-tags { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 8px; }
.cover-tag { background: rgba(46,125,50,0.1); color: var(--c-verde-folha); border: 1px solid rgba(46,125,50,0.2); border-radius: var(--radius-pill); font-size: 0.72rem; font-weight: 600; padding: 4px 12px; }

/* Content page */
.page-section-badge { display: inline-flex; align-items: center; gap: 6px; background: var(--c-verde-folha); color: white; font-size: 0.7rem; font-weight: 700; padding: 5px 14px; border-radius: var(--radius-pill); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 16px; }
.page-title { font-size: clamp(1.6rem, 4vw, 2.2rem); font-weight: 800; color: var(--c-verde-folha-dark); line-height: 1.2; margin-bottom: 8px; letter-spacing: -0.01em; }
.page-title .highlight { color: var(--c-amarelo-dark); }
.lead-text { font-size: 1rem; color: var(--c-gray-700); line-height: 1.75; margin-bottom: 24px; }

/* Callouts */
.callout { border-radius: 16px; padding: 20px 24px; margin: 20px 0; display: flex; gap: 16px; align-items: flex-start; }
.callout-green { background: var(--c-verde-light-bg); border: 1px solid rgba(46,125,50,0.2); }
.callout-yellow { background: var(--c-amarelo-light); border: 1px solid rgba(251,192,45,0.4); }
.callout-red { background: var(--c-danger-bg); border: 1px solid rgba(198,40,40,0.2); }
.callout-icon { font-size: 28px; flex-shrink: 0; line-height: 1; margin-top: 2px; }
.callout-content p { font-size: 0.9rem; line-height: 1.65; color: var(--c-gray-800); }
.callout-content strong { display: block; font-size: 0.95rem; font-weight: 700; margin-bottom: 6px; color: var(--c-verde-folha-dark); }
.callout-yellow .callout-content strong { color: var(--c-amarelo-dark); }
.callout-red .callout-content strong { color: var(--c-danger); }

/* Icon grid */
.icon-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 16px; margin: 24px 0; }
.icon-card { background: white; border: 1px solid rgba(46,125,50,0.14); border-radius: 16px; padding: 20px 12px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; transition: var(--transition); cursor: default; }
.icon-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-card); border-color: var(--c-verde-claro); }
.icon-card-emoji { font-size: 36px; line-height: 1; }
.icon-card-label { font-size: 0.75rem; font-weight: 600; color: var(--c-verde-folha); line-height: 1.3; text-align: center; }

/* Praga grid */
.praga-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; margin: 24px 0; }
.praga-card { background: white; border-radius: 18px; overflow: hidden; box-shadow: var(--shadow-card); border: 1px solid rgba(46,125,50,0.08); transition: var(--transition); }
.praga-card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(46,125,50,0.18); }
.praga-card-header { background: linear-gradient(135deg, var(--c-verde-folha), var(--c-verde-claro)); padding: 20px; text-align: center; font-size: 42px; }
.praga-card-body { padding: 14px 16px; }
.praga-card-title { font-weight: 700; font-size: 0.85rem; color: var(--c-verde-folha-dark); margin-bottom: 4px; }
.praga-card-desc { font-size: 0.75rem; color: var(--c-gray-700); line-height: 1.5; }

/* Impact cards */
.impact-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 24px 0; }
.impact-card { border-radius: 18px; padding: 22px 20px; position: relative; overflow: hidden; }
.impact-card-green { background: linear-gradient(135deg, var(--c-verde-folha), #388E3C); color: white; }
.impact-card-yellow { background: linear-gradient(135deg, var(--c-amarelo-dark), var(--c-amarelo)); color: var(--c-gray-800); }
.impact-card-dark { background: linear-gradient(135deg, #37474F, #546E7A); color: white; }
.impact-card::after { content: ''; position: absolute; width: 80px; height: 80px; border-radius: 50%; background: rgba(255,255,255,0.08); bottom: -20px; right: -20px; }
.impact-card-icon { font-size: 32px; margin-bottom: 10px; }
.impact-card-stat { font-size: 1.8rem; font-weight: 900; line-height: 1; margin-bottom: 4px; }
.impact-card-label { font-size: 0.78rem; font-weight: 600; opacity: 0.9; line-height: 1.4; }

/* Alert box */
.alert-box { background: linear-gradient(135deg, #B71C1C, #C62828); color: white; border-radius: 18px; padding: 24px; margin: 24px 0; display: flex; gap: 16px; align-items: flex-start; box-shadow: 0 8px 24px rgba(198,40,40,0.3); position: relative; overflow: hidden; }
.alert-box::before { content: ''; position: absolute; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,0.05); top: -80px; right: -60px; }
.alert-box-icon { font-size: 36px; flex-shrink: 0; }
.alert-box-title { font-size: 1rem; font-weight: 800; margin-bottom: 6px; }
.alert-box-text { font-size: 0.85rem; line-height: 1.65; opacity: 0.93; }

/* Orgao list */
.orgao-list { display: flex; flex-direction: column; gap: 12px; margin: 24px 0; }
.orgao-item { background: white; border: 1px solid rgba(46,125,50,0.14); border-radius: 16px; padding: 16px 20px; display: flex; gap: 14px; align-items: flex-start; transition: var(--transition); }
.orgao-item:hover { border-color: var(--c-verde-claro); box-shadow: var(--shadow-card); }
.orgao-icon { width: 44px; height: 44px; border-radius: var(--radius-icon); background: linear-gradient(135deg, var(--c-verde-folha), var(--c-verde-claro)); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
.orgao-name { font-weight: 700; font-size: 0.9rem; color: var(--c-verde-folha-dark); margin-bottom: 4px; }
.orgao-desc { font-size: 0.78rem; color: var(--c-gray-700); line-height: 1.5; }

/* Praticas list */
.pratica-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin: 24px 0; }
.pratica-item { background: white; border-radius: 16px; padding: 18px 16px; display: flex; gap: 12px; align-items: flex-start; border: 1px solid rgba(46,125,50,0.12); transition: var(--transition); }
.pratica-item:hover { background: var(--c-verde-light-bg); border-color: var(--c-verde-claro); }
.pratica-num { width: 28px; height: 28px; border-radius: 50%; background: var(--c-verde-folha); color: white; font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pratica-text { font-size: 0.82rem; color: var(--c-gray-800); line-height: 1.55; font-weight: 500; }

/* Case hero */
.case-hero { border-radius: 20px; overflow: hidden; margin-bottom: 24px; position: relative; }
.case-hero-inner { padding: 40px 32px; display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
.case-hero-emoji { font-size: 72px; filter: drop-shadow(0 6px 16px rgba(0,0,0,0.2)); flex-shrink: 0; animation: floatIcon 4s ease-in-out infinite; }
.case-hero-content { flex: 1; min-width: 180px; }
.case-hero-content h1, .case-hero-content h2 { font-size: clamp(1.2rem, 3vw, 1.6rem); font-weight: 800; margin-bottom: 6px; line-height: 1.2; }
.case-hero-content p { font-size: 0.88rem; line-height: 1.6; opacity: 0.9; }
.case-hero-green { background: linear-gradient(135deg, #2E7D32, #66BB6A); color: white; }
.case-hero-amber { background: linear-gradient(135deg, #E65100, #FF8F00); color: white; }
.case-hero-teal { background: linear-gradient(135deg, #00695C, #26A69A); color: white; }
.case-details { background: white; border-radius: 18px; border: 1px solid rgba(46,125,50,0.12); padding: 24px; margin-bottom: 16px; }
.case-details-title { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; color: var(--c-verde-folha); margin-bottom: 12px; }
.case-detail-row { display: flex; gap: 12px; margin-bottom: 12px; align-items: flex-start; font-size: 0.83rem; line-height: 1.55; color: var(--c-gray-800); }
.case-detail-row:last-child { margin-bottom: 0; }
.case-detail-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }

/* Impact hero (p11) */
.impact-hero { background: linear-gradient(135deg, var(--c-verde-folha-dark), var(--c-verde-folha)); border-radius: 24px; padding: 40px 32px; text-align: center; color: white; margin-bottom: 24px; position: relative; overflow: hidden; }
.impact-hero::before { content: ''; position: absolute; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,0.04); top: -80px; right: -80px; }
.impact-hero-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; background: rgba(255,255,255,0.2); padding: 5px 14px; border-radius: var(--radius-pill); display: inline-block; margin-bottom: 16px; }
.impact-hero-phrase { font-size: clamp(1.4rem, 3.5vw, 2rem); font-weight: 900; line-height: 1.2; margin-bottom: 8px; }
.impact-hero-phrase .impact-accent { color: var(--c-amarelo); }
.impact-hero-sub { font-size: 0.9rem; opacity: 0.85; line-height: 1.65; max-width: 440px; margin: 12px auto 0; }

/* Chain items */
.chain-items { display: flex; flex-direction: column; gap: 0; margin: 24px 0; }
.chain-item { display: flex; align-items: center; gap: 14px; padding: 8px 0; }
.chain-connector { display: flex; flex-direction: column; align-items: center; width: 36px; flex-shrink: 0; }
.chain-dot { width: 14px; height: 14px; border-radius: 50%; background: var(--c-verde-folha); flex-shrink: 0; }
.chain-line { width: 2px; height: 28px; background: linear-gradient(to bottom, var(--c-verde-folha), var(--c-verde-claro)); margin: 0 auto; }
.chain-icon { font-size: 28px; flex-shrink: 0; }
.chain-text { font-size: 0.88rem; color: var(--c-gray-800); line-height: 1.5; font-weight: 500; }

/* Quiz */
.quiz-header-section { text-align: center; padding: 16px 0 32px; }
.quiz-icon-big { font-size: 56px; display: block; margin-bottom: 12px; animation: floatIcon 3s ease-in-out infinite; }
.quiz-progress-bar { height: 8px; background: var(--c-gray-200); border-radius: var(--radius-pill); overflow: hidden; margin: 20px 0; }
.quiz-progress-fill { height: 100%; background: linear-gradient(90deg, var(--c-verde-folha), var(--c-verde-claro)); border-radius: var(--radius-pill); transition: width 0.5s ease; }
.quiz-question-card { background: white; border-radius: 20px; padding: 28px 24px; box-shadow: var(--shadow-quiz); border: 1px solid rgba(46,125,50,0.1); margin-bottom: 20px; animation: pageEnter 0.35s var(--transition) both; }
.quiz-q-num { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--c-verde-folha); margin-bottom: 10px; }
.quiz-question-text { font-size: 1rem; font-weight: 700; color: var(--c-gray-800); line-height: 1.5; margin-bottom: 20px; }
.quiz-options { display: flex; flex-direction: column; gap: 10px; }
.quiz-option { width: 100%; display: flex; align-items: center; gap: 12px; padding: 14px 18px; background: var(--c-gray-50); border: 2px solid var(--c-gray-200); border-radius: 14px; cursor: pointer; font-family: 'Poppins', sans-serif; font-size: 0.85rem; font-weight: 500; color: var(--c-gray-800); text-align: left; transition: all 0.2s ease; position: relative; }
.quiz-option:hover:not(:disabled) { border-color: var(--c-verde-claro); background: var(--c-verde-light-bg); transform: translateX(4px); }
.quiz-option.selected { border-color: var(--c-verde-folha); background: var(--c-verde-light-bg); }
.quiz-option.correct { border-color: #2E7D32; background: #E8F5E9; color: #1B5E20; }
.quiz-option.wrong { border-color: #C62828; background: #FFEBEE; color: #B71C1C; }
.quiz-option-letter { width: 28px; height: 28px; border-radius: 50%; background: var(--c-gray-200); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; flex-shrink: 0; transition: all 0.2s ease; }
.quiz-option.selected .quiz-option-letter, .quiz-option.correct .quiz-option-letter { background: var(--c-verde-folha); color: white; }
.quiz-option.wrong .quiz-option-letter { background: var(--c-danger); color: white; }
.quiz-option-feedback { margin-left: auto; font-size: 18px; flex-shrink: 0; }
.quiz-nav { display: flex; gap: 12px; margin-top: 8px; flex-wrap: wrap; }
.btn-quiz-next { flex: 1; padding: 14px 24px; background: linear-gradient(135deg, var(--c-verde-folha), var(--c-verde-claro)); color: white; border: none; border-radius: var(--radius-btn); font-family: 'Poppins', sans-serif; font-size: 0.9rem; font-weight: 700; cursor: pointer; transition: var(--transition); box-shadow: var(--shadow-btn); }
.btn-quiz-next:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(46,125,50,0.4); }
.btn-quiz-next:disabled { opacity: 0.5; cursor: not-allowed; }

/* Quiz result */
.quiz-result { text-align: center; padding: 24px 0; animation: pageEnter 0.5s var(--transition) both; }
.quiz-result-trophy { font-size: 72px; margin-bottom: 16px; display: block; }
.result-score-ring { width: 140px; height: 140px; border-radius: 50%; border: 8px solid var(--c-verde-light-bg); display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 20px auto; background: white; box-shadow: 0 0 0 4px var(--c-verde-folha), 0 12px 32px rgba(46,125,50,0.2); }
.result-score-num { font-size: 2.4rem; font-weight: 900; color: var(--c-verde-folha-dark); line-height: 1; }
.result-score-label { font-size: 0.72rem; font-weight: 600; color: var(--c-gray-700); }
.result-message { font-size: 1.1rem; font-weight: 700; color: var(--c-verde-folha-dark); margin: 12px 0 8px; }
.result-sub { font-size: 0.85rem; color: var(--c-gray-700); line-height: 1.65; max-width: 380px; margin: 0 auto 24px; }
.result-stars { font-size: 28px; letter-spacing: 4px; margin-bottom: 24px; }
.btn-retry { padding: 12px 28px; background: transparent; border: 2px solid var(--c-verde-folha); color: var(--c-verde-folha); border-radius: var(--radius-btn); font-family: 'Poppins', sans-serif; font-size: 0.88rem; font-weight: 700; cursor: pointer; transition: var(--transition); }
.btn-retry:hover { background: var(--c-verde-folha); color: white; transform: translateY(-2px); }

/* Final page */
.final-page { text-align: center; }
.final-hero { background: linear-gradient(160deg, #1B5E20, #2E7D32, #66BB6A); border-radius: 24px; padding: 48px 32px; color: white; margin-bottom: 28px; position: relative; overflow: hidden; }
.final-hero::before { content: ''; position: absolute; border-radius: 50%; background: rgba(255,255,255,0.04); width: 250px; height: 250px; top: -80px; right: -60px; }
.final-emoji { font-size: 64px; display: block; margin-bottom: 16px; animation: floatIcon 3s ease-in-out infinite; }
.final-title { font-size: clamp(1.6rem, 4vw, 2.2rem); font-weight: 900; line-height: 1.2; margin-bottom: 12px; }
.final-sub { font-size: 0.9rem; opacity: 0.9; line-height: 1.7; max-width: 440px; margin: 0 auto; }
.final-pillars { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 14px; margin: 0 0 24px; }
.final-pillar { background: white; border-radius: 16px; padding: 20px 14px; text-align: center; border: 1px solid rgba(46,125,50,0.14); transition: var(--transition); }
.final-pillar:hover { transform: translateY(-4px); box-shadow: var(--shadow-card); }
.final-pillar-icon { font-size: 32px; margin-bottom: 8px; display: block; }
.final-pillar-label { font-size: 0.78rem; font-weight: 700; color: var(--c-verde-folha-dark); }
.final-pillar-sub { font-size: 0.68rem; color: var(--c-gray-700); margin-top: 4px; line-height: 1.4; }
.final-cta { background: var(--c-amarelo); border-radius: 18px; padding: 24px 28px; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.final-cta-text { font-size: 1rem; font-weight: 800; color: var(--c-gray-800); }
.final-cta-sub { font-size: 0.82rem; color: var(--c-gray-700); }

/* Nav bar */
.page-nav-bar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 50; background: rgba(255,255,255,0.95); backdrop-filter: blur(16px); border-top: 1px solid rgba(46,125,50,0.12); padding: 12px 20px 20px; }
.page-nav-inner { max-width: 780px; margin: 0 auto; display: flex; align-items: center; gap: 12px; }
.nav-btn { display: flex; align-items: center; gap: 6px; padding: 11px 20px; border-radius: var(--radius-btn); font-family: 'Poppins', sans-serif; font-size: 0.82rem; font-weight: 700; cursor: pointer; border: 2px solid transparent; transition: var(--transition); white-space: nowrap; flex-shrink: 0; }
.nav-btn-prev { background: transparent; border-color: var(--c-verde-folha); color: var(--c-verde-folha); }
.nav-btn-prev:hover:not(:disabled) { background: var(--c-verde-light-bg); transform: translateX(-2px); }
.nav-btn-next { flex: 1; justify-content: center; background: linear-gradient(135deg, var(--c-verde-folha), var(--c-verde-claro)); color: white; box-shadow: var(--shadow-btn); }
.nav-btn-next:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(46,125,50,0.4); }
.nav-btn:disabled { opacity: 0.3; cursor: not-allowed; transform: none !important; }
.nav-page-text { font-size: 0.72rem; color: var(--c-verde-folha); font-weight: 600; text-align: center; flex-shrink: 0; min-width: 56px; }

/* Utility */
.divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(46,125,50,0.2), transparent); margin: 24px 0; }
.section-heading { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; color: var(--c-verde-folha); margin-bottom: 12px; }

/* ══════════════════════════════════════════════════════
   LIFT THE FLAP — ACCORDION (grid-template-rows)
   ──────────────────────────────────────────────────────
   No position:absolute. Content grows inside its own
   grid cell, pushing siblings down naturally.
   One flap open at a time (accordion mode).
══════════════════════════════════════════════════════ */

/* Root wrapper */
.ltf-root { width: 100%; }

/* Instruction hint row */
.ltf-hint-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;
  background: rgba(46,125,50,0.06);
  border: 1px solid rgba(46,125,50,0.14);
  border-radius: 14px;
  padding: 12px 18px;
}
.ltf-hint-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
.ltf-hint-text {
  font-family: 'Poppins', sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--c-gray-700);
  line-height: 1.55;
}

/* ── Stable CSS Grid ── */
.ltf-grid {
  display: grid;
  /* columns injected via inline style from props */
  gap: 1rem;
  align-items: start;   /* cards don't stretch to match each other's height */
}

/* ── Card shell ── */
.ltf-card {
  border-radius: 16px;
  overflow: hidden;                /* ensures body clips cleanly during animation */
  border: 2px solid rgba(46,125,50,0.16);
  background: #fff;
  box-shadow: 0 2px 10px rgba(46,125,50,0.08);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.ltf-card--open {
  border-color: var(--c-verde-claro);
  box-shadow: 0 6px 24px rgba(46,125,50,0.18);
}

/* ── Flap (header button — always visible) ── */
.ltf-flap {
  /* Reset button defaults */
  appearance: none;
  border: none;
  margin: 0;
  /* Layout */
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  /* Visual */
  background: linear-gradient(135deg, var(--c-verde-folha), #388E3C);
  cursor: pointer;
  /* Typography */
  font-family: 'Poppins', sans-serif;
  text-align: left;
  /* Transition */
  transition: background 0.2s ease;
}
.ltf-flap:hover { background: linear-gradient(135deg, #245c27, var(--c-verde-folha)); }
.ltf-flap:focus-visible {
  outline: 3px solid var(--c-amarelo);
  outline-offset: -2px;
  border-radius: 0;
}

/* Emoji */
.ltf-flap-emoji {
  font-size: 28px;
  line-height: 1;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.18));
  transition: transform 0.3s ease;
}
.ltf-flap--open .ltf-flap-emoji { transform: scale(1.12); }

/* Title */
.ltf-flap-label {
  flex: 1;
  font-size: 0.87rem;
  font-weight: 700;         /* Bold — RF tipografia */
  color: #fff;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

/* Chevron */
.ltf-flap-chevron {
  font-size: 11px;
  color: rgba(255,255,255,0.75);
  flex-shrink: 0;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
}
.ltf-flap-chevron--open { transform: rotate(-180deg); }

/* ── Body — grid-template-rows accordion ──
   Technique:
     - Outer .ltf-body animates grid-template-rows: 0fr → 1fr
     - Inner .ltf-body-inner has overflow:hidden + min-height:0
       (required for 0fr to actually clip the content)
   This produces a smooth expand without max-height jank and
   NO absolute/float positioning that could break document flow.
── */
.ltf-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.38s cubic-bezier(0.4, 0, 0.2, 1);
  /* Accent colours set via CSS custom props from inline style */
  background: var(--ltf-bg, linear-gradient(145deg,#E8F5E9,#F1F8E9));
  border-top: 2px solid transparent;
  transition: grid-template-rows 0.38s cubic-bezier(0.4, 0, 0.2, 1),
              border-top-color 0.25s ease;
}
.ltf-body--open {
  grid-template-rows: 1fr;
  border-top-color: var(--ltf-border, #66BB6A);
}

/* Required clip container */
.ltf-body-inner {
  overflow: hidden;
  min-height: 0;      /* critical: allows 0fr to collapse to zero */
}

/* Content area — generous padding so text never touches the border */
.ltf-content {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 20px 24px 24px;
}
.ltf-content-icon {
  font-size: 22px;
  flex-shrink: 0;
  opacity: 0.45;
  margin-top: 3px;
  line-height: 1;
}
.ltf-content-text {
  font-family: 'Poppins', sans-serif;
  font-size: 0.86rem;
  font-weight: 400;     /* Regular — RF tipografia */
  color: var(--c-gray-800);
  line-height: 1.72;
}

/* ── Lapbook page header card ── */
.lapbook-header {
  background: linear-gradient(135deg, #1B5E20, var(--c-verde-folha));
  border-radius: 20px;
  padding: 28px 24px;
  color: white;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
}
.lapbook-header::after {
  content: '';
  position: absolute;
  width: 180px; height: 180px;
  border-radius: 50%;
  background: rgba(255,255,255,0.05);
  bottom: -60px; right: -40px;
}
.lapbook-badge {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  background: rgba(255,255,255,0.2);
  padding: 4px 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}
.lapbook-title {
  font-size: clamp(1.3rem, 3.5vw, 1.9rem);
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 6px;
  letter-spacing: -0.02em;
}
.lapbook-sub {
  font-size: 0.85rem;
  opacity: 0.85;
  line-height: 1.65;
}

/* ── Responsive ── */
@media (max-width: 500px) {
  .cartilha-page-wrapper { padding: 20px 14px 110px; }
  .cover-split { min-height: 200px; }
  .icon-grid { grid-template-columns: repeat(2, 1fr); }
  .praga-grid { grid-template-columns: repeat(2, 1fr); }
  .impact-cards { grid-template-columns: 1fr; }
  .case-hero-inner { padding: 28px 20px; }
  .case-hero-emoji { font-size: 52px; }
  .nav-btn-prev { padding: 11px 14px; }
  /* Lapbook: force single column on narrow screens */
  .ltf-grid { grid-template-columns: 1fr !important; }
  .ltf-flap { padding: 14px 16px; }
  .ltf-flap-emoji { font-size: 24px; }
  .ltf-flap-label { font-size: 0.82rem; }
  .ltf-content { padding: 16px 18px 20px; gap: 10px; }
}

`;

/* ═══════════════════════════════════════════════════════
   Individual Page Components
═══════════════════════════════════════════════════════ */

function PageCover() {
  return (
    <div className="cover-page">
      <div className="cover-badge">📚 Cartilha Educativa — EducaFito</div>

      <div className="cover-illustration">
        <div className="cover-split">
          <div className="cover-half healthy">
            <span className="cover-half-icon">🌿</span>
            <span className="cover-half-label">Planta Saudável</span>
          </div>
          <div className="cover-divider" aria-hidden="true">
            VS
          </div>
          <div className="cover-half sick">
            <span className="cover-half-icon">🍂</span>
            <span className="cover-half-label">Planta Doente</span>
          </div>
        </div>
      </div>

      <h1 className="cover-title">
        Educação
        <br />
        <span>Fitossanitária</span>
        <br />
        para o Ensino Básico
      </h1>
      <p className="cover-subtitle">
        Aprenda de forma fácil e divertida como proteger as plantas, garantir
        nossa alimentação e preservar a natureza.
      </p>

      <div className="cover-tags">
        <span className="cover-tag">🌱 Fitossanidade</span>
        <span className="cover-tag">🔬 Ciência</span>
        <span className="cover-tag">🌾 Agricultura</span>
        <span className="cover-tag">🐛 Pragas</span>
        <span className="cover-tag">📍 Amapá</span>
      </div>
    </div>
  );
}

function Page01() {
  return (
    <div className="content-page">
      <div className="page-section-badge">📖 Apresentação</div>
      <h1 className="page-title">
        Você sabia que{" "}
        <span className="highlight">plantas também ficam doentes?</span>
      </h1>

      <div className="callout callout-green">
        <span className="callout-icon"><img src="/imgs/Dona Fito Corpo todo.png" alt="Dona Fito" width={200} height={200} /></span>
        <div className="callout-content">
          <strong>Olá, futuro(a) cientista!</strong>
          <p>
            Assim como nós, humanos, podemos ficar gripados ou com febre, as
            plantas também podem ser atacadas por &quot;vilões&quot; que as
            deixam fracas, feias e improdutivas. Esses vilões se chamam{" "}
            <strong>pragas e doenças</strong>.
          </p>
        </div>
      </div>

      <p className="lead-text">
        Nesta cartilha, você vai descobrir o mundo fascinante da{" "}
        <strong>Fitossanidade</strong> — a ciência que cuida da saúde das
        plantas. Vamos explorar juntos:
      </p>

      <div className="icon-grid">
        {[
          { emoji: "🦠", label: "O que são pragas e doenças" },
          { emoji: "🌾", label: "Como afetam a agricultura" },
          { emoji: "🛡️", label: "Como nos protegemos delas" },
          { emoji: "📍", label: "Casos reais do Amapá" },
        ].map(({ emoji, label }) => (
          <div key={label} className="icon-card">
            <span className="icon-card-emoji">{emoji}</span>
            <span className="icon-card-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="callout callout-yellow">
        <span className="callout-icon">💡</span>
        <div className="callout-content">
          <strong>Linguagem fácil para todos!</strong>
          <p>
            Esta cartilha foi criada especialmente para estudantes como você.
            Não precisamos ser cientistas para entender e ajudar a proteger as
            plantas da nossa região!
          </p>
        </div>
      </div>
    </div>
  );
}

function Page02() {
  return (
    <div className="content-page">
      <div className="page-section-badge">🔬 Conceito Base</div>
      <h1 className="page-title">
        O que é <span className="highlight">Fitossanidade?</span>
      </h1>

      <p className="lead-text">
        A palavra <strong>Fitossanidade</strong> vem do grego <em>phytón</em>{" "}
        (planta) e do latim <em>sanitas</em> (saúde). É a área da ciência que
        cuida da saúde das plantas e garante que elas cresçam fortes e
        produtivas.
      </p>

      <div className="icon-grid">
        {[
          { emoji: "🔭", label: "Estuda pragas e doenças das plantas" },
          { emoji: "🛡️", label: "Previne e controla infestações" },
          { emoji: "🌐", label: "Protege fronteiras e rotas de comércio" },
          { emoji: "🤝", label: "Une ciência e agricultura" },
          { emoji: "🍽️", label: "Garante alimentos saudáveis na mesa" },
          { emoji: "🌍", label: "Preserva a biodiversidade" },
        ].map(({ emoji, label }) => (
          <div key={label} className="icon-card">
            <span className="icon-card-emoji">{emoji}</span>
            <span className="icon-card-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="divider" />
      <p className="section-heading">Por que é importante?</p>
      <p className="lead-text">
        Sem Fitossanidade, pragas e doenças se espalhariam livremente pelas
        lavouras, destruindo colheitas inteiras. Isso significaria{" "}
        <strong>menos comida</strong>, <strong>aumento de preços</strong> e{" "}
        <strong>danos ao meio ambiente</strong>.
      </p>

      <div className="callout callout-green">
        <span className="callout-icon">🌱</span>
        <div className="callout-content">
          <strong>Curiosidade!</strong>
          <p>
            O Brasil é um dos maiores exportadores agrícolas do mundo. Por isso,
            cuidar da saúde das plantas é também cuidar da economia de milhões
            de famílias brasileiras!
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Lapbook data ──────────────────────────────────────── */
const FLAPS_PRAGAS: Flap[] = [
  {
    id: "insetos",
    frontEmoji: "🦟",
    frontText: "O que são Insetos Praga?",
    backContent:
      "Gafanhotos, brocas, pulgões e mosca-branca atacam folhas, caules e frutos, reduzindo drasticamente a produção agrícola.",
    backAccent: "green",
  },
  {
    id: "acaros",
    frontEmoji: "🕷️",
    frontText: "O que são Ácaros?",
    backContent:
      "Minúsculos artrópodes que sugam a seiva das plantas, causando amarelamento, queda de folhas e até a morte da planta. Difíceis de ver a olho nu!",
    backAccent: "yellow",
  },
  {
    id: "microorg",
    frontEmoji: "🦠",
    frontText: "O que são Microrganismos Fitopatogênicos?",
    backContent:
      "Fungos, bactérias e vírus que causam podridões, manchas, murchas e morte das plantas. São invisíveis — mas causam estragos enormes nas lavouras.",
    backAccent: "red",
  },
  {
    id: "invasoras",
    frontEmoji: "🌿",
    frontText: "O que são Plantas Invasoras?",
    backContent:
      'Ervas daninhas que competem com as culturas por água, luz e nutrientes do solo — "roubando" os recursos que a planta cultivada precisa para crescer.',
    backAccent: "teal",
  },
  {
    id: "quarent",
    frontEmoji: "🚨",
    frontText: "O que é uma Praga Quarentenária?",
    backContent:
      "Praga de altíssimo risco econômico, ausente ou com distribuição restrita no país. Sujeita a controle oficial rigoroso pelo MAPA para evitar sua entrada.",
    backAccent: "red",
  },
  {
    id: "vassoura",
    frontEmoji: "🌾",
    frontText: "O que é a Vassoura-de-bruxa?",
    backContent:
      "Fungo (Moniliophthora perniciosa) que deforma os brotos da mandioca. Pode reduzir até 90% da produção em áreas infestadas no Amapá e Região Norte.",
    backAccent: "yellow",
  },
];

function Page03() {
  return (
    <div className="content-page">
      <div className="page-section-badge">🎴 Lapbook Interativo</div>

      <div className="lapbook-header">
        <span className="lapbook-badge">🐛 Conheça as Pragas</span>
        <h1 className="lapbook-title">
          Quais são os Tipos de Pragas Agrícolas?
        </h1>
        <p className="lapbook-sub">
          Levante cada aba e descubra o que são as principais ameaças às nossas
          plantações!
        </p>
      </div>

      <LiftTheFlap title="Conheça as Pragas" flaps={FLAPS_PRAGAS} columns={2} />

      <div className="callout callout-yellow" style={{ marginTop: 20 }}>
        <span className="callout-icon">⚠️</span>
        <div className="callout-content">
          <strong>Atenção!</strong>
          <p>
            Nem todo inseto é uma praga! Abelhas, joaninhas e vespinhas
            parasitoides são aliadas da lavoura. Conhecer os &quot;heróis&quot;
            e os &quot;vilões&quot; do campo é essencial!
          </p>
        </div>
      </div>
    </div>
  );
}

function Page04() {
  const impacts = [
    {
      icon: "📦",
      title: "Redução da produção",
      desc: "Pragas destroem partes ou toda a plantação, reduzindo drasticamente o volume colhido.",
    },
    {
      icon: "💸",
      title: "Aumento de custos",
      desc: "Agricultores gastam mais com agrotóxicos, replantio e trabalho para combater as pragas.",
    },
    {
      icon: "🚫",
      title: "Bloqueio de exportações",
      desc: "Produtos com pragas podem ser barrados na alfândega, gerando prejuízos aos produtores.",
    },
    {
      icon: "🌡️",
      title: "Mudanças climáticas agravam",
      desc: "O aquecimento global favorece a proliferação e expansão geográfica de pragas.",
    },
  ];

  return (
    <div className="content-page">
      <div className="page-section-badge">📉 Impacto</div>
      <h1 className="page-title">
        Como Pragas Afetam a <span className="highlight">Agricultura?</span>
      </h1>
      <p className="lead-text">
        O impacto das pragas vai muito além de plantas doentes — ele chega à
        nossa mesa, à nossa economia e ao meio ambiente:
      </p>

      <div className="impact-cards">
        <div className="impact-card impact-card-green">
          <div className="impact-card-icon">🌾</div>
          <div className="impact-card-stat">40%</div>
          <div className="impact-card-label">
            das colheitas mundiais são perdidas por pragas, segundo a FAO.
          </div>
        </div>
        <div className="impact-card impact-card-yellow">
          <div className="impact-card-icon">💰</div>
          <div className="impact-card-stat">R$ bi</div>
          <div className="impact-card-label">
            de prejuízo anual para o agronegócio brasileiro.
          </div>
        </div>
        <div className="impact-card impact-card-dark">
          <div className="impact-card-icon">🌍</div>
          <div className="impact-card-stat">Ecossistema</div>
          <div className="impact-card-label">
            em risco por introdução de espécies invasoras.
          </div>
        </div>
      </div>

      <p className="section-heading">Principais impactos</p>
      <div className="orgao-list">
        {impacts.map((item) => (
          <div key={item.title} className="orgao-item">
            <div className="orgao-icon">{item.icon}</div>
            <div>
              <p className="orgao-name">{item.title}</p>
              <p className="orgao-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Page05() {
  return (
    <div className="content-page">
      <div className="page-section-badge">🚨 Alerta Especial</div>
      <h1 className="page-title">
        O que são <span className="highlight">Pragas Quarentenárias?</span>
      </h1>
      <p className="lead-text">
        Imagine uma praga tão perigosa que poderia destruir toda a agricultura
        de um país se entrasse em suas fronteiras. É isso que define uma{" "}
        <strong>Praga Quarentenária</strong>:
      </p>

      <div className="alert-box" role="alert">
        <span className="alert-box-icon">🚨</span>
        <div>
          <p className="alert-box-title">Definição Oficial (MAPA)</p>
          <p className="alert-box-text">
            Praga quarentenária é aquela de importância econômica potencial para
            o país ameaçado, ainda não presente no território ou presente em
            área limitada, e sujeita ao controle oficial.
          </p>
        </div>
      </div>

      <div className="callout callout-yellow">
        <span className="callout-icon">🔍</span>
        <div className="callout-content">
          <strong>Por que o nome &quot;Quarentenária&quot;?</strong>
          <p>
            O termo vem de &quot;quarentena&quot; — o período de isolamento
            usado para evitar a propagação de doenças. Assim como fazemos
            quarentena para proteger as pessoas, fazemos quarentena
            fitossanitária para proteger as plantas!
          </p>
        </div>
      </div>

      <div className="divider" />
      <p className="section-heading">Exemplos no Brasil</p>

      <div
        className="praga-grid"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
      >
        {[
          {
            bg: "linear-gradient(135deg,#B71C1C,#C62828)",
            emoji: "🦟",
            title: "Mosca-da-carambola",
            desc: "Detectada no Amapá, ameaça frutas em todo o território nacional.",
          },
          {
            bg: "linear-gradient(135deg,#4A148C,#6A1B9A)",
            emoji: "🦠",
            title: "Huanglongbing (HLB)",
            desc: "Doença bacteriana devastadora para citros, presente em alguns estados.",
          },
          {
            bg: "linear-gradient(135deg,#E65100,#BF360C)",
            emoji: "🐝",
            title: "Vespa Velutina",
            desc: "Predadora de abelhas nativas, risco à polinização e à apicultura.",
          },
        ].map((p) => (
          <div key={p.title} className="praga-card">
            <div className="praga-card-header" style={{ background: p.bg }}>
              {p.emoji}
            </div>
            <div className="praga-card-body">
              <p className="praga-card-title">{p.title}</p>
              <p className="praga-card-desc">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Page06() {
  const orgaos = [
    {
      icon: "🏢",
      name: "MAPA — Ministério da Agricultura",
      desc: "Define as normas fitossanitárias e fiscaliza o comércio de plantas e sementes no Brasil.",
    },
    {
      icon: "🌍",
      name: "VIGIAGRO",
      desc: "Sistema de Vigilância Agropecuária que monitora portos, aeroportos e fronteiras terrestres.",
    },
    {
      icon: "🔬",
      name: "Embrapa",
      desc: "Pesquisa soluções tecnológicas para o controle de pragas e o desenvolvimento agrícola sustentável.",
    },
    {
      icon: "🏫",
      name: "Universidades e Institutos",
      desc: "Formam pesquisadores e engenheiros agrônomos, produzindo conhecimento científico aplicado.",
    },
    {
      icon: "👨‍🌾",
      name: "Extensionistas Rurais",
      desc: "Levam conhecimento técnico diretamente ao produtor rural, orientando boas práticas no campo.",
    },
    {
      icon: "🤝",
      name: "Você também pode ajudar!",
      desc: "Denunciar pragas desconhecidas, não transportar plantas sem verificar origem e aprender sobre o tema são formas de contribuir.",
    },
  ];

  return (
    <div className="content-page">
      <div className="page-section-badge">🏛️ Guardiões</div>
      <h1 className="page-title">
        Quem <span className="highlight">Cuida</span> da Fitossanidade?
      </h1>
      <p className="lead-text">
        Proteger as plantas de pragas é um trabalho coletivo! Vários
        profissionais e órgãos trabalham juntos para garantir a saúde das nossas
        lavouras:
      </p>

      <div className="orgao-list">
        {orgaos.map((o) => (
          <div key={o.name} className="orgao-item">
            <div className="orgao-icon">{o.icon}</div>
            <div>
              <p className="orgao-name">{o.name}</p>
              <p className="orgao-desc">{o.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const FLAPS_PROTECAO: Flap[] = [
  {
    id: "sementes",
    frontEmoji: "🌱",
    frontText: "O que são Sementes Certificadas?",
    backContent:
      "Sementes inspecionadas e aprovadas pelo MAPA, garantindo que estão livres de pragas, doenças e com alta capacidade de germinação. São a base de uma lavoura saudável!",
    backAccent: "green",
  },
  {
    id: "rotacao",
    frontEmoji: "🔄",
    frontText: "O que é Rotação de Culturas?",
    backContent:
      "Alternar diferentes espécies de plantas numa mesma área entre as safras. Isso quebra o ciclo de reprodução das pragas e melhora a saúde do solo.",
    backAccent: "teal",
  },
  {
    id: "biologico",
    frontEmoji: "🐝",
    frontText: "O que é Controle Biológico?",
    backContent:
      "Usar inimigos naturais das pragas — como joaninhas, vespinhas parasitoides e fungos entomopatogênicos — para controlá-las de forma sustentável, sem agrotóxicos.",
    backAccent: "green",
  },
  {
    id: "mip",
    frontEmoji: "🔬",
    frontText: "O que é o MIP?",
    backContent:
      "Manejo Integrado de Pragas: combina métodos biológicos, culturais e químicos de forma equilibrada, usando o mínimo de agrotóxico possível. É a abordagem mais moderna e sustentável.",
    backAccent: "yellow",
  },
  {
    id: "vigiagro",
    frontEmoji: "🛡️",
    frontText: "O que é o VIGIAGRO?",
    backContent:
      "Sistema de Vigilância Agropecuária Internacional do MAPA que fiscaliza portos, aeroportos e fronteiras terrestres do Brasil para impedir a entrada de pragas exóticas.",
    backAccent: "teal",
  },
  {
    id: "voce",
    frontEmoji: "🤝",
    frontText: "Como VOCÊ pode ajudar?",
    backContent:
      "Não transporte plantas, frutas ou terra sem verificar a origem. Compre produtos com selos de qualidade. Denuncie pragas desconhecidas ao MAPA. Cada atitude conta!",
    backAccent: "yellow",
  },
];

function Page07() {
  return (
    <div className="content-page">
      <div className="page-section-badge">🎴 Lapbook Interativo</div>

      <div className="lapbook-header">
        <span className="lapbook-badge">✅ Como Proteger?</span>
        <h1 className="lapbook-title">
          Como Evitar e Controlar Pragas Agrícolas?
        </h1>
        <p className="lapbook-sub">
          Levante cada aba e descubra as ferramentas que protegem nossas
          lavouras!
        </p>
      </div>

      <LiftTheFlap title="Como Proteger?" flaps={FLAPS_PROTECAO} columns={2} />

      <div className="callout callout-green" style={{ marginTop: 20 }}>
        <span className="callout-icon">🌍</span>
        <div className="callout-content">
          <strong>A prevenção sempre vence o combate!</strong>
          <p>
            Investir em boas práticas fitossanitárias custa muito menos do que
            tratar uma lavoura infestada. Agricultor informado é agricultor
            protegido.
          </p>
        </div>
      </div>
    </div>
  );
}

function Page08() {
  return (
    <div className="content-page">
      <div className="page-section-badge">📍 Caso Real — Amapá</div>
      <div className="case-hero case-hero-green">
        <div className="case-hero-inner">
          <span className="case-hero-emoji">🌿</span>
          <div className="case-hero-content">
            <h1>Vassoura-de-bruxa na Mandioca</h1>
            <p>Um fungo que ameaça a raiz mais consumida na Região Norte</p>
          </div>
        </div>
      </div>

      <div className="case-details">
        <p className="case-details-title">Ficha Técnica</p>
        {[
          {
            icon: "🦠",
            content: (
              <>
                <strong>Agente causador:</strong> Fungo Moniliophthora
                perniciosa (e outros patógenos)
              </>
            ),
          },
          {
            icon: "🌾",
            content: (
              <>
                <strong>Cultura afetada:</strong> Mandioca (Manihot esculenta) —
                base alimentar da Região Norte
              </>
            ),
          },
          {
            icon: "🔍",
            content: (
              <>
                <strong>Sintomas:</strong> Brotamentos anormais em forma de
                &quot;vassoura&quot;, engrossamento de ramos, aborto de frutos e
                queda de folhas
              </>
            ),
          },
          {
            icon: "📍",
            content: (
              <>
                <strong>Ocorrência:</strong> Amazônia, Amapá, Pará, Maranhão e
                estados do Nordeste
              </>
            ),
          },
          {
            icon: "💸",
            content: (
              <>
                <strong>Impacto:</strong> Redução de até 90% na produtividade em
                áreas infestadas
              </>
            ),
          },
        ].map((row, i) => (
          <div key={i} className="case-detail-row">
            <span className="case-detail-icon">{row.icon}</span>
            <div>{row.content}</div>
          </div>
        ))}
      </div>

      <div className="callout callout-yellow">
        <span className="callout-icon">💡</span>
        <div className="callout-content">
          <strong>Controle recomendado</strong>
          <p>
            Uso de variedades resistentes desenvolvidas pela Embrapa, poda e
            destruição de partes infectadas, e monitoramento constante das
            roças. A farinha de mandioca é a base da alimentação no Amapá —
            protegê-la é proteger nossa cultura!
          </p>
        </div>
      </div>
    </div>
  );
}

function Page09() {
  return (
    <div className="content-page">
      <div className="page-section-badge">📍 Caso Real — Amapá</div>
      <div className="case-hero case-hero-amber">
        <div className="case-hero-inner">
          <span className="case-hero-emoji">🫐</span>
          <div className="case-hero-content">
            <h1>Açaí em Risco: Amarelecimento Letal</h1>
            <p>A doença que ameaça palmeiras em toda a Região Norte</p>
          </div>
        </div>
      </div>

      <div className="case-details">
        <p className="case-details-title">Ficha Técnica</p>
        {[
          {
            icon: "🦠",
            content: (
              <>
                <strong>Agente causador:</strong> Fitoplasma (Candidatus
                Phytoplasma sp.) transmitido por insetos vetores
              </>
            ),
          },
          {
            icon: "🌴",
            content: (
              <>
                <strong>Culturas afetadas:</strong> Palmeiras em geral — açaí,
                coco, dendê, babaçu
              </>
            ),
          },
          {
            icon: "🔍",
            content: (
              <>
                <strong>Sintomas:</strong> Amarelamento progressivo das folhas,
                aborto de frutos, apodrecimento do estipe e morte da palmeira
              </>
            ),
          },
          {
            icon: "📍",
            content: (
              <>
                <strong>Ocorrência:</strong> Detectado no Amapá, Pará e
                Maranhão; presente nas Américas e África
              </>
            ),
          },
          {
            icon: "💸",
            content: (
              <>
                <strong>Impacto:</strong> Devastador — o açaí é um dos
                principais produtos de exportação do Amapá
              </>
            ),
          },
        ].map((row, i) => (
          <div key={i} className="case-detail-row">
            <span className="case-detail-icon">{row.icon}</span>
            <div>{row.content}</div>
          </div>
        ))}
      </div>

      <div className="callout callout-red">
        <span className="callout-icon">🚨</span>
        <div className="callout-content">
          <strong>Sem cura conhecida!</strong>
          <p>
            Até o momento não existe cura para palmeiras infectadas. O controle
            é feito pelo manejo dos insetos vetores e pela remoção e destruição
            das palmeiras doentes para evitar a propagação.
          </p>
        </div>
      </div>

      <div className="callout callout-green">
        <span className="callout-icon">🌴</span>
        <div className="callout-content">
          <strong>Importância econômica</strong>
          <p>
            O açaí é símbolo cultural e econômico do Amapá. Sua produção gera
            renda para milhares de famílias ribeirinhas. Protegê-lo é essencial
            para a economia local e para a segurança alimentar da região.
          </p>
        </div>
      </div>
    </div>
  );
}

function Page10() {
  return (
    <div className="content-page">
      <div className="page-section-badge">📍 Caso Real — Amapá</div>
      <div className="case-hero case-hero-teal">
        <div className="case-hero-inner">
          <span className="case-hero-emoji">🦟</span>
          <div className="case-hero-content">
            <h1>Mosca da Fruta e Seu Impacto Econômico</h1>
            <p>Um inimigo pequeno com grandes consequências</p>
          </div>
        </div>
      </div>

      <div className="case-details">
        <p className="case-details-title">Ficha Técnica</p>
        {[
          {
            icon: "🦟",
            content: (
              <>
                <strong>Espécie de destaque:</strong> Ceratitis capitata
                (mosca-do-mediterrâneo), Anastrepha spp. (espécies nativas)
              </>
            ),
          },
          {
            icon: "🍎",
            content: (
              <>
                <strong>Culturas afetadas:</strong> Manga, goiaba, laranja,
                maracujá, acerola e dezenas de outras frutas tropicais
              </>
            ),
          },
          {
            icon: "🔍",
            content: (
              <>
                <strong>Sintomas:</strong> Frutos caem prematuramente, apodrecem
                por dentro, presença de larvas brancas no interior
              </>
            ),
          },
          {
            icon: "📍",
            content: (
              <>
                <strong>Ocorrência:</strong> Todo o Brasil; no Amapá afeta
                principalmente fruticultura de subsistência e exportação
              </>
            ),
          },
          {
            icon: "💸",
            content: (
              <>
                <strong>Impacto econômico:</strong> Barreiras sanitárias em
                mercados internacionais impedem a exportação de frutas frescas
              </>
            ),
          },
        ].map((row, i) => (
          <div key={i} className="case-detail-row">
            <span className="case-detail-icon">{row.icon}</span>
            <div>{row.content}</div>
          </div>
        ))}
      </div>

      <div className="callout callout-yellow">
        <span className="callout-icon">✈️</span>
        <div className="callout-content">
          <strong>Barreira de Exportação</strong>
          <p>
            Países importadores exigem certificados fitossanitários comprovando
            que os frutos estão livres de moscas. Sem esses certificados, o
            Brasil perde milhões de dólares em exportações de frutas.
          </p>
        </div>
      </div>

      <div className="callout callout-green">
        <span className="callout-icon">🧪</span>
        <div className="callout-content">
          <strong>Controle Biológico — uma solução sustentável!</strong>
          <p>
            A Embrapa utiliza a Técnica do Inseto Estéril (TIE): machos de mosca
            são esterilizados por irradiação e liberados na natureza. Ao se
            cruzarem com fêmeas, não produzem descendentes, reduzindo a
            população sem agrotóxicos!
          </p>
        </div>
      </div>
    </div>
  );
}

function Page11() {
  const chain = [
    { icon: "🦟", text: "Uma praga entra no país sem controle fitossanitário" },
    {
      icon: "🌾",
      text: "Ela se espalha pelas lavouras de mandioca, açaí e frutas",
    },
    {
      icon: "📉",
      text: "A produção cai drasticamente — os agricultores perdem renda",
    },
    {
      icon: "🛒",
      text: "Os alimentos ficam escassos e mais caros nos mercados",
    },
    {
      icon: "🍽️",
      text: "Famílias têm menos acesso a alimentos nutritivos e acessíveis",
    },
    { icon: "🌍", text: "O meio ambiente sofre com desequilíbrio ecológico" },
  ];

  return (
    <div className="content-page">
      <div className="page-section-badge">💡 Conexão com a vida real</div>

      <div className="impact-hero">
        <span className="impact-hero-label">🌾 Reflexão</span>
        <h1 className="impact-hero-phrase">
          Sem Fitossanidade =<br />
          <span className="impact-accent">menos comida</span> na mesa
        </h1>
        <p className="impact-hero-sub">
          Entender a fitossanidade não é só para cientistas. É para qualquer
          pessoa que come, que compra e que se preocupa com o futuro do planeta.
        </p>
      </div>

      <p className="section-heading">Como isso chega até você?</p>
      <p className="lead-text">
        Veja a cadeia de impactos quando pragas não são controladas:
      </p>

      <div className="chain-items">
        {chain.map((item, idx) => (
          <div key={idx}>
            <div className="chain-item">
              <div className="chain-connector">
                <div className="chain-dot" />
                {idx < chain.length - 1 && <div className="chain-line" />}
              </div>
              <span className="chain-icon">{item.icon}</span>
              <p className="chain-text">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="callout callout-yellow">
        <span className="callout-icon">🤔</span>
        <div className="callout-content">
          <strong>Você pode fazer a diferença!</strong>
          <p>
            Não transporte plantas ou frutas de regiões desconhecidas. Compre
            produtos com selos de qualidade. Apoie agricultores locais. Essas
            atitudes simples ajudam a manter a fitossanidade da nossa região!
          </p>
        </div>
      </div>
    </div>
  );
}

function Page12() {
  return (
    <div className="content-page">
      <div className="page-section-badge">🧠 Avaliação de Aprendizagem</div>
      <Quiz />
    </div>
  );
}

function Page13() {
  return (
    <div className="content-page final-page">
      <div className="page-section-badge">🎓 Encerramento</div>

      <div className="final-hero">
        <span className="final-emoji">🌿</span>
        <h1 className="final-title">
          Ciência, Sustentabilidade
          <br />e Você!
        </h1>
        <p className="final-sub">
          Você chegou ao final desta jornada pelo mundo da Fitossanidade. Cada
          conhecimento adquirido aqui é uma semente plantada para um futuro mais
          sustentável e seguro para todos.
        </p>
      </div>

      <div className="final-pillars">
        {[
          { icon: "🔬", label: "Ciência", sub: "Pesquisa que protege a vida" },
          { icon: "🌍", label: "Sustentabilidade", sub: "Usar sem destruir" },
          { icon: "🤝", label: "Comunidade", sub: "Unidos pela natureza" },
          { icon: "🌱", label: "Futuro", sub: "Sementes de esperança" },
        ].map((p) => (
          <div key={p.label} className="final-pillar">
            <span className="final-pillar-icon">{p.icon}</span>
            <p className="final-pillar-label">{p.label}</p>
            <p className="final-pillar-sub">{p.sub}</p>
          </div>
        ))}
      </div>

      <div className="final-cta">
        <p className="final-cta-text">
          🌾 Fitossanidade é responsabilidade de todos!
        </p>
        <p className="final-cta-sub">
          Compartilhe o que aprendeu. Cada pessoa informada é um guardião das
          nossas plantas.
        </p>
      </div>

      <div className="callout callout-green" style={{ marginTop: 20 }}>
        <span className="callout-icon">📚</span>
        <div className="callout-content">
          <strong>Continue sua jornada de aprendizagem!</strong>
          <p>
            Explore os outros módulos do EducaFito, converse com agricultores da
            sua região, visite a Embrapa Amapá e descubra como a ciência está
            trabalhando para proteger nossas lavouras e nossa biodiversidade
            amazônica.
          </p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 32, padding: "20px 0" }}>
        <span style={{ fontSize: "40px" }}>🌿🍃🌾🫐🌴</span>
        <p
          style={{
            fontSize: "0.78rem",
            color: "#2E7D32",
            fontWeight: 600,
            marginTop: 12,
            letterSpacing: "0.05em",
          }}
        >
          EducaFito — Aprendendo com a natureza, crescendo com o conhecimento.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Pages registry
═══════════════════════════════════════════════════════ */
const PAGES = [
  { id: "cover", label: "Capa", Component: PageCover },
  { id: "p01", label: "Apresentação", Component: Page01 },
  { id: "p02", label: "O que é Fitossanidade?", Component: Page02 },
  { id: "p03", label: "Pragas Agrícolas", Component: Page03 },
  { id: "p04", label: "Impacto na Agricultura", Component: Page04 },
  { id: "p05", label: "Pragas Quarentenárias", Component: Page05 },
  { id: "p06", label: "Quem Cuida?", Component: Page06 },
  { id: "p07", label: "Como Evitar?", Component: Page07 },
  { id: "p08", label: "Vassoura-de-bruxa", Component: Page08 },
  { id: "p09", label: "Açaí em Risco", Component: Page09 },
  { id: "p10", label: "Mosca da Fruta", Component: Page10 },
  { id: "p11", label: "Impacto na Sua Vida", Component: Page11 },
  { id: "p12", label: "Quiz Final", Component: Page12 },
  { id: "p13", label: "Mensagem Final", Component: Page13 },
];

/* ═══════════════════════════════════════════════════════
   CartilhaApp — Main Container
═══════════════════════════════════════════════════════ */
export default function CartilhaApp() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isOffline, setIsOffline] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const totalPages = PAGES.length;

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const goTo = useCallback(
    (page: number) => {
      const clamped = Math.max(0, Math.min(page, totalPages - 1));
      setCurrentPage(clamped);
      setAnimKey((k) => k + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [totalPages],
  );

  const handlePrev = () => goTo(currentPage - 1);
  const handleNext = () => goTo(currentPage + 1);

  const progress = ((currentPage + 1) / totalPages) * 100;
  const { Component: CurrentPageComponent } = PAGES[currentPage];

  return (
    <>
      {/* Inject CSS as a style tag — bypasses the broken @tailwindcss/postcss pipeline */}
      <style dangerouslySetInnerHTML={{ __html: CARTILHA_CSS }} />

      <div className="cartilha-root" id="cartilha-root">
        {/* Offline Banner */}
        {isOffline && (
          <div className="offline-banner" role="status" aria-live="polite">
            <span aria-hidden="true">📵</span>
            Modo offline — conteúdo disponível localmente
          </div>
        )}

        {/* Header */}
        <header
          className="cartilha-header"
          style={{ top: isOffline ? "36px" : "0" }}
        >
          <a
            href="/home"
            className="cartilha-brand"
            aria-label="Voltar para o início do EducaFito"
          >
            <div className="cartilha-brand-icon" aria-hidden="true">
              🌿
            </div>
            <div>
              <div className="cartilha-brand-name">EducaFito</div>
              <div className="cartilha-brand-sub">Cartilha Interativa</div>
            </div>
          </a>

          <div
            className="page-indicator"
            aria-label={`Página ${currentPage + 1} de ${totalPages}: ${PAGES[currentPage].label}`}
          >
            <div className="page-indicator-dots" role="presentation">
              {PAGES.map((_, idx) => {
                let cls = "page-indicator-dot";
                if (idx === currentPage) cls += " active";
                else if (idx < currentPage) cls += " visited";
                return <span key={idx} className={cls} aria-hidden="true" />;
              })}
            </div>
          </div>
        </header>

        {/* Progress bar */}
        <div
          className="progress-bar-wrap"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso de leitura"
        >
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Page content */}
        <main className="cartilha-page-wrapper" key={animKey} id="main-content">
          <CurrentPageComponent />
        </main>

        {/* Navigation */}
        <PageController
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </>
  );
}
