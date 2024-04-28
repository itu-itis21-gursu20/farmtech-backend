const Engineer = require("../models/Engineer.js");
const CryptoJS = require("crypto-js");

const createEngineer = async (req, res) => {
  try {
    const newEngineer = new Engineer(req.body);  // req.body'den alınan verilerle yeni bir kullanıcı nesnesi oluşturuluyor
    const savedEngineer = await newEngineer.save();  // Oluşturulan kullanıcı veritabanına kaydediliyor
    res.status(201).json(savedEngineer);  // Başarılı bir şekilde oluşturulan kullanıcı bilgisi ile birlikte 201 durum kodu dönülüyor
  } catch (err) {
    res.status(500).json(err);  // Bir hata oluşursa, hata ile birlikte 500 durum kodu dönülüyor
  }
}


const updateEngineer = async (req, res) => {

  if (req.body.password) {

    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();

  }

  try {
    const updatedEngineer = await Engineer.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedEngineer);
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteEngineer = async (req, res) => {
  try {
    await Engineer.findByIdAndDelete(req.params.id);
    res.status(200).json("Engineer has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
}

const getEngineer = async (req, res) => {
  try {
    const Engineer = await Engineer.findById(req.params.id);
    const { password, ...others } = Engineer._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
}


module.exports = {
    createEngineer,
    updateEngineer,
    deleteEngineer,
    getEngineer

}
