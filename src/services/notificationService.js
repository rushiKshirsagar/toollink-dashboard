// Notification Service for generating live alerts
class NotificationService {
  constructor() {
    this.notifications = [];
    this.subscribers = [];
  }

  // Subscribe to notification updates
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  // Notify all subscribers
  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.notifications));
  }

  // Add a new notification
  addNotification(notification) {
    const newNotification = {
      id: Date.now() + Math.random(),
      timestamp: new Date(),
      ...notification
    };
    
    this.notifications.push(newNotification);
    this.notifySubscribers();
    
    // Keep only last 50 notifications
    if (this.notifications.length > 50) {
      this.notifications = this.notifications.slice(-50);
    }
  }

  // Remove a notification
  removeNotification(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notifySubscribers();
  }

  // Get notifications for a specific page
  getNotificationsForPage(page) {
    switch (page) {
      case 'shop-floor':
        return this.notifications; // All notifications
      case 'qa-manager':
        return this.notifications.filter(n => 
          n.type === 'measurement_threshold' || 
          n.type === 'quality_issue' ||
          n.type === 'rejection_rate'
        );
      case 'machines':
        return this.notifications.filter(n => 
          n.type === 'machine_down' || 
          n.type === 'cycle_time' ||
          n.type === 'maintenance'
        );
      case 'operators':
        return this.notifications.filter(n => 
          n.type === 'operator_issue' || 
          n.type === 'performance_alert'
        );
      case 'cells':
        return this.notifications.filter(n => 
          n.type === 'cell_efficiency' || 
          n.type === 'cell_downtime'
        );
      default:
        return [];
    }
  }

  // Generate sample notifications
  generateSampleNotification() {
    const notificationTypes = [
      {
        type: 'machine_down',
        priority: 'critical',
        title: 'Machine Alert',
        message: 'CNC Machine 001 is currently offline'
      },
      {
        type: 'measurement_threshold',
        priority: 'warning',
        title: 'Measurement Alert',
        message: 'Part dimensions approaching tolerance limits'
      },
      {
        type: 'cycle_time',
        priority: 'warning',
        title: 'Cycle Time Alert',
        message: 'Production cycle time increased by 15%'
      },
      {
        type: 'maintenance',
        priority: 'info',
        title: 'Maintenance Reminder',
        message: 'Scheduled maintenance due on Machine 003'
      },
      {
        type: 'quality_issue',
        priority: 'warning',
        title: 'Quality Alert',
        message: 'Rejection rate increased in Cell A'
      },
      {
        type: 'operator_issue',
        priority: 'info',
        title: 'Operator Status',
        message: 'Operator shift change completed'
      }
    ];

    const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    this.addNotification(randomNotification);
  }

  // Simulate real-time notifications
  startSimulation(machinesData, operatorsData) {
    // Generate initial notifications
    this.generateSampleNotification();

    // Set up periodic sample notifications every 1 minute
    setInterval(() => {
      this.generateSampleNotification();
    }, 60000); // Every 1 minute
  }
}

export default new NotificationService(); 