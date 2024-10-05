"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const events_1 = require("events");
const errors_1 = require("./errors");
const Events = {
    Connected: 'onconnected',
    Disconnected: 'ondisconnected'
};
let eventManager = new events_1.EventEmitter();
let m_Connection = null;
(async function () {
    try {
        m_Connection = await (0, typeorm_1.createConnection)();
        eventManager.emit(Events.Connected, m_Connection);
    }
    catch (err) {
        throw err;
    }
})();
/**
 * Disconnect from Database
 * @param {IDBDisconnectOptions} options - Options
 * @return {Promise<any|Error>}
 */
async function disconnect(options) {
    if (m_Connection === null)
        return Promise.resolve();
    let eventInvoked = false;
    try {
        await m_Connection.close();
        eventManager.emit(Events.Disconnected);
        m_Connection = null;
        eventInvoked = true;
    }
    catch (err) {
        return Promise.reject(err);
    }
    finally {
        let filteredOption = typeof options === 'undefined' ? {} : options;
        if (filteredOption.force && !eventInvoked) {
            eventManager.emit(Events.Disconnected);
        }
    }
}
exports.default = {
    // Properties
    Events,
    // Getters
    /**
     * Get Connection of TypeORM. Note that this will throw InternalServerError if no connection available
     * @param {void}
     * @return {TypeORM.Connection} - Connection of TypeORM
     */
    get connection() {
        if (m_Connection === null) {
            throw new errors_1.InternalServerError('Failed to obtain connection for Database.');
        }
        return m_Connection;
    },
    // Functions
    disconnect,
    eventManager,
};
