export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    let videoId: string | null = null;

    // youtu.be/<id>

    if (parsedUrl.hostname === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1);
    }

    // youtube.com/watch?v=<id>

    if (
      parsedUrl.hostname.includes("youtube.com") &&
      parsedUrl.pathname === "/watch"
    ) {
      videoId = parsedUrl.searchParams.get("v");
    }

    // youtube.com/embed/<id>

    if (parsedUrl.hostname.includes("youtube.com")) {
      const match = parsedUrl.pathname.match(/\/embed\/([^/]+)/);

      if (match) {
        videoId = match[1];
      }
    }

    // youtube.com/shorts/<id>

    if (parsedUrl.hostname.includes("youtube.com")) {
      const match = parsedUrl.pathname.match(/\/shorts\/([^/]+)/);

      if (match) {
        videoId = match[1];
      }
    }

    return videoId;
  } catch {
    return null;
  }
}

export function getYouTubeNoCookieUrl(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

export function getYouTubeThumbnailUrl(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

// multiple aspect ratios (16x9, 4x3), as recommended for VideoObject JSON-LD
export function getYouTubeThumbnails(url: string): string[] {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return [];
  return [
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  ];
}
