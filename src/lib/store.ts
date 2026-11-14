import { useCallback, useEffect, useState } from "react";

const listeners = new Map<string, Set<() => void>>();

export function useLocal<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem("sholok:" + key);
        setValue(raw ? (JSON.parse(raw) as T) : initial);
      } catch { /* ignore */ }
    };
    read();
    const set = listeners.get(key) ?? new Set();
    set.add(read);
    listeners.set(key, set);
    return () => { set.delete(read); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const update = useCallback((next: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const v = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      localStorage.setItem("sholok:" + key, JSON.stringify(v));
      queueMicrotask(() => listeners.get(key)?.forEach((fn) => fn()));
      return v;
    });
  }, [key]);
  return [value, update] as const;
}

export type CartItem = { id: string; qty: number };
export function cartTotals(items: CartItem[], priceOf: (id: string) => number) {
  const subtotal = items.reduce((s, i) => s + priceOf(i.id) * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 5000 ? 0 : 120;
  return { subtotal, shipping, total: subtotal + shipping, count: items.reduce((s, i) => s + i.qty, 0) };
}

export type User = { name: string; email: string } | null;
