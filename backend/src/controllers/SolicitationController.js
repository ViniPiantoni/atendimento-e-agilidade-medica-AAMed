const Solicitation = require('../models/Solicitation');

module.exports = {
  async index(req, res) {
    const solicitation = await Solicitation.find()
      .populate('hospital')
      .populate('user')
      .exec();

    return res.json(solicitation);
  },

  async store(req, res) {
    const { user_id } = req.headers;
    const { hospital_id } = req.params;
    const { description } = req.body;

    const solicitation = await Solicitation.create({
      user: user_id,
      hospital: hospital_id,
      description,
    });

    await solicitation.populate('hospital').populate('user').execPopulate();

    return res.json(solicitation);
  },

  async show(req, res) {
    const { id } = req.params;

    const solicitation = await Solicitation.find({
      $or: [{ user: id }, { hospital: id }],
    })
      .populate('hospital')
      .populate('user')
      .exec();

    return res.json(solicitation);
  },
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async verify(req, res) {
    const { hospital_id } = req.params;
    const { user_id } = req.headers;

    const solicitation = await Solicitation.findOne({
      hospital: hospital_id,
      user: user_id,
    });
    if (!solicitation) {
      return res.status(400).send({ error: 'Não há registros' });
    }
    return res.json({
      hospital_id: solicitation.hospital,
      user_id: solicitation.user,
    });
  },
};
