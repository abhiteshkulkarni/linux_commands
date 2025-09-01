export const exercises = [
  // Beginner Level
  {
    id: 'shell-basics-1',
    title: 'Linux Shell Fundamentals',
    category: 'Shell Basics',
    difficulty: 'Beginner',
    estimatedTime: '30 minutes',
    description: 'Learn the basic shell commands for navigation, file listing, and system information.',
    objective: 'Master fundamental shell commands including ls, pwd, cd, whoami, and basic system information commands.',
    theory: `The Linux shell (bash) is your primary interface for interacting with the Red Hat Enterprise Linux system. Understanding these fundamental commands forms the foundation of system administration.

The shell prompt shows your current location and user context. The format [user@hostname directory]$ indicates you're logged in as 'user' on 'hostname' in 'directory'.

Key concepts:
- Current working directory: Where you are in the filesystem
- Home directory: Your personal directory (~)
- Absolute vs relative paths
- Command structure: command [options] [arguments]`,
    rhcsaRelevance: 'These commands are essential for RHCSA tasks including file management, navigation, and system exploration. You\'ll use these in every lab and real-world scenario.',
    commands: [
      { command: 'pwd', description: 'Print current working directory' },
      { command: 'ls', description: 'List directory contents' },
      { command: 'ls -la', description: 'List all files with detailed information' },
      { command: 'cd /home', description: 'Change to /home directory' },
      { command: 'cd ~', description: 'Change to home directory' },
      { command: 'whoami', description: 'Display current username' },
      { command: 'id', description: 'Display user and group IDs' },
      { command: 'date', description: 'Display current date and time' },
      { command: 'uname -a', description: 'Display system information' }
    ],
    practiceSteps: [
      'Check your current directory with pwd',
      'List files in current directory',
      'Change to different directories using cd',
      'Check your user identity',
      'Explore system information commands'
    ],
    expectedOutput: `[student@rhel ~]$ pwd
/home/student
[student@rhel ~]$ whoami
student
[student@rhel ~]$ ls -la
total 12
drwx------. 3 student student  78 Jan 15 10:30 .
drwxr-xr-x. 3 root    root     22 Jan 15 10:29 ..`
  },
  {
    id: 'file-management-1',
    title: 'File and Directory Operations',
    category: 'File Management',
    difficulty: 'Beginner',
    estimatedTime: '45 minutes',
    description: 'Learn to create, copy, move, and delete files and directories using command line tools.',
    objective: 'Master file and directory operations including creation, copying, moving, and deletion.',
    theory: `File management is a core skill for system administrators. Linux treats everything as a file, including directories, devices, and processes.

Key concepts:
- Files vs directories
- File permissions and ownership
- Hidden files (starting with .)
- File paths (absolute and relative)
- Wildcards and pattern matching

Safety practices:
- Always use -i flag with rm, cp, mv for interactive mode
- Use ls to verify before operations
- Understand the difference between cp and mv`,
    rhcsaRelevance: 'File management is tested extensively in RHCSA. You must efficiently create directory structures, manage files, and understand file operations for backup and configuration tasks.',
    commands: [
      { command: 'mkdir dirname', description: 'Create a directory' },
      { command: 'mkdir -p path/to/dir', description: 'Create nested directories' },
      { command: 'touch filename', description: 'Create empty file or update timestamp' },
      { command: 'cp file1 file2', description: 'Copy file1 to file2' },
      { command: 'cp -r dir1 dir2', description: 'Copy directory recursively' },
      { command: 'mv oldname newname', description: 'Move/rename file or directory' },
      { command: 'rm filename', description: 'Remove file' },
      { command: 'rm -rf dirname', description: 'Remove directory and contents' },
      { command: 'find /path -name "pattern"', description: 'Find files by name pattern' }
    ],
    practiceSteps: [
      'Create a new directory called "practice"',
      'Create several files using touch',
      'Copy files to different locations',
      'Move and rename files',
      'Practice safe deletion with rm -i'
    ],
    expectedOutput: `[student@rhel ~]$ mkdir practice
[student@rhel ~]$ touch practice/file1.txt
[student@rhel ~]$ ls practice/
file1.txt`
  },
  
  // Intermediate Level
  {
    id: 'permissions-1',
    title: 'File Permissions and Ownership',
    category: 'File Management',
    difficulty: 'Intermediate',
    estimatedTime: '60 minutes',
    description: 'Master Linux file permissions, ownership, and access control mechanisms.',
    objective: 'Understand and manage file permissions using chmod, chown, and special permissions.',
    theory: `Linux file permissions control who can read, write, or execute files. The permission system uses three sets of permissions: owner, group, and others.

Permission types:
- r (read): View file contents or list directory
- w (write): Modify file or create/delete files in directory  
- x (execute): Run file as program or enter directory

Numeric notation:
- 4 = read, 2 = write, 1 = execute
- 755 = rwxr-xr-x (owner: rwx, group: r-x, others: r-x)

Special permissions:
- SUID (4000): Run as file owner
- SGID (2000): Run as file group or inherit group
- Sticky bit (1000): Only owner can delete files`,
    rhcsaRelevance: 'RHCSA requires deep understanding of permissions for security, shared directories, and service configurations. This includes setting up proper permissions for web servers, databases, and user collaboration.',
    commands: [
      { command: 'ls -l', description: 'List files with detailed permissions' },
      { command: 'chmod 755 filename', description: 'Set permissions using numeric notation' },
      { command: 'chmod u+x filename', description: 'Add execute permission for owner' },
      { command: 'chmod go-w filename', description: 'Remove write permission for group and others' },
      { command: 'chown user:group filename', description: 'Change file ownership' },
      { command: 'chgrp groupname filename', description: 'Change file group' },
      { command: 'umask', description: 'Display default permission mask' },
      { command: 'find /path -perm 755', description: 'Find files with specific permissions' }
    ],
    practiceSteps: [
      'Create test files and examine their permissions',
      'Practice changing permissions with chmod',
      'Change file ownership with chown',
      'Test different permission combinations',
      'Understand the impact of directory permissions'
    ],
    expectedOutput: `[student@rhel ~]$ ls -l testfile
-rw-r--r--. 1 student student 0 Jan 15 12:30 testfile
[student@rhel ~]$ chmod 755 testfile
[student@rhel ~]$ ls -l testfile
-rwxr-xr-x. 1 student student 0 Jan 15 12:30 testfile`
  },
  {
    id: 'user-management-1',
    title: 'User and Group Management',
    category: 'User Management',
    difficulty: 'Intermediate',
    estimatedTime: '75 minutes',
    description: 'Learn to create, modify, and manage user accounts and groups in Red Hat Enterprise Linux.',
    objective: 'Master user and group management commands including useradd, usermod, groupadd, and password policies.',
    theory: `User management is crucial for system security and organization. Red Hat uses several configuration files and commands for user administration.

Key files:
- /etc/passwd: User account information
- /etc/shadow: Encrypted passwords and aging info
- /etc/group: Group definitions
- /etc/gshadow: Group passwords and members

User ID ranges:
- 0: root user
- 1-999: System users/services
- 1000+: Regular users

Password policies include:
- Minimum/maximum age
- Password complexity requirements
- Account expiration
- Password history`,
    rhcsaRelevance: 'User management is a major RHCSA topic. You must create users with specific requirements, set password policies, manage sudo access, and troubleshoot account issues.',
    commands: [
      { command: 'useradd username', description: 'Create new user account' },
      { command: 'useradd -m -s /bin/bash username', description: 'Create user with home directory and shell' },
      { command: 'passwd username', description: 'Set user password' },
      { command: 'usermod -G groupname username', description: 'Add user to group' },
      { command: 'userdel -r username', description: 'Delete user and home directory' },
      { command: 'groupadd groupname', description: 'Create new group' },
      { command: 'groups username', description: 'Show user group memberships' },
      { command: 'id username', description: 'Display user and group IDs' }
    ],
    practiceSteps: [
      'Create new users with different options',
      'Set and change passwords',
      'Create groups and add users to them',
      'Modify user properties',
      'Practice user deletion safely'
    ],
    expectedOutput: `[root@rhel ~]# useradd -m testuser
[root@rhel ~]# id testuser
uid=1001(testuser) gid=1001(testuser) groups=1001(testuser)`
  },

  // Advanced Level  
  {
    id: 'systemd-services-1',
    title: 'Systemd Service Management',
    category: 'System Services',
    difficulty: 'Advanced',
    estimatedTime: '90 minutes',
    description: 'Master systemd service management, unit files, and service troubleshooting.',
    objective: 'Learn to manage services using systemctl, create custom service units, and troubleshoot service issues.',
    theory: `Systemd is the init system and service manager for Red Hat Enterprise Linux 8/9. It manages services, sockets, devices, and other system resources through unit files.

Unit types:
- .service: System services
- .socket: IPC sockets
- .target: Groups of units
- .timer: Scheduled tasks
- .mount: Mount points

Service states:
- active (running): Service is running
- inactive (dead): Service is stopped
- failed: Service failed to start
- enabled: Service starts at boot
- disabled: Service doesn't start at boot

Systemd provides dependency management, parallel startup, and extensive logging through journald.`,
    rhcsaRelevance: 'Service management is essential for RHCSA. You must configure services to start at boot, troubleshoot failed services, and understand systemd for web servers, databases, and custom applications.',
    commands: [
      { command: 'systemctl status servicename', description: 'Check service status' },
      { command: 'systemctl start servicename', description: 'Start service' },
      { command: 'systemctl stop servicename', description: 'Stop service' },
      { command: 'systemctl enable servicename', description: 'Enable service at boot' },
      { command: 'systemctl disable servicename', description: 'Disable service at boot' },
      { command: 'systemctl reload servicename', description: 'Reload service configuration' },
      { command: 'systemctl list-units --type=service', description: 'List all services' },
      { command: 'journalctl -u servicename', description: 'View service logs' }
    ],
    practiceSteps: [
      'Check status of system services',
      'Start and stop services',
      'Enable services for automatic startup',
      'View service logs with journalctl',
      'Troubleshoot failed services'
    ],
    expectedOutput: `[root@rhel ~]# systemctl status sshd
● sshd.service - OpenSSH server daemon
   Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2024-01-15 10:30:45 EST; 2h 15min ago`
  },
  {
    id: 'network-config-1',
    title: 'Network Configuration with NetworkManager',
    category: 'Network Configuration',
    difficulty: 'Advanced',
    estimatedTime: '120 minutes',
    description: 'Configure network interfaces, static IPs, and network services using NetworkManager.',
    objective: 'Master network configuration using nmcli, understand network troubleshooting, and configure network services.',
    theory: `NetworkManager is the primary network configuration tool in RHEL 8/9. It manages network connections through profiles and provides both command-line and graphical interfaces.

Key concepts:
- Connection profiles: Store network configuration
- Devices: Physical or virtual network interfaces
- Active connections: Currently active network configurations
- Static vs DHCP configuration
- DNS and routing configuration

NetworkManager provides:
- Automatic network detection
- VPN support
- WiFi and wired management
- Network bonding and bridging
- Integration with systemd`,
    rhcsaRelevance: 'Network configuration is crucial for RHCSA. You must configure static IPs, manage network services, troubleshoot connectivity, and set up network interfaces for various scenarios.',
    commands: [
      { command: 'nmcli device status', description: 'Show network device status' },
      { command: 'nmcli connection show', description: 'List network connections' },
      { command: 'nmcli con add type ethernet ifname eth0', description: 'Add new connection' },
      { command: 'nmcli con mod connection_name ipv4.addresses 192.168.1.100/24', description: 'Set static IP' },
      { command: 'nmcli con up connection_name', description: 'Activate connection' },
      { command: 'ip addr show', description: 'Display IP addresses' },
      { command: 'ping -c 4 8.8.8.8', description: 'Test network connectivity' },
      { command: 'ss -tuln', description: 'Show listening network sockets' }
    ],
    practiceSteps: [
      'Check current network configuration',
      'Configure static IP addresses',
      'Test network connectivity',
      'Troubleshoot network issues',
      'Configure DNS settings'
    ],
    expectedOutput: `[root@rhel ~]# nmcli device status
DEVICE  TYPE      STATE      CONNECTION
eth0    ethernet  connected  System eth0
lo      loopback  unmanaged  --`
  },
  {
    id: 'security-selinux-1',
    title: 'SELinux Security Management',
    category: 'Security',
    difficulty: 'Advanced',
    estimatedTime: '100 minutes',
    description: 'Understand and manage SELinux security policies, contexts, and troubleshooting.',
    objective: 'Master SELinux concepts, manage security contexts, configure policies, and troubleshoot SELinux issues.',
    theory: `SELinux (Security-Enhanced Linux) provides mandatory access control (MAC) security. It enforces security policies that define what processes can access which resources.

Key concepts:
- Security contexts: user:role:type:level
- Policies: Rules that define allowed access
- Modes: Enforcing, Permissive, Disabled
- Booleans: Runtime policy switches
- File contexts: SELinux labels for files

SELinux operates on the principle of least privilege - everything is denied by default unless explicitly allowed by policy. This provides strong protection against privilege escalation and system compromise.

Common issues arise from incorrect file contexts, missing policies for custom applications, or disabled booleans for standard services.`,
    rhcsaRelevance: 'SELinux is mandatory for RHCSA certification. You must understand modes, manage contexts, troubleshoot access denials, and configure SELinux for web services and file sharing.',
    commands: [
      { command: 'getenforce', description: 'Check current SELinux mode' },
      { command: 'setenforce 0', description: 'Set SELinux to permissive mode' },
      { command: 'ls -Z filename', description: 'Show file SELinux context' },
      { command: 'restorecon -R /path', description: 'Restore default SELinux contexts' },
      { command: 'setsebool -P boolean_name on', description: 'Set SELinux boolean permanently' },
      { command: 'getsebool -a', description: 'List all SELinux booleans' },
      { command: 'ausearch -m AVC -ts recent', description: 'Search for recent SELinux denials' },
      { command: 'semanage fcontext -a -t httpd_exec_t "/path/to/file"', description: 'Add file context rule' }
    ],
    practiceSteps: [
      'Check current SELinux status and mode',
      'Examine file security contexts',
      'Practice changing SELinux modes',
      'Configure SELinux booleans',
      'Troubleshoot SELinux access denials'
    ],
    expectedOutput: `[root@rhel ~]# getenforce
Enforcing
[root@rhel ~]# ls -Z /etc/passwd
system_u:object_r:passwd_file_t:s0 /etc/passwd`
  }
];