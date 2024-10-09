import { expect } from 'chai';
import sinon from 'sinon'
import { createQueue } from 'kue';
import createPushNotificationsJobs from './8-job';

const queue = createQueue();

describe('createPushNotificationsJobs', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = sinon.spy(console, 'log');
    queue.testMode.enter();
  });

  afterEach(() => {
    queue.testMode.exit();
    consoleSpy.restore();
  });

  it('display a error message if jobs is not an array', () => {
    const not_list = {
      phoneNumber: '4153518780',
      message: 'This is the code 1234 to verify your account',
    };
    expect(createPushNotificationsJobs(not_list, queue))
      .to.deep.equal(Error('Jobs is not an array'));
    expect(queue.testMode.jobs.length).to.be.equal(0);
  });

  it('create two new jobs to the queue', (done) => {
    const list = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
    ];
    createPushNotificationsJobs(list, queue);
    expect(queue.testMode.jobs.length).to.be.equal(2);
    expect(queue.testMode.jobs[0].data).to.be.deep.equal(list[0]);
    expect(queue.testMode.jobs[1].data).to.be.deep.equal(list[1]);
    expect(consoleSpy.calledWith(`Notification job created: ${queue.testMode.jobs[0].id}`));
    expect(consoleSpy.calledWith(`Notification job created: ${queue.testMode.jobs[1].id}`));
    done();
  });
})
