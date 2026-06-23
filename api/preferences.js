const { setCors, handleOptions, json, readJsonBody } = require("./_lib/http");
const { getSubscription, saveSubscription } = require("./_lib/redis");
const { normalizePreferences } = require("./_lib/preferences");

module.exports = async function handler(req, res) {
  if (handleOptions(req, res)) return;
  setCors(req, res);
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Método inválido." });
  const body = readJsonBody(req);
  const record = body.id ? await getSubscription(body.id) : null;
  if (!record) return json(res, 404, { ok: false, error: "Assinatura não encontrada." });
  record.preferences = normalizePreferences(body.preferences);
  record.updatedAt = new Date().toISOString();
  await saveSubscription(body.id, record);
  return json(res, 200, { ok: true, id: body.id });
};
