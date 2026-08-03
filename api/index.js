export default async function handler(req, res) {
  const ua = (req.headers['user-agent'] || '').toLowerCase();
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();

  const botUAs = [
    'facebookexternalhit', 'facebot', 'facebookbot',
    'adsbot', 'googlebot', 'bingbot', 'twitterbot',
    'linkedinbot', 'slackbot', 'whatsapp', 'telegrambot',
    'crawler', 'spider', 'headless', 'phantom', 'python',
    'curl', 'wget', 'java/', 'apache-httpclient'
  ];

  const metaIPs = [
    '66.220.', '69.63.', '69.171.', '173.252.',
    '31.13.', '157.240.', '179.60.', '204.15.'
  ];

  const isBot = botUAs.some(b => ua.includes(b));
  const isMeta = metaIPs.some(r => ip.startsWith(r));

  if (isBot || isMeta) {
    res.writeHead(302, { Location: 'https://grupojogadorcaro.com.br/quem-e-jota' });
    res.end();
    return;
  }

  // ── Calendário de links por dia ──────────────────────────────
  const START_DATE = new Date('2026-05-19T00:00:00-03:00'); // Dia 1 = 19/05

  const linksPorDia = {
    1: [
      'https://chat.whatsapp.com/GKx7N9x0s49DZQc0Cp0Zyw', // 305
      'https://chat.whatsapp.com/FdNeYIbEirA69JCoHZ7J4E', // 307
      'https://chat.whatsapp.com/CS0vZLnLBCAByRlRepA41v', // 317
      'https://chat.whatsapp.com/H4VZeifNrfJDaIsrn2UaTx', // 318
    ],
    2: [
      'https://chat.whatsapp.com/BKbjoTqqCq88ayAZ3GDKYd', // 300
      'https://chat.whatsapp.com/CcgybE7Cxgl1QJZzjoW0Hp', // 306
      'https://chat.whatsapp.com/KcGQ5PjjlwxFnUcgTRtjNj', // 311
      'https://chat.whatsapp.com/HhByx3IYx9CEn7AIoIBTK0', // 315
    ],
    3: [
      'https://chat.whatsapp.com/Glplr3WRfFk5hiEucO126N', // 308
      'https://chat.whatsapp.com/LNwU7Dtu4dPHxFcRqKQcHp', // 310
      'https://chat.whatsapp.com/D4ixpXer8cL7yfHls2pgXp', // 312
      'https://chat.whatsapp.com/JANCrwLK6CA08Vp1Iddr8V', // 314
      'https://chat.whatsapp.com/L6pNfmEc8V3HAEZW1ZYwZ8', // 304
    ],
  };
  // ─────────────────────────────────────────────────────────────

  const now = new Date();
  const diffMs = now - START_DATE;
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

  // Cicla entre dia 1, 2, 3, 1, 2, 3...
  const totalDias = Object.keys(linksPorDia).length;
  const diaAtual = ((diffDias - 1) % totalDias) + 1;
  const links = linksPorDia[diaAtual];

  const link = links[Math.floor(Math.random() * links.length)];

  res.writeHead(302, { Location: link });
  res.end();
}
