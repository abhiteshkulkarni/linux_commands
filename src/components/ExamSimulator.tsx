import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, AlertTriangle, FileText, Terminal, Award, Target, Play, Pause, RotateCcw } from 'lucide-react';

const ExamSimulator = ({ exam, onBack, onComplete, isCompleted }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(150 * 60); // 2.5 hours in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [taskStatuses, setTaskStatuses] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setIsRunning(false);
            handleSubmitExam();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startExam = () => {
    setExamStarted(true);
    setIsRunning(true);
  };

  const pauseExam = () => {
    setIsRunning(!isRunning);
  };

  const resetExam = () => {
    setTimeRemaining(150 * 60);
    setIsRunning(false);
    setExamStarted(false);
    setCurrentTaskIndex(0);
    setTaskStatuses({});
    setShowResults(false);
  };

  const markTaskComplete = (taskId, status) => {
    setTaskStatuses(prev => ({
      ...prev,
      [taskId]: status
    }));
  };

  const handleSubmitExam = () => {
    setIsRunning(false);
    setShowResults(true);
    
    const completedTasks = Object.values(taskStatuses).filter(status => status === 'completed').length;
    const score = Math.round((completedTasks / exam.tasks.length) * 100);
    
    if (score >= 70) {
      onComplete(exam.id, score);
    }
  };

  const getTaskStatusColor = (taskId) => {
    const status = taskStatuses[taskId];
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-900/30';
      case 'attempted': return 'text-yellow-400 bg-yellow-900/30';
      case 'skipped': return 'text-red-400 bg-red-900/30';
      default: return 'text-slate-400 bg-slate-900/30';
    }
  };

  const calculateScore = () => {
    const completedTasks = Object.values(taskStatuses).filter(status => status === 'completed').length;
    return Math.round((completedTasks / exam.tasks.length) * 100);
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen">
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
                  <h1 className="text-xl font-bold text-white">{exam.title}</h1>
                  <p className="text-slate-400 text-sm">RHCSA EX200 Practice Exam</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 text-center">
            <div className="bg-red-600/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Award className="w-10 h-10 text-red-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">{exam.title}</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">{exam.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">2.5 Hours</div>
                <div className="text-slate-400 text-sm">Time Limit</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <FileText className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{exam.tasks.length} Tasks</div>
                <div className="text-slate-400 text-sm">Practical Questions</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <Target className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">70%</div>
                <div className="text-slate-400 text-sm">Passing Score</div>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-8">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-yellow-400 font-semibold mb-2">Exam Instructions</h3>
                  <ul className="text-yellow-200 text-sm space-y-1">
                    <li>• This is a practical, task-based examination</li>
                    <li>• You have 2.5 hours to complete all tasks</li>
                    <li>• Each task represents a real-world scenario</li>
                    <li>• Mark tasks as completed, attempted, or skipped</li>
                    <li>• You need 70% or higher to pass</li>
                    <li>• The timer will start when you begin the exam</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={startExam}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center space-x-3 mx-auto"
            >
              <Play className="w-6 h-6" />
              <span>Start RHCSA Exam</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const passed = score >= 70;
    
    return (
      <div className="min-h-screen">
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
                  <h1 className="text-xl font-bold text-white">Exam Results</h1>
                  <p className="text-slate-400 text-sm">{exam.title}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 text-center">
            <div className={`p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center ${
              passed ? 'bg-green-600/20' : 'bg-red-600/20'
            }`}>
              {passed ? (
                <CheckCircle className="w-10 h-10 text-green-400" />
              ) : (
                <AlertTriangle className="w-10 h-10 text-red-400" />
              )}
            </div>
            
            <h2 className={`text-4xl font-bold mb-4 ${passed ? 'text-green-400' : 'text-red-400'}`}>
              {passed ? 'PASSED' : 'FAILED'}
            </h2>
            <div className="text-6xl font-bold text-white mb-2">{score}%</div>
            <p className="text-slate-300 text-lg mb-8">
              {passed ? 'Congratulations! You are ready for the RHCSA exam.' : 'Keep practicing. You need 70% to pass.'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">
                  {Object.values(taskStatuses).filter(s => s === 'completed').length}
                </div>
                <div className="text-slate-400 text-sm">Completed</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">
                  {Object.values(taskStatuses).filter(s => s === 'attempted').length}
                </div>
                <div className="text-slate-400 text-sm">Attempted</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-400">
                  {Object.values(taskStatuses).filter(s => s === 'skipped').length}
                </div>
                <div className="text-slate-400 text-sm">Skipped</div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={resetExam}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Retake Exam</span>
              </button>
              <button
                onClick={onBack}
                className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentTask = exam.tasks[currentTaskIndex];

  return (
    <div className="min-h-screen">
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl font-bold text-white">{exam.title}</h1>
                <p className="text-slate-400 text-sm">Task {currentTaskIndex + 1} of {exam.tasks.length}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className={`text-2xl font-bold ${timeRemaining < 1800 ? 'text-red-400' : 'text-white'}`}>
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-slate-400 text-sm">Time Remaining</div>
              </div>
              <button
                onClick={pauseExam}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isRunning ? 'Pause' : 'Resume'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Task List Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-4">Exam Tasks</h3>
              <div className="space-y-2">
                {exam.tasks.map((task, index) => (
                  <button
                    key={task.id}
                    onClick={() => setCurrentTaskIndex(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      index === currentTaskIndex
                        ? 'bg-blue-600/20 border border-blue-500/50'
                        : 'bg-slate-900/50 border border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">Task {index + 1}</span>
                      <span className={`px-2 py-1 rounded text-xs ${getTaskStatusColor(task.id)}`}>
                        {taskStatuses[task.id] || 'pending'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 truncate">
                      {task.title}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-600">
                <button
                  onClick={handleSubmitExam}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors font-semibold"
                >
                  Submit Exam
                </button>
              </div>
            </div>
          </div>

          {/* Current Task */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Task {currentTaskIndex + 1}: {currentTask.title}</h2>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${getTaskStatusColor(currentTask.id)}`}>
                    {taskStatuses[currentTask.id] || 'pending'}
                  </span>
                  <span className="text-slate-400 text-sm">{currentTask.points} points</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-600 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Task Description</h3>
                <p className="text-slate-300 leading-relaxed mb-4">{currentTask.description}</p>
                
                {currentTask.requirements && (
                  <div>
                    <h4 className="text-md font-semibold text-white mb-2">Requirements:</h4>
                    <ul className="text-slate-300 space-y-1">
                      {currentTask.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {currentTask.hints && (
                <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-6">
                  <h4 className="text-yellow-400 font-semibold mb-2">Hints:</h4>
                  <ul className="text-yellow-200 text-sm space-y-1">
                    {currentTask.hints.map((hint, index) => (
                      <li key={index}>• {hint}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  <button
                    onClick={() => markTaskComplete(currentTask.id, 'completed')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Complete</span>
                  </button>
                  <button
                    onClick={() => markTaskComplete(currentTask.id, 'attempted')}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Mark Attempted
                  </button>
                  <button
                    onClick={() => markTaskComplete(currentTask.id, 'skipped')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Skip Task
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentTaskIndex(Math.max(0, currentTaskIndex - 1))}
                    disabled={currentTaskIndex === 0}
                    className="bg-slate-600 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentTaskIndex(Math.min(exam.tasks.length - 1, currentTaskIndex + 1))}
                    disabled={currentTaskIndex === exam.tasks.length - 1}
                    className="bg-slate-600 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSimulator;