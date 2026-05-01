# 🛍️ SEPOCT — Manage Products from Google Sheets

You don't need to touch any code to add, edit, or remove products. Everything
lives in one Google Sheet. Edit the sheet → refresh the website → done.

---

## STEP 1 — Create the Google Sheet

1. Open https://sheets.google.com and click **+ Blank**
2. Rename it `SEPOCT Products`
3. In **Row 1**, paste these column headers (exactly as written, in this order):

```
id | name | price | originalPrice | category | sizes | colors | images | badge | inStock | isNewArrival | isBestSeller | description | material | fit
```

(use one column per word — A, B, C, …, O)

---

## STEP 2 — Make the sheet public

1. Click the green **Share** button (top right)
2. Click **General access** → change "Restricted" to **Anyone with the link**
3. Set role to **Viewer**
4. Click **Done**

---

## STEP 3 — Get the CSV export URL

1. Look at your sheet's URL in the browser. It looks like:
   `https://docs.google.com/spreadsheets/d/`**`1AbCdEfGhIjKlMnOp...`**`/edit#gid=0`
2. Copy the long ID between `/d/` and `/edit`
3. Build your CSV URL like this:
   ```
   https://docs.google.com/spreadsheets/d/PASTE_YOUR_ID_HERE/export?format=csv
   ```

---

## STEP 4 — Paste the URL in the project

1. In the project root, open the file called **`.env`** (create it if missing —
   you can copy `.env.example` and rename it to `.env`)
2. Paste your URL after `=`:
   ```
   VITE_GOOGLE_SHEET_URL=https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOp/export?format=csv
   ```
3. Save the file. Refresh the website. Your products will appear.

---

## STEP 5 — Add your first product

Go to **Row 2** of your sheet and fill it in. Example:

| id | name | price | originalPrice | category | sizes | colors | images | badge | inStock | isNewArrival | isBestSeller | description | material | fit |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| prod-001 | Heavyweight Oversized Tee | 899 | 1299 | t-shirts | S,M,L,XL,XXL | Black,Navy | https://i.imgur.com/abc.jpg, https://i.imgur.com/xyz.jpg | NEW | TRUE | TRUE | FALSE | Garment-washed heavyweight cotton tee with a drop-shoulder, boxy fit. | 100% Combed Cotton, 240 GSM | Oversized |

### Field rules
- **id** — must be unique. Use anything like `prod-001`, `tee-black-01`.
- **price / originalPrice** — numbers only (no ₹ sign). Leave `originalPrice` blank if no discount.
- **category** — one of: `t-shirts`, `shirts`, `jeans`, `jackets`, `ethnic`, `accessories`
- **sizes / colors** — comma-separated (e.g. `S,M,L,XL`)
- **images** — comma-separated URLs. Use Imgur, Cloudinary, or your own hosting.
  First image = main image. Add at least 1, ideally 2–4.
- **badge** — `NEW`, `HOT`, `SALE`, or leave blank
- **inStock / isNewArrival / isBestSeller** — `TRUE` or `FALSE`

---

## STEP 6 — Mark a product as out of stock

Set the **inStock** column to `FALSE`. The product will be hidden from the
shop and category pages automatically.

---

## STEP 7 — Share with helpers

1. Click **Share** on the sheet
2. Add their email → set role to **Editor**
3. They can now add or edit products from any device, including the
   Google Sheets mobile app.

> ⏱️ Edits show up on the website within 5 minutes of refresh
> (or instantly in a fresh browser session).

---

## Tips for great product photos

- Format: **JPG or WEBP**
- Size: **800 × 1000 px** (4:5 portrait)
- Background: clean white or street/lifestyle
- Keep file size under 300 KB for fast loading

## Where to host images (free)

- **Imgur** — https://imgur.com (right-click uploaded image → Copy image address)
- **Cloudinary** — https://cloudinary.com (free tier, automatic optimization)
- **Google Drive** — works but slower; prefer Imgur/Cloudinary

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Products don't show up | Check the sheet is shared as "Anyone with the link" |
| One product missing | That row is missing `id`, `name`, `price`, or `images` |
| Images are broken | Make sure the URL ends in `.jpg`, `.png`, or `.webp` and opens in a new tab |
| Site shows old products | Hard-refresh the browser (Cmd/Ctrl + Shift + R) |
