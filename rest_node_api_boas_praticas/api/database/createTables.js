const SupplierTableModel = require('../routes/suppliers/SupplierTableModel')

SupplierTableModel.sync().then(()=>console.log('Supplier table created')).catch(console.log)