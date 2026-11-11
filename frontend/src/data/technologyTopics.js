import {
  Braces,
  Code2,
  Coffee,
  Database,
  Leaf,
  Paintbrush,
  Wind,
} from "lucide-react";

export const technologyTopics = [
  {
    label: "HTML",
    path: "/learn/html",
    icon: Code2,
    description: "Structure web pages with meaningful, accessible markup.",
    intro:
      "HTML (HyperText Markup Language) describes the content and structure of a web page. It is a markup language, not a programming language: elements identify headings, paragraphs, links, forms, and other kinds of content. Browsers parse HTML into a document tree that CSS can style and JavaScript can update.",
    concepts: [
      {
        title: "HTML Document Structure",
        explanation:
          "An HTML page is organized into meaningful regions. The document starts with a doctype and an html root. The head stores page information that is not shown as ordinary content. Inside the body, a header can introduce the page, main holds its primary content, sections group related topics, and aside contains supporting information. A footer closes the page with related details. Choose these elements for what their content means, then use CSS to control their appearance.",
        steps: [
          "Start the file with <!doctype html> and set the page language on the html element.",
          "Put the character set, responsive viewport, page title, and linked resources inside head.",
          "Place the content users read and interact with inside body.",
          "Use header, main, section, aside, and footer to express the roles of the page regions.",
        ],
        points: [
          "A page should have one main landmark for its central content.",
          "Sections group related content; give each section a clear heading.",
          "An aside is supporting content, not a substitute for the main content.",
          "HTML describes structure; CSS controls colors, spacing, and layout.",
        ],
        visual: "document-structure",
        exampleTitle: "A page with clear document regions",
        filename: "index.html",
        language: "HTML",
        code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Garden Journal</title>
  </head>
  <body>
    <header><h1>Garden Journal</h1></header>
    <main>
      <section>
        <h2>Plan your garden</h2>
        <p>Start with a sunny place and healthy soil.</p>
      </section>
      <section>
        <h2>Seasonal notes</h2>
        <p>Record what is growing this month.</p>
      </section>
      <aside><h2>Quick tip</h2><p>Water early in the day.</p></aside>
    </main>
    <footer><p>Garden Journal learning example</p></footer>
  </body>
</html>`,
      },
      {
        title: "Basic HTML Page Tags",
        explanation:
          "HTML uses tags to define the structure and content of a web page. The essential tags include <!DOCTYPE html> to declare the document type, <html> as the root container, <head> for metadata, <title> for the browser tab title, <body> for visible content, and <p> for paragraphs. Most tags require closing tags, except for self-closing tags like <!DOCTYPE html> and <br>.",
        steps: [
          "Start with <!DOCTYPE html> declaration",
          "Wrap all content in <html> tag",
          "Use <head> for metadata and <title> for page title",
          "Place visible content in <body> tag",
          "Use <p> for paragraphs with closing </p> tag",
        ],
        points: [
          "Every tag must have an end tag except self-closing tags",
          "<!DOCTYPE html> and <br> are self-closing tags",
          "The <title> tag content appears in browser tab",
          "<body> contains all content shown to users",
        ],
        exampleTitle: "Basic HTML page structure",
        filename: "basic-tags.html",
        language: "HTML",
        code: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <p>This is a paragraph.</p>
    <p>Another paragraph with a line break.<br>New line here.</p>
  </body>
</html>`,
      },
      {
        title: "HTML Text Formatting",
        explanation:
          "HTML provides various tags for text formatting including headings (h1-h6), bold (<b>, <strong>), italic (<i>, <em>), highlight (<mark>), strikethrough (<s>), code (<code>), citation (<cite>), time (<time>), address (<address>), subscript (<sub>), superscript (<sup>), blockquote (<blockquote>), and preformatted text (<pre>). Semantic tags like <strong> and <em> convey meaning beyond visual styling.",
        steps: [
          "Use h1-h6 for headings (h1 largest, h6 smallest)",
          "Use <strong> for important text, <b> for bold styling",
          "Use <em> for emphasized text, <i> for italic styling",
          "Use <mark> to highlight text",
          "Use <code> for inline code snippets",
        ],
        points: [
          "Semantic tags (<strong>, <em>) are preferred over presentational tags (<b>, <i>)",
          "<mark> highlights text for reference or notation",
          "<code> displays code with monospace font",
          "<blockquote> for quoting external sources",
          "<pre> preserves whitespace and line breaks",
        ],
        exampleTitle: "Text formatting examples",
        filename: "text-formatting.html",
        language: "HTML",
        code: `<h1>Main Heading</h1>
<h2>Sub Heading</h2>
<p><strong>Important text</strong> and <b>bold text</b></p>
<p><em>Emphasized text</em> and <i>italic text</i></p>
<p><mark>Highlighted text</mark></p>
<p><s>Strikethrough text</s></p>
<p>Code: <code>console.log('hello')</code></p>
<blockquote>This is a quote from another source.</blockquote>
<pre>Preformatted text
  with preserved spacing</pre>`,
      },
      {
        title: "HTML Tables",
        explanation:
          "HTML tables organize data in rows and columns using <table>, <thead>, <tbody>, <tr>, <th>, and <td> tags. The <thead> groups header content, <tbody> contains table data, <tr> defines rows, <th> creates header cells, and <td> creates data cells. Tables should be used for tabular data, not layout.",
        steps: [
          "Wrap table in <table> tag",
          "Use <thead> for header section",
          "Use <tbody> for body content",
          "Create rows with <tr>",
          "Use <th> for header cells, <td> for data cells",
        ],
        points: [
          "Tables are for tabular data, not page layout",
          "<th> cells are bold and centered by default",
          "Use scope attribute on <th> for accessibility",
          "Consider responsive design for mobile tables",
        ],
        exampleTitle: "Simple data table",
        filename: "table.html",
        language: "HTML",
        code: `<table>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
      <td>25</td>
      <td>New York</td>
    </tr>
    <tr>
      <td>Jane</td>
      <td>30</td>
      <td>London</td>
    </tr>
  </tbody>
</table>`,
      },
      {
        title: "HTML Images",
        explanation:
          "Images are added using the <img> tag with essential attributes: src (image path), alt (alternative text for accessibility and SEO), height, and width. The alt attribute is crucial for screen readers and when images fail to load. Always provide meaningful alt text for informative images.",
        steps: [
          "Use <img> tag to add images",
          "Set src attribute to image file path",
          "Provide alt text for accessibility",
          "Optionally set height and width attributes",
        ],
        points: [
          "alt text is required for accessibility",
          "alt text helps with SEO",
          "height and width prevent layout shift",
          "Use relative paths for local images",
        ],
        exampleTitle: "Image with attributes",
        filename: "image.html",
        language: "HTML",
        code: `<img src="/images/garden.jpg" 
     alt="Beautiful garden with flowers" 
     width="400" 
     height="300" />`,
      },
      {
        title: "HTML Links",
        explanation:
          "Links are created with the <a> tag using href for the destination URL. The target attribute controls where the link opens (_blank for new tab, _self for same tab, _parent for parent frame, _top for top frame). The download attribute enables file downloads. Link text should be descriptive for accessibility.",
        steps: [
          "Use <a> tag for links",
          "Set href to destination URL",
          "Use target='_blank' for new tab",
          "Add download attribute for file downloads",
        ],
        points: [
          "Descriptive link text improves accessibility",
          "target='_blank' should use rel='noopener noreferrer'",
          "download attribute works with same-origin files",
          "Use relative URLs for internal links",
        ],
        exampleTitle: "Link examples",
        filename: "links.html",
        language: "HTML",
        code: `<a href="https://example.com">Visit Example</a>
<a href="/about" target="_blank">About Us (new tab)</a>
<a href="/files/document.pdf" download>Download PDF</a>`,
      },
      {
        title: "HTML Lists",
        explanation:
          "HTML provides three list types: ordered lists (<ol>) for numbered items, unordered lists (<ul>) for bulleted items, and description lists (<dl>) for key-value pairs using <dt> (term) and <dd> (description). List items use <li> tag. Lists can be nested for hierarchical data.",
        steps: [
          "Use <ol> for numbered lists",
          "Use <ul> for bulleted lists",
          "Use <dl> with <dt> and <dd> for description lists",
          "Wrap each item in <li> tag",
        ],
        points: [
          "Nested lists create hierarchy",
          "<ol> automatically numbers items",
          "<ul> uses bullets by default",
          "<dl> is ideal for glossaries and metadata",
        ],
        exampleTitle: "List examples",
        filename: "lists.html",
        language: "HTML",
        code: `<ol>
  <li>First item</li>
  <li>Second item</li>
</ol>
<ul>
  <li>Apple</li>
  <li>Banana</li>
</ul>
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>`,
      },
      {
        title: "HTML Forms",
        explanation:
          "Forms collect user input using the <form> element with attributes: name (unique identifier), action (backend URL), method (GET or POST), and enctype (encoding type). Form fields include text fields, password fields, textarea, buttons, checkboxes, radio buttons, select dropdowns, file inputs, and hidden fields. Labels improve accessibility by associating text with inputs.",
        steps: [
          "Wrap form fields in <form> tag",
          "Set action to backend processing URL",
          "Use method='GET' or method='POST'",
          "Set enctype='multipart/form-data' for file uploads",
          "Associate labels with inputs using 'for' attribute",
        ],
        points: [
          "GET appends data to URL, POST sends in body",
          "multipart/form-data required for file uploads",
          "Labels improve accessibility and click targets",
          "Server-side validation is always required",
        ],
        exampleTitle: "Complete form example",
        filename: "form.html",
        language: "HTML",
        code: `<form action="/submit" method="post" enctype="multipart/form-data">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required />
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required />
  
  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="4"></textarea>
  
  <button type="submit">Submit</button>
</form>`,
      },
      {
        title: "HTML5 New Input Elements",
        explanation:
          "HTML5 introduced new input types for better user experience and validation: date, datetime-local, time, email, tel, color, number, range, and url. These provide native browser UI (date pickers, color pickers, sliders) and built-in validation. They degrade gracefully to text inputs in older browsers.",
        steps: [
          "Use type='date' for date picker",
          "Use type='email' for email validation",
          "Use type='tel' for phone numbers",
          "Use type='color' for color picker",
          "Use type='number' for numeric input",
          "Use type='range' for slider",
          "Use type='url' for URL validation",
        ],
        points: [
          "Native UI improves mobile experience",
          "Built-in validation reduces JavaScript needs",
          "Graceful degradation to text input",
          "Use appropriate type for better UX",
        ],
        exampleTitle: "HTML5 input types",
        filename: "html5-inputs.html",
        language: "HTML",
        code: `<input type="date" name="birthday" />
<input type="datetime-local" name="appointment" />
<input type="time" name="alarm" />
<input type="email" name="email" placeholder="user@example.com" />
<input type="tel" name="phone" placeholder="+1-555-0123" />
<input type="color" name="favorite-color" />
<input type="number" name="age" min="0" max="120" />
<input type="range" name="volume" min="0" max="100" />
<input type="url" name="website" placeholder="https://example.com" />`,
      },
      {
        title: "HTML Layout",
        explanation:
          "HTML5 semantic layout elements structure pages meaningfully: <div> for generic containers, <section> for thematic grouping, <header> for page/section headers, <footer> for page/section footers, <aside> for tangential content, <hr> for thematic breaks, and <br> for line breaks. These elements improve accessibility and SEO.",
        steps: [
          "Use <header> for page/section headers",
          "Use <footer> for page/section footers",
          "Use <section> for thematic content groups",
          "Use <aside> for sidebar/tangential content",
          "Use <div> for generic styling containers",
          "Use <hr> for thematic breaks",
          "Use <br> for line breaks within text",
        ],
        points: [
          "Semantic elements improve accessibility",
          "Search engines understand page structure better",
          "<div> is for styling, not semantics",
          "<aside> content is related but not essential",
        ],
        exampleTitle: "Page layout structure",
        filename: "layout.html",
        language: "HTML",
        code: `<div class="page-wrapper">
  <header>
    <h1>Site Title</h1>
    <nav>Navigation</nav>
  </header>
  <main>
    <section>
      <h2>Main Content</h2>
      <p>Primary content here</p>
    </section>
    <aside>
      <h3>Sidebar</h3>
      <p>Related links</p>
    </aside>
  </main>
  <footer>
    <p>Copyright 2024</p>
  </footer>
</div>`,
      },
      {
        title: "Video in HTML Page",
        explanation:
          "The <video> tag embeds video content with controls for play, pause, volume. Use width and height attributes for dimensions. The <source> tag allows multiple video formats for browser compatibility. Add autoplay attribute for automatic playback (with muted for browser policies).",
        steps: [
          "Use <video> tag for video embedding",
          "Add controls attribute for player controls",
          "Set width and height attributes",
          "Use <source> for multiple formats",
          "Add muted for autoplay to work",
        ],
        points: [
          "Provide multiple formats for compatibility",
          "autoplay requires muted attribute",
          "controls attribute shows native player UI",
          "Consider poster attribute for thumbnail",
        ],
        exampleTitle: "Video player",
        filename: "video.html",
        language: "HTML",
        code: `<video width="640" height="360" controls>
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.webm" type="video/webm" />
  Your browser does not support the video tag.
</video>`,
      },
      {
        title: "Audio in HTML Page",
        explanation:
          "The <audio> tag embeds audio content with controls for play, pause, volume. Use <source> tag for multiple audio formats. Add autoplay for automatic playback. The controls attribute shows the native audio player interface.",
        steps: [
          "Use <audio> tag for audio embedding",
          "Add controls attribute for player controls",
          "Use <source> for multiple formats",
          "Add autoplay for automatic playback",
        ],
        points: [
          "Multiple formats ensure browser compatibility",
          "controls attribute shows native player",
          "Consider preload attribute for performance",
          "Audio accessibility: provide transcripts",
        ],
        exampleTitle: "Audio player",
        filename: "audio.html",
        language: "HTML",
        code: `<audio controls>
  <source src="audio.mp3" type="audio/mpeg" />
  <source src="audio.ogg" type="audio/ogg" />
  Your browser does not support the audio element.
</audio>`,
      },
      {
        title: "Adding CSS to HTML",
        explanation:
          "CSS can be added to HTML in three ways: External (using <link> tag in <head>), Internal (using <style> tag in <head>), and Inline (using style attribute on elements). External CSS is preferred for maintainability and caching. Internal CSS is useful for page-specific styles. Inline CSS should be avoided except for dynamic styles.",
        steps: [
          "External: <link rel='stylesheet' href='styles.css'> in <head>",
          "Internal: <style> CSS rules </style> in <head>",
          "Inline: <div style='color: red;'>Content</div>",
        ],
        points: [
          "External CSS is best for maintainability",
          "Internal CSS for page-specific styles",
          "Inline CSS has highest specificity",
          "Multiple external stylesheets can be linked",
        ],
        exampleTitle: "CSS inclusion methods",
        filename: "css-methods.html",
        language: "HTML",
        code: `<!DOCTYPE html>
<html>
  <head>
    <!-- External CSS -->
    <link rel="stylesheet" href="styles.css" />
    
    <!-- Internal CSS -->
    <style>
      .highlight { background-color: yellow; }
    </style>
  </head>
  <body>
    <!-- Inline CSS -->
    <p style="color: blue;">Inline styled paragraph</p>
    <p class="highlight">Internal CSS class</p>
  </body>
</html>`,
      },
      {
        title: "Adding JavaScript to HTML",
        explanation:
          "JavaScript adds interactivity to web pages. It can be included externally using <script src='script.js'></script> or internally using <script>code</script>. Place scripts at the end of <body> or use defer/async attributes. JavaScript enables dynamic content, form validation, animations, API calls, and more.",
        steps: [
          "External: <script src='script.js'></script> before </body>",
          "Internal: <script> JavaScript code </script>",
          "Use defer attribute for external scripts in <head>",
          "Use async for independent scripts",
        ],
        points: [
          "Place scripts at end of body for performance",
          "defer executes after HTML parsing",
          "async executes asynchronously",
          "JavaScript runs in browser, not server",
        ],
        exampleTitle: "JavaScript inclusion",
        filename: "javascript.html",
        language: "HTML",
        code: `<!DOCTYPE html>
<html>
  <head>
    <script src="app.js" defer></script>
  </head>
  <body>
    <button id="btn">Click me</button>
    
    <script>
      document.getElementById('btn').addEventListener('click', () => {
        alert('Button clicked!');
      });
    </script>
  </body>
</html>`,
      },
    ],
  },
  {
    label: "CSS",
    path: "/learn/css",
    icon: Paintbrush,
    description:
      "Style web pages with selectors, layout, and responsive rules.",
    intro:
      "CSS (Cascading Style Sheets) controls how HTML is presented. A rule combines a selector, which identifies elements, with declarations that set visual properties. The cascade resolves competing rules using origin, importance, specificity, and source order. Learning the box model, layout systems, and responsive techniques makes styles predictable across pages and devices.",
    concepts: [
      {
        title: "Selectors and the cascade",
        explanation:
          "Selectors match elements by type, class, attribute, or relationship. Classes are a flexible way to apply reusable styling. When multiple declarations set the same property, the cascade decides which one wins; overly specific selectors make later changes harder. Prefer small, reusable classes and keep state styles close to the component they describe.",
        points: [
          "Use classes for reusable component styles and avoid IDs as general styling hooks.",
          "Keep specificity low so states and component variations remain easy to override.",
          "Group related declarations and remove rules that no longer describe the interface.",
        ],
        exampleTitle: "Reusable card and state selectors",
        filename: "styles.css",
        language: "CSS",
        code: `.card {
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.card a:hover,
.card a:focus-visible {
  text-decoration: underline;
}`,
      },
      {
        title: "The box model",
        explanation:
          "Every element is laid out as a box: content surrounded by padding, border, and margin. With the default content-box sizing, declared width excludes padding and borders, which can make components unexpectedly wider. Applying border-box makes declared dimensions include the content, padding, and border. Margin creates outside spacing; padding creates space inside the border.",
        points: [
          "Use box-sizing: border-box to make component dimensions easier to reason about.",
          "Use padding for internal breathing room and margin or layout gap for external separation.",
          "Avoid fixed heights for content that may wrap or grow with localization and user settings.",
        ],
        exampleTitle: "Predictable sizing",
        filename: "box-model.css",
        language: "CSS",
        code: `*,
*::before,
*::after {
  box-sizing: border-box;
}

.panel {
  width: min(100%, 42rem);
  padding: 1.5rem;
  border: 1px solid #cbd5e1;
}`,
      },
      {
        title: "Flexbox and Grid",
        explanation:
          "Flexbox arranges items along one primary axis and is useful for toolbars, navigation, and aligned groups. CSS Grid manages rows and columns together, making it a good fit for page layouts and card collections. Both systems support intrinsic sizing, so layouts can adapt to content instead of relying on brittle pixel positions. Use gap to express consistent space between items.",
        points: [
          "Choose Flexbox for a row or column of items and Grid for a two-dimensional layout.",
          "Use minmax and fractional units to distribute space without hard-coded widths.",
          "Let content determine height where possible, and add alignment rules only when needed.",
        ],
        exampleTitle: "A content-friendly card grid",
        filename: "layout.css",
        language: "CSS",
        code: `.card-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit, minmax(min(100%, 16rem), 1fr)
  );
  gap: 1rem;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}`,
      },
      {
        title: "Responsive design",
        explanation:
          "Responsive design allows content to work across viewport sizes, zoom levels, and different input devices. Start with a fluid layout that works at narrow widths, then add breakpoints when the content needs more room. Relative units, max-width, flexible images, and intrinsic layout often reduce the number of breakpoints required. Test real content and intermediate widths, not only common device presets.",
        points: [
          "Use the viewport meta tag in HTML so mobile browsers use the device width.",
          "Add breakpoints where the content layout stops working, rather than targeting device names.",
          "Keep images within their containers and check for horizontal overflow.",
        ],
        exampleTitle: "A mobile-first layout",
        filename: "responsive.css",
        language: "CSS",
        code: `.page {
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}

.columns {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 48rem) {
  .columns { grid-template-columns: 2fr 1fr; }
}`,
      },
      {
        title: "Typography, color, and focus",
        explanation:
          "Typography and color establish hierarchy, but must remain legible at different sizes and contrast settings. Use a small set of design tokens to keep a product consistent. Interactive elements need a visible focus indicator for keyboard users; removing the browser outline without replacing it makes navigation difficult. Respect reduced-motion preferences when adding transitions or animation.",
        points: [
          "Use CSS custom properties for shared colors and spacing values.",
          "Check text contrast against its actual background and do not rely on color alone to convey meaning.",
          "Keep focus-visible styles clear and honor prefers-reduced-motion.",
        ],
        exampleTitle: "Design tokens and accessible states",
        filename: "tokens.css",
        language: "CSS",
        code: `:root {
  --color-brand: #0f766e;
  --space-card: 1.25rem;
}

button:focus-visible {
  outline: 3px solid var(--color-brand);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto; }
}`,
      },
    ],
  },
  {
    label: "Tailwind",
    path: "/learn/tailwind",
    icon: Wind,
    description: "Build interfaces with composable utility classes.",
    intro:
      "Tailwind CSS is a utility-first styling framework. Instead of naming every custom CSS rule, you compose small classes for layout, spacing, colors, and interaction directly on the elements they style. Its build process detects classes in source files and generates the CSS needed by the application. Reusable components keep repeated utility combinations consistent.",
    concepts: [
      {
        title: "Utility-first styling",
        explanation:
          "A utility class usually applies one focused style, such as a flex layout, padding, or text color. Combining these classes makes the component's structure and appearance visible together, and avoids inventing a new class name for every small variation. When a group of classes is repeated, extract a component or a well-defined shared pattern rather than creating opaque string fragments.",
        points: [
          "Read utility groups by concern: layout, spacing, typography, color, then interaction.",
          "Use the project's design tokens and theme instead of arbitrary values when possible.",
          "Extract repeated markup into components to keep styling consistent.",
        ],
        exampleTitle: "A compact call-to-action",
        filename: "CallToAction.jsx",
        language: "JSX",
        code: `<a
  href="/guides"
  className="inline-flex items-center gap-2 rounded-lg
    bg-teal-700 px-4 py-2 font-semibold text-white
    hover:bg-teal-800 focus-visible:outline-2
    focus-visible:outline-offset-2 focus-visible:outline-teal-700"
>
  Explore guides
</a>`,
      },
      {
        title: "Responsive modifiers",
        explanation:
          "Responsive prefixes apply a utility at and above a configured breakpoint. Tailwind's responsive workflow is mobile-first: unprefixed utilities describe the base layout and prefixed classes progressively adapt it on wider screens. Combining grid, flex, and width utilities can build responsive interfaces without separate stylesheets, but the result should still be tested at intermediate widths.",
        points: [
          "Start with the narrow-screen layout and add sm:, md:, or lg: changes where content needs them.",
          "Use responsive prefixes on the specific property that needs to change.",
          "Avoid assuming that each breakpoint corresponds to one particular device.",
        ],
        exampleTitle: "A responsive two-column section",
        filename: "ResponsiveSection.jsx",
        language: "JSX",
        code: `<section className="grid gap-6 md:grid-cols-[2fr_1fr]">
  <article className="min-w-0">
    <h2 className="text-xl font-bold">Main content</h2>
    <p className="mt-2 text-slate-600">The content stays readable.</p>
  </article>
  <aside className="rounded-xl bg-slate-100 p-4">Related links</aside>
</section>`,
      },
      {
        title: "State and theme variants",
        explanation:
          "Variants apply utilities under conditions such as hover, keyboard focus, disabled state, or a dark-theme ancestor. Use hover and focus-visible together where appropriate, and ensure the state is perceivable without color alone. A class such as dark:bg-slate-900 only takes effect when the configured dark variant detects its theme condition; the app must also set that condition.",
        points: [
          "Use focus-visible so keyboard focus is clear without unnecessarily changing pointer interactions.",
          "Use disabled: and aria/state variants to make control states visible and consistent.",
          "Keep light and dark color pairs readable and test the actual theme toggle.",
        ],
        exampleTitle: "A button with interaction and theme states",
        filename: "ThemedButton.jsx",
        language: "JSX",
        code: `<button
  className="rounded-lg bg-teal-700 px-4 py-2 text-white
    hover:bg-teal-800 focus-visible:outline-2
    focus-visible:outline-offset-2 focus-visible:outline-teal-500
    disabled:cursor-not-allowed disabled:opacity-50
    dark:bg-teal-400 dark:text-slate-950"
>
  Save changes
</button>`,
      },
      {
        title: "Consistency and component extraction",
        explanation:
          "Utility classes are most maintainable when repeated interface patterns become reusable components. A button can accept a small set of explicit props, such as intent and size, while keeping its accessible semantics. Avoid constructing class names from partial strings like `bg-${color}-500`; static scanners may not detect the resulting class. Use complete class strings or a deliberate variant mapping.",
        points: [
          "Extract a component when markup or styling is repeated and has a clear shared meaning.",
          "Map finite variants to complete, statically visible class strings.",
          "Keep class lists readable and avoid building utility names from runtime fragments.",
        ],
        exampleTitle: "A safe variant map",
        filename: "Button.jsx",
        language: "JSX",
        code: `const styles = {
  primary: "bg-teal-700 text-white hover:bg-teal-800",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
};

function Button({ variant = "primary", children }) {
  return (
    <button className={\`rounded-lg px-4 py-2 \${styles[variant]}\`}>
      {children}
    </button>
  );
}`,
      },
      {
        title: "Theme configuration and tokens",
        explanation:
          "A design system becomes easier to evolve when shared colors, fonts, and spacing values are represented as named tokens. Tailwind configuration and CSS custom properties can provide those shared values, depending on the project's Tailwind version and setup. Prefer semantic names such as brand or surface for values that communicate purpose, and keep project conventions consistent.",
        points: [
          "Use shared theme values for repeated brand and surface colors.",
          "Prefer semantic tokens over one-off arbitrary values for design-system decisions.",
          "Confirm the syntax against the Tailwind version already installed in the project.",
        ],
        exampleTitle: "Using project theme tokens",
        filename: "ThemedCard.jsx",
        language: "JSX",
        code: `<article className="rounded-xl border border-slate-200
  bg-white p-5 text-slate-900 shadow-sm
  dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
  <h2 className="text-lg font-semibold">Project settings</h2>
  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
    A card uses consistent surface and text colors.
  </p>
</article>`,
      },
    ],
  },
  {
    label: "JavaScript",
    path: "/learn/javascript",
    icon: Braces,
    description: "Add behavior and logic to web applications.",
    intro:
      "JavaScript is a general-purpose programming language commonly used for browser interactions, servers, and tooling. It is dynamically typed, supports object-oriented and functional styles, and runs an event loop for asynchronous work. Understanding values, scope, functions, arrays, objects, and promises is a strong foundation for building reliable applications.",
    concepts: [
      {
        title: "Values, variables, and types",
        explanation:
          "JavaScript values include strings, numbers, booleans, null, undefined, objects, and symbols. Use const when a binding should not be reassigned; use let when it must change. const does not deeply freeze an object, so its properties can still be mutated. Prefer strict comparisons and explicit handling for missing values to avoid surprising coercion.",
        points: [
          "Use const by default and let for reassigned bindings; avoid var in modern code.",
          "Use === and !== to avoid implicit type conversion in comparisons.",
          "Validate external values because API data and user input are not automatically trustworthy types.",
        ],
        exampleTitle: "Destructure and validate input",
        filename: "profile.js",
        language: "JavaScript",
        code: `function formatProfile(user) {
  if (!user || typeof user.name !== "string") {
    throw new TypeError("A user name is required");
  }

  const { name, role = "member" } = user;
  return \`\${name} (\${role})\`;
}`,
      },
      {
        title: "Functions and scope",
        explanation:
          "Functions package behavior and can accept parameters and return values. JavaScript uses lexical scope: a function can access bindings from the place where it was defined. Arrow functions are concise and inherit this from their surrounding scope, while regular functions have their own this depending on how they are called. Pure functions are easier to test because they return results without changing unrelated state.",
        points: [
          "Name functions according to the action they perform and keep each responsibility focused.",
          "Return values explicitly when callers need a result.",
          "Use closures intentionally; values captured by a callback remain available after the outer function returns.",
        ],
        exampleTitle: "A reusable pure function",
        filename: "pricing.js",
        language: "JavaScript",
        code: `function calculateTotal(items, taxRate) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return subtotal * (1 + taxRate);
}

const total = calculateTotal([{ price: 12, quantity: 2 }], 0.08);`,
      },
      {
        title: "Arrays and objects",
        explanation:
          "Arrays represent ordered collections, and objects represent named properties. Methods such as map, filter, and find express common collection operations clearly. Spread syntax can create a shallow copy for immutable updates, but nested objects still share references. When data comes from a form or server, check that fields have the expected shape before using them.",
        points: [
          "Use map to transform every item and filter to keep matching items.",
          "Create new arrays or objects when updating state managed by React.",
          "Remember that spread and structured copies are shallow unless you deliberately clone nested data.",
        ],
        exampleTitle: "Transform a list without mutating it",
        filename: "tasks.js",
        language: "JavaScript",
        code: `const tasks = [
  { id: 1, title: "Read docs", done: true },
  { id: 2, title: "Write tests", done: false },
];

const openTasks = tasks
  .filter((task) => !task.done)
  .map((task) => ({ ...task, label: task.title.toUpperCase() }));`,
      },
      {
        title: "DOM events and user input",
        explanation:
          "The browser exposes the page as a Document Object Model (DOM). Event listeners respond to interactions such as clicks, form submissions, and keyboard input. Read input from the event or the form, validate it, and update the interface in a way that preserves focus and communicates results. When manually attaching listeners, remove them when they are no longer needed to avoid leaks or duplicate actions.",
        points: [
          "Listen for submit on the form rather than only click on the submit button.",
          "Prevent the default browser action only when your code replaces it.",
          "Treat values from the DOM as strings and validate before converting or sending them.",
        ],
        exampleTitle: "Handle a form submission",
        filename: "form.js",
        language: "JavaScript",
        code: `const form = document.querySelector("#search-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = new FormData(form).get("query");
  if (typeof query !== "string" || !query.trim()) return;

  console.log("Search for:", query.trim());
});`,
      },
      {
        title: "Promises and async/await",
        explanation:
          "Promises represent results that may become available later. async functions always return a promise, and await pauses that function until a promise settles without blocking the browser's main thread. Use try/catch to handle rejected operations, check HTTP response status because fetch does not reject for ordinary 4xx or 5xx responses, and provide loading and error states to users.",
        points: [
          "Check response.ok when using fetch; network success does not imply an HTTP success status.",
          "Handle errors at a boundary where you can provide useful context or feedback.",
          "Use AbortController to cancel requests that are no longer needed.",
        ],
        exampleTitle: "Fetch data with status checking",
        filename: "load-profile.js",
        language: "JavaScript",
        code: `async function loadProfile(userId) {
  const response = await fetch(\`/api/users/\${userId}\`);
  if (!response.ok) {
    throw new Error(\`Request failed: \${response.status}\`);
  }
  return response.json();
}

loadProfile("42").catch((error) => console.error(error));`,
      },
      {
        title: "Modules and error handling",
        explanation:
          "ES modules make dependencies explicit: export values from one file and import them where needed. Keep modules focused around a cohesive responsibility so they are easy to test and reuse. Throw Error objects when an operation cannot complete and catch errors where you can recover or communicate clearly. Avoid empty catches or silently returning fake success values because they hide failures from both users and maintainers.",
        points: [
          "Use named exports for shared utilities and a default export when a module has one primary value.",
          "Keep side effects, such as network access, at clear boundaries.",
          "Add context to errors while retaining the original failure information.",
        ],
        exampleTitle: "An explicit module boundary",
        filename: "format-date.js",
        language: "JavaScript",
        code: `export function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new TypeError("Expected a valid date");
  }
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(date);
}`,
      },
    ],
  },
  {
    label: "Java",
    path: "/learn/java",
    icon: Coffee,
    description: "Learn a strongly typed language for application development.",
    intro:
      "Java is a statically typed, object-oriented language that compiles to bytecode and runs on the Java Virtual Machine (JVM). Types make contracts visible, classes group state and behavior, and the standard library provides collections, streams, and concurrency primitives. Modern Java also supports records, lambdas, and pattern matching, depending on the project's Java version.",
    concepts: [
      {
        title: "Types and variables",
        explanation:
          "A variable declaration specifies the kind of value it can hold. Primitive types such as int and boolean store simple values; reference types point to objects and can be null. The compiler checks that operations respect declared types. Use descriptive names, narrow scopes, and appropriate types so invalid states are harder to express.",
        points: [
          "Choose int, long, double, and boolean based on the data; use BigDecimal for precise decimal money calculations.",
          "Use final for bindings that should not be reassigned.",
          "Consider nullability explicitly and validate values at public boundaries.",
        ],
        exampleTitle: "Typed values and a method",
        filename: "Temperature.java",
        language: "Java",
        code: `public class Temperature {
    private final double celsius;

    public Temperature(double celsius) {
        this.celsius = celsius;
    }

    public double fahrenheit() {
        return celsius * 9 / 5 + 32;
    }
}`,
      },
      {
        title: "Classes, objects, and encapsulation",
        explanation:
          "A class defines the data and operations of a type; an object is an instance of that class. Encapsulation protects an object's invariants by keeping implementation details private and exposing meaningful methods. Constructors establish valid initial state. Prefer small classes with clear responsibilities, and avoid exposing mutable internals that callers can change unexpectedly.",
        points: [
          "Keep fields private and expose intentional behavior through methods.",
          "Validate constructor inputs so an object begins in a valid state.",
          "Use records for simple immutable data carriers when supported by the project Java version.",
        ],
        exampleTitle: "A validated domain object",
        filename: "Book.java",
        language: "Java",
        code: `public class Book {
    private final String title;

    public Book(String title) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("Title is required");
        }
        this.title = title;
    }

    public String title() {
        return title;
    }
}`,
      },
      {
        title: "Collections and generics",
        explanation:
          "Collections store groups of values: List preserves order and allows duplicates, Set enforces uniqueness, and Map associates keys with values. Generics such as List<String> document and enforce the element type at compile time. Choose the collection that matches the required lookup and ordering behavior. Prefer interfaces such as List in declarations and select an implementation such as ArrayList where you construct it.",
        points: [
          "Use Map when records are naturally looked up by a key; use Set for uniqueness.",
          "Specify generic types to prevent unsafe casts and make APIs clearer.",
          "Avoid exposing mutable collections directly from domain objects.",
        ],
        exampleTitle: "Build an indexed lookup",
        filename: "Catalog.java",
        language: "Java",
        code: `import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

Map<String, Book> byTitle = books.stream()
    .collect(Collectors.toMap(
        Book::title, Function.identity()
    ));`,
      },
      {
        title: "Methods, interfaces, and composition",
        explanation:
          "Methods define operations, and interfaces describe capabilities that different classes can implement. Depending on an interface instead of a concrete implementation makes code easier to replace and test. Composition connects objects that each have a focused responsibility and is often simpler to evolve than deep inheritance hierarchies. Keep method signatures small and communicate expected behavior in names and types.",
        points: [
          "Use interfaces at meaningful boundaries where implementations may vary.",
          "Favor composition for combining behavior that does not form a true subtype relationship.",
          "Use @Override so the compiler verifies that a method implements or replaces a parent method.",
        ],
        exampleTitle: "Program to an interface",
        filename: "Notifier.java",
        language: "Java",
        code: `interface Notifier {
    void send(String recipient, String message);
}

class AlertService {
    private final Notifier notifier;

    AlertService(Notifier notifier) {
        this.notifier = notifier;
    }
}`,
      },
      {
        title: "Exceptions and resource safety",
        explanation:
          "Exceptions represent failures that interrupt ordinary control flow. Catch an exception only when you can handle it, add useful context, or translate it at a layer with a clear contract. Checked exceptions must be declared or handled; runtime exceptions typically indicate invalid state or programming errors. Use try-with-resources for resources that must close, such as files and database connections.",
        points: [
          "Do not swallow exceptions or catch Exception broadly without a concrete recovery strategy.",
          "Prefer specific exception types and preserve causes when wrapping failures.",
          "Use try-with-resources so AutoCloseable resources are closed even after errors.",
        ],
        exampleTitle: "Read a file safely",
        filename: "SettingsReader.java",
        language: "Java",
        code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public String readSettings(Path path) throws IOException {
    return Files.readString(path);
}`,
      },
    ],
  },
  {
    label: "Spring Boot",
    path: "/learn/spring-boot",
    icon: Leaf,
    description: "Create Java applications and web APIs with Spring Boot.",
    intro:
      "Learn Spring Boot by building a small Java REST API one layer at a time. Follow the concepts in order: understand the project and startup process, create endpoints, validate input, connect a database, then add security, tests, and production readiness. Examples use Spring Boot 3 conventions (Java 17+ and jakarta.* imports); check the version used by your project.",
    concepts: [
      {
        title: "Prerequisites: Java, HTTP, and Maven",
        explanation:
          "Spring Boot builds on Java, HTTP, and a build tool such as Maven. Be comfortable with classes, interfaces, collections, exceptions, and generics before learning framework annotations. An HTTP request has a method, path, headers, and possibly a body; a response has a status and body. Maven's pom.xml declares dependencies, while the Spring Boot parent manages compatible versions.",
        points: [
          "Use Java 17 or newer for Spring Boot 3 projects; this workspace uses Java 21.",
          "Know the purpose of GET, POST, PUT, PATCH, DELETE, and common HTTP status codes.",
          "Use the Spring Boot parent or dependency management rather than guessing library versions.",
        ],
        steps: [
          "Install a supported JDK and verify it with java -version.",
          "Practice compiling and running a small Java class.",
          "Open pom.xml and identify the dependencies used by the application.",
          "Run the starter app with ./mvnw spring-boot:run or mvn spring-boot:run.",
        ],
        exampleTitle: "A minimal Maven dependency",
        filename: "pom.xml",
        language: "XML",
        code: `<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<properties>
  <java.version>21</java.version>
</properties>`,
      },
      {
        title: "Application startup and auto-configuration",
        explanation:
          "@SpringBootApplication is the usual entry point for a Boot service. It enables configuration, component scanning, and auto-configuration. Auto-configuration checks dependencies and settings, then supplies common defaults, such as an embedded web server when the web starter is present. Place the main class in a root package so Spring can discover the rest of the application.",
        points: [
          "The application context creates beans and the embedded server starts with the app.",
          "Starters bring in compatible dependency groups that Boot can configure automatically.",
          "Start with defaults and override behavior only when the application needs it.",
        ],
        steps: [
          "Create a main class in the root package of your application.",
          "Add @SpringBootApplication to enable Boot configuration and scanning.",
          "Call SpringApplication.run from main.",
          "Run the app and confirm the startup log reports a listening port.",
          "Add a small controller and observe that the web starter starts an embedded server.",
        ],
        exampleTitle: "The application entry point",
        filename: "Application.java",
        language: "Java",
        code: `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`,
      },
      {
        title: "Dependency injection and services",
        explanation:
          "Spring's application context creates and manages beans, then injects their dependencies. Constructor injection makes required dependencies explicit, supports immutable fields, and simplifies unit tests. Put business rules in service classes rather than controllers so they can be reused outside HTTP handling. Avoid manually creating dependencies that Spring is responsible for managing.",
        points: [
          "Prefer constructor injection over field injection.",
          "Keep a service focused on application or domain operations, not request parsing.",
          "Use interfaces when they create a useful boundary, not as boilerplate for every class.",
        ],
        steps: [
          "Create a Java class for one application responsibility.",
          "Mark it with @Service so Spring can discover and manage it.",
          "Give it a focused method that performs the business operation.",
          "Pass the service to its caller through a constructor instead of calling new.",
        ],
        exampleTitle: "Inject a service through its constructor",
        filename: "GreetingService.java",
        language: "Java",
        code: `import org.springframework.stereotype.Service;

@Service
public class GreetingService {
    public String greet(String name) {
        return "Hello, " + name + "!";
    }
}`,
      },
      {
        title: "REST controllers and HTTP",
        explanation:
          "A REST controller maps HTTP requests to application operations and returns response data. Use the HTTP method and status code to describe the operation's outcome: GET reads, POST creates, PUT replaces, PATCH partially updates, and DELETE removes. Bind and validate request data with dedicated DTOs instead of exposing persistence entities directly. Return meaningful status codes and consistent error responses.",
        points: [
          "Use @RestController and explicit route mappings for resource-oriented endpoints.",
          "Validate request DTOs and return client errors for invalid input.",
          "Keep persistence models separate from public API response shapes.",
        ],
        steps: [
          "Create a class annotated with @RestController.",
          "Add a @GetMapping method for one resource path such as /api/projects.",
          "Delegate the operation to a service rather than putting complex rules in the controller.",
          "Run the application and call the endpoint with a browser, curl, or an API client.",
          "Check both the response body and its HTTP status code.",
        ],
        exampleTitle: "A validated read endpoint",
        filename: "GreetingController.java",
        language: "Java",
        code: `import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {
    @GetMapping("/api/greeting")
    public String greeting(@RequestParam String name) {
        return "Hello, " + name + "!";
    }
}`,
      },
      {
        title: "Persistence and transactions",
        explanation:
          "Spring Data can provide repository implementations for common database operations. A service typically coordinates repository calls and business rules. A transaction groups related database changes so they commit or roll back together. Keep transaction boundaries around a use case and be aware that transaction annotations generally rely on Spring-managed proxies, so self-invocation may not behave as expected.",
        points: [
          "Use repositories to abstract persistence operations, not to hide important business decisions.",
          "Place @Transactional on a service operation that represents a coherent unit of work.",
          "Avoid returning lazy persistence entities from controllers without controlling serialization and fetch behavior.",
        ],
        steps: [
          "Create a JPA entity for the data that must be stored.",
          "Create a repository interface extending JpaRepository.",
          "Inject the repository into a service and use it for data access.",
          "Add a transaction around a service use case when several writes must succeed together.",
          "Inspect generated SQL and test the behavior against a real or containerized database.",
        ],
        exampleTitle: "A repository-backed service",
        filename: "ProjectService.java",
        language: "Java",
        code: `import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projects;

    public ProjectService(ProjectRepository projects) {
        this.projects = projects;
    }

    @Transactional(readOnly = true)
    public List<Project> findAll() {
        return projects.findAll();
    }
}`,
      },
      {
        title: "Validation and error handling",
        explanation:
          "Validation rejects invalid input close to the boundary, before it causes confusing failures deeper in the application. Bean Validation annotations describe constraints on DTO fields and @Valid activates them for a request. Centralized exception handling with @RestControllerAdvice can translate validation and expected domain failures into consistent HTTP responses. Return useful client errors without exposing stack traces or implementation details.",
        points: [
          "Use constraints such as @NotBlank and @Size on request DTO fields.",
          "Map expected errors to suitable status codes and avoid exposing stack traces to clients.",
          "Use a consistent error response shape so clients can handle failures predictably.",
        ],
        steps: [
          "Add spring-boot-starter-validation to the project.",
          "Put validation constraints on request DTO fields.",
          "Add @Valid to the controller's request body parameter.",
          "Try both valid and invalid input and confirm invalid data is rejected.",
          "Use @RestControllerAdvice to standardize error responses across endpoints.",
        ],
        exampleTitle: "Validate a request DTO",
        filename: "CreateProjectRequest.java",
        language: "Java",
        code: `import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateProjectRequest(
    @NotBlank
    @Size(max = 100)
    String name
) {}`,
      },
      {
        title: "DTOs and API contract design",
        explanation:
          "A Data Transfer Object (DTO) defines data exchanged across the HTTP boundary. Request DTOs describe what clients may send; response DTOs describe what the API promises to return. DTOs keep database entities private, prevent accidental exposure of internal fields, and allow the API contract to evolve independently from persistence. Use separate DTOs when create, update, and response rules differ.",
        points: [
          "Do not bind incoming JSON directly to a JPA entity.",
          "Return only the fields clients need; never expose password hashes or internal secrets.",
          "Use explicit mapping code or a mapper library when conversion becomes repetitive.",
        ],
        steps: [
          "Write down the request fields the endpoint should accept.",
          "Create a request DTO containing only those fields.",
          "Validate the DTO at the controller boundary.",
          "Pass the validated values to a service operation.",
          "Map the result to a response DTO and test the public JSON shape.",
        ],
        exampleTitle: "Separate request and response data",
        filename: "ProjectDtos.java",
        language: "Java",
        code: `public record CreateProjectRequest(String name) {}

public record ProjectResponse(Long id, String name) {}

// Keep the persistence entity internal to the application.`,
      },
      {
        title: "External configuration and profiles",
        explanation:
          "Externalized configuration keeps environment-specific values out of Java source code. application.properties or application.yml provides defaults, which can be overridden with environment variables or command-line arguments. Profiles support deliberate differences such as local, test, and production settings. Never commit passwords, tokens, or signing keys; supply secrets through a protected environment or a secret manager.",
        points: [
          "Use properties or YAML for non-secret defaults and environment variables for deployment-specific values.",
          "Use profiles sparingly for real environment differences, not as a reason to duplicate all settings.",
          "Use @ConfigurationProperties for groups of related, typed settings.",
        ],
        steps: [
          "Move a setting such as the server port into application.properties.",
          "Run the application with the default and verify that it takes effect.",
          "Override the value with an environment variable.",
          "Create a profile only when an environment needs different behavior.",
          "Keep secrets out of source control and avoid logging them.",
        ],
        exampleTitle: "Safe configuration defaults",
        filename: "application.properties",
        language: "Properties",
        code: `server.port=8080
spring.application.name=catalog-api

# Set credentials through protected environment variables,
# not by committing passwords in this file.`,
      },
      {
        title: "Spring Security and authorization",
        explanation:
          "Spring Security protects application requests through a filter chain. Authentication establishes who the caller is; authorization decides what that caller may do. Begin with explicit public and authenticated route rules, then add a supported login or token flow. Passwords must be stored as strong hashes, and authorization should check permissions or resource ownership—not merely whether a user is logged in. JWT is one possible token format, not a complete security strategy by itself.",
        points: [
          "Require authentication by default and explicitly permit only intended public endpoints.",
          "Hash passwords with a suitable PasswordEncoder; never store or log plaintext passwords.",
          "Keep token signing keys secret and validate signature, expiry, and intended token use.",
          "CORS and CSRF address different browser risks; configure them based on the client and authentication design.",
        ],
        steps: [
          "Add spring-boot-starter-security and observe its default protection.",
          "Define a SecurityFilterChain with explicit public and authenticated routes.",
          "Configure a PasswordEncoder and hash passwords before storing them.",
          "Add role- or ownership-based authorization to protected operations.",
          "Test anonymous, authenticated, forbidden, and expired-credential cases.",
        ],
        exampleTitle: "A clear route authorization starting point",
        filename: "SecurityConfig.java",
        language: "Java",
        code: `@Bean
SecurityFilterChain securityFilterChain(HttpSecurity http)
        throws Exception {
    return http
        .authorizeHttpRequests(authorize -> authorize
            .requestMatchers("/api/health").permitAll()
            .anyRequest().authenticated()
        )
        .build();
}`,
      },
      {
        title: "Testing services, APIs, and persistence",
        explanation:
          "Tests verify behavior at different boundaries. Unit tests check business rules without starting Spring. MVC tests check route mapping, validation, status codes, and JSON. Repository tests verify database queries, and integration tests verify that components work together. Choose the smallest test that proves a behavior, and test failure cases as deliberately as successful cases.",
        points: [
          "Keep most business logic tests fast and independent of Spring.",
          "Use MockMvc for focused MVC/controller tests and repository tests for persistence behavior.",
          "Use a real or containerized database when database-specific behavior matters.",
        ],
        steps: [
          "Write a unit test for a service rule and cover success and invalid input.",
          "Write an MVC test that checks an endpoint's status and response JSON.",
          "Add repository tests for custom queries or relationships.",
          "Run ./mvnw test and fix failures before adding more features.",
          "Add integration tests for critical workflows that cross several layers.",
        ],
        exampleTitle: "A simple service unit test",
        filename: "GreetingServiceTest.java",
        language: "Java",
        code: `import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class GreetingServiceTest {
    @Test
    void greetsByName() {
        var service = new GreetingService();
        assertEquals("Hello, Sam!", service.greet("Sam"));
    }
}`,
      },
      {
        title: "Pagination, sorting, and API evolution",
        explanation:
          "Once an endpoint returns collections, it should avoid loading and returning an unlimited number of rows. Pagination bounds each response; sorting and filtering let clients request useful subsets. Spring Data provides Pageable and Page for many repository queries. API versioning is a compatibility decision: prefer evolving a stable contract carefully, and introduce explicit versions when clients need incompatible changes.",
        points: [
          "Set a reasonable maximum page size to prevent expensive requests.",
          "Use stable sorting, ideally with a unique tie-breaker, so records do not jump unpredictably between pages.",
          "Return pagination metadata when clients need to navigate through results.",
        ],
        steps: [
          "Change a collection endpoint to accept page and size parameters.",
          "Validate the requested size and cap it at a safe maximum.",
          "Pass a Pageable to the repository instead of loading every row.",
          "Return the page content and useful metadata.",
          "Add tests for empty results, the last page, ordering, and invalid page sizes.",
        ],
        exampleTitle: "A pageable repository method",
        filename: "ProjectRepository.java",
        language: "Java",
        code: `import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository
        extends JpaRepository<Project, Long> {
    Page<Project> findByOwnerId(Long ownerId, Pageable pageable);
}`,
      },
      {
        title: "Caching, async work, and scheduling",
        explanation:
          "Caching can reduce repeated expensive work, but only when the application can define how cached values become stale or are invalidated. Asynchronous tasks and scheduled jobs move appropriate work away from the request path or run it on a schedule. These features require thought about failures, duplicate execution, thread pools, and observability; do not make a task asynchronous merely to hide slow work.",
        points: [
          "Measure a bottleneck before introducing caching or background execution.",
          "Define cache keys, expiry, and invalidation whenever underlying data changes.",
          "Make background jobs safe to retry and monitor their failures.",
        ],
        steps: [
          "Identify a repeatable, expensive operation and measure its current cost.",
          "For caching, choose a cache key and decide when that entry expires or is evicted.",
          "For async or scheduled work, define retry and duplicate-execution behavior.",
          "Configure a bounded executor or scheduler appropriate to the workload.",
          "Test failures and expose logs/metrics so operations can see whether the work completed.",
        ],
        exampleTitle: "A scheduled task outline",
        filename: "CleanupJob.java",
        language: "Java",
        code: `import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class CleanupJob {
    @Scheduled(cron = "0 0 * * * *")
    public void runHourlyCleanup() {
        // Perform a bounded, repeatable cleanup operation.
    }
}`,
      },
      {
        title: "Events, messaging, and resilience",
        explanation:
          "Application events decouple components inside one process; a message broker communicates across processes and can buffer work while consumers are unavailable. Distributed communication can fail or be delayed, so design for timeouts, retries with limits, idempotency, and observable failures. A retry is not automatically safe: repeating a non-idempotent operation can create duplicate charges or records.",
        points: [
          "Use an in-process event for local decoupling and a broker when independent services need durable communication.",
          "Set timeouts and bound retries; avoid retrying permanent failures indefinitely.",
          "Make message handlers idempotent and consider dead-letter handling for messages that cannot be processed.",
        ],
        steps: [
          "Identify what must happen synchronously and what can happen later.",
          "Start with a simple application event for in-process communication.",
          "Use a broker only when durable cross-process delivery is a real requirement.",
          "Define message identity, retry limits, timeout behavior, and duplicate handling.",
          "Test a broker outage and ensure failed work can be observed and recovered.",
        ],
        exampleTitle: "Publish an in-process application event",
        filename: "ProjectCreatedEvent.java",
        language: "Java",
        code: `public record ProjectCreatedEvent(Long projectId) {}

// Publish from a service after the project is created:
// events.publishEvent(new ProjectCreatedEvent(project.getId()));

// A listener can react to the event:
// @EventListener
// void onProjectCreated(ProjectCreatedEvent event) { ... }`,
      },
      {
        title: "Logging, Actuator, and health checks",
        explanation:
          "Operational visibility helps you know whether an application is running and why it failed. Use a logger with appropriate levels and useful context; do not print secrets, passwords, or tokens. Spring Boot Actuator provides health, metrics, and other management endpoints. Expose only what operators need and secure detailed management information because it can reveal internal application state.",
        points: [
          "Use a logger rather than System.out in application code.",
          "Include useful identifiers and exception details, but exclude credentials and sensitive personal data.",
          "Expose and secure health and metrics endpoints intentionally.",
        ],
        steps: [
          "Add spring-boot-starter-actuator.",
          "Expose the health endpoint and check it locally.",
          "Configure database health reporting if the service depends on a database.",
          "Add useful logs around important operations and unexpected failures.",
          "Secure management endpoints and expose only the information required by operations.",
        ],
        exampleTitle: "Expose a limited health endpoint",
        filename: "application.properties",
        language: "Properties",
        code: `management.endpoints.web.exposure.include=health,info
management.endpoint.health.show-details=when_authorized`,
      },
      {
        title: "Packaging and deployment",
        explanation:
          "Spring Boot can package an application and its runtime dependencies into an executable JAR. A reliable deployment uses a repeatable build, the correct Java runtime, external configuration, secure secrets, health checks, and a database migration plan. Containers can make environments consistent, but they do not replace backups, monitoring, access control, or careful release practices.",
        points: [
          "Test and deploy the same built artifact rather than rebuilding differently in production.",
          "Supply deployment values through environment configuration or a secrets manager.",
          "Plan database migrations, health checks, logs, resource limits, and rollback before release.",
        ],
        steps: [
          "Run the test suite and package with ./mvnw clean package.",
          "Run the generated JAR locally with java -jar.",
          "Supply database and secret configuration outside the artifact.",
          "Deploy to a test environment and verify health and a real API request.",
          "Promote the tested artifact and monitor logs and metrics after release.",
        ],
        exampleTitle: "Build and run an executable JAR",
        filename: "terminal",
        language: "Shell",
        code: `./mvnw clean package
java -jar target/catalog-api-1.0.0.jar`,
      },
    ],
  },
  {
    label: "MySQL",
    path: "/learn/mysql",
    icon: Database,
    description: "Store and query relational data with SQL.",
    intro:
      "MySQL is a relational database management system. Data is organized into tables with defined columns and constraints, and SQL is used to create, read, update, and delete records. Good schema design represents relationships clearly, protects data integrity, and adds indexes to support measured query patterns.",
    concepts: [
      {
        title: "Tables, columns, and data types",
        explanation:
          "A table represents a kind of entity, and each row is one record. Choose a column type that matches the domain and range of values: integers for counts and identifiers, date/time types for dates, and bounded character types for short text. Avoid storing unrelated values in one column. Explicit nullability and defaults document which data is required.",
        points: [
          "Choose the smallest suitable type that can represent valid domain values.",
          "Use NOT NULL when a value is required and a deliberate default when appropriate.",
          "Store timestamps consistently and document whether values are in UTC.",
        ],
        exampleTitle: "Define a projects table",
        filename: "schema.sql",
        language: "SQL",
        code: `CREATE TABLE projects (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);`,
      },
      {
        title: "Keys and relationships",
        explanation:
          "A primary key uniquely identifies each row. A foreign key references a key in another table and lets the database enforce a relationship. One-to-many relationships usually store the parent key on the child row; many-to-many relationships use a join table. Constraints prevent dangling references and communicate the intended data model to application developers.",
        points: [
          "Give each table a primary key with stable identity.",
          "Use foreign keys to enforce valid references between related tables.",
          "Choose delete/update behavior deliberately; cascading deletes can remove more data than expected.",
        ],
        exampleTitle: "Relate projects to their owners",
        filename: "relationships.sql",
        language: "SQL",
        code: `CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(80) NOT NULL UNIQUE
);

ALTER TABLE projects
  ADD COLUMN owner_id BIGINT NOT NULL,
  ADD CONSTRAINT fk_projects_owner
    FOREIGN KEY (owner_id) REFERENCES users(id);`,
      },
      {
        title: "Queries, filters, and joins",
        explanation:
          "SELECT retrieves rows and columns. WHERE filters rows before results are returned, ORDER BY defines stable ordering, and LIMIT can bound a result set. JOIN combines related rows using a condition, commonly a primary/foreign-key pair. Select only needed columns and use parameters from application code rather than concatenating user input into SQL.",
        points: [
          "Use explicit column lists instead of SELECT * in application queries.",
          "Use INNER JOIN when matching rows are required and LEFT JOIN when unmatched left-side rows should remain.",
          "Always parameterize values supplied by users to prevent SQL injection.",
        ],
        exampleTitle: "List projects and their owners",
        filename: "queries.sql",
        language: "SQL",
        code: `SELECT p.id, p.name, u.username
FROM projects AS p
JOIN users AS u ON u.id = p.owner_id
WHERE p.created_at >= ?
ORDER BY p.created_at DESC
LIMIT 25;`,
      },
      {
        title: "Indexes and query performance",
        explanation:
          "An index helps MySQL find rows without scanning an entire table, but it consumes storage and adds work to inserts, updates, and deletes. Index columns that support frequent filters, joins, or sorting after examining actual query patterns. Composite index column order matters: a multi-column index is most useful when queries filter or sort by its leftmost columns. Use EXPLAIN to inspect how a query is executed.",
        points: [
          "Index primary and foreign keys appropriately and measure before adding extra indexes.",
          "Avoid wrapping indexed columns in functions when a range comparison can express the same filter.",
          "Use EXPLAIN and realistic data to confirm a performance improvement.",
        ],
        exampleTitle: "Index a frequent filter",
        filename: "indexes.sql",
        language: "SQL",
        code: `CREATE INDEX idx_projects_owner_created
  ON projects (owner_id, created_at);

EXPLAIN
SELECT id, name, created_at
FROM projects
WHERE owner_id = ?
ORDER BY created_at DESC
LIMIT 20;`,
      },
      {
        title: "Transactions and safe changes",
        explanation:
          "A transaction groups statements into one logical operation. COMMIT makes the changes durable, while ROLLBACK undoes changes since the transaction began. Transactions help preserve invariants when several writes must succeed together. Keep them focused and short to reduce lock contention. For schema changes, use controlled migrations so application versions and database structure remain reproducible.",
        points: [
          "Use a transaction when a business operation requires multiple writes to succeed together.",
          "Handle errors by rolling back rather than leaving partial changes.",
          "Use versioned migrations and test them against a representative database.",
        ],
        exampleTitle: "Create related records atomically",
        filename: "transaction.sql",
        language: "SQL",
        code: `START TRANSACTION;

INSERT INTO orders (customer_id, status)
VALUES (?, 'pending');

SET @order_id = LAST_INSERT_ID();
INSERT INTO order_items (order_id, product_id, quantity)
VALUES (@order_id, ?, ?);

COMMIT;
-- On an error, the application should issue ROLLBACK.`,
      },
    ],
  },
];
