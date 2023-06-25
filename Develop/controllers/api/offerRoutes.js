const { Users, Search, Offer, Review } = require('../../model');
const router = require('express').Router();
const withAuth = require('../../utils/auth');

const multer = require('multer');
//const upload = multer({ dest: 'public/images' });
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `images/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[1] === 'jpg') {
    cb(null, true);
  } else {
    cb(new Error('Not a PNG File!!'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

router.post('/', async (req, res) => {
  try {
    const offerData = await Offer.create({
      location: req.body.location,
      typeOfHome: req.body.typeOfHome,
      pet: req.body.pet,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(offerData);
      console.log('response sent');
    });
  } catch (err) {}
});

// router.post('/multerTest', upload.single('myFile'), (req, res) => {
//   console.log('IMAGE STRING', req.file);
// });

router.post('/uploadFile', upload.single('myFile'), (req, res) => {
  console.log('FILE!!!!', req.file);
});

module.exports = router;
