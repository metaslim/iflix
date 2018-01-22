process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const ContentStat = require('../api/models/content_stat');
const Content = require('../api/models/content');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Content', () => {
  const _id = '5a63e724aa491c5bffc83ff3';
  const contentName = 'Ip Man';
  const year = 2008;
  const object_id = mongoose.Types.ObjectId(_id);

  beforeEach((done) => {
    Content.create(
      {
        _id: object_id,
        name: contentName,
        year: year
      }, (error, instance) => {
        done();
      }
    );
  });

  afterEach((done) => {
    ContentStat.remove((error,removed) => {})
    .then(() => { Content.remove((error,removed) => { done(); }) });
  });

  describe('/POST content', () => {
    it('it should not show rating, because of not enough number of rating', (done) => {
      ContentStat.create(
        {
          content: object_id,
          total_rating: 10,
          number_of_rating: 2,
          average_rating: 5
        }, (error, instance) => {
          chai.request(server)
          .post('/content')
          .send(
            {
              contentId: _id
            }
          )
          .end((error, res) => {
            res.should.have.status(200);
            res.body.content.should.be.eql(contentName);
            chai.expect(res.body.average_rating).to.be.null;
            done();
          });
        }
      )
    });

    it('it should show rating correctly', (done) => {
      const number_of_rating = 4
      ContentStat.create(
        {
          content: object_id,
          total_rating: 40,
          number_of_rating: 10,
          average_rating: number_of_rating
        }, (error, instance) => {
          chai.request(server)
          .post('/content')
          .send(
            {
              contentId: _id
            }
          )
          .end((error, res) => {
            res.should.have.status(200);
            res.body.content.should.be.eql(contentName);
            chai.expect(parseInt(res.body.average_rating)).to.be.eql(number_of_rating);
            done();
          });
        }
      );
    });

    it('it should not show content for wrong contentId', (done) => {
      const number_of_rating = 4
      ContentStat.create(
        {
          content: object_id,
          total_rating: 40,
          number_of_rating: 10,
          average_rating: number_of_rating
        }, (error, instance) => {
          chai.request(server)
          .post('/content')
          .send(
            {
              contentId: '5a63e724aa491c5bffc83ff4'
            }
          )
          .end((error, res) => {
            res.should.have.status(422);
            res.body.errors[0].description.should.be.eql('Content does not exist');
            res.body.errors[0].code.should.be.eql(404);
            done();
          });
        }
      );
    });

    it('it should not show content for invalid contentId', (done) => {
      const number_of_rating = 4
      ContentStat.create(
        {
          content: object_id,
          total_rating: 40,
          number_of_rating: 10,
          average_rating: number_of_rating
        }, (error, instance) => {
          chai.request(server)
          .post('/content')
          .send(
            {
              contentId: '5a63e724aa491'
            }
          )
          .end((error, res) => {
            res.should.have.status(422);
            res.body.errors[0].description.should.be.eql('contentId must be single String of 12 bytes or a string of 24 hex characters.');
            res.body.errors[0].code.should.be.eql(400);
            done();
          });
        }
      );
    });

  });
});
