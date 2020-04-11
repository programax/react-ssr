import React from 'react';
import ReactDom from 'react-dom/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

import App from '../src/client/components/app';

(async () => {
    const response = await axios('http://localhost:4000/items');
    const items = response.data;
    const root = (
        <html>
            <head></head>
            <body>
                <div id="root"><App items={items} /></div>

                <script src="/static/bundle.js"></script>
            </body>
        </html>
    );
    const html = ReactDom.renderToStaticMarkup(root);
    const staticPath = path.join(__dirname, '..', 'dist', 'static');

    fs.writeFile(path.join(staticPath, 'home.html'), html, (err) => {
        if (err) {
            console.error('[!] something went wrong!');
            throw err;
        }

        console.log('Complete!');
    });
})();
