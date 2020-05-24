const MongoDBService = require('../backend/MongoDBService');

const mongoDBService = new MongoDBService('mongodb://localhost:27017','scoreboard');

module.exports.getScoreList = async(req,res,next) => {
  try{
    await mongoDBService.connect();

    let scores = await mongoDBService.find('scores');
    res.json(scores);
    res.status(200);
    mongoDBService.disconnect();
  } catch(err){
    next(err);
  }
};

module.exports.insertScore = async(req,res,next) => {
  try{ 
    await mongoDBService.connect();

    await mongoDBService.insert('scores', {
      score: parseInt(req.body.score),
      date: new Date()  
    });
    
    res.json(JSON.stringify("success"));
    res.status(200);
    mongoDBService.disconnect();
  } catch(err){
    next(err);
  }
}
