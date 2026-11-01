import * as apiModule from '../dist/api/api.mjs';

// استخراج تطبيق السيرفر سواء تم تصديره كـ default أو app أو server أو handler
const app = apiModule.default || apiModule.app || apiModule.server || apiModule.handler;

export default function handler(req, res) {
  if (typeof app === 'function') {
    return app(req, res);
  }
  if (app && typeof app.fetch === 'function') {
    return app.fetch(req, res);
  }
  throw new Error("لم يتم العثور على مشغل سيرفر (Express/Server Handler) صالح.");
}
