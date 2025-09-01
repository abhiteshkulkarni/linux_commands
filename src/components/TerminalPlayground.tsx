import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

const TerminalPlayground = ({ exercise }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'info', content: `Welcome to the ${exercise.title} practice environment!` },
    { type: 'info', content: 'Type commands and press Enter to execute them.' },
    { type: 'prompt', content: '[student@rhel ~]$ ' }
  ]);
  const [commandIndex, setCommandIndex] = useState(0);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const simulateCommand = (command) => {
    const cmd = command.trim().toLowerCase();
    
    // Simulate different command responses
    const responses = {
      'ls': 'Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos',
      'pwd': '/home/student',
      'whoami': 'student',
      'id': 'uid=1000(student) gid=1000(student) groups=1000(student),10(wheel)',
      'date': new Date().toString(),
      'uname -a': 'Linux rhel 4.18.0-372.9.1.el8.x86_64 #1 SMP Fri Apr 15 22:12:19 EDT 2022 x86_64 x86_64 x86_64 GNU/Linux',
      'cat /etc/redhat-release': 'Red Hat Enterprise Linux release 8.6 (Ootpa)',
      'systemctl status': '● rhel\n    State: running\n     Jobs: 0 queued\n   Failed: 0 units\n    Since: Mon 2024-01-15 10:30:45 EST; 2h 15min ago',
      'ps aux': 'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1 128416  7040 ?        Ss   10:30   0:01 /usr/lib/systemd/systemd\nstudent   1234  0.0  0.1  15344  3072 pts/0    Ss   12:45   0:00 -bash',
      'df -h': 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        20G  5.2G   14G  28% /\n/dev/sda2       100G   15G   80G  16% /home',
      'free -h': '              total        used        free      shared  buff/cache   available\nMem:           7.8Gi       1.2Gi       5.1Gi        82Mi       1.5Gi       6.3Gi\nSwap:          2.0Gi          0B       2.0Gi',
      'help': 'Available commands: ls, pwd, whoami, id, date, uname, cat, systemctl, ps, df, free, mkdir, touch, chmod, chown, grep, find, and more...',
      'clear': 'CLEAR_SCREEN'
    };

    // Handle specific exercise commands
    if (exercise.practiceCommands) {
      exercise.practiceCommands.forEach(practiceCmd => {
        if (cmd.includes(practiceCmd.command.toLowerCase())) {
          responses[cmd] = practiceCmd.expectedResult;
        }
      });
    }

    // Handle mkdir, touch, and other file operations
    if (cmd.startsWith('mkdir ')) {
      const dirname = cmd.split(' ')[1];
      return `Directory '${dirname}' created successfully.`;
    }
    
    if (cmd.startsWith('touch ')) {
      const filename = cmd.split(' ')[1];
      return `File '${filename}' created successfully.`;
    }

    if (cmd.startsWith('chmod ')) {
      return 'Permissions changed successfully.';
    }

    if (cmd.startsWith('chown ')) {
      return 'Ownership changed successfully.';
    }

    if (cmd.startsWith('find ')) {
      return './example.txt\n./documents/report.pdf\n./scripts/backup.sh';
    }

    if (cmd.startsWith('grep ')) {
      return 'Found matching lines in the specified files.';
    }

    return responses[cmd] || `bash: ${command}: command not found`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.trim();
    const response = simulateCommand(command);

    if (response === 'CLEAR_SCREEN') {
      setHistory([
        { type: 'info', content: `Welcome to the ${exercise.title} practice environment!` },
        { type: 'prompt', content: '[student@rhel ~]$ ' }
      ]);
    } else {
      setHistory(prev => [
        ...prev.slice(0, -1), // Remove the last prompt
        { type: 'command', content: `[student@rhel ~]$ ${command}` },
        { type: 'output', content: response },
        { type: 'prompt', content: '[student@rhel ~]$ ' }
      ]);
    }

    setInput('');
    setCommandIndex(0);
  };

  const resetTerminal = () => {
    setHistory([
      { type: 'info', content: `Welcome to the ${exercise.title} practice environment!` },
      { type: 'info', content: 'Type commands and press Enter to execute them.' },
      { type: 'prompt', content: '[student@rhel ~]$ ' }
    ]);
    setInput('');
  };

  const runSuggestedCommand = (command) => {
    setInput(command);
    inputRef.current?.focus();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Terminal */}
      <div className="lg:col-span-2">
        <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
          <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Terminal className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Practice Terminal</span>
            </div>
            <button
              onClick={resetTerminal}
              className="text-slate-400 hover:text-white transition-colors"
              title="Reset Terminal"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          
          <div 
            ref={terminalRef}
            className="h-96 overflow-y-auto p-4 font-mono text-sm"
          >
            {history.map((item, index) => (
              <div key={index} className="mb-1">
                {item.type === 'info' && (
                  <div className="text-blue-400"># {item.content}</div>
                )}
                {item.type === 'command' && (
                  <div className="text-white">{item.content}</div>
                )}
                {item.type === 'output' && (
                  <div className="text-green-300 whitespace-pre-wrap">{item.content}</div>
                )}
                {item.type === 'prompt' && index === history.length - 1 && (
                  <form onSubmit={handleSubmit} className="flex items-center">
                    <span className="text-yellow-400 mr-2">{item.content}</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-1 bg-transparent text-white outline-none"
                      autoFocus
                    />
                  </form>
                )}
                {item.type === 'prompt' && index !== history.length - 1 && (
                  <div className="text-yellow-400">{item.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Guide */}
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Practice Tasks</h3>
          <div className="space-y-3">
            {exercise.practiceSteps?.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-blue-400">{index + 1}</span>
                </div>
                <p className="text-slate-300 text-sm">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Suggested Commands</h3>
          <div className="space-y-2">
            {exercise.commands?.slice(0, 5).map((cmd, index) => (
              <button
                key={index}
                onClick={() => runSuggestedCommand(cmd.command)}
                className="w-full text-left p-3 bg-slate-900/50 rounded-lg border border-slate-600 hover:border-blue-500/50 transition-colors group"
              >
                <code className="text-green-400 text-sm font-mono group-hover:text-green-300">
                  {cmd.command}
                </code>
                <p className="text-slate-400 text-xs mt-1">{cmd.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Hints</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-sm">Use 'help' to see available commands</p>
            </div>
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-sm">Practice the commands multiple times</p>
            </div>
            <div className="flex items-start space-x-2">
              <Play className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-slate-300 text-sm">Try variations of the commands</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPlayground;