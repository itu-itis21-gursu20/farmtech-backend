const Engineer = require("../models/Engineer.js");

const createEngineer = async (req, res) => {
  try {
    const newEngineer = new Engineer(req.body); 
    const savedEngineer = await newEngineer.save();  
    res.status(201).json(savedEngineer);  
  } catch (err) {
    res.status(500).json(err); 
  }
}

const updateEngineerByPhoneNumber = async (req, res) => {
  try {
    const updatedEngineer = await Engineer.findOneAndUpdate(
      { phoneNumber: req.params.phoneNumber }, 
      { $set: req.body },
      { new: true }
    );

    if (updatedEngineer) {
      res.status(200).json(updatedEngineer);
    } else {
      res.status(404).json({ message: 'Engineer not found with this phone number.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteEngineerByPhoneNumber = async (req, res) => {
  try {
    await Engineer.findOneAndDelete({ phoneNumber: req.params.phoneNumber });
    res.status(200).json("Engineer has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
}

const getEngineer = async (req, res) => {
  try {
    let result;
    if(req.params.phoneNumber){
      result = await Engineer.findOne({ phoneNumber: req.params.phoneNumber });
    } else {
      result = await Engineer.find({});
    }

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Engineer not found.' });
    }

  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
    createEngineer,
    updateEngineerByPhoneNumber,
    deleteEngineerByPhoneNumber,
    getEngineer

}
