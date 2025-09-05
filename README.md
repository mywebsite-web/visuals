Mide Visuals - Photographer Portfolio WebsiteOverviewThis is a modern, responsive single-page portfolio website for a photographer named Mide Visuals. It showcases selected projects with thumbnails, allows viewing hidden images in a modal slideshow, includes a contact modal for social links, and has an admin panel for local image uploads. The site is built with pure HTML, CSS, and JavaScript (no frameworks), making it lightweight and easy to deploy.Key FeaturesProject Grid: Displays 10 selected projects with categories (All, Editorial, Portrait, Commercial, Landscape, Street). Each project has a thumbnail and metadata.
Hidden Images per Project: Each project has up to 5 hidden images (e.g., img1.jpg to img5.jpg for Project 1). Clicking a project card or "View Work" button opens a modal slideshow where users can scroll through the images using arrows, keyboard, or swipe.
View All Works: A button to open a modal with all 60 images (img1.jpg to img60.jpg) plus any custom uploads.
Modal Slideshow: Responsive image viewer with navigation (prev/next arrows, keyboard arrows, touch swipe), captions, download options, and focus trapping for accessibility.
Filters: Category buttons to filter projects in the grid.
Contact Modal: Opens a "hidden page" (modal) with branded social links (WhatsApp, Instagram, X/Twitter, Email) for contacting the photographer.
Admin Panel: Double-click the logo to open a panel for uploading images (stored in localStorage). Uploads appear as an additional "Uploads" project.
Consent Bar: A cookie consent banner for tracking (uses localStorage).
Responsive Design: Adapts to mobile, tablet, and desktop screens.
Accessibility: Includes ARIA attributes, keyboard navigation, and focus outlines.
Other: Stats section, resume download button (placeholder), book a shoot button (links to WhatsApp).

Technologies UsedHTML5
CSS3 (with CSS variables for theming, gradients, and responsive grids)
Vanilla JavaScript (for modals, slideshow, filters, localStorage, event handling)

No external dependencies or build tools required.Setup and InstallationClone or Download: Download the HTML file and any associated images (img1.jpg to img60.jpg, logo.jpg).
Images: Place your image files (img1.jpg to img60.jpg) in the same directory as the HTML file. If images are hosted elsewhere, update the src attributes in the code.
Customization:Site Name and Description: Edit <h1 id="siteName">Mide Visuals</h1> and the lead paragraph.
Projects: Update titles, metadata, and thumbnails in the #projectGrid section. Hidden images are defined in the projectImages object in the script—add/edit paths and captions there.
Social Links: Replace placeholders in the script's renderInitial() function and contact modal HTML (e.g., https://wa.me/YOURPHONENUMBER).
Resume Button: Update #resumeBtn onclick to link to your resume PDF.
Book a Shoot: Update the WhatsApp link in the script.
Colors/Themes: Edit CSS variables in :root (e.g., --accent: #e9a94b; for the orange accent).
Filters: Added "Landscape" and "Street" buttons to match categories.

Run the Site: Open the HTML file in any modern web browser (e.g., Chrome, Firefox). No server needed for local testing.
Deployment: Upload to a static hosting service like GitHub Pages, Netlify, or Vercel. Ensure images are included.

UsageViewing Projects: Click a project card or "View Work" to open the modal with 5 images. Use arrows or swipe to navigate.
Filtering: Click category buttons above the grid to filter projects.
All Works: Click "View All Works" to see 60+ images in the modal.
Contact: Click "Contact" to open the modal with social links.
Admin: Double-click the logo to upload images (saved locally). Clear uploads via the button.
Consent: Accept/Decline the banner; choice is stored in localStorage.

NotesImage Paths: Assumes local files like img1.jpg. For testing, you can replace with URLs (e.g., https://picsum.photos/seed/1/800/600).
LocalStorage Limits: Uploads are stored in the browser (~5MB limit). Not suitable for production storage—use a backend for real apps.
Accessibility & Performance: Lazy loading on images, responsive design, and ARIA labels included. Test with screen readers.
Customization Tips: To add more projects, duplicate <article> elements in #projectGrid and extend projectImages object.
Year Update: Footer year auto-updates via JS.

