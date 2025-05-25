export function toJSON(data, status = 200, resType) {
  // @ts-ignore
  let body = JSON.stringify(data, null, 2);
  let headers = {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,DELETE,PATCH,PUT,HEAD,POST,OPTIONS",
    "Access-Control-Expose-Headers": "*",
    "Content-Range": `${resType} 0-20/20`,
  };
  return new Response(body, { headers, status });
}
