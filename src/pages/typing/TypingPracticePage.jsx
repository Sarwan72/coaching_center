import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { typingPassages } from '../../data/typingPassages';
import { 
  Keyboard, 
  Clock, 
  RotateCcw, 
  Play, 
  Pause, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  Zap, 
  History,
  TrendingUp,
  Sliders,
  Sparkles
} from 'lucide-react';

export default function TypingPracticePage() {
  const { typingHistory, saveTypingResult } = useApp();

  // Settings
  const [language, setLanguage] = useState('English'); // 'English' | 'Hindi'
  const [selectedDuration, setSelectedDuration] = useState(60); // 60, 180, 300, 600 seconds
  const [selectedPassageId, setSelectedPassageId] = useState('typ-en-1');

  // Filter passages for current language
  const availablePassages = typingPassages.filter(p => p.language === language);
  const activePassage = availablePassages.find(p => p.id === selectedPassageId) || availablePassages[0] || typingPassages[0];

  // Typing State
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Live Stats
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Switch passages when language changes
  useEffect(() => {
    const defaultForLang = typingPassages.find(p => p.language === language);
    if (defaultForLang) {
      setSelectedPassageId(defaultForLang.id);
    }
    resetTest();
  }, [language]);

  // Reset when duration or passage changes
  useEffect(() => {
    resetTest();
  }, [selectedDuration, selectedPassageId]);

  // Timer Tick
  useEffect(() => {
    if (isTestActive && !isPaused && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTestActive, isPaused, timeLeft]);

  // Calculate live WPM and Accuracy on user input
  const handleInputChange = (e) => {
    if (isCompleted) return;

    if (!isTestActive) {
      setIsTestActive(true);
    }

    const value = e.target.value;
    setUserInput(value);

    // Compute metrics
    const targetText = activePassage.text;
    let correct = 0;
    let incorrect = 0;

    for (let i = 0; i < value.length; i++) {
      if (value[i] === targetText[i]) {
        correct++;
      } else {
        incorrect++;
      }
    }

    setCorrectChars(correct);
    setIncorrectChars(incorrect);

    const timeSpentMinutes = (selectedDuration - timeLeft) / 60 || 0.05;
    const computedWpm = Math.max(0, Math.round((correct / 5) / timeSpentMinutes));
    const computedAcc = value.length > 0 ? Math.round((correct / value.length) * 100) : 100;

    setWpm(computedWpm);
    setAccuracy(computedAcc);

    // Auto-complete if user finished the full target text
    if (value.length >= targetText.length) {
      finishTest(computedWpm, computedAcc);
    }
  };

  const finishTest = (finalWpm = wpm, finalAcc = accuracy) => {
    setIsTestActive(false);
    setIsCompleted(true);
    clearInterval(timerRef.current);

    saveTypingResult({
      passageTitle: activePassage.title,
      language: activePassage.language,
      wpm: finalWpm,
      accuracy: finalAcc,
      duration: `${selectedDuration / 60} min`
    });
  };

  const resetTest = () => {
    setIsTestActive(false);
    setIsPaused(false);
    setIsCompleted(false);
    setUserInput('');
    setTimeLeft(selectedDuration);
    setWpm(0);
    setAccuracy(100);
    setCorrectChars(0);
    setIncorrectChars(0);
    clearInterval(timerRef.current);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const togglePause = () => {
    if (!isTestActive && !isPaused) return;
    setIsPaused(prev => !prev);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const targetChars = activePassage.text.split('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
            <Keyboard className="w-4 h-4 text-teal-400" />
            <span>Govt Exam Computer Skill Test Simulator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Typing Speed & Accuracy Practice
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real-time interactive typing engine for Allahabad High Court Clerk, SSC CGL/CHSL DEST, and Railway NTPC skill tests. Practice English & Hindi Unicode passages with live error detection.
          </p>
        </div>
      </div>

      {/* Control Configuration Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Language Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setLanguage('English')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                language === 'English'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English Typing
            </button>
            <button
              onClick={() => setLanguage('Hindi')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                language === 'Hindi'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी टाइपिंग (Unicode)
            </button>
          </div>

          {/* Countdown Duration Selector */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-600">Timer:</span>
            {[
              { label: '1 Min', sec: 60 },
              { label: '3 Min', sec: 180 },
              { label: '5 Min', sec: 300 },
              { label: '10 Min', sec: 600 }
            ].map(d => (
              <button
                key={d.sec}
                onClick={() => setSelectedDuration(d.sec)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  selectedDuration === d.sec
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Passage Select */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-600 shrink-0">Passage:</span>
            <select
              value={selectedPassageId}
              onChange={(e) => setSelectedPassageId(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none max-w-xs truncate"
            >
              {availablePassages.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.difficulty})
                </option>
              ))}
            </select>
          </div>
        </div>

        {language === 'Hindi' && (
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-center justify-between">
            <span>
              ℹ️ <strong>Hindi Unicode (Mangal / Inscript)</strong> typing is actively enabled. If your system keyboard uses Kruti Dev 010 font, please type in Unicode.
            </span>
            <span className="font-bold text-[10px] uppercase bg-amber-200/80 px-2 py-0.5 rounded text-amber-900">
              High Court & SSC Standard
            </span>
          </div>
        )}
      </div>

      {/* Live Metrics Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* Speed Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Gross Speed</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900">{wpm}</span>
              <span className="text-xs font-semibold text-slate-500">WPM</span>
            </div>
          </div>
        </div>

        {/* Accuracy Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Accuracy</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900">{accuracy}%</span>
            </div>
          </div>
        </div>

        {/* Keystrokes Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Keystrokes</span>
            <div className="text-sm font-bold text-slate-700 mt-1">
              <span className="text-emerald-600 font-mono font-bold">{correctChars}</span> / <span className="text-rose-500 font-mono font-bold">{incorrectChars}</span>
            </div>
            <span className="text-[10px] text-slate-400">Correct / Wrong</span>
          </div>
        </div>

        {/* Remaining Time Card */}
        <div className={`p-5 rounded-2xl border shadow-sm flex items-center gap-4 transition-colors ${
          timeLeft <= 10 && isTestActive
            ? 'bg-rose-50 border-rose-300 text-rose-900 animate-pulse'
            : 'bg-white border-slate-200'
        }`}>
          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Time Left</span>
            <div className="text-3xl font-mono font-extrabold text-slate-900">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

      </div>

      {/* Main Interactive Typing Area */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Target Text Box */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 font-mono text-base sm:text-lg leading-relaxed select-none tracking-normal max-h-56 overflow-y-auto">
          {targetChars.map((char, index) => {
            let colorClass = 'text-slate-400';
            let bgClass = '';

            if (index < userInput.length) {
              if (userInput[index] === char) {
                colorClass = 'text-emerald-600 font-bold';
              } else {
                colorClass = 'text-rose-600 font-bold underline bg-rose-100';
              }
            } else if (index === userInput.length) {
              bgClass = 'bg-indigo-600 text-white rounded-xs';
            }

            return (
              <span key={index} className={`${colorClass} ${bgClass}`}>
                {char}
              </span>
            );
          })}
        </div>

        {/* User Typing Input Area */}
        <div className="space-y-3">
          <textarea
            ref={inputRef}
            rows={4}
            value={userInput}
            onChange={handleInputChange}
            disabled={isCompleted || isPaused}
            placeholder={
              isCompleted
                ? "Test finished! Review your performance scorecard below."
                : isPaused
                ? "Test paused. Click 'Resume' to continue typing."
                : `Click here and start typing... (Timer starts automatically on first keypress)`
            }
            className="w-full p-4 rounded-2xl border-2 border-indigo-200 focus:border-indigo-600 bg-white text-base sm:text-lg font-mono text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none shadow-inner"
          />

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={resetTest}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restart Drill
              </button>
              {isTestActive && (
                <button
                  onClick={togglePause}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </button>
              )}
            </div>

            <div className="text-xs text-slate-400">
              Passage: <strong className="text-slate-700">{activePassage.title}</strong> • Category: <strong className="text-slate-700">{activePassage.category}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Completion Modal / Scorecard */}
      {isCompleted && (
        <div className="bg-gradient-to-br from-indigo-900 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold">Typing Performance Scorecard</h3>
                <p className="text-xs text-indigo-200">{activePassage.title} • {selectedDuration / 60} Minute Test</p>
              </div>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
              wpm >= 35 && accuracy >= 90
                ? 'bg-emerald-400 text-emerald-950'
                : 'bg-amber-400 text-amber-950'
            }`}>
              {wpm >= 35 && accuracy >= 90 ? 'Qualified Standard' : 'Practice Recommended'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold text-indigo-200">Final Speed</span>
              <div className="text-3xl font-extrabold mt-1">{wpm} WPM</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold text-indigo-200">Accuracy</span>
              <div className="text-3xl font-extrabold mt-1">{accuracy}%</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold text-indigo-200">Correct Chars</span>
              <div className="text-3xl font-extrabold mt-1 text-emerald-300">{correctChars}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold text-indigo-200">Mistakes</span>
              <div className="text-3xl font-extrabold mt-1 text-rose-300">{incorrectChars}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="text-xs text-indigo-200">
              ✅ Your result has been automatically saved to your <strong className="text-white">Student Dashboard</strong> history.
            </p>
            <button
              onClick={resetTest}
              className="px-6 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 shadow transition-all"
            >
              Take Another Test
            </button>
          </div>
        </div>
      )}

      {/* Recent Practice History Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Recent Typing Practice History</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">{typingHistory.length} attempts recorded</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase font-semibold">
                <th className="pb-3 font-semibold">Date & Time</th>
                <th className="pb-3 font-semibold">Passage Title</th>
                <th className="pb-3 font-semibold">Language</th>
                <th className="pb-3 font-semibold">Speed</th>
                <th className="pb-3 font-semibold">Accuracy</th>
                <th className="pb-3 font-semibold">Duration</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {typingHistory.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 font-mono text-slate-500">{h.date}</td>
                  <td className="py-3 font-semibold text-slate-800">{h.passageTitle}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {h.language}
                    </span>
                  </td>
                  <td className="py-3 font-mono font-bold text-indigo-600">{h.wpm} WPM</td>
                  <td className="py-3 font-mono font-bold text-emerald-600">{h.accuracy}%</td>
                  <td className="py-3 text-slate-500">{h.duration}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
