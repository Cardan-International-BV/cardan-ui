export function useToast() {
  const toasts = useState<(Toast & { id: string })[]>('toasts', () => []);

  function createToast(toast: Toast) {
    const id = toast.id ?? crypto.randomUUID();
    toasts.value.push({ ...toast, id });
    return id;
  }

  function hideToast(id: string) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }

  return { toasts, createToast, hideToast };
}
