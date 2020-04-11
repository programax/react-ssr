import express from 'express';
import path from 'path';
import axios from 'axios';
import React from 'react';
import ReactDom from 'react-dom/server';

// import App from '../client/components/app';
import {App} from '../../dist/static/lib';

const app = express();

app.use('/static', express.static(path.join(__dirname, '..', '..', 'dist', 'static')));

app.get('/ssr', async (req, res) => {
    // const response = await axios('http://localhost:4000/items');
    // const items = response.data;
    const root = (
        <html>
            <body>
                <div id="root">
                    <App />
                </div>

                {/* <script
                    dangerouslySetInnerHTML={{
                        __html: `window.__data__ = ${JSON.stringify(items)};`
                    }}
                /> */}
                <script src="/static/bundle.js"></script>
            </body>
        </html>
    );
    const html = ReactDom.renderToString(root);

    res.send(html);
});

app.listen(3000, () => {
    console.log('server started: http://localhost:3000')
});
