import { useEffect, useState } from "react";

/**
 * Хук для отслеживания соответствия медиа-запросам
 * @param {string} query - Медиа-запрос в формате CSS (например, "(max-width: 768px)")
 * @returns {boolean} Соответствует ли текущее состояние экрана медиа-запросу
 *
 * @description
 * Хук отслеживает изменения состояния медиа-запроса и возвращает актуальное значение.
 * Автоматически подписывается на изменения и отписывается при размонтировании компонента.
 */
export const useMediaQuery = (query: string) => {
  const getMatch = () =>
    typeof window !== "undefined" && window.matchMedia(query).matches;

  const [matches, setMatches] = useState(getMatch);

  useEffect(() => {
    const media = window.matchMedia(query);
    const handler = () => setMatches(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
};
