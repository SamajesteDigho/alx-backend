import { createQueue } from 'kue';

const blacklist = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
  job.progress(0);
  if (blacklist.includes(phoneNumber)) {
    return done(Error(`Phone number ${phoneNumber} is blacklisted`));
  }
  job.progress(50);
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  return done();
}

const queue = createQueue();

queue.process('push_notification_code_2', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
