const models = [
    require('../routes/suppliers/SupplierTableModel'),
    require('../routes/suppliers/products/ProductTableModel')
]

async function createTables(){
    models.forEach(model => {
        model.sync().then(()=>console.log('Supplier table created')).catch(console.log)    
    });
    
}

createTables()

