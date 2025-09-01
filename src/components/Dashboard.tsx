import React from 'react';
import { Terminal, Book, Play, CheckCircle, User, Server, Code, Settings, Monitor, Shield, Trophy, Target, Clock, FileText, Award } from 'lucide-react';

const Dashboard = ({ exercises, examTests, completedExercises, completedExams, onExerciseSelect, onExamSelect }) => {
  const totalExercises = exercises.length;
  const completedCount = completedExercises.size;
  const progressPercentage = (completedCount / totalExercises) * 100;
  
  const totalExams = examTests.length;
  const completedExamCount = completedExams.size;
  const examProgressPercentage = (completedExamCount / totalExams) * 100;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-900/30';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-900/30';
      case 'Advanced': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Shell Basics': return <Terminal className="w-5 h-5" />;
      case 'File Management': return <Code className="w-5 h-5" />;
      case 'User Management': return <User className="w-5 h-5" />;
      case 'System Administration': return <Server className="w-5 h-5" />;
      case 'Network Configuration': return <Monitor className="w-5 h-5" />;
      case 'Security': return <Shield className="w-5 h-5" />;
      case 'System Services': return <Settings className="w-5 h-5" />;
      default: return <Book className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">DevOps Lab Environment</h1>
                <p className="text-slate-400">Shell Scripting & Red Hat System Administration</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">Progress</p>
                <p className="text-lg font-semibold text-white">{completedCount}/{totalExercises}</p>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-slate-700"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - progressPercentage / 100)}`}
                    className="text-blue-500 transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">{Math.round(progressPercentage)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Exercises</p>
                <p className="text-2xl font-bold text-white">{totalExercises}</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-400">{completedCount}</p>
              </div>
              <Trophy className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-yellow-400">{Math.max(0, totalExercises - completedCount)}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Exam Tests</p>
                <p className="text-2xl font-bold text-purple-400">{completedExamCount}/{totalExams}</p>
              </div>
              <Award className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* RHCSA Exam Simulation Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 rounded-xl p-6 border border-red-700/50 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">RHCSA EX200 Exam Simulation</h2>
                <p className="text-red-200 mb-4">
                  Practice with realistic 2.5-hour exam scenarios. Each test contains task-based questions 
                  that mirror the actual RHCSA exam format. Achieve 70% to pass.
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-red-400" />
                    <span className="text-red-200">2.5 hours per test</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-red-400" />
                    <span className="text-red-200">70% passing score</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-red-400" />
                    <span className="text-red-200">Task-based questions</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-red-400">{Math.round(examProgressPercentage)}%</div>
                <div className="text-red-200 text-sm">Exam Progress</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {examTests.map(exam => (
              <div
                key={exam.id}
                onClick={() => onExamSelect(exam)}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-red-500/50 transition-all duration-300 cursor-pointer group hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-600/20 p-2 rounded-lg group-hover:bg-red-600/30 transition-colors">
                      <FileText className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
                        {exam.title}
                      </h4>
                      <p className="text-sm text-slate-400">Practice Test {exam.id.split('-')[2]}</p>
                    </div>
                  </div>
                  {completedExams.has(exam.id) && (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  )}
                </div>
                
                <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                  {exam.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-400">{exam.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Play className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-red-400 group-hover:text-red-300">Start Exam</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Exercises Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Practice Exercises - Learning Path</h2>
          
          {['Beginner', 'Intermediate', 'Advanced'].map(difficulty => (
            <div key={difficulty} className="space-y-4">
              <h3 className={`text-xl font-semibold mb-4 ${getDifficultyColor(difficulty)} px-3 py-1 rounded-full inline-block`}>
                {difficulty} Level
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exercises
                  .filter(exercise => exercise.difficulty === difficulty)
                  .map(exercise => (
                    <div
                      key={exercise.id}
                      onClick={() => onExerciseSelect(exercise)}
                      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group hover:scale-105"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-600/20 p-2 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                            {getCategoryIcon(exercise.category)}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                              {exercise.title}
                            </h4>
                            <p className="text-sm text-slate-400">{exercise.category}</p>
                          </div>
                        </div>
                        {completedExercises.has(exercise.id) && (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        )}
                      </div>
                      
                      <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                        {exercise.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-400">{exercise.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Play className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-blue-400 group-hover:text-blue-300">Start Lab</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;