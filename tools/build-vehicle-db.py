import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DB_DIR = str(ROOT / 'data' / 'vehicles') + '/'
OUT = str(ROOT / 'assets' / 'js' / 'vehicle-database.js')

FILES = ['bmw.json', 'vw.json', 'skoda-seat-cupra.json', 'audi.json', 'mercedes.json',
         'dacia-renault-opel-ford.json', 'psa-fiat-volvo-mini.json', 'asia-jlr-porsche.json']

REQUIRED = ['brand', 'model', 'generation', 'facelift', 'genStart', 'genEnd', 'engine', 'displacement',
            'fuel', 'induction', 'hybrid', 'ps', 'nm', 'engStart', 'engEnd', 'source']


def not_sold_in_eu(r):
    if r['brand'] == 'Dacia' and r['fuel'] == 'diesel':
        if r['model'] in ('Jogger', 'Bigster'):
            return True
        if r['generation'].startswith(('Logan III', 'Sandero III', 'Duster III')):
            return True
    if r['brand'] == 'Renault' and r['model'] == 'Koleos' and r['fuel'] == 'benzina' and r['displacement'] in (2.0, 2.5):
        return True
    return False


def stage1(row):
    ps, nm, fuel, ind, hyb = row['ps'], row['nm'], row['fuel'], row['induction'], row['hybrid']
    if hyb == 'plug-in':
        gp, gn = 0.10, 0.10
    elif ind == 'atmosferic':
        gp, gn = 0.06, 0.05
    elif fuel == 'diesel':
        if ps <= 120:
            gp, gn = 0.28, 0.25
        elif ps <= 200:
            gp, gn = 0.24, 0.20
        elif ps <= 300:
            gp, gn = 0.20, 0.17
        else:
            gp, gn = 0.15, 0.13
    else:
        if ps <= 130:
            gp, gn = 0.22, 0.22
        elif ps <= 250:
            gp, gn = 0.25, 0.22
        elif ps <= 400:
            gp, gn = 0.18, 0.16
        else:
            gp, gn = 0.12, 0.12
    return round(ps * (1 + gp)), int(round(nm * (1 + gn) / 5.0) * 5)


def years(a, b):
    return f'{a}-{b}' if b else f'{a}-prezent'


def problems(r):
    out = []
    for k in REQUIRED:
        if k not in r:
            out.append(f'missing {k}')
    if out:
        return out
    if r['fuel'] not in ('diesel', 'benzina'):
        out.append('fuel')
    if r['induction'] not in ('turbo', 'atmosferic'):
        out.append('induction')
    if r['hybrid'] not in (None, 'mild', 'plug-in'):
        out.append('hybrid')
    if not (isinstance(r['ps'], (int, float)) and 40 <= r['ps'] <= 900):
        out.append('ps range')
    if not (isinstance(r['nm'], (int, float)) and 60 <= r['nm'] <= 1500):
        out.append('nm range')
    if isinstance(r['ps'], (int, float)) and isinstance(r['nm'], (int, float)) and r['ps']:
        ratio = r['nm'] / r['ps']
        if r['fuel'] == 'diesel' and not (1.4 <= ratio <= 3.6):
            out.append(f'diesel nm/ps {ratio:.2f}')
        if r['fuel'] == 'benzina' and r['induction'] == 'atmosferic' and not (0.7 <= ratio <= 2.0):
            out.append(f'NA nm/ps {ratio:.2f}')
        if r['fuel'] == 'benzina' and r['induction'] == 'turbo' and not (0.9 <= ratio <= (3.0 if r['hybrid'] == 'plug-in' else 2.4)):
            out.append(f'turbo nm/ps {ratio:.2f}')
    if not (isinstance(r['genStart'], int) and 1970 <= r['genStart'] <= 2026):
        out.append('genStart')
    if not (isinstance(r['engStart'], int) and 1990 <= r['engStart'] <= 2026):
        out.append('engStart')
    for k in ('genEnd', 'engEnd'):
        if r[k] is not None and not (isinstance(r[k], int) and 1995 <= r[k] <= 2026):
            out.append(k)
    if isinstance(r.get('engStart'), int) and isinstance(r.get('genStart'), int) and r['engStart'] < r['genStart'] - 1:
        out.append('engStart before genStart')
    if not str(r['source']).startswith('http'):
        out.append('source')
    if r['brand'] == 'Vauxhall':
        out.append('Vauxhall')
    return out


def generation_label(r):
    tag = ''
    if r['facelift']:
        tag = ' LCI' if r['brand'] == 'BMW' else ' facelift'
    gen = r['generation'].strip()
    if gen.strip('IVX') == '':
        gen = f"{r['model']} {gen}"
    return f"{gen}{tag} ({years(r['genStart'], r['genEnd'])})"


def engine_label(r):
    name = r['engine'].strip()
    has_disp = any(ch.isdigit() for ch in name.split(' ')[0]) and '.' in name.split(' ')[0]
    disp = '' if has_disp or not r['displacement'] else f" {r['displacement']:.1f}"
    hyb = {'mild': ' mild hybrid', 'plug-in': ' plug-in hybrid'}.get(r['hybrid'], '')
    label = f"{name}{disp}{hyb} {round(r['ps'])} CP"
    if (r['engStart'], r['engEnd']) != (r['genStart'], r['genEnd']):
        label += f" ({years(r['engStart'], r['engEnd'])})"
    return label


def main():
    rows, rejected = [], []
    for name in FILES:
        path = DB_DIR + name
        try:
            data = json.load(open(path))
        except FileNotFoundError:
            print('missing file', name)
            continue
        for r in data:
            p = problems(r)
            if not p and not_sold_in_eu(r):
                continue
            if p:
                rejected.append((path.split('/')[-1], r.get('brand'), r.get('model'), r.get('generation'), r.get('engine'), p))
            else:
                rows.append(r)

    merged = {}
    for r in rows:
        k = (r['brand'], r['model'], r['generation'], r['facelift'], r['engine'].strip(), round(r['ps']), int(round(r['nm'])), r['hybrid'])
        if k in merged:
            m = merged[k]
            m['engStart'] = min(m['engStart'], r['engStart'])
            m['engEnd'] = None if m['engEnd'] is None or r['engEnd'] is None else max(m['engEnd'], r['engEnd'])
        else:
            merged[k] = dict(r)
    rows = list(merged.values())

    out, seen = [], set()
    for r in rows:
        rec = {
            'brand': r['brand'].strip(),
            'model': r['model'].strip(),
            'generation': generation_label(r),
            'engine': engine_label(r),
            'stockHP': round(r['ps']),
            'stockNm': int(round(r['nm'])),
        }
        rec['stage1HP'], rec['stage1Nm'] = stage1(r)
        if r['induction'] == 'atmosferic':
            rec['na'] = True
        key = (rec['brand'], rec['model'], rec['generation'], rec['engine'])
        if key in seen:
            continue
        seen.add(key)
        out.append(rec)

    out.sort(key=lambda x: (x['brand'], x['model'], x['generation'], x['stockHP'], x['engine']))
    lines = ['const vehicleDatabase = [']
    for rec in out:
        lines.append('  ' + json.dumps(rec, ensure_ascii=True, separators=(',', ':')) + ',')
    lines.append('];')
    lines.append('')
    lines.append("if (typeof module !== 'undefined' && module.exports) {")
    lines.append('  module.exports = vehicleDatabase;')
    lines.append('}')
    if '--write' in sys.argv:
        open(OUT, 'w').write('\n'.join(lines) + '\n')

    brands = {}
    for rec in out:
        brands[rec['brand']] = brands.get(rec['brand'], 0) + 1
    print('valid rows', len(rows), 'unique records', len(out), 'rejected', len(rejected))
    print('brands', len(brands), 'models', len({(r['brand'], r['model']) for r in out}))
    print(', '.join(f'{b}:{n}' for b, n in sorted(brands.items(), key=lambda x: -x[1])))
    for rj in rejected[:40]:
        print('REJECT', rj)


if __name__ == '__main__':
    main()
