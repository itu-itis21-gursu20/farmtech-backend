const { ObjectId } = require("mongodb");
const LeafAnalysis = require("../../entities/LeafAnalysis");

class MongoLeafAnalysisRepository {
  constructor({ db }) {
    this.db = db;
  }

  async add(leafAnalysis, landId) {
    const now = new Date();
    const leafAnalysisWithTimestamps = {
      ...leafAnalysis,
      land_id: new ObjectId(landId),
      createdAt: now,
      updatedAt: now,
    };
    const result = await this.db.collection("leafanalyses").insertOne(leafAnalysisWithTimestamps);
    if (result.insertedId) {
      return {
        _id: result.insertedId,
        ...leafAnalysisWithTimestamps
      };
    }
    throw new Error('LeafAnalysis creation failed');
  }

  async getById(id) {
    const objectId = new ObjectId(id);
    return await this.db.collection("leafanalyses").findOne({ _id: objectId });
  }

  async getAll() {
    return await this.db.collection("leafanalyses").find({}).toArray();
  }

  async getByLandId(landId) {
    const objectId = new ObjectId(landId);
    return await this.db.collection("leafanalyses").find({ land_id: objectId }).toArray();
  }

  async updateById(id, data) {
    data.updatedAt = new Date();
    const objectId = new ObjectId(id);
    const result = await this.db.collection("leafanalyses").findOneAndUpdate(
      { _id: objectId },
      { $set: data },
      { returnDocument: 'after' }
    );
    return result.value;
  }

  async deleteById(id) {
    const objectId = new ObjectId(id);
    await this.db.collection("leafanalyses").findOneAndDelete({ _id: objectId });
  }
}

module.exports = MongoLeafAnalysisRepository;
