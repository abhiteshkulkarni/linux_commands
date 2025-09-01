export const examTests = [
  {
    id: 'rhcsa-exam-1',
    title: 'RHCSA Practice Exam 1',
    description: 'Comprehensive practice test covering user management, file permissions, systemd services, and network configuration.',
    duration: '2.5 hours',
    passingScore: 70,
    tasks: [
      {
        id: 'task-1-1',
        title: 'Create User Accounts',
        description: 'Create three user accounts: alice, bob, and charlie. Set alice as a system administrator with sudo privileges. Set bob\'s account to expire on December 31, 2024. Charlie should have a custom home directory at /opt/charlie.',
        points: 10,
        requirements: [
          'Create user alice with sudo privileges',
          'Create user bob with account expiration on 2024-12-31',
          'Create user charlie with home directory /opt/charlie',
          'All users should have /bin/bash as their shell'
        ],
        hints: [
          'Use useradd command with appropriate flags',
          'Add alice to wheel group for sudo access',
          'Use chage command for account expiration',
          'Use -d flag to specify custom home directory'
        ]
      },
      {
        id: 'task-1-2',
        title: 'Configure File Permissions',
        description: 'Create a shared directory /shared/projects with specific permissions. The directory should be owned by root:developers group, have 2775 permissions, and only members of developers group should be able to create files.',
        points: 8,
        requirements: [
          'Create directory /shared/projects',
          'Set ownership to root:developers',
          'Set permissions to 2775 (SGID bit set)',
          'Create developers group if it doesn\'t exist'
        ],
        hints: [
          'Use mkdir to create directory',
          'Use groupadd to create group',
          'Use chown and chmod commands',
          'SGID bit ensures group inheritance'
        ]
      },
      {
        id: 'task-1-3',
        title: 'Configure SSH Service',
        description: 'Configure SSH service to start automatically at boot, disable root login, change default port to 2222, and allow only users alice and bob to connect via SSH.',
        points: 12,
        requirements: [
          'Enable SSH service at boot',
          'Disable root login via SSH',
          'Change SSH port to 2222',
          'Allow only alice and bob SSH access',
          'Restart SSH service to apply changes'
        ],
        hints: [
          'Edit /etc/ssh/sshd_config file',
          'Use systemctl to enable and restart service',
          'Use AllowUsers directive for user restrictions',
          'Update firewall rules for new port'
        ]
      },
      {
        id: 'task-1-4',
        title: 'Configure Network Interface',
        description: 'Configure the primary network interface with static IP 192.168.1.100/24, gateway 192.168.1.1, and DNS servers 8.8.8.8 and 8.8.4.4. Ensure the configuration persists after reboot.',
        points: 10,
        requirements: [
          'Set static IP address 192.168.1.100/24',
          'Configure gateway as 192.168.1.1',
          'Set DNS servers to 8.8.8.8 and 8.8.4.4',
          'Configuration must persist after reboot',
          'Test connectivity after configuration'
        ],
        hints: [
          'Use nmcli command for network configuration',
          'Create new connection profile',
          'Set ipv4.method to manual',
          'Use nmcli con up to activate'
        ]
      },
      {
        id: 'task-1-5',
        title: 'Configure Firewall',
        description: 'Configure firewall to allow SSH on port 2222, HTTP on port 80, and HTTPS on port 443. Block all other incoming connections except those from 192.168.1.0/24 network.',
        points: 8,
        requirements: [
          'Allow SSH on port 2222',
          'Allow HTTP (port 80) and HTTPS (port 443)',
          'Allow connections from 192.168.1.0/24 network',
          'Block all other incoming connections',
          'Make firewall rules permanent'
        ],
        hints: [
          'Use firewall-cmd command',
          'Add custom port for SSH',
          'Add http and https services',
          'Use rich rules for network-specific access',
          'Use --permanent flag and reload'
        ]
      },
      {
        id: 'task-1-6',
        title: 'Configure Cron Jobs',
        description: 'Create a cron job that runs every day at 2:30 AM to backup /etc directory to /backup/etc-$(date +%Y%m%d).tar.gz. The job should run as root and send output to /var/log/backup.log.',
        points: 6,
        requirements: [
          'Create daily cron job at 2:30 AM',
          'Backup /etc directory with date stamp',
          'Save backup to /backup/ directory',
          'Log output to /var/log/backup.log',
          'Job must run as root user'
        ],
        hints: [
          'Use crontab -e to edit root cron',
          'Cron format: minute hour day month weekday',
          'Use tar command for backup',
          'Redirect output using >> for logging'
        ]
      },
      {
        id: 'task-1-7',
        title: 'Configure SELinux',
        description: 'Ensure SELinux is in enforcing mode. Configure SELinux to allow Apache to connect to network databases by enabling the httpd_can_network_connect_db boolean.',
        points: 6,
        requirements: [
          'Set SELinux to enforcing mode',
          'Enable httpd_can_network_connect_db boolean',
          'Make SELinux changes permanent',
          'Verify SELinux status and boolean setting'
        ],
        hints: [
          'Use getenforce to check current mode',
          'Use setenforce to set mode temporarily',
          'Edit /etc/selinux/config for permanent setting',
          'Use setsebool -P for permanent boolean changes'
        ]
      },
      {
        id: 'task-1-8',
        title: 'Configure LVM',
        description: 'Create a logical volume named "data" with 2GB size from volume group "vg_main". Format it with ext4 filesystem and mount it permanently at /data with appropriate permissions.',
        points: 12,
        requirements: [
          'Create logical volume "data" with 2GB size',
          'Use volume group "vg_main"',
          'Format with ext4 filesystem',
          'Mount permanently at /data',
          'Set appropriate permissions (755)'
        ],
        hints: [
          'Use lvcreate command to create LV',
          'Use mkfs.ext4 to format filesystem',
          'Add entry to /etc/fstab for permanent mount',
          'Use mount -a to test fstab entry'
        ]
      },
      {
        id: 'task-1-9',
        title: 'Configure System Logging',
        description: 'Configure rsyslog to send all authentication messages to a separate log file /var/log/auth-custom.log. Ensure log rotation is configured to keep 30 days of logs.',
        points: 6,
        requirements: [
          'Configure rsyslog for auth messages',
          'Send auth logs to /var/log/auth-custom.log',
          'Configure log rotation for 30 days',
          'Restart rsyslog service',
          'Test logging configuration'
        ],
        hints: [
          'Edit /etc/rsyslog.conf or create file in /etc/rsyslog.d/',
          'Use authpriv.* facility for auth messages',
          'Configure logrotate in /etc/logrotate.d/',
          'Use systemctl to restart rsyslog'
        ]
      },
      {
        id: 'task-1-10',
        title: 'System Performance Monitoring',
        description: 'Configure system to collect performance metrics. Set up a script that monitors CPU and memory usage every 5 minutes and logs the data to /var/log/performance.log.',
        points: 8,
        requirements: [
          'Create monitoring script for CPU and memory',
          'Run script every 5 minutes via cron',
          'Log data to /var/log/performance.log',
          'Include timestamp in log entries',
          'Ensure script has proper permissions'
        ],
        hints: [
          'Use top, free, or /proc/stat for metrics',
          'Create script in /usr/local/bin/',
          'Use crontab for 5-minute intervals',
          'Use date command for timestamps'
        ]
      }
    ]
  },
  {
    id: 'rhcsa-exam-2',
    title: 'RHCSA Practice Exam 2',
    description: 'Advanced practice test focusing on storage management, containers, automation, and troubleshooting scenarios.',
    duration: '2.5 hours',
    passingScore: 70,
    tasks: [
      {
        id: 'task-2-1',
        title: 'Configure Advanced User Management',
        description: 'Create a group called "developers" and add users dev1, dev2, and dev3 to it. Configure password policies requiring minimum 8 characters, at least one number, and password expiration every 90 days.',
        points: 10,
        requirements: [
          'Create developers group',
          'Create users dev1, dev2, dev3 and add to developers group',
          'Set password policy: minimum 8 characters',
          'Require at least one number in passwords',
          'Set password expiration to 90 days'
        ],
        hints: [
          'Use groupadd and useradd commands',
          'Edit /etc/login.defs for password policies',
          'Use chage command for password aging',
          'Configure PAM modules for complexity'
        ]
      },
      {
        id: 'task-2-2',
        title: 'Configure Storage with Stratis',
        description: 'Create a Stratis pool named "appdata" using available disk space. Create a filesystem named "webapp" within the pool and mount it at /srv/webapp.',
        points: 12,
        requirements: [
          'Install stratis packages if needed',
          'Create Stratis pool "appdata"',
          'Create filesystem "webapp" in the pool',
          'Mount filesystem at /srv/webapp',
          'Configure automatic mounting at boot'
        ],
        hints: [
          'Use stratis pool create command',
          'Use stratis fs create command',
          'Add entry to /etc/fstab with stratis filesystem type',
          'Use systemctl enable stratisd'
        ]
      },
      {
        id: 'task-2-3',
        title: 'Configure Container Services',
        description: 'Install and configure Podman. Create a systemd service to run an nginx container that starts automatically at boot and serves content from /srv/webapp.',
        points: 14,
        requirements: [
          'Install podman package',
          'Pull nginx container image',
          'Create systemd service for nginx container',
          'Mount /srv/webapp to container',
          'Enable service to start at boot',
          'Configure container to run on port 8080'
        ],
        hints: [
          'Use podman pull nginx',
          'Create service file in /etc/systemd/system/',
          'Use podman generate systemd for service template',
          'Use -v flag for volume mounting'
        ]
      },
      {
        id: 'task-2-4',
        title: 'Configure Advanced Networking',
        description: 'Configure network bonding with two network interfaces in active-backup mode. Assign IP 192.168.2.100/24 to the bond interface and ensure it survives reboot.',
        points: 12,
        requirements: [
          'Create network bond with two interfaces',
          'Configure active-backup bonding mode',
          'Assign static IP 192.168.2.100/24',
          'Configure bond to start at boot',
          'Test failover functionality'
        ],
        hints: [
          'Use nmcli to create bond connection',
          'Add slave connections to bond',
          'Set bond mode to active-backup',
          'Use nmcli con up to activate'
        ]
      },
      {
        id: 'task-2-5',
        title: 'Configure Advanced Firewall Rules',
        description: 'Configure firewall with custom zones. Create a "dmz" zone that allows HTTP, HTTPS, and SSH from specific IP ranges. Configure port forwarding from port 80 to 8080.',
        points: 10,
        requirements: [
          'Create custom firewall zone "dmz"',
          'Allow HTTP, HTTPS, SSH in dmz zone',
          'Restrict access to specific IP ranges',
          'Configure port forwarding 80->8080',
          'Make all changes permanent'
        ],
        hints: [
          'Use firewall-cmd --new-zone',
          'Use --add-source for IP restrictions',
          'Use --add-forward-port for port forwarding',
          'Use --permanent flag for persistence'
        ]
      },
      {
        id: 'task-2-6',
        title: 'Configure System Tuning',
        description: 'Configure system performance tuning using tuned. Apply the "throughput-performance" profile and create a custom tuning profile that increases the maximum number of open files.',
        points: 8,
        requirements: [
          'Install and enable tuned service',
          'Apply throughput-performance profile',
          'Create custom tuning profile',
          'Increase max open files limit',
          'Verify profile is active'
        ],
        hints: [
          'Use tuned-adm command',
          'Create profile in /etc/tuned/',
          'Edit limits.conf for file limits',
          'Use tuned-adm active to verify'
        ]
      },
      {
        id: 'task-2-7',
        title: 'Configure Advanced SELinux',
        description: 'Create custom SELinux policy for a custom application. The application runs on port 9999 and needs to access files in /opt/myapp. Configure appropriate SELinux contexts and policies.',
        points: 12,
        requirements: [
          'Define custom SELinux port context for 9999',
          'Set appropriate file contexts for /opt/myapp',
          'Create custom SELinux policy if needed',
          'Test application access with SELinux enforcing',
          'Document policy changes'
        ],
        hints: [
          'Use semanage port to define port context',
          'Use semanage fcontext for file contexts',
          'Use restorecon to apply contexts',
          'Use audit2allow for custom policies'
        ]
      },
      {
        id: 'task-2-8',
        title: 'Configure System Backup and Recovery',
        description: 'Configure automated system backup using tar and rsync. Create incremental backups of /home and /etc directories to remote location. Schedule backups to run daily at 3 AM.',
        points: 10,
        requirements: [
          'Create backup script using tar and rsync',
          'Configure incremental backup strategy',
          'Backup /home and /etc directories',
          'Schedule daily execution at 3 AM',
          'Include error handling and logging'
        ],
        hints: [
          'Use tar with --listed-incremental option',
          'Use rsync for remote synchronization',
          'Create cron job for scheduling',
          'Add error checking and log rotation'
        ]
      },
      {
        id: 'task-2-9',
        title: 'Configure System Monitoring',
        description: 'Set up system monitoring using systemd journal and custom scripts. Configure alerts for high CPU usage, low disk space, and failed services.',
        points: 8,
        requirements: [
          'Configure journald for persistent logging',
          'Create monitoring scripts for CPU and disk',
          'Set up alerting mechanism',
          'Monitor systemd service failures',
          'Configure email notifications'
        ],
        hints: [
          'Edit /etc/systemd/journald.conf',
          'Use systemctl --failed for service monitoring',
          'Create scripts with threshold checking',
          'Configure mail service for alerts'
        ]
      },
      {
        id: 'task-2-10',
        title: 'Troubleshoot System Issues',
        description: 'A system service is failing to start, network connectivity is intermittent, and users cannot log in. Identify and resolve these issues using system logs and diagnostic tools.',
        points: 14,
        requirements: [
          'Identify failing service and resolve issue',
          'Diagnose network connectivity problems',
          'Resolve user login issues',
          'Use appropriate diagnostic tools',
          'Document troubleshooting steps'
        ],
        hints: [
          'Use journalctl to check service logs',
          'Use systemctl status for service details',
          'Check network configuration with ip and nmcli',
          'Verify authentication services and logs'
        ]
      }
    ]
  },
  {
    id: 'rhcsa-exam-3',
    title: 'RHCSA Practice Exam 3',
    description: 'Comprehensive test covering file systems, kernel parameters, automation scripts, and security hardening.',
    duration: '2.5 hours',
    passingScore: 70,
    tasks: [
      {
        id: 'task-3-1',
        title: 'Configure Advanced File Systems',
        description: 'Create and configure XFS and ext4 file systems with specific features. Configure quotas for users and groups, and set up automatic mounting with specific options.',
        points: 12,
        requirements: [
          'Create XFS filesystem with project quotas enabled',
          'Create ext4 filesystem with journal options',
          'Configure user and group quotas',
          'Set up automatic mounting with noatime option',
          'Test quota enforcement'
        ]
      },
      {
        id: 'task-3-2',
        title: 'Kernel Parameter Tuning',
        description: 'Configure kernel parameters for network performance optimization. Modify sysctl settings for TCP buffer sizes, connection limits, and enable IP forwarding permanently.',
        points: 8,
        requirements: [
          'Increase TCP buffer sizes',
          'Set maximum connection limits',
          'Enable IP forwarding permanently',
          'Configure kernel parameters to persist reboot',
          'Verify parameter changes'
        ]
      },
      {
        id: 'task-3-3',
        title: 'Advanced Shell Scripting',
        description: 'Create a comprehensive system maintenance script that performs log cleanup, checks disk usage, monitors services, and sends reports via email.',
        points: 14,
        requirements: [
          'Create log cleanup functionality',
          'Implement disk usage monitoring',
          'Add service status checking',
          'Configure email reporting',
          'Include error handling and logging'
        ]
      },
      {
        id: 'task-3-4',
        title: 'Configure High Availability Services',
        description: 'Configure systemd services with automatic restart policies, dependency management, and resource limits. Ensure critical services restart automatically on failure.',
        points: 10,
        requirements: [
          'Configure service restart policies',
          'Set up service dependencies',
          'Implement resource limits',
          'Configure failure detection',
          'Test automatic recovery'
        ]
      },
      {
        id: 'task-3-5',
        title: 'Security Hardening',
        description: 'Implement comprehensive security hardening including SSH key authentication, sudo restrictions, file integrity monitoring, and access controls.',
        points: 12,
        requirements: [
          'Configure SSH key-only authentication',
          'Implement granular sudo restrictions',
          'Set up file integrity monitoring',
          'Configure access control lists',
          'Implement security logging'
        ]
      },
      {
        id: 'task-3-6',
        title: 'Performance Optimization',
        description: 'Optimize system performance by configuring CPU governors, I/O schedulers, memory management, and process priorities for specific workloads.',
        points: 10,
        requirements: [
          'Configure appropriate CPU governor',
          'Set optimal I/O scheduler',
          'Tune memory management parameters',
          'Configure process priorities',
          'Measure performance improvements'
        ]
      },
      {
        id: 'task-3-7',
        title: 'Advanced Network Services',
        description: 'Configure and secure network services including DNS caching, NTP synchronization, and network file sharing with proper authentication.',
        points: 12,
        requirements: [
          'Configure local DNS caching',
          'Set up NTP time synchronization',
          'Configure secure file sharing',
          'Implement service authentication',
          'Test service functionality'
        ]
      },
      {
        id: 'task-3-8',
        title: 'Disaster Recovery Planning',
        description: 'Create comprehensive disaster recovery procedures including system imaging, configuration backup, and automated recovery scripts.',
        points: 10,
        requirements: [
          'Create system image backup',
          'Backup system configurations',
          'Develop recovery procedures',
          'Create automated recovery scripts',
          'Test recovery process'
        ]
      },
      {
        id: 'task-3-9',
        title: 'Container Orchestration',
        description: 'Deploy and manage multi-container applications using Podman and systemd. Configure container networking, storage, and service dependencies.',
        points: 12,
        requirements: [
          'Deploy multi-container application',
          'Configure container networking',
          'Set up persistent storage',
          'Manage service dependencies',
          'Implement health checking'
        ]
      },
      {
        id: 'task-3-10',
        title: 'System Integration Testing',
        description: 'Develop comprehensive system tests to verify all configured services, security settings, and performance optimizations are working correctly.',
        points: 10,
        requirements: [
          'Create service functionality tests',
          'Verify security configurations',
          'Test performance optimizations',
          'Implement automated testing',
          'Generate test reports'
        ]
      }
    ]
  },
  {
    id: 'rhcsa-exam-4',
    title: 'RHCSA Practice Exam 4',
    description: 'Specialized test focusing on enterprise scenarios including LDAP integration, advanced storage, and compliance requirements.',
    duration: '2.5 hours',
    passingScore: 70,
    tasks: [
      {
        id: 'task-4-1',
        title: 'LDAP Authentication Integration',
        description: 'Configure system to authenticate users against LDAP directory. Set up SSSD for user authentication and authorization with proper caching.',
        points: 14,
        requirements: [
          'Install and configure SSSD',
          'Configure LDAP authentication',
          'Set up user authorization',
          'Configure offline caching',
          'Test user login functionality'
        ]
      },
      {
        id: 'task-4-2',
        title: 'Advanced Storage Management',
        description: 'Configure software RAID, LVM snapshots, and encrypted storage. Implement storage monitoring and automated maintenance procedures.',
        points: 16,
        requirements: [
          'Configure RAID 1 array',
          'Create LVM snapshots',
          'Set up encrypted storage with LUKS',
          'Implement storage monitoring',
          'Create maintenance procedures'
        ]
      },
      {
        id: 'task-4-3',
        title: 'Compliance and Auditing',
        description: 'Configure system auditing using auditd. Set up file access monitoring, privilege escalation tracking, and compliance reporting.',
        points: 12,
        requirements: [
          'Configure auditd service',
          'Set up file access monitoring',
          'Track privilege escalations',
          'Configure log rotation',
          'Generate compliance reports'
        ]
      },
      {
        id: 'task-4-4',
        title: 'Enterprise Networking',
        description: 'Configure advanced networking including VLANs, network bridges, and traffic shaping. Implement network security policies.',
        points: 12,
        requirements: [
          'Configure VLAN interfaces',
          'Set up network bridges',
          'Implement traffic shaping',
          'Configure network security policies',
          'Test network functionality'
        ]
      },
      {
        id: 'task-4-5',
        title: 'Centralized Logging',
        description: 'Configure centralized logging using rsyslog. Set up log forwarding, filtering, and automated analysis with alerting.',
        points: 10,
        requirements: [
          'Configure rsyslog for centralized logging',
          'Set up log forwarding',
          'Implement log filtering',
          'Configure automated analysis',
          'Set up alerting mechanisms'
        ]
      },
      {
        id: 'task-4-6',
        title: 'Resource Management',
        description: 'Configure systemd resource management using cgroups. Implement CPU, memory, and I/O limits for services and users.',
        points: 10,
        requirements: [
          'Configure systemd resource limits',
          'Set up cgroup hierarchies',
          'Implement CPU limits',
          'Configure memory limits',
          'Set I/O bandwidth limits'
        ]
      },
      {
        id: 'task-4-7',
        title: 'Automated Deployment',
        description: 'Create automated deployment scripts using Ansible or shell scripts. Implement configuration management and service deployment.',
        points: 12,
        requirements: [
          'Create deployment automation',
          'Implement configuration management',
          'Set up service deployment',
          'Configure rollback procedures',
          'Test deployment process'
        ]
      },
      {
        id: 'task-4-8',
        title: 'Database Integration',
        description: 'Configure and secure database services. Set up user authentication, backup procedures, and performance monitoring.',
        points: 10,
        requirements: [
          'Install and configure database service',
          'Set up user authentication',
          'Configure backup procedures',
          'Implement performance monitoring',
          'Secure database access'
        ]
      },
      {
        id: 'task-4-9',
        title: 'Web Services Configuration',
        description: 'Configure Apache or Nginx web server with SSL/TLS, virtual hosts, and security hardening. Implement load balancing.',
        points: 12,
        requirements: [
          'Configure web server with SSL/TLS',
          'Set up virtual hosts',
          'Implement security hardening',
          'Configure load balancing',
          'Test web service functionality'
        ]
      },
      {
        id: 'task-4-10',
        title: 'System Migration',
        description: 'Plan and execute system migration including data transfer, service migration, and configuration preservation.',
        points: 12,
        requirements: [
          'Plan migration strategy',
          'Execute data transfer',
          'Migrate services',
          'Preserve configurations',
          'Validate migration success'
        ]
      }
    ]
  },
  {
    id: 'rhcsa-exam-5',
    title: 'RHCSA Practice Exam 5',
    description: 'Cloud-focused practice test covering containerization, automation, monitoring, and modern DevOps practices.',
    duration: '2.5 hours',
    passingScore: 70,
    tasks: [
      {
        id: 'task-5-1',
        title: 'Container Registry Setup',
        description: 'Set up a private container registry using Podman. Configure authentication, SSL certificates, and automated image scanning.',
        points: 14,
        requirements: [
          'Install and configure container registry',
          'Set up SSL certificates',
          'Configure user authentication',
          'Implement image scanning',
          'Test registry functionality'
        ]
      },
      {
        id: 'task-5-2',
        title: 'Infrastructure as Code',
        description: 'Create infrastructure automation using shell scripts and systemd. Implement service discovery and configuration management.',
        points: 12,
        requirements: [
          'Create infrastructure automation scripts',
          'Implement service discovery',
          'Set up configuration management',
          'Configure automated deployment',
          'Test infrastructure automation'
        ]
      },
      {
        id: 'task-5-3',
        title: 'Monitoring and Alerting',
        description: 'Set up comprehensive system monitoring using native tools. Configure metrics collection, alerting, and dashboard creation.',
        points: 12,
        requirements: [
          'Configure metrics collection',
          'Set up alerting rules',
          'Create monitoring dashboards',
          'Implement log aggregation',
          'Test monitoring functionality'
        ]
      },
      {
        id: 'task-5-4',
        title: 'CI/CD Pipeline Integration',
        description: 'Configure system to support CI/CD pipelines. Set up automated testing, deployment hooks, and rollback mechanisms.',
        points: 14,
        requirements: [
          'Configure CI/CD integration',
          'Set up automated testing',
          'Implement deployment hooks',
          'Configure rollback mechanisms',
          'Test pipeline functionality'
        ]
      },
      {
        id: 'task-5-5',
        title: 'Microservices Architecture',
        description: 'Deploy and manage microservices using containers. Configure service mesh, load balancing, and inter-service communication.',
        points: 16,
        requirements: [
          'Deploy microservices architecture',
          'Configure service mesh',
          'Set up load balancing',
          'Implement service communication',
          'Configure service monitoring'
        ]
      },
      {
        id: 'task-5-6',
        title: 'Cloud Storage Integration',
        description: 'Configure cloud storage integration using S3-compatible storage. Set up automated backups and data synchronization.',
        points: 10,
        requirements: [
          'Configure S3-compatible storage',
          'Set up automated backups',
          'Implement data synchronization',
          'Configure access controls',
          'Test storage functionality'
        ]
      },
      {
        id: 'task-5-7',
        title: 'Security Scanning and Compliance',
        description: 'Implement automated security scanning and compliance checking. Configure vulnerability assessment and remediation procedures.',
        points: 12,
        requirements: [
          'Set up security scanning',
          'Configure compliance checking',
          'Implement vulnerability assessment',
          'Set up remediation procedures',
          'Generate security reports'
        ]
      },
      {
        id: 'task-5-8',
        title: 'Performance Optimization',
        description: 'Optimize system performance for cloud workloads. Configure auto-scaling, resource optimization, and performance monitoring.',
        points: 10,
        requirements: [
          'Configure auto-scaling',
          'Implement resource optimization',
          'Set up performance monitoring',
          'Configure alerting thresholds',
          'Test optimization effectiveness'
        ]
      },
      {
        id: 'task-5-9',
        title: 'Disaster Recovery Automation',
        description: 'Create automated disaster recovery procedures. Implement backup automation, recovery testing, and failover mechanisms.',
        points: 10,
        requirements: [
          'Create backup automation',
          'Implement recovery procedures',
          'Set up failover mechanisms',
          'Configure recovery testing',
          'Document recovery procedures'
        ]
      },
      {
        id: 'task-5-10',
        title: 'Multi-Environment Management',
        description: 'Configure system to manage multiple environments (dev, staging, production). Implement environment-specific configurations and deployment strategies.',
        points: 10,
        requirements: [
          'Configure multi-environment setup',
          'Implement environment-specific configs',
          'Set up deployment strategies',
          'Configure environment isolation',
          'Test environment management'
        ]
      }
    ]
  },
  {
    id: 'rhcsa-exam-6',
    title: 'RHCSA Practice Exam 6',
    description: 'Advanced troubleshooting scenarios covering system recovery, performance issues, and complex configuration problems.',
    duration: '2.5 hours',
    passingScore: 70,
    tasks: [
      {
        id: 'task-6-1',
        title: 'Boot Process Troubleshooting',
        description: 'System fails to boot properly. Diagnose and fix boot loader issues, kernel parameters, and systemd service failures.',
        points: 16,
        requirements: [
          'Diagnose boot failure causes',
          'Fix boot loader configuration',
          'Resolve kernel parameter issues',
          'Fix systemd service dependencies',
          'Verify successful boot process'
        ]
      },
      {
        id: 'task-6-2',
        title: 'File System Recovery',
        description: 'File system corruption has occurred. Perform file system checks, recover data, and implement preventive measures.',
        points: 14,
        requirements: [
          'Diagnose file system corruption',
          'Perform file system repair',
          'Recover corrupted data',
          'Implement monitoring',
          'Set up preventive measures'
        ]
      },
      {
        id: 'task-6-3',
        title: 'Network Connectivity Issues',
        description: 'Multiple network connectivity problems exist. Diagnose DNS resolution, routing issues, and firewall problems.',
        points: 12,
        requirements: [
          'Diagnose DNS resolution issues',
          'Fix routing table problems',
          'Resolve firewall conflicts',
          'Test network connectivity',
          'Document troubleshooting steps'
        ]
      },
      {
        id: 'task-6-4',
        title: 'Performance Degradation Analysis',
        description: 'System performance has degraded significantly. Identify bottlenecks, analyze resource usage, and implement optimizations.',
        points: 14,
        requirements: [
          'Identify performance bottlenecks',
          'Analyze CPU and memory usage',
          'Diagnose I/O performance issues',
          'Implement performance optimizations',
          'Monitor improvement results'
        ]
      },
      {
        id: 'task-6-5',
        title: 'Service Dependency Resolution',
        description: 'Multiple services are failing due to dependency issues. Analyze service dependencies and resolve startup problems.',
        points: 10,
        requirements: [
          'Analyze service dependencies',
          'Identify dependency conflicts',
          'Resolve startup order issues',
          'Fix service configuration',
          'Test service startup'
        ]
      },
      {
        id: 'task-6-6',
        title: 'Security Breach Response',
        description: 'System shows signs of security compromise. Investigate breach indicators, secure the system, and implement additional protections.',
        points: 16,
        requirements: [
          'Investigate security indicators',
          'Identify compromise vectors',
          'Secure compromised accounts',
          'Implement additional protections',
          'Document incident response'
        ]
      },
      {
        id: 'task-6-7',
        title: 'Storage Space Crisis',
        description: 'System is running out of storage space. Identify space usage, clean up unnecessary files, and implement space management.',
        points: 8,
        requirements: [
          'Analyze disk space usage',
          'Identify large files and directories',
          'Clean up unnecessary files',
          'Implement space monitoring',
          'Set up automated cleanup'
        ]
      },
      {
        id: 'task-6-8',
        title: 'User Access Problems',
        description: 'Users cannot log in or access resources. Diagnose authentication issues, permission problems, and account lockouts.',
        points: 10,
        requirements: [
          'Diagnose authentication failures',
          'Resolve permission issues',
          'Fix account lockout problems',
          'Test user access',
          'Implement access monitoring'
        ]
      },
      {
        id: 'task-6-9',
        title: 'Application Service Failures',
        description: 'Critical application services are failing. Analyze application logs, fix configuration issues, and restore service functionality.',
        points: 12,
        requirements: [
          'Analyze application logs',
          'Identify configuration issues',
          'Fix service dependencies',
          'Restore service functionality',
          'Implement service monitoring'
        ]
      },
      {
        id: 'task-6-10',
        title: 'System Recovery Planning',
        description: 'Create comprehensive system recovery procedures based on identified issues. Implement automated recovery and monitoring.',
        points: 8,
        requirements: [
          'Document recovery procedures',
          'Create automated recovery scripts',
          'Implement system monitoring',
          'Test recovery procedures',
          'Train on recovery processes'
        ]
      }
    ]
  },
  {
    id: 'rhcsa-exam-7',
    title: 'RHCSA Practice Exam 7',
    description: 'Enterprise integration test covering directory services, centralized management, and large-scale deployment scenarios.',
    duration: '2.5 hours',
    passingScore: 70,
    tasks: [
      {
        id: 'task-7-1',
        title: 'Active Directory Integration',
        description: 'Configure system to integrate with Active Directory. Set up Kerberos authentication, user mapping, and group policies.',
        points: 16,
        requirements: [
          'Configure Kerberos authentication',
          'Set up Active Directory integration',
          'Configure user and group mapping',
          'Implement group policies',
          'Test AD authentication'
        ]
      },
      {
        id: 'task-7-2',
        title: 'Centralized Configuration Management',
        description: 'Implement centralized configuration management system. Configure automated policy deployment and compliance checking.',
        points: 14,
        requirements: [
          'Set up configuration management',
          'Configure policy deployment',
          'Implement compliance checking',
          'Set up automated updates',
          'Test configuration management'
        ]
      },
      {
        id: 'task-7-3',
        title: 'Enterprise Monitoring Solution',
        description: 'Deploy enterprise monitoring solution. Configure metrics collection, alerting, and reporting for multiple systems.',
        points: 12,
        requirements: [
          'Deploy monitoring infrastructure',
          'Configure metrics collection',
          'Set up alerting system',
          'Create monitoring dashboards',
          'Implement reporting'
        ]
      },
      {
        id: 'task-7-4',
        title: 'High Availability Clustering',
        description: 'Configure high availability cluster. Set up shared storage, failover mechanisms, and cluster monitoring.',
        points: 18,
        requirements: [
          'Configure cluster nodes',
          'Set up shared storage',
          'Implement failover mechanisms',
          'Configure cluster monitoring',
          'Test failover scenarios'
        ]
      },
      {
        id: 'task-7-5',
        title: 'Enterprise Backup Solution',
        description: 'Implement enterprise backup solution. Configure automated backups, retention policies, and disaster recovery procedures.',
        points: 12,
        requirements: [
          'Configure backup infrastructure',
          'Set up automated backups',
          'Implement retention policies',
          'Configure disaster recovery',
          'Test backup and recovery'
        ]
      },
      {
        id: 'task-7-6',
        title: 'Network Services Integration',
        description: 'Configure enterprise network services including DNS, DHCP, and NTP. Implement service redundancy and monitoring.',
        points: 10,
        requirements: [
          'Configure DNS services',
          'Set up DHCP services',
          'Configure NTP synchronization',
          'Implement service redundancy',
          'Set up service monitoring'
        ]
      },
      {
        id: 'task-7-7',
        title: 'Security Policy Implementation',
        description: 'Implement enterprise security policies. Configure access controls, audit logging, and compliance reporting.',
        points: 12,
        requirements: [
          'Implement access control policies',
          'Configure audit logging',
          'Set up compliance monitoring',
          'Create security reports',
          'Test security controls'
        ]
      },
      {
        id: 'task-7-8',
        title: 'Application Deployment Pipeline',
        description: 'Create enterprise application deployment pipeline. Configure automated testing, staging, and production deployment.',
        points: 10,
        requirements: [
          'Configure deployment pipeline',
          'Set up automated testing',
          'Configure staging environment',
          'Implement production deployment',
          'Test deployment process'
        ]
      },
      {
        id: 'task-7-9',
        title: 'Performance Management',
        description: 'Implement enterprise performance management. Configure capacity planning, performance monitoring, and optimization.',
        points: 8,
        requirements: [
          'Set up performance monitoring',
          'Configure capacity planning',
          'Implement optimization strategies',
          'Create performance reports',
          'Test performance improvements'
        ]
      },
      {
        id: 'task-7-10',
        title: 'Documentation and Training',
        description: 'Create comprehensive documentation and training materials for enterprise deployment. Include procedures, troubleshooting, and best practices.',
        points: 8,
        requirements: [
          'Create system documentation',
          'Develop troubleshooting guides',
          'Write best practices documentation',
          'Create training materials',
          'Test documentation accuracy'
        ]
      }
    ]
  },
  {
    id: 'rhcsa-exam-8',
    title: 'RHCSA Practice Exam 8',
    description: 'Automation and scripting focused test covering advanced shell scripting, system automation, and DevOps practices.',
    duration: '2.5 hours',
    passingScore: 70,
    tasks: [
      {
        id: 'task-8-1',
        title: 'Advanced Shell Scripting Framework',
        description: 'Create a comprehensive shell scripting framework with logging, error handling, configuration management, and modular design.',
        points: 16,
        requirements: [
          'Create modular script framework',
          'Implement comprehensive logging',
          'Add error handling mechanisms',
          'Configure parameter management',
          'Test framework functionality'
        ]
      },
      {
        id: 'task-8-2',
        title: 'System Automation Suite',
        description: 'Develop automated system management suite including user management, service deployment, and configuration updates.',
        points: 14,
        requirements: [
          'Create user management automation',
          'Implement service deployment',
          'Configure automated updates',
          'Set up configuration management',
          'Test automation suite'
        ]
      },
      {
        id: 'task-8-3',
        title: 'Infrastructure Provisioning',
        description: 'Create infrastructure provisioning scripts. Automate system setup, service configuration, and environment preparation.',
        points: 12,
        requirements: [
          'Create provisioning scripts',
          'Automate system setup',
          'Configure service automation',
          'Implement environment setup',
          'Test provisioning process'
        ]
      },
      {
        id: 'task-8-4',
        title: 'Monitoring and Alerting Automation',
        description: 'Develop automated monitoring and alerting system. Create custom metrics, automated responses, and escalation procedures.',
        points: 12,
        requirements: [
          'Create custom monitoring scripts',
          'Implement automated alerting',
          'Configure response automation',
          'Set up escalation procedures',
          'Test monitoring automation'
        ]
      },
      {
        id: 'task-8-5',
        title: 'Deployment Automation Pipeline',
        description: 'Build comprehensive deployment automation pipeline. Include testing, staging, production deployment, and rollback capabilities.',
        points: 16,
        requirements: [
          'Create deployment pipeline',
          'Implement automated testing',
          'Configure staging deployment',
          'Set up production deployment',
          'Implement rollback automation'
        ]
      },
      {
        id: 'task-8-6',
        title: 'Security Automation Tools',
        description: 'Develop security automation tools including vulnerability scanning, compliance checking, and automated remediation.',
        points: 12,
        requirements: [
          'Create vulnerability scanning',
          'Implement compliance checking',
          'Configure automated remediation',
          'Set up security reporting',
          'Test security automation'
        ]
      },
      {
        id: 'task-8-7',
        title: 'Backup and Recovery Automation',
        description: 'Create comprehensive backup and recovery automation. Include data backup, system imaging, and automated recovery procedures.',
        points: 10,
        requirements: [
          'Automate data backup processes',
          'Create system imaging automation',
          'Implement recovery automation',
          'Configure backup verification',
          'Test recovery procedures'
        ]
      },
      {
        id: 'task-8-8',
        title: 'Performance Optimization Automation',
        description: 'Develop automated performance optimization tools. Create performance monitoring, analysis, and optimization scripts.',
        points: 8,
        requirements: [
          'Create performance monitoring',
          'Implement automated analysis',
          'Configure optimization scripts',
          'Set up performance reporting',
          'Test optimization automation'
        ]
      },
      {
        id: 'task-8-9',
        title: 'Log Management Automation',
        description: 'Build automated log management system. Include log collection, analysis, archiving, and alerting capabilities.',
        points: 8,
        requirements: [
          'Automate log collection',
          'Implement log analysis',
          'Configure log archiving',
          'Set up log-based alerting',
          'Test log management'
        ]
      },
      {
        id: 'task-8-10',
        title: 'Integration Testing Framework',
        description: 'Create comprehensive integration testing framework for all automation tools. Include test automation, reporting, and validation.',
        points: 12,
        requirements: [
          'Create testing framework',
          'Implement test automation',
          'Configure test reporting',
          'Set up validation procedures',
          'Test framework functionality'
        ]
      }
    ]
  },
  {
    id: 'rhcsa-exam-9',
    title: 'RHCSA Practice Exam 9',
    description: 'Real-world scenario test simulating actual enterprise environments with complex, interconnected tasks.',
    duration: '2.5 hours',
    passingScore: 70,
    tasks: [
      {
        id: 'task-9-1',
        title: 'Multi-Tier Application Deployment',
        description: 'Deploy a complete multi-tier application including web server, application server, and database. Configure load balancing and high availability.',
        points: 20,
        requirements: [
          'Deploy web server tier',
          'Configure application server',
          'Set up database server',
          'Implement load balancing',
          'Configure high availability'
        ]
      },
      {
        id: 'task-9-2',
        title: 'Enterprise Security Implementation',
        description: 'Implement comprehensive enterprise security including PKI, SSL/TLS, firewall rules, and intrusion detection.',
        points: 16,
        requirements: [
          'Set up PKI infrastructure',
          'Configure SSL/TLS certificates',
          'Implement firewall rules',
          'Configure intrusion detection',
          'Test security implementation'
        ]
      },
      {
        id: 'task-9-3',
        title: 'Data Management and Backup',
        description: 'Implement enterprise data management including database clustering, replication, backup, and disaster recovery.',
        points: 14,
        requirements: [
          'Configure database clustering',
          'Set up data replication',
          'Implement backup strategies',
          'Configure disaster recovery',
          'Test data recovery procedures'
        ]
      },
      {
        id: 'task-9-4',
        title: 'Network Infrastructure Setup',
        description: 'Configure complete network infrastructure including VLANs, routing, DNS, DHCP, and network monitoring.',
        points: 12,
        requirements: [
          'Configure VLAN infrastructure',
          'Set up routing protocols',
          'Configure DNS and DHCP',
          'Implement network monitoring',
          'Test network functionality'
        ]
      },
      {
        id: 'task-9-5',
        title: 'Monitoring and Logging Infrastructure',
        description: 'Deploy comprehensive monitoring and logging infrastructure including metrics collection, log aggregation, and alerting.',
        points: 12,
        requirements: [
          'Deploy monitoring infrastructure',
          'Configure log aggregation',
          'Set up metrics collection',
          'Implement alerting system',
          'Create monitoring dashboards'
        ]
      },
      {
        id: 'task-9-6',
        title: 'Automation and Orchestration',
        description: 'Implement automation and orchestration for the entire infrastructure including deployment, scaling, and maintenance.',
        points: 10,
        requirements: [
          'Create deployment automation',
          'Implement auto-scaling',
          'Configure maintenance automation',
          'Set up orchestration workflows',
          'Test automation systems'
        ]
      },
      {
        id: 'task-9-7',
        title: 'Performance Optimization',
        description: 'Optimize performance across all tiers including database tuning, web server optimization, and system performance.',
        points: 8,
        requirements: [
          'Optimize database performance',
          'Tune web server configuration',
          'Optimize system performance',
          'Implement caching strategies',
          'Monitor performance improvements'
        ]
      },
      {
        id: 'task-9-8',
        title: 'Compliance and Auditing',
        description: 'Implement compliance and auditing framework including access logging, compliance monitoring, and reporting.',
        points: 6,
        requirements: [
          'Configure access logging',
          'Implement compliance monitoring',
          'Set up audit reporting',
          'Configure compliance alerts',
          'Test compliance framework'
        ]
      },
      {
        id: 'task-9-9',
        title: 'Disaster Recovery Testing',
        description: 'Conduct comprehensive disaster recovery testing including failover procedures, data recovery, and service restoration.',
        points: 6,
        requirements: [
          'Test failover procedures',
          'Verify data recovery',
          'Test service restoration',
          'Validate recovery times',
          'Document recovery procedures'
        ]
      },
      {
        id: 'task-9-10',
        title: 'Documentation and Handover',
        description: 'Create comprehensive documentation including architecture diagrams, procedures, troubleshooting guides, and operational runbooks.',
        points: 6,
        requirements: [
          'Create architecture documentation',
          'Write operational procedures',
          'Develop troubleshooting guides',
          'Create operational runbooks',
          'Prepare handover documentation'
        ]
      }
    ]
  },
  {
    id: 'rhcsa-exam-10',
    title: 'RHCSA Practice Exam 10',
    description: 'Final comprehensive exam covering all RHCSA objectives with emphasis on practical problem-solving and real-world scenarios.',
    duration: '2.5 hours',
    passingScore: 70,
    tasks: [
      {
        id: 'task-10-1',
        title: 'Complete System Setup',
        description: 'Set up a complete RHEL system from scratch including partitioning, file systems, user management, and basic services.',
        points: 18,
        requirements: [
          'Configure disk partitioning',
          'Set up file systems',
          'Configure user management',
          'Set up basic services',
          'Configure system security'
        ]
      },
      {
        id: 'task-10-2',
        title: 'Network Services Configuration',
        description: 'Configure all essential network services including SSH, HTTP, DNS, and NTP with proper security and monitoring.',
        points: 16,
        requirements: [
          'Configure SSH service',
          'Set up HTTP service',
          'Configure DNS resolution',
          'Set up NTP synchronization',
          'Implement service monitoring'
        ]
      },
      {
        id: 'task-10-3',
        title: 'Storage Management Implementation',
        description: 'Implement comprehensive storage management including LVM, RAID, file systems, and backup strategies.',
        points: 14,
        requirements: [
          'Configure LVM storage',
          'Set up RAID arrays',
          'Configure file systems',
          'Implement backup strategies',
          'Test storage functionality'
        ]
      },
      {
        id: 'task-10-4',
        title: 'Security Hardening',
        description: 'Implement comprehensive security hardening including SELinux, firewall, user security, and system auditing.',
        points: 14,
        requirements: [
          'Configure SELinux policies',
          'Set up firewall rules',
          'Implement user security',
          'Configure system auditing',
          'Test security measures'
        ]
      },
      {
        id: 'task-10-5',
        title: 'System Monitoring and Logging',
        description: 'Set up comprehensive system monitoring and logging including performance monitoring, log management, and alerting.',
        points: 12,
        requirements: [
          'Configure performance monitoring',
          'Set up log management',
          'Implement alerting system',
          'Create monitoring dashboards',
          'Test monitoring functionality'
        ]
      },
      {
        id: 'task-10-6',
        title: 'Automation and Scripting',
        description: 'Create automation scripts for system management including maintenance tasks, monitoring, and deployment procedures.',
        points: 10,
        requirements: [
          'Create maintenance scripts',
          'Implement monitoring automation',
          'Configure deployment scripts',
          'Set up scheduled tasks',
          'Test automation scripts'
        ]
      },
      {
        id: 'task-10-7',
        title: 'Troubleshooting Scenarios',
        description: 'Resolve multiple system issues including boot problems, service failures, network issues, and performance problems.',
        points: 8,
        requirements: [
          'Resolve boot problems',
          'Fix service failures',
          'Troubleshoot network issues',
          'Solve performance problems',
          'Document solutions'
        ]
      },
      {
        id: 'task-10-8',
        title: 'Container Services',
        description: 'Configure container services including Podman, container networking, storage, and systemd integration.',
        points: 6,
        requirements: [
          'Configure Podman service',
          'Set up container networking',
          'Configure container storage',
          'Integrate with systemd',
          'Test container functionality'
        ]
      },
      {
        id: 'task-10-9',
        title: 'System Integration',
        description: 'Integrate all configured services and ensure proper inter-service communication, dependencies, and functionality.',
        points: 6,
        requirements: [
          'Configure service integration',
          'Set up service dependencies',
          'Test inter-service communication',
          'Verify system functionality',
          'Optimize system performance'
        ]
      },
      {
        id: 'task-10-10',
        title: 'Final System Validation',
        description: 'Perform comprehensive system validation including functionality testing, security verification, and performance validation.',
        points: 6,
        requirements: [
          'Test all system functionality',
          'Verify security configuration',
          'Validate system performance',
          'Check compliance requirements',
          'Create final system report'
        ]
      }
    ]
  }
];