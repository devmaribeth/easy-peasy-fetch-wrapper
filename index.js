/**
 * easy-peasy-fetch-wrapper
 * A simple yet powerful wrapper around the Fetch API for easy HTTP requests.
 */

class EasyPeasyFetchWrapper {
  /**
   * Constructor for EasyPeasyFetchWrapper
   * @param {string} baseUrl - The base URL for API requests.
   * @param {object} options - Additional options for configuration.
   */
  constructor(baseUrl, options = {}) {
    this.baseUrl = baseUrl;
    this.timeout = options.timeout || 5000; // Default timeout: 5 seconds
    this.headers = options.headers || {}; // Default headers: none
  }

  /**
   * Perform a GET request.
   * @param {string} endpoint - The endpoint to request.
   * @returns {Promise} A promise that resolves with the response data or rejects with an error.
   */
  async get(endpoint) {
    const requestOptions = {
      method: 'GET',
      headers: this.headers,
      timeout: this.timeout,
    };

    try {
      const response = await this.makeRequest(`${this.baseUrl}/${endpoint}`, requestOptions);
      return response.json();
    } catch (error) {
      console.error("Fetch GET request failed:", error);
      throw error;
    }
  }

  /**
   * Perform a POST request.
   * @param {string} endpoint - The endpoint to request.
   * @param {object} data - The data to send in the request body.
   * @returns {Promise} A promise that resolves with the response data or rejects with an error.
   */
  async post(endpoint, data) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      body: JSON.stringify(data),
      timeout: this.timeout,
    };

    try {
      const response = await this.makeRequest(`${this.baseUrl}/${endpoint}`, requestOptions);
      return response.json();
    } catch (error) {
      console.error("Fetch POST request failed:", error);
      throw error;
    }
  }

  /**
   * Internal method to make HTTP requests.
   * @param {string} url - The URL to request.
   * @param {object} options - Options for the request.
   * @returns {Promise} A promise that resolves with the response or rejects with an error.
   */
  async makeRequest(url, options) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
}

module.exports = EasyPeasyFetchWrapper;
