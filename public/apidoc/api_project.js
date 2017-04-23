define({
  "name": "API Documentation",
  "description": "",
  "version": "0.0.0",
  "title": "API Documentation",
  "url": "https://api.example.com/v1",
  "header": {
    "title": "Using the API",
    "content": "<section>\n<h1>Using the API</h1>\n<h2><strong>Authentication</strong></h2>\n<p>Many API endpoints require token-based authentication. To authenticate to the API,\nprovide the user's access token in the Authorization header with the following\nformat:</p>\n<pre><code>Bearer [token]\n</code></pre>\n<p>An example Authorization header would be:</p>\n<pre><code>Bearer 58f92e3f735bdf90db440517\n</code></pre>\n<p>If an invalid token is given, you will receive a 401 (Unauthorized) HTTP status\nwith a JSON response containing an error message.</p>\n<h2><strong>Errors</strong></h2>\n<p>All errors will return a 400 (Bad Request) HTTP status and a JSON response\ncontaining an error message. An example error response would be:</p>\n<pre><code class=\"language-json\">{&quot;error&quot;:&quot;Query parameters must be valid JSON.&quot;}\n</code></pre>\n<h2><strong>GET Parameters</strong></h2>\n<p>GET parameters must be valid JSON accessible within the &quot;query&quot; parameter.</p>\n<p>For example, if you are trying to supply the following parameters:</p>\n<pre><code>{\n\t&quot;limit&quot;: 20,\n\t&quot;skip&quot;: 20,\n\t&quot;where&quot;: {\n\t\t&quot;email&quot;: &quot;test@example&quot;\n\t}\n}\n</code></pre>\n<p>The parameters should be condensed into a valid JSON string, such as:</p>\n<pre><code>{&quot;limit&quot;:20,&quot;skip&quot;:20,&quot;where&quot;:{&quot;email&quot;:&quot;test@example&quot;}}\n</code></pre>\n<p>This string should then be URI encoded so special characters are able to be\nincluded in a URL:</p>\n<pre><code>%7B%22limit%22%3A20%2C%22skip%22%3A20%2C%22where%22%3A%7B%22email%22%3A%22test%40example%22%7D%7D\n</code></pre>\n<p>This query should then be appended to the &quot;query&quot; parameter in the URL's GET\nparameters:</p>\n<pre><code>http://www.example.com/v1/users?query=%7B%22limit%22%3A20%2C%22skip%22%3A20%2C%22where%22%3A%7B%22email%22%3A%22test%40example%22%7D%7D\n</code></pre>\n</section>\n"
  },
  "sampleUrl": false,
  "apidoc": "0.2.0",
  "generator": {
    "name": "apidoc",
    "time": "2017-04-23T06:09:20.323Z",
    "url": "http://apidocjs.com",
    "version": "0.16.1"
  }
});
