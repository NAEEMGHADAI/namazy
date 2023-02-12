const MosqueSchema = require("../model/Mosque.js");

const getAllNamazTime = async (req, res) => {
  const mosques = await MosqueSchema.find();
  if (!mosques) {
    res.status(204).json({ message: "No mosques found" });
  }
  res.json(mosques);
};

const createNewTime = async (req, res) => {
  if (
    !req?.body?.username ||
    !req?.body?.mosqueName ||
    !req?.body?.fajr ||
    !req?.body?.zuhr ||
    !req?.body?.asr ||
    !req?.body?.magrib ||
    !req?.body?.isha ||
    !req?.body?.juma ||
    !req?.body?.lastModified
  ) {
    return res.status(400).json({ message: "All the Feilds required" });
  }

  try {
    const result = await MosqueSchema.create({
      username: req.body.username,
      mosqueName: req.body.mosqueName,
      fajr: req.body.fajr,
      zuhr: req.body.zuhr,
      asr: req.body.asr,
      magrib: req.body.magrib,
      isha: req.body.isha,
      juma: req.body.juma,
      lastModified: req.body.lastModified,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateNamazTime = async (req, res) => {
  if (!req?.body?.username) {
    return res.status(400).json({ message: "username parameter is required." });
  }

  const mosque = await MosqueSchema.findOne({
    username: req.body.username,
  }).exec();
  if (!mosque) {
    return res
      .status(204)
      .json({ message: `No mosque matches username ${req.body.username}.` });
  }

  if (req.body?.mosqueName) mosque.mosqueName = req.body.mosqueName;
  if (req.body?.fajr) mosque.fajr = req.body.fajr;
  if (req.body?.zuhr) mosque.zohar = req.body.zuhr;
  if (req.body?.asr) mosque.asr = req.body.asr;
  if (req.body?.magrib) mosque.magrib = req.body.magrib;
  if (req.body?.isha) mosque.isha = req.body.isha;
  if (req.body?.juma) mosque.juma = req.body.juma;
  if (req.body?.lastModified) mosque.lastModified = req.body.lastModified;

  const result = await mosque.save();
  res.json(result);
};

const getNamazTime = async (req, res) => {
  if (!req?.params?.username) {
    res.status(400).json({ message: "username is required" });
  }

  let mosque = await MosqueSchema.findOne({
    username: req.params.username,
  }).exec();
  console.log("getNamazTime: ", mosque);
  if (!mosque) {
    return res.status(204).json({
      message: `No Mosque matches username ${req.params.username}.`,
    });
  }
  return res.json(mosque);
};

module.exports = {
  createNewTime,
  updateNamazTime,
  getAllNamazTime,
  getNamazTime,
};
