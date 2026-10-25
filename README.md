# Conrad Taguinod — Portfolio

A lightweight, static portfolio built with HTML, CSS, and JavaScript. There are no build steps, paid services, or backend dependencies. The existing SQL files in the project root are left untouched.

## Preview locally

Open `index.html` in a browser. For reliable PDF preview behavior, use a local static server or the GitHub Pages preview after publishing; the website itself does not need a server-side runtime.

## Personalize the site

1. Review or update your email, phone, resume path, photo path, and social profile URLs in `js/data.js`. The provided contact details and resume PDF are already connected.
2. Replace `assets/documents/conrad-julio-m-taguinod-resume.pdf` with an updated resume using the same filename, or change `profile.resume` to point to a new relative path.
3. Put profile photos in `assets/images/`. Set `profile.photo` and replace the initials placeholder in `index.html` with an `<img>` when ready.
4. Add project information to the `projects` array in `js/data.js` and project screenshots to `assets/projects/`.
5. To add a certificate, copy the original JPG, PNG, or PDF into `assets/certificates/`, then add an object to `certificates` in `js/data.js`:

   ```js
   { title: "Certificate title", organization: "Issuer", date: "Month YYYY", category: "networking", file: "./assets/certificates/file-name.pdf" }
   ```

   Categories are `networking`, `systems`, `web`, and `other`. For a missing fact, leave the string empty; the site displays “Issuer not specified” and never invents a date. The gallery supports JPG, PNG, and PDF. Cropped versions of screenshot certificates appear in the gallery, while the provided originals are preserved under `assets/certificates/originals/`. The gallery file opens in the accessible dialog viewer. PDF support uses the browser’s built-in PDF viewer.

## Publish free with GitHub Pages

1. Create a GitHub repository and push this project folder to its default branch (`main`).
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and the `/ (root)` folder, then click **Save**.
5. Wait for the Pages deployment to finish. GitHub shows the published URL under **Settings → Pages**. Changes pushed to the selected branch publish automatically.

All site links and asset paths are relative, so the site works both at a user-site root and a project-site subpath.
