# ShareGPT Formatter for Axolotl

This React application provides a simple UI for creating and exporting chat conversations in ShareGPT format. This is used in [Axolotl](https://github.com/OpenAccess-AI-Collective/axolotl), a tool for fine-tuning LLMs; ShareGPT is the easiest format for multiturn conversation data (see [docs](https://github.com/OpenAccess-AI-Collective/axolotl?tab=readme-ov-file#dataset)).

## Usage

1. Go to the [GitHub Pages](https://endlessreform.github.io/axolotl-sharegpt-converter/) link. 
2. Write your messages. Note that localstorage support isn't implemented yet, so everything will be thrown away on page refresh! (Put in an issue if this is a problem) 
3. Click "Copy JSON" and paste into your dataset `.jsonl` file.

Simple as!

## Relevant Links

- [Axolotl GitHub Repository](https://github.com/OpenAccess-AI-Collective/axolotl)
- [Axolotl Documentation on ShareGPT Format](https://openaccess-ai-collective.github.io/axolotl/docs/dataset-formats/conversation.html#sharegpt)
- [ShareGPT Format Example](https://github.com/lm-sys/FastChat/blob/main/fastchat/conversation.py)

## Developing

This whole UI was generated by Claude 3.5 Sonnet, and uses the exact same UI stack as [Claude Artifacts](https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them) plus Vite to make it work as a standalone site:

- [Vite](https://vitejs.dev) for speed
- TypeScript for sanity
- [Tailwind](https://tailwindcss.com) for style
- [shadcn/ui](https://ui.shadcn.com) for pretty buttons
- File-based routing because ain't nobody got time for that
- My personal Tailwind color scheme and font choices, because I have opinions

## Quick Start

1. Install dependencies (go grab a coffee, it'll take a minute):

   ```
   npm install
   ```

2. Run it:

   ```
   npm run dev
   ```

3. Build for production:

   ```
   npm run build
   ```

4. Deploy:
   - Take the `dist` folder
   - Throw it at a static host (Nginx, Netlify, whatever floats your boat)
   - Profit!

## "But how do I...?"

- Customize theme? `tailwind.config.js` is your friend. (But my color choices are pretty rad, just saying.)
- Add shadcn/ui components? `npx shadcn-ui add <component-name>`. Done.
- Need more? Check out the [Vite docs](https://vitejs.dev/), [Tailwind docs](https://tailwindcss.com/docs), or [shadcn/ui docs](https://ui.shadcn.com/).

## Deployment

This template comes with an easy GitHub Pages deployment setup.

1. Push your changes to GitHub.

2. Run the deployment command:

```
npm run deploy
```

3. Set up GitHub Pages:

- Go to your repository settings
- Navigate to Pages
- Set the source to "gh-pages" branch
- Save

Your site will be live at `https://yourusername.github.io/your-repo-name/`

Note: This setup uses HashRouter, which works out of the box with GitHub Pages. No additional configuration is needed for routing to work correctly.
