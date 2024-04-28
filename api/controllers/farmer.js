const Farmer = require("../models/Farmer.js");
const CryptoJS = require("crypto-js");

const createFarmer = async (req, res) => {
  try {
    const newFarmer = new Farmer({
      _id: req.body.phoneNumber,  // 'phoneNumber' alanını 'id' olarak kaydediyoruz
      name: req.body.name,
      type: req.body.type,
      phoneNumber: req.body.phoneNumber,
      dateCreated: new Date(),  // Şimdiki zamanı 'dateCreated' olarak kaydediyoruz
      // Diğer alanları da benzer şekilde ekleyebilirsiniz
    });

    //const newFarmer = new Farmer(req.body);  // req.body'den alınan verilerle yeni bir kullanıcı nesnesi oluşturuluyor
    const savedFarmer = await newFarmer.save();  // Oluşturulan kullanıcı veritabanına kaydediliyor
    res.status(201).json(savedFarmer);  // Başarılı bir şekilde oluşturulan kullanıcı bilgisi ile birlikte 201 durum kodu dönülüyor
  } catch (err) {
    res.status(500).json(err);  // Bir hata oluşursa, hata ile birlikte 500 durum kodu dönülüyor
  }
}


const updateFarmerByPhoneNumber = async (req, res) => {

  // if (req.body.password) {

  //   req.body.password = CryptoJS.AES.encrypt(
  //     req.body.password,
  //     process.env.PASS_SEC
  //   ).toString();

  // }

  try {
    const updatedFarmer = await Farmer.findOneAndUpdate(
      { phoneNumber: req.params.phoneNumber },  // phoneNumber'a göre çiftçiyi bul
      { $set: req.body },
      { new: true }  // Güncellenmiş belgeyi döndür
    );
  
    if (updatedFarmer) {
      res.status(200).json(updatedFarmer);
    } else {
      res.status(404).json({ message: 'Farmer not found with this phone number.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
  
}

const deleteFarmerByPhoneNumber = async (req, res) => {
  try {
    await Farmer.findOneAndDelete(
      {phoneNumber: req.params.phoneNumber}
      );
    res.status(200).json("Farmer has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
}

const getFarmer = async (req, res) => {
  try {
    let result;
    console.log(req.params);

    if (req.params.phoneNumber) {
      // phoneNumber parametresi varsa, o telefon numarasına sahip çiftçiyi bul
      result = await Farmer.findOne({ phoneNumber: req.params.phoneNumber });
      console.log(result);
    } else {
      // phoneNumber parametresi yoksa, tüm çiftçileri döndür
      result = await Farmer.find({});
      console.log(result);
    }

    // result değişkenini kontrol edip uygun yanıtı gönder
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Farmer not found.' });
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
}

// const { password, ...others } = Farmer._doc;

module.exports = {
    createFarmer,
    updateFarmerByPhoneNumber,
    deleteFarmerByPhoneNumber,
    getFarmer
}
