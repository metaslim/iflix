process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let ContentStat = require('../api/models/content_stat');
let Content = require('../api/models/content');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Content', () => {
  let _id = '5a63e724aa491c5bffc83ff3'
  let content_name = 'Ip Man'
  let object_id = mongoose.Types.ObjectId(_id);

  beforeEach((done) => {
    Content.create(
      {
        _id: object_id,
        name: content_name,
        year: 2008
      }, (err, ins) => {
        done();
      }
    );
  });

  afterEach((done) => {
    ContentStat.remove(function(err,removed) {
      Content.remove(function(err,removed) {});
    });
    done();
  });

  describe('/POST content', () => {
    it('it should not show rating, because of not enough number of rating', (done) => {
      ContentStat.create(
        {
          content: object_id,
          total_rating: 10,
          number_of_rating: 2,
          average_rating: 5
        },
        function (err, instance) {
          chai.request(server)
          .post('/content')
          .send(
            {
              contentId: _id
            }
          )
          .end((err, res) => {
            res.should.have.status(200);
            res.body.content.should.be.eql(content_name);
            chai.expect(res.body.average_rating).to.be.null;
            done();
          });
        }
      )
    });

    it('it should show rating correctly', (done) => {
      let number_of_rating = 4
      ContentStat.create(
        {
          content: object_id,
          total_rating: 40,
          number_of_rating: 10,
          average_rating: number_of_rating
        },
        function (err, instance) {
          chai.request(server)
          .post('/content')
          .send(
            {
              contentId: _id
            }
          )
          .end((err, res) => {
            res.should.have.status(200);
            res.body.content.should.be.eql(content_name);
            chai.expect(parseInt(res.body.average_rating)).to.be.eql(number_of_rating);
            done();
          });
        }
      );
    });

    it('it should not show content for wrong contentId', (done) => {
      let number_of_rating = 4
      ContentStat.create(
        {
          content: object_id,
          total_rating: 40,
          number_of_rating: 10,
          average_rating: number_of_rating
        },
        function (err, instance) {
          chai.request(server)
          .post('/content')
          .send(
            {
              contentId: '5a63e724aa491c5bffc83ff4'
            }
          )
          .end((err, res) => {
            res.should.have.status(422);
            res.body.errors[0].description.should.be.eql('Content does not exist');
            res.body.errors[0].code.should.be.eql(404);
            done();
          });
        }
      );
    });

    it('it should not show content for invalid contentId', (done) => {
      let number_of_rating = 4
      ContentStat.create(
        {
          content: object_id,
          total_rating: 40,
          number_of_rating: 10,
          average_rating: number_of_rating
        },
        function (err, instance) {
          chai.request(server)
          .post('/content')
          .send(
            {
              contentId: '5a63e724aa491'
            }
          )
          .end((err, res) => {
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
