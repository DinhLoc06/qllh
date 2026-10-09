const api = {
  async request(path, options = {}) {
    const response = await fetch(`/api${path}`, { ...options, headers: { "Content-Type": "application/json", ...options.headers } });
    if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body.fields ? Object.values(body.fields).join("; ") : body.message || `HTTP ${response.status}`); }
    return response.status === 204 ? null : response.json();
  },
  list(entity) { return this.request(`/${entity}?size=1000`); },
  create(entity, data) { return this.request(`/${entity}`, { method: "POST", body: JSON.stringify(data) }); },
  update(entity, id, data) { return this.request(`/${entity}/${id}`, { method: "PUT", body: JSON.stringify(data) }); },
  remove(entity, id) { return this.request(`/${entity}/${id}`, { method: "DELETE" }); },
  availableRooms(params) { return this.request(`/rooms/available?${new URLSearchParams(params)}`); },
  weekly(date) { return this.request(`/schedules/weekly${date ? `?date=${date}` : ""}`); }
};
