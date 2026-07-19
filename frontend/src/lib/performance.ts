// Prefetch a route for instant navigation
export function prefetchRoute(path: string) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = path;
  document.head.appendChild(link);
}

// Lazy load images
export function lazyLoadImage(img: HTMLImageElement) {
  if ('loading' in HTMLImageElement.prototype) {
    img.loading = 'lazy';
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = img.dataset.src || img.src;
          observer.unobserve(img);
        }
      });
    });
    observer.observe(img);
  }
}
