const SupplierModel = _model('supplier');

const create = (params) => {
  return SupplierModel.create(params);
}

const update = async (params) => {
  let supplier = await SupplierModel.findOne({_id: params.id});
  if (supplier === null) throw new Error('supplier tidak ditemukan!');
  supplier.supplierName = params.supplierName;
  supplier.phone = params.phone;
  supplier.address = params.address;
  return supplier.save();
}

const remove = async ({id}) => {
  let supplier = await SupplierModel.findOne({_id: id});
  if (supplier === null) throw new Error('supplier tidak ditemukan!');
  return supplier.remove()
}

const findAll = ({keyword=''}) => {
  return SupplierModel.find({
    supplierName: {
      $regex: keyword,
      $options: 'i'
    }
  }).sort({name: 1})
}

const findById = async ({id}) => {
  return SupplierModel.findOne({_id: id});
}

module.exports = {
  create,
  update,
  remove,
  findAll,
  findById
}