const indexRoutes = require('../index/index.routes');
const productRoutes = require('../product/product.routes');
const authRoutes = require('../auth/auth.routes');
const orderRoutes = require('../order/order.routes');

module.exports = (app) => {
    app.use('/api/product', productRoutes)
    app.use('/api/auth', authRoutes)
    app.use('/api/order', orderRoutes);
    app.use('/*', indexRoutes);
}
