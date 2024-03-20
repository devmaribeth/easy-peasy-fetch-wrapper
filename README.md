# easy-peasy-fetch-wrapper

A simple yet powerful wrapper around the Fetch API for easy HTTP requests.

## Installation

```bash
npm install easy-peasy-fetch-wrapper
```

## Usage

```javascript
const EasyPeasyFetchWrapper = require('easy-peasy-fetch-wrapper');

// Initialize with base URL
const fetchWrapper = new EasyPeasyFetchWrapper('https://api.example.com');

// Perform a GET request
fetchWrapper.get('endpoint')
  .then(data => console.log('GET response:', data))
  .catch(error => console.error('GET error:', error));

// Perform a POST request
fetchWrapper.post('endpoint', { key: 'value' })
  .then(data => console.log('POST response:', data))
  .catch(error => console.error('POST error:', error));
```

## API

### `EasyPeasyFetchWrapper(baseUrl [, options])`

Creates a new instance of EasyPeasyFetchWrapper.

- `baseUrl` (string): The base URL for API requests.
- `options` (object, optional): Additional options for configuration.
    - `timeout` (number, default: `5000`): Timeout for requests in milliseconds.
    - `headers` (object, default: `{}`): Custom headers to include in requests.

### `get(endpoint)`

Performs a GET request.

- `endpoint` (string): The endpoint to request.
- Returns: Promise that resolves with the response data or rejects with an error.

### `post(endpoint, data)`

Performs a POST request.

- `endpoint` (string): The endpoint to request.
- `data` (object): The data to send in the request body.
- Returns: Promise that resolves with the response data or rejects with an error.
