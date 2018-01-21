process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let ContentStat = require('../api/models/content_stat');
let Content = require('../api/models/content');
let Rate = require('../api/models/rate');
let User = require('../api/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Rate', () => {
  let content_id = '5a63e724aa491c5bffc83ff3';
  let content_name = 'Ip Man';
  let content_year = 2008
  let content_object_id = mongoose.Types.ObjectId(content_id);

  let user_id = '5a63e724aa491c5bffc83ff4';
  let user_first_name = 'Shouhei';
  let user_last_name = 'Yamauchi';
  let content_user_id = mongoose.Types.ObjectId(user_id);

  beforeEach((done) => {
    Content.create(
      {
        _id: content_object_id,
        name: content_name,
        year: content_year
      }, (err, ins) => {
        User.create(
          {
            _id: content_user_id,
            first_name: user_first_name,
            last_name: user_last_name
          }, (err, ins) => {
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
          userId: user_id,
          contentId: content_id,
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
          userId: user_id,
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
          userId: user_id,
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
          contentId: content_id,
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
          contentId: content_id,
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
          userId: user_id,
          contentId: content_id,
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
