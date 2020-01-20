const supplier = _controller('supplier');

const create = async (req, res) => {
  try {
    let params = req.body;
    await supplier.create(params);
    res.success({message: 'data supplier berhasil dibuat'})
  } catch (err) {
    console.log('error when create new supplier!', err);
    res.error(err)
  }
}

const update = async (req, res) => {
  try {
    let params = {...req.body, ...req.params};
    await supplier.update(params);
    res.success({message: 'update data supplier berhasil'})
  } catch (err) {
    console.log('error when update supplier!', err);
    res.error(err)
  }
}

const remove = async (req, res) => {
  try {
    let params = {...req.params, ...req.body};
    await supplier.remove(params);
    res.success({message: 'data berhasil dihapus'})
  } catch (err) {
    console.log('error when update supplier!', err);
    res.error(err)
  }
}

const findAll = async (req, res) => {
  try {
    let payload = await supplier.findAll(req.query);
    if (payload.length === 0) throw new Error('data tidak ditemukan');
    res.success({data: payload})
  } catch (err) {
    console.log('error when update supplier!', err);
    res.error(err)
  }
}

const findById = async (req, res) => {
  try {
    let payload = await supplier.findById({id: req.params.id});
    if (payload === null) throw new Error('data tidak ditemukan');
    res.success({data: payload})
  } catch (err) {
    console.log('error when update supplier!', err);
    res.error(err)
  }
}

module.exports = {
  create,
  update,
  remove,
  findAll,
  findById
}