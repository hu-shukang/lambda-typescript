"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFile = exports.sendEmail = exports.deleteOne = exports.findOne = exports.find = exports.update = exports.create = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const books_controller_1 = require("./controller/books.controller");
const books_service_1 = require("./service/books.service");
const emails_controller_1 = require("./controller/emails.controller");
const files_controller_1 = require("./controller/files.controller");
const dotenvPath = path_1.default.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv_1.default.config({
    path: dotenvPath,
});
const bookService = new books_service_1.BookService();
const booksController = new books_controller_1.BooksController(bookService);
const emailsController = new emails_controller_1.EmailsController();
const filesController = new files_controller_1.FilesController();
const create = (event, context) => {
    return booksController.create(event, context);
};
exports.create = create;
const update = (event) => booksController.update(event);
exports.update = update;
const find = () => booksController.find();
exports.find = find;
const findOne = (event, context) => {
    return booksController.findOne(event, context);
};
exports.findOne = findOne;
const deleteOne = (event) => booksController.deleteOne(event);
exports.deleteOne = deleteOne;
const sendEmail = (_event) => emailsController.send(_event);
exports.sendEmail = sendEmail;
const addFile = (_event) => filesController.add(_event);
exports.addFile = addFile;
//# sourceMappingURL=handler.js.map