// Converte CSS inline ("a:b;c:d") em objeto de estilo do React.
// Mantém os estilos iguais aos do design original, fácil de comparar com a fonte.
const cache = new Map();

export function s(str) {
  let obj = cache.get(str);
  if (obj) return obj;
  obj = {};
  for (const decl of str.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop) continue;
    const key = prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    obj[key] = val;
  }
  if (cache.size > 2000) cache.clear();
  cache.set(str, obj);
  return obj;
}
