import { BRAND } from "./brand";

export function money(n) {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  const digits = abs >= 1 ? 2 : abs >= 0.01 ? 4 : 5;
  return `$${n.toFixed(digits)}`;
}

export function usdc(n) {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  const digits = abs >= 1 ? 2 : abs >= 0.01 ? 4 : 5;
  return `${n.toFixed(digits)} ${BRAND.settlement}`;
}

export function withDiscount(list) {
  return list * (1 - BRAND.discount);
}

export function listPrice(model, { inputTokens = 0, outputTokens = 0, units = 1 } = {}) {
  if (model.kind === "text") {
    return (inputTokens / 1_000_000) * model.inRate + (outputTokens / 1_000_000) * model.outRate;
  }
  return model.price * units;
}

export function headlineRate(model) {
  if (model.kind === "text") return { label: "text · per 1M output", list: model.outRate };
  if (model.kind === "video") return { label: "video · per second", list: model.price };
  if (model.kind === "voice") return { label: `voice · per ${model.unit}`, list: model.price };
  if (model.kind === "embed") return { label: `embed · per ${model.unit}`, list: model.price };
  return { label: `${model.kind} · per ${model.unit}`, list: model.price };
}
