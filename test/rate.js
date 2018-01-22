process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const ContentStat = require('../api/models/content_stat');
const Content = require('../api/models/content');
const Rate = require('../api/models/rate');
const User = require('../api/models/user');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Rate', () => {
  const contentId = '5a63e724aa491c5bffc83ff3';
  const contentName = 'Ip Man';
  const contentYear = 2008
  const contentObjectId = mongoose.Types.ObjectId(contentId);

  const userId = '5a63e724aa491c5bffc83ff4';
  const userFirstName = 'Shouhei';
  const userLastName = 'Yamauchi';
  const contentUserId = mongoose.Types.ObjectId(userId);

  beforeEach((done) => {
    Content.create(
      {
        _id: contentObjectId,
        name: contentName,
        year: contentYear
      }, (error, instance) => {
        User.create(
          {
            _id: contentUserId,
            first_name: userFirstName,
            last_name: userLastName
          }, (error, instance) => {
            done();
          }
        );
      }
    );
  });

  afterEach((done) => {
    ContentStat.remove((err,removed) => {
      Rate.remove((err,removed) => {
        Content.remove((err,removed) => {
          User.remove((err,removed) => {
            done();
          });
        });
      });
    });
  });

  describe('/POST rating', () => {
    it('it should be successful', (done) => {
      chai.request(server)
      .post('/rating')
      .send(
        {
          userId: userId,
          contentId: contentId,
          rating: 5
        }
      )
      .end((err, res) => {
        res.should.have.status(200);
        res.body.description.should.be.eql('Success');
        done();
      });
    });
  });

  describe('/POST rating', () => {
    it('it should not be successful with non existent content', (done) => {
      chai.request(server)
      .post('/rating')
      .send(
        {
          userId: userId,
          contentId: '5a63e724aa491c5bffc83ff4',
          rating: 5
        }
      )
      .end((err, res) => {
        res.should.have.status(422);
        res.body.errors[0].description.should.be.eql('Content does not exist');
        res.body.errors[0].code.should.be.eql(404);
        done();
      });
    });
  });

  describe('/POST rating', () => {
    it('it should not be successful with non invalid contentId', (done) => {
      chai.request(server)
      .post('/rating')
      .send(
        {
          userId: userId,
          contentId: '5a63e724aa4',
          rating: 5
        }
      )
      .end((err, res) => {
        res.should.have.status(422);
        res.body.errors[0].description.should.be.eql('contentId must be single String of 12 bytes or a string of 24 hex characters.');
        res.body.errors[0].code.should.be.eql(400);
        done();
      });
    });
  });

  describe('/POST rating', () => {
    it('it should not be successful with non existent user', (done) => {
      chai.request(server)
      .post('/rating')
      .send(
        {
          userId: '5a63e724aa491c5bffc83ff5',
          contentId: contentId,
          rating: 5
        }
      )
      .end((err, res) => {
        res.should.have.status(422);
        res.body.errors[0].description.should.be.eql('User does not exist');
        res.body.errors[0].code.should.be.eql(404);
        done();
      });
    });
  });

  describe('/POST rating', () => {
    it('it should not be successful with invalid userId', (done) => {
      chai.request(server)
      .post('/rating')
      .send(
        {
          userId: '5a63e724aa4',
          contentId: contentId,
          rating: 5
        }
      )
      .end((err, res) => {
        res.should.have.status(422);
        res.body.errors[0].description.should.be.eql('userId must be single String of 12 bytes or a string of 24 hex characters.');
        res.body.errors[0].code.should.be.eql(400);
        done();
      });
    });
  });

  describe('/POST rating', () => {
    it('it should not be successful with non existent user', (done) => {
      chai.request(server)
      .post('/rating')
      .send(
        {
          userId: userId,
          contentId: contentId,
          rating: -1
        }
      )
      .end((err, res) => {
        res.should.have.status(422);
        res.body.errors[0].description.should.be.eql('Invalid rating, only 1 - 5 is accepted');
        res.body.errors[0].code.should.be.eql(400);
        done();
      });
    });
  });
});
