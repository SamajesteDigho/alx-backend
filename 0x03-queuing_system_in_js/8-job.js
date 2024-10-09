export default function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    return new Error('Jobs is not an array');
  }
  jobs.forEach((elt) => {
    const job = queue.create('push_notification_code_3', elt);
    job.on('enqueue', () => {
      console.log(`Notification job created: ${job.id}`);
    });
    job.on('completed', () => {
      console.log(`Notification job ${job.id} completed`);
    });
    job.on('failed', (err) => {
      console.log(`Notification job ${job.id} failed: ${err}`);
    });
    job.on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });
    job.save();
    console.log(`Notification job created: ${job.id}`);
  });
}
