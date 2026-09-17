# Landing Page & Rewards Platform (Google Forms Style)

A high-converting, dual-mode landing page designed in a clean Google Forms aesthetic with an instant 1-click mode switcher, dynamic CPA offer buttons, lead capture, and a password-protected/shortcut Admin Dashboard.

---

## 🚀 How to Deploy on Render (Render.com)

You can deploy this application on Render in less than 2 minutes using either method below:

### Method 1: Deploy as a **Web Service** (Recommended)
1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository: `mohhh20055-cell/Task`.
4. Configure the settings:
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free (or any tier of your choice)
5. Click **Create Web Service**. Render will automatically build the Vite frontend and launch the Node/Express server.

---

### Method 2: Deploy as a **Static Site**
1. Click **New +** and select **Static Site**.
2. Connect your GitHub repository: `mohhh20055-cell/Task`.
3. Configure the settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. In **Redirects / Rewrites**, add:
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** `Rewrite` (200)
5. Click **Create Static Site**.

---

## 🛠️ Admin Dashboard Access

You can open the Admin Dashboard anytime using either:
- Adding `/#admin` or `/admin` to your website URL (e.g. `https://your-site.onrender.com/#admin`).
- Clicking the floating **Admin Dashboard (Pencil)** icon in the bottom-left corner of the page.

### Features in Admin Dashboard:
- **1-Click Mode Switcher:** Switch between the **Dog Products Form** and the **Rewards / CPA Task Page** instantly.
- **CPA Links Management:** Set your custom Android & Desktop offer URLs and customize the button texts.
- **Leads & Submissions:** View all captured survey responses and button clicks in real time with 1-click **Excel / CSV Export**.
- **Form Content Customization:** Easily customize all titles, descriptions, instructions, and notices.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server locally
npm start
```
