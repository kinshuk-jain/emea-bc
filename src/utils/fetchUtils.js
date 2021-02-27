export async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.status = response.status;
    error.response = await response.json();
    throw error;
  }
}
