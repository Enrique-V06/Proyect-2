/* eslint-disable no-shadow */
const router = require('express').Router();
const path = require('path');
const dayjs = require('dayjs');
// --multer dependency --
const multer = require('multer');
const withAuth = require('../../utils/auth');
const { Offer } = require('../../model');

const storage = multer.diskStorage({
  destination: 'public/images',
  filename: (req, file, cb) => {
    // const fileName = file.originalname.split('.');
    // console.log('inside Multer diskStorage', fileName[0]);
    // const finalFileName = fileName[0]
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});
const upload = multer({ storage });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.split('/')[1] === 'png') {
//     cb(null, true);
//   } else {
//     cb(new Error('Not a PNG File!!'), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

router.post('/upload', upload.single('image'), async (req, res) => {
  console.log('REQUEST OBJ', req.session);
  try {
    const { body } = req;
    const { file } = req;
    const name = file.filename;

    console.log('Ruta de imagen', file.filename);
    console.log('IMAGE NAME ON ROUTE', body);
    const path = `/images/${name}`;
    console.log('PATH', path);
    // alert(path);

    //import dayjs from 'dayjs' // ES 2015
    var now = dayjs().format('MM-DD-YYYY');
    console.log('NOW', now);
    const offerData = await Offer.create({
      location: req.body.location,
      typeOfHome: req.body.typeOfHome,
      image: path,
      pet: req.body.pet,
      date: now,
      user_id: req.session.user_id,
      roomies: req.body.roomies,
      message: req.body.message,
    });
    console.log('OFFER DATA', offerData);

    return res.status(200).send('offer created');
    // Offer.save((err) => {
    //   if (err) {
    //     console.log('Indeed there was an error', err);
    //     return res.status(500).send('Error saving offer');
    //   }
    //   return res.status(200).send('offer created');
    // });

    // req.session.save(() => {
    //   req.session.loggedIn = true;
    //   res.status(200).json(offerData);
    //   console.log('response sent');
    // });
  } catch (err) {
    console.log(
      err,
      'Something happened in the /upload post route, better go check it out!'
    );
  }
});

// const upload = multer({ dest: 'public/images' });

// router.post('/multerTest', upload.single('myFile'), (req, res) => {
//   console.log('IMAGE STRING', req.file);
// });

// router.post('/upload', upload.single('myFile'), (req, res) => {
//   console.log('FILE!!!!', req.file);
// });

module.exports = router;
