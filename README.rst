==============
YouTube client
==============

Simple YouTube web client using ReactJS

Setup development environment
=============================

#. Install `nodejs` (more info on `nodejs.org <https://nodejs.org/en/download/package-manager/>`_)

#. Install dependencies

    .. code-block:: bash

        npm i

#. Create Google API key if you don't have one yet (more info on `developers.google.com <https://developers.google.com/youtube/v3/getting-started>`_)

#. Set up environment variables using given API key and start webpack dev server

    .. code-block:: bash

        GAPI_KEY="your-gapi-key" \
        npm start


   - ``GAPI_KEY`` is set by default but you should use your own for long-term purposes
   - ``LISTEN_HOST`` is ``localhost`` by default
   - ``LISTEN_PORT`` is ``8085`` by default

#. Open http://localhost:8085/ in browser (for default ``LISTEN_HOST`` and ``LISTEN_PORT``)
