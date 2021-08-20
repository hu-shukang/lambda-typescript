"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const message_1 = require("../utils/message");
class BooksController {
    /**
     * Create book
     * @param {*} event
     */
    async create(event, context) {
        console.log('functionName', context.functionName);
        const result = {
            name: 'create',
        };
        return message_1.MessageUtil.success(result);
    }
    /**
     * Update a book by id
     * @param event
     */
    async update(event) {
        const id = Number(event.pathParameters.id);
        const body = JSON.parse(event.body);
        const result = {
            name: 'update',
            id: id,
            body: body,
        };
        return message_1.MessageUtil.success(result);
    }
    /**
     * Find book list
     */
    async find() {
        const result = {
            name: 'find',
        };
        return message_1.MessageUtil.success(result);
    }
    /**
     * Query book by id
     * @param event
     */
    async findOne(event, context) {
        const id = event.pathParameters.id;
        const result = {
            name: 'findOne',
            id: id,
        };
        return message_1.MessageUtil.success(result);
    }
    /**
     * Delete book by id
     * @param event
     */
    async deleteOne(event) {
        const id = event.pathParameters.id;
        const result = {
            name: 'deleteOne',
            id: id,
        };
        return message_1.MessageUtil.success(result);
    }
}
exports.BooksController = BooksController;
//# sourceMappingURL=books.js.map