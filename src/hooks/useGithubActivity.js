import { useEffect, useState } from 'react';

const USER = 'IgnacioSanchezYuste';
const KEY = 'gh-activity';

// Latest public push from GitHub, cached for 30 min to stay under the anonymous rate limit.
export const useGithubActivity = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    try {
      const cached = JSON.parse(sessionStorage.getItem(KEY) || 'null');
      if (cached && Date.now() - cached.at < 30 * 60 * 1000) {
        setData(cached.data);
        return undefined;
      }
    } catch (e) {
      /* ignore */
    }

    fetch(`https://api.github.com/users/${USER}/events/public?per_page=30`)
      .then((r) => (r.ok ? r.json() : []))
      .then((events) => {
        const push = events.find((e) => e.type === 'PushEvent');
        if (!push || cancelled) return;
        const commit = push.payload?.commits?.[push.payload.commits.length - 1];
        const result = {
          repo: push.repo.name.split('/')[1],
          url: `https://github.com/${push.repo.name}`,
          message: commit?.message?.split('\n')[0] || '',
          date: push.created_at,
        };
        setData(result);
        try {
          sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), data: result }));
        } catch (e) {
          /* ignore */
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return data;
};

export const timeAgo = (iso, lang) => {
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const units = [
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [unit, secs] of units) {
    if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
  }
  return rtf.format(0, 'minute');
};
