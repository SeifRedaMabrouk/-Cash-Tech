import * as apiModule from '../dist/api/api.mjs';

// طباعة أسماء المتغيرات المُصدّرة في Vercel Runtime Logs للتأكد منها
console.log("Vercel Module Exports:", Object.keys(apiModule));

// البحث التلقائي عن أي متغير يحمل كائن السيرفر أو دالة التشغيل
const app =
  apiModule.default ||
  apiModule.app ||
  apiModule.server ||
  apiModule.handler ||
  apiModule.router ||
  apiModule.api ||
  Object.values(apiModule).find((exp) => typeof exp === 'function' || (exp && typeof exp.fetch === 'function'));

export default function handler(req, res) {
  if (typeof app === 'function') {
    return app(req, res);
  }
  if (app && typeof app.fetch === 'function') {
    return app.fetch(req, res);
  }
  if (app && typeof app.handle === 'function') {
    return app.handle(req, res);
  }

  throw new Error(`لم يتم العثور على مشغل سيرفر صالح. المفاتيح المتاحة هي: ${Object.keys(apiModule).join(', ')}`);
}
