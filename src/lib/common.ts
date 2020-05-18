
export function loadScript(url: string) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = function onload() {
        resolve();
      };
      script.onerror = function onerror() {
        reject();
      };
      script.src = url;
      if (!document || !document.head) return;
      document.head.appendChild(script);
    });
  }

  export const getScrollTop = () => {
    if (!document.body) return 0;
    const scrollTop = document.documentElement
      ? document.documentElement.scrollTop || document.body.scrollTop
      : document.body.scrollTop;
    return scrollTop;
  };
  
  export const getScrollBottom = () => {
    if (!document.body) return 0;
    const { scrollHeight } = document.body;
    const { innerHeight } = window;
    const scrollTop = getScrollTop();
    return scrollHeight - innerHeight - scrollTop;
  };