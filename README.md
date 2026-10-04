# Website Company Profile — PT GRID Resistor Indonesia

Website statis bilingual (English di `/`, Bahasa Indonesia di `/id/`) untuk shared hosting cPanel.
Tanpa framework dan tanpa dependency; cukup Node.js untuk build di komputer lokal.

## Struktur

```
src/
  content/en.json   # semua teks English
  content/id.json   # semua teks Bahasa Indonesia (key sama dengan en.json)
  layout.js         # <head>, header/navigasi, footer
  pages.js          # template tiap halaman + daftar halaman
  lib.js            # helper, ikon SVG, daftar logo klien
  assets/           # css, js, gambar (disalin apa adanya ke dist/assets)
  htaccess          # disalin menjadi dist/.htaccess
build.js            # generator → dist/
referensi/          # materi sumber (pptx, docx)
```

## Build

```
node build.js
```

Hasilnya ada di `dist/` (23 halaman HTML, sitemap.xml, robots.txt, .htaccess).

Preview lokal:

```
cd dist
python -m http.server 8000
# buka http://localhost:8000
```

## Mengubah konten

- **Teks**: ubah `src/content/en.json` dan `src/content/id.json`, lalu jalankan build ulang.
- **Gambar produk**: taruh file di `src/assets/img/products/`, lalu rujuk path-nya di field `img` / `gallery` pada JSON.
- **Logo klien**: `src/assets/img/clients/` dan daftar `clients` di `src/lib.js`.
- **Halaman baru**: tambahkan renderer dan entri di array `pages` pada `src/pages.js`.
- **Domain**: konstanta `SITE_URL` di `build.js` (dipakai untuk canonical, hreflang, sitemap).

## Upload ke cPanel

1. Jalankan `node build.js`.
2. Kompres **isi** folder `dist/` (bukan folder `dist`-nya) menjadi zip. Pastikan `.htaccess` ikut (file tersembunyi).
3. cPanel → File Manager → `public_html` → Upload zip → Extract.
4. Setelah SSL (AutoSSL) aktif, buka komentar blok "Force HTTPS" di `src/htaccess`, lalu build dan upload ulang.

Upload website hanya mengubah isi `public_html`; DNS dan MX record tidak tersentuh, jadi email `info@gridresistorindonesia.com` tetap berjalan.

## Sebelum go-live

- Logo "GRID Resistor Indonesia" saat ini masih berupa wordmark sementara (ikon resistor + teks). Ganti dengan logo resmi jika ada.
- Pastikan ada izin penggunaan logo klien (PLN, SKK Migas, PetroChina, Pupuk Iskandar Muda, Cakra Steel, Mulia Group) dan materi/merek Öz Direnç.
- Terjemahan Bahasa Indonesia dan klaim teknis perlu direview; konten publik direview Corporate Communication / Legal.
