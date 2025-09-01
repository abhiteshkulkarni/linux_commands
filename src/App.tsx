import React, { useState } from 'react';
import { Terminal, Book, Play, CheckCircle, User, Server, Code, Settings, Monitor, Shield } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ExercisePage from './components/ExercisePage';
import ExamSimulator from './components/ExamSimulator';
import { exercises } from './data/exercises';
import { examTests } from './data/examTests';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentExam, setCurrentExam] = useState(null);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [completedExams, setCompletedExams] = useState(new Set());

  const handleExerciseSelect = (exercise) => {
    setCurrentExercise(exercise);
    setCurrentView('exercise');
  };

  const handleExamSelect = (exam) => {
    setCurrentExam(exam);
    setCurrentView('exam');
  };

  const handleExerciseComplete = (exerciseId) => {
    setCompletedExercises(prev => new Set([...prev, exerciseId]));
  };

  const handleExamComplete = (examId, score) => {
    setCompletedExams(prev => new Set([...prev, examId]));
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentExercise(null);
    setCurrentExam(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {currentView === 'dashboard' ? (
        <Dashboard 
          exercises={exercises}
          examTests={examTests}
          completedExercises={completedExercises}
          completedExams={completedExams}
          onExerciseSelect={handleExerciseSelect}
          onExamSelect={handleExamSelect}
        />
      ) : currentView === 'exam' ? (
        <ExamSimulator
          exam={currentExam}
          onBack={handleBackToDashboard}
          onComplete={handleExamComplete}
          isCompleted={completedExams.has(currentExam?.id)}
        />
      ) : (
        <ExercisePage 
          exercise={currentExercise}
          onBack={handleBackToDashboard}
          onComplete={handleExerciseComplete}
          isCompleted={completedExercises.has(currentExercise?.id)}
        />
      )}
    </div>
  );
}

export default App;