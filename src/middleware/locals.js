const { User } = require('../models');
const { getRole, LABEL } = require('../services/roles');

const rupiah = (n) => 'Rp ' + new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(Number(n));

module.exports = async (req, res, next) => {
  try {
    res.locals.user = null;
    res.locals.role = null;
    if (req.session.userId) {
      const u = await User.findByPk(req.session.userId);
      if (u) { req.user = u; req.role = await getRole(u); res.locals.user = u; res.locals.role = req.role; }
      else delete req.session.userId;
    }
    req.flash = (type, msg) => { req.session.flash = { type, msg }; };
    res.locals.flash = req.session.flash || null;
    delete req.session.flash;
    res.locals.path = req.path;
    res.locals.rupiah = rupiah;
    res.locals.LABEL = LABEL;
    next();
  } catch (e) { next(e); }
};
