const v1 = require('./v1');
const admin = require('./admin');
const statistics = require('./statistics');
const service = require('./service');
module.exports = app => {
    app.use('/v1', v1);
    app.use('/admin', admin);
    app.use('/statistics',statistics);
    app.use('/service',service);
};