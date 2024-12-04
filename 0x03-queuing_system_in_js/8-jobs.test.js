import kue from 'kue';
import { expect } from 'chai';
import createPushNotificationsJobs from './8-job';

const queue = kue.createQueue();

const jobs = [
  {
    phoneNumber: '1234567890',
    message: 'Your OTP is 9876 for account verification.',
  },
  {
    phoneNumber: '0987654321',
    message: 'Welcome! Use code 6543 to activate your account.',
  },
];

describe('createPushNotificationsJobs', () => {
  before(() => {
    queue.testMode.enter();
  });

  afterEach(() => {
    queue.testMode.clear();
  });

  after(() => {
    queue.testMode.exit();
  });

  it('should throw an error if jobs is not an array and a Number is passed', () => {
    expect(() => {
      createPushNotificationsJobs(42, queue);
    }).to.throw('Jobs is not an array');
  });

  it('should throw an error if jobs is not an array and an Object is passed', () => {
    expect(() => {
      createPushNotificationsJobs({ job: 'email' }, queue);
    }).to.throw('Jobs is not an array');
  });

  it('should throw an error if jobs is not an array and a String is passed', () => {
    expect(() => {
      createPushNotificationsJobs('This is a string', queue);
    }).to.throw('Jobs is not an array');
  });

  it('should not throw an error if an empty array is passed', () => {
    const result = createPushNotificationsJobs([], queue);
    expect(result).to.equal(undefined);
  });

  it('should add multiple jobs to the queue with correct data', () => {
    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs.length).to.equal(2);

    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.eql({
      phoneNumber: '1234567890',
      message: 'Your OTP is 9876 for account verification.',
    });

    expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[1].data).to.eql({
      phoneNumber: '0987654321',
      message: 'Welcome! Use code 6543 to activate your account.',
    });
  });
});

