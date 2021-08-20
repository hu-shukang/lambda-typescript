"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.findOne = exports.find = exports.update = exports.create = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const dotenvPath = path_1.default.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv_1.default.config({
    path: dotenvPath,
});
const books_1 = require("./controller/books");
const booksController = new books_1.BooksController();
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
//# sourceMappingURL=handler.js.map