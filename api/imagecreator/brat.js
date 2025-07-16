module.exports = function app (app) {
app.get('/imagecreator/brat', async (req, res) => {
        try {
            const { apikey, text } = req.query
            if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' })
            const pedo = await getBuffer(`https://aqul-brat.hf.space/?text=${encodeURIComponent(text)}&mode=image`)
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': pedo.length
            })
            res.end(pedo)
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`)
        }
    })

app.get('/imagecreator/bratvideo', async (req, res) => {
  try {
    const { apikey, text } = req.query;
    if (!text) return res.json({ status: false, error: 'Parameter "text" wajib diisi' });
    if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });

    const json = await Func.fetchJson(`https://ytdlpyton.nvlgroup.my.id/maker/bratvid?text=${encodeURIComponent(text)}`);
    if (!json.video_url) return res.json({ status: false, error: 'Gagal mengambil video' });

    const videoBuffer = await Func.fetchBuffer(json.video_url);
    res.writeHead(200, {
      'Content-Type': 'video/mp4',
      'Content-Length': videoBuffer.length
    });
    res.end(videoBuffer);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});
