import React, { useState } from 'react';
import { ArrowLeft, Book, Terminal, CheckCircle, Play, Copy, Check } from 'lucide-react';
import TerminalPlayground from './TerminalPlayground';

const ExercisePage = ({ exercise, onBack, onComplete, isCompleted }) => {
  const [activeTab, setActiveTab] = useState('theory');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleComplete = () => {
    onComplete(exercise.id);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="w-px h-6 bg-slate-600"></div>
              <div>
                <h1 className="text-xl font-bold text-white">{exercise.title}</h1>
                <p className="text-slate-400 text-sm">{exercise.category} • {exercise.difficulty}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isCompleted && (
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Completed</span>
                </div>
              )}
              {!isCompleted && (
                <button
                  onClick={handleComplete}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark Complete</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800/30 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
              activeTab === 'theory'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Book className="w-4 h-4" />
            <span>Theory & Commands</span>
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
              activeTab === 'practice'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Practice Playground</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'theory' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Theory Section */}
            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-bold text-white mb-4">Objective</h2>
                <p className="text-slate-300 leading-relaxed">{exercise.objective}</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-bold text-white mb-4">Theory</h2>
                <div className="prose prose-invert max-w-none">
                  {exercise.theory.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-slate-300 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-bold text-white mb-4">RHCSA Relevance</h2>
                <p className="text-slate-300 leading-relaxed">{exercise.rhcsaRelevance}</p>
              </div>
            </div>

            {/* Commands Section */}
            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-bold text-white mb-4">Key Commands</h2>
                <div className="space-y-4">
                  {exercise.commands.map((cmd, index) => (
                    <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-green-400 font-mono text-sm">{cmd.command}</code>
                        <button
                          onClick={() => copyToClipboard(cmd.command, index)}
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <p className="text-slate-300 text-sm">{cmd.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-bold text-white mb-4">Expected Outcome</h2>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                  <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                    {exercise.expectedOutput}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <TerminalPlayground exercise={exercise} />
        )}
      </div>
    </div>
  );
};

export default ExercisePage;