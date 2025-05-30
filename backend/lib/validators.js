import { body, check, param, query, validationResult } from "express-validator";

// Validation rules for registration
const registerValidor = () => [
  body("name", "Please Enter name").notEmpty(),
  body("username", "Please Enter username").notEmpty(),
  body("password", "Please Enter password").notEmpty(),
  body("bio", "Please Enter bio").notEmpty(),
];
const loginValidor = () => [
  body("username", "Please Enter username").notEmpty(),
  body("password", "Please Enter password").notEmpty(),
];
const newGroupValidor = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("members must be btw 2-100"),
];
const addMemberValidor = () => [
  body("chatId", "Please Enter chatId").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 1, max: 100 })
    .withMessage("members must be btw 1-97"),
];
const removeMemberValidor = () => [
  body("chatId", "Please Enter chatId").notEmpty(),
  body("userId", "Please Enter userId").notEmpty(),
];
const leaveMemberValidor = () => [param("id", "Please select chat").notEmpty()];
const SendAttectmentValidor = () => [
  body("id", "Please select chat").notEmpty(),
 
];
const getMessageValidator = () => [
  param("id", "Please Enter chatId").notEmpty(),
];
const chatId = () => [param("id", "Please Enter chatId").notEmpty()];
const renameValidar = () => [
  param("id", "Please Enter chatId").notEmpty(),
  body("name", "Please Enter name").notEmpty(),
];
const sendRequestValidar = () => [
  body("userId", "Please Enter UserId").notEmpty(),
];
const acceptRequestValidar = () => [
  body("reqestId").notEmpty(),
  body("accept", "Please Add accept").notEmpty().withMessage("Please Enter reqestId").isBoolean().withMessage('Accect must be boolen'),
];
const adminloginValidor = () => [
  body("secretKey", "Please Enter secretKey").notEmpty(),
  
];

const validatehandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessage = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (!errors.isEmpty()) {
    console.log(errorMessage);
    return res.status(400).json({ success: false, message: errorMessage });
  }

  next();
};

export {
  registerValidor,
  validatehandler,
  loginValidor,
  newGroupValidor,
  addMemberValidor,
  removeMemberValidor,
  leaveMemberValidor,
  SendAttectmentValidor,
  getMessageValidator,
  chatId,
  renameValidar,
  sendRequestValidar,
  acceptRequestValidar,
  adminloginValidor
};
