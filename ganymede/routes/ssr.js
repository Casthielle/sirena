/* eslint-disable */
import {Router} from 'express';

const router = new Router();

router.get('/', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossorigin="anonymous"
        />
        <title>Themisto</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
        <div id="modals"></div>
        <!-- <script src="/js/themisto.1206013533a4c8ded6a1.js"></script> -->
        <script src="http://localhost:9000/js/themisto.js"></script>
      </body>
    </html>
  `);
});

export default router;
