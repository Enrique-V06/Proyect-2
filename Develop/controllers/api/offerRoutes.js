const { Users, Search, Offer, Review } = require('../../model');
const router = require('express').Router();
const withAuth = require('../../utils/auth');

const multer = require('multer');
const upload = multer({ dest: 'public/images' });
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `images/admin-${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });

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

router.post('/upload', upload.single('image'), (req, res) => {
  try {
    console.log('Holiwis');
    const ima = req.image;
    console.log('IMAGE NAME ON ROUTE', ima);
    // const path = `public/images${name}`;
    //console.log('PATH', req.file);
    // alert(path);
    // const offerData = Offer.create({
    //   location: req.body.location,
    //   typeOfHome: req.body.typeOfHome,
    //   image: path,
    //   pet: req.body.pet,
    // });

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

//const upload = multer({ dest: 'public/images' });

// router.post('/multerTest', upload.single('myFile'), (req, res) => {
//   console.log('IMAGE STRING', req.file);
// });

// router.post('/upload', upload.single('myFile'), (req, res) => {
//   console.log('FILE!!!!', req.file);
// });

module.exports = router;
