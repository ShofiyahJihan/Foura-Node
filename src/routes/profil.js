const router = require('express').Router();
const { requireLogin } = require('../middleware/auth');
const { getProfile } = require('../services/roles');

router.use(requireLogin);

router.get('/', async (req, res, next) => {
  try {
    const profil = await getProfile(req.user, req.role);
    res.render('profil', { title: 'Profil Saya', profil, error: null });
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const profil = await getProfile(req.user, req.role);
    const no_hp = (req.body.no_hp || '').trim();
    const first_name = (req.body.first_name || '').trim();
    if (!first_name) return res.status(400).render('profil', { title: 'Profil Saya', profil, error: 'Nama wajib diisi.' });
    if (no_hp && !/^[0-9+\-\s]{8,20}$/.test(no_hp)) return res.status(400).render('profil', { title: 'Profil Saya', profil, error: 'Nomor HP tidak valid.' });
    await req.user.update({ first_name, last_name: (req.body.last_name || '').trim(), email: (req.body.email || '').trim() });
        const dataProfil = { alamat: (req.body.alamat || '').trim() || null, no_hp: no_hp || null };
    if (req.role === 'customer') dataProfil.nama_umkm = (req.body.nama_umkm || '').trim() || null;
    await profil.update(dataProfil);
    req.flash('ok', 'Profil berhasil disimpan.');
    res.redirect('/profil');
  } catch (e) { next(e); }
});

router.post('/password', async (req, res, next) => {
  try {
    const { lama, baru, baru2 } = req.body;
    const profil = await getProfile(req.user, req.role);
    let error = null;
    if (!(await req.user.checkPassword(lama || ''))) error = 'Password lama salah.';
    else if (!baru || baru.length < 8) error = 'Password baru minimal 8 karakter.';
    else if (baru !== baru2) error = 'Konfirmasi password baru tidak sama.';
    if (error) return res.status(400).render('profil', { title: 'Profil Saya', profil, error });
    await req.user.update({ password: baru });
    req.flash('ok', 'Password berhasil diubah.');
    res.redirect('/profil');
  } catch (e) { next(e); }
});

module.exports = router;
