const { patientSignup, docSignUp } = require("../controllers/auth/signUp");
const { patientSignIn, docSignIn } = require("../controllers/auth/signIn");
const {
  signUpValidation,
  loginValidation,passwordUpdateValidation, signUpValidationDoc
} = require("../middleware/authValidation");

const {forgotPassword} = require("../controllers/auth/forgetPassword")
const router = require("express").Router();

router.post("/patient-signUp",signUpValidation, patientSignup);
router.post("/patient-signIn",loginValidation, patientSignIn);

router.post("/doc-signUp",signUpValidationDoc, docSignUp);
router.post("/doc-signIn",loginValidation, docSignIn);

router.post("/forget-password",passwordUpdateValidation, forgotPassword)

module.exports = router;
