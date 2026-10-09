/* ============================================================
   DATA STORE
============================================================ */
const MOCK_DB_UNUSED = {
  buildings: [
    { id: 1, code: 'A1', name: 'Nhà A1', floors: 5, status: 'active', address: 'Khu A, Cơ sở 1', note: 'Tòa nhà kỹ thuật' },
    { id: 2, code: 'B2', name: 'Nhà B2', floors: 7, status: 'active', address: 'Khu B, Cơ sở 1', note: 'Tòa nhà khoa học cơ bản' },
    { id: 3, code: 'C3', name: 'Nhà C3', floors: 4, status: 'inactive', address: 'Khu C, Cơ sở 1', note: 'Đang sửa chữa' },
    { id: 4, code: 'D4', name: 'Nhà D4', floors: 6, status: 'active', address: 'Khu D, Cơ sở 2', note: 'Tòa nhà kinh tế' },
    { id: 5, code: 'E5', name: 'Nhà E5', floors: 3, status: 'active', address: 'Khu E, Cơ sở 2', note: 'Phòng thí nghiệm' },
  ],
  rooms: [
    { id: 1, code: 'A101', name: 'Phòng A101', buildingId: 1, floor: 1, capacity: 40, type: 'lecture', status: 'available', equipment: 'Máy chiếu, Điều hoà' },
    { id: 2, code: 'A201', name: 'Phòng A201', buildingId: 1, floor: 2, capacity: 50, type: 'lecture', status: 'in-use', equipment: 'Máy chiếu, Điều hoà, Mic' },
    { id: 3, code: 'A301', name: 'Phòng A301', buildingId: 1, floor: 3, capacity: 30, type: 'seminar', status: 'available', equipment: 'TV, Bảng trắng' },
    { id: 4, code: 'B101', name: 'Phòng B101', buildingId: 2, floor: 1, capacity: 60, type: 'lecture', status: 'available', equipment: 'Máy chiếu, Điều hoà' },
    { id: 5, code: 'B201', name: 'Phòng B201', buildingId: 2, floor: 2, capacity: 80, type: 'lecture', status: 'maintenance', equipment: 'Bảng đen' },
    { id: 6, code: 'B301', name: 'Phòng B301', buildingId: 2, floor: 3, capacity: 25, type: 'lab', status: 'available', equipment: 'Máy tính, Máy chiếu' },
    { id: 7, code: 'D101', name: 'Phòng D101', buildingId: 4, floor: 1, capacity: 120, type: 'auditorium', status: 'available', equipment: 'Âm thanh, Máy chiếu' },
    { id: 8, code: 'D201', name: 'Phòng D201', buildingId: 4, floor: 2, capacity: 45, type: 'lecture', status: 'in-use', equipment: 'Máy chiếu, Điều hoà' },
  ],
  schedules: [
    { id: 1, subject: 'Toán cao cấp', code: 'MATH101', room: 'A101', lecturer: 'TS. Nguyễn Văn A', day: 'Mon', period: '1-3', group: 'K22-01', status: 'active' },
    { id: 2, subject: 'Lập trình Python', code: 'CS201', room: 'B301', lecturer: 'ThS. Trần Thị B', day: 'Mon', period: '4-6', group: 'K22-02', status: 'active' },
    { id: 3, subject: 'Vật lý đại cương', code: 'PHY101', room: 'B101', lecturer: 'TS. Lê Văn C', day: 'Tue', period: '1-3', group: 'K23-01', status: 'active' },
    { id: 4, subject: 'Kinh tế vi mô', code: 'ECO101', room: 'D101', lecturer: 'PGS. Phạm Thị D', day: 'Tue', period: '7-9', group: 'K22-03', status: 'active' },
    { id: 5, subject: 'Cơ sở dữ liệu', code: 'CS301', room: 'B301', lecturer: 'ThS. Trần Thị B', day: 'Wed', period: '4-6', group: 'K21-01', status: 'active' },
    { id: 6, subject: 'Giải tích', code: 'MATH201', room: 'A201', lecturer: 'TS. Nguyễn Văn A', day: 'Wed', period: '1-3', group: 'K23-02', status: 'cancelled' },
    { id: 7, subject: 'Mạng máy tính', code: 'CS401', room: 'B301', lecturer: 'TS. Lê Văn C', day: 'Thu', period: '1-3', group: 'K21-02', status: 'active' },
    { id: 8, subject: 'Quản trị kinh doanh', code: 'BUS201', room: 'D201', lecturer: 'PGS. Phạm Thị D', day: 'Thu', period: '4-6', group: 'K22-04', status: 'active' },
    { id: 9, subject: 'Xác suất thống kê', code: 'MATH301', room: 'B101', lecturer: 'TS. Nguyễn Văn A', day: 'Fri', period: '1-3', group: 'K22-05', status: 'active' },
    { id: 10, subject: 'An toàn thông tin', code: 'CS501', room: 'A101', lecturer: 'ThS. Trần Thị B', day: 'Fri', period: '7-9', group: 'K21-03', status: 'active' },
  ],
};

const DB = { buildings: [], rooms: [], schedules: [] };

function safe(value) {
  return String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function roomFromApi(r) {
  return { ...r, code:safe(r.code), name:safe(r.name), buildingCode:safe(r.buildingCode), buildingName:safe(r.buildingName), type: r.roomType.toLowerCase(), status: r.status.toLowerCase(), floor: '—', equipment: safe(r.description || '—') };
}
function scheduleFromApi(s) {
  const day = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][s.dayOfWeek - 1];
  const period = ({'07:00':'1-3','09:45':'4-6','13:00':'7-9','15:45':'10-12'})[s.startTime.slice(0,5)] || `${s.startTime.slice(0,5)}-${s.endTime.slice(0,5)}`;
  return { ...s, subject: safe(s.subjectName), code: safe(s.classSectionCode), room: safe(s.roomCode), lecturer: safe(s.lecturerName), day, period, group: safe(s.classSectionCode), notes:safe(s.notes), status: 'active' };
}
async function loadAll() {
  const [b, r, s] = await Promise.all([api.list('buildings'), api.list('rooms'), api.list('schedules')]);
  DB.buildings = b.content.map(x => ({ ...x, code:safe(x.code), name:safe(x.name), address:safe(x.address), description:safe(x.description), floors: '—', status: 'active', note: safe(x.description) }));
  DB.rooms = r.content.map(roomFromApi);
  DB.schedules = s.content.map(scheduleFromApi);
}

/* ============================================================
   ROUTER / STATE
============================================================ */
let currentPage = 'dashboard';
let deleteTarget = { entity: null, id: null };

const pages = {
  dashboard: renderDashboard,
  buildings: renderBuildings,
  rooms: renderRooms,
  schedule: renderSchedule,
  reports: renderReports,
  settings: renderSettings,
};

const pageTitles = {
  dashboard: 'Dashboard',
  buildings: 'Quản lý Tòa nhà',
  rooms: 'Quản lý Phòng học',
  schedule: 'Lịch học',
  reports: 'Báo cáo',
  settings: 'Cài đặt',
};

/* ============================================================
   NAV
============================================================ */
function navigate(page) {
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
  document.getElementById('breadcrumb').textContent = pageTitles[page] || page;
  document.getElementById('pageContent').innerHTML = '';
  pages[page]?.();
}

/* ============================================================
   ===  DASHBOARD  ===
============================================================ */
function renderDashboard() {
  const html = `
  <div class="page-header">
    <div>
      <div class="page-title">Xin chào, Admin 👋</div>
      <div class="page-subtitle">Thứ Hai, 28 tháng 9 năm 2026 — Học kỳ I / 2026-2027</div>
    </div>
  </div>

  <!-- QUICK ACTIONS -->
  <div class="quick-actions">
    <a class="quick-btn" onclick="navigate('buildings')">
      <i class="fa-solid fa-building" style="color:var(--primary)"></i>Tòa nhà
    </a>
    <a class="quick-btn" onclick="navigate('rooms')">
      <i class="fa-solid fa-door-open" style="color:var(--success)"></i>Phòng học
    </a>
    <a class="quick-btn" onclick="navigate('schedule')">
      <i class="fa-solid fa-calendar-days" style="color:var(--warning)"></i>Lịch học
    </a>
    <a class="quick-btn" onclick="navigate('reports')">
      <i class="fa-solid fa-chart-bar" style="color:var(--info)"></i>Báo cáo
    </a>
  </div>

  <!-- STAT CARDS -->
  <div class="stat-grid">
    <div class="stat-card">
      <div class="stat-icon blue"><i class="fa-solid fa-building"></i></div>
      <div class="stat-info">
        <div class="stat-value">${DB.buildings.length}</div>
        <div class="stat-label">Tòa nhà</div>
        <span class="stat-delta up"><i class="fa-solid fa-arrow-up"></i>2 tháng này</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon green"><i class="fa-solid fa-door-open"></i></div>
      <div class="stat-info">
        <div class="stat-value">${DB.rooms.length}</div>
        <div class="stat-label">Phòng học</div>
        <span class="stat-delta up"><i class="fa-solid fa-arrow-up"></i>5 mới</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon purple"><i class="fa-solid fa-calendar-check"></i></div>
      <div class="stat-info">
        <div class="stat-value">${DB.schedules.filter(s => s.status === 'active').length}</div>
        <div class="stat-label">Lịch đang hoạt động</div>
        <span class="stat-delta up"><i class="fa-solid fa-arrow-up"></i>Tuần này</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon orange"><i class="fa-solid fa-door-closed"></i></div>
      <div class="stat-info">
        <div class="stat-value">${DB.rooms.filter(r => r.status === 'available').length}</div>
        <div class="stat-label">Phòng trống</div>
        <span class="stat-delta down"><i class="fa-solid fa-arrow-down"></i>Hôm nay</span>
      </div>
    </div>
  </div>

  <!-- MAIN GRID -->
  <div class="dash-grid">
    <!-- Recent schedules -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fa-solid fa-clock-rotate-left"></i>&nbsp;Lịch học hôm nay</div>
        <button class="btn btn-ghost btn-sm" onclick="navigate('schedule')">Xem tất cả</button>
      </div>
      <div class="card-body">
        <div class="recent-list">
          ${DB.schedules.slice(0, 5).map(s => `
          <div class="recent-item">
            <div class="recent-icon ${['blue', 'green', 'purple', 'orange', 'red'][s.id % 5] == 'blue' ? 'blue' : s.id % 5 == 1 ? 'green' : s.id % 5 == 2 ? 'purple' : s.id % 5 == 3 ? 'orange' : 'red'}" style="background:var(--${['info', 'success', 'primary', 'warning', 'danger'][s.id % 5]}-light);color:var(--${['info', 'success', 'primary', 'warning', 'danger'][s.id % 5]})">
              <i class="fa-solid fa-book-open"></i>
            </div>
            <div class="recent-info">
              <div class="recent-name">${s.subject}</div>
              <div class="recent-meta">${s.room} &nbsp;·&nbsp; ${s.lecturer} &nbsp;·&nbsp; Tiết ${s.period}</div>
            </div>
            <span class="status-badge ${s.status === 'active' ? 'badge-success' : 'badge-danger'}">${s.status === 'active' ? 'Đang dạy' : 'Huỷ'}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Room usage -->
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fa-solid fa-chart-pie"></i>&nbsp;Tỷ lệ sử dụng phòng</div>
      </div>
      <div class="card-body">
        <div class="usage-row">
          ${[
      { label: 'Phòng đang dùng', pct: Math.round(DB.rooms.filter(r => r.status === 'in-use').length / DB.rooms.length * 100), color: '#4f46e5' },
      { label: 'Phòng trống', pct: Math.round(DB.rooms.filter(r => r.status === 'available').length / DB.rooms.length * 100), color: '#10b981' },
      { label: 'Bảo trì', pct: Math.round(DB.rooms.filter(r => r.status === 'maintenance').length / DB.rooms.length * 100), color: '#f59e0b' },
      { label: 'A1 – Tầng lấp đầy', pct: 82, color: '#3b82f6' },
      { label: 'B2 – Tầng lấp đầy', pct: 65, color: '#8b5cf6' },
    ].map(u => `
          <div class="usage-item">
            <div class="usage-header">
              <span class="usage-label">${u.label}</span>
              <span class="usage-pct">${u.pct}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${u.pct}%;background:${u.color}"></div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
  `;
  document.getElementById('pageContent').innerHTML = html;
}

/* ============================================================
   ===  BUILDINGS PAGE  ===
============================================================ */
let buildingSearch = '', buildingStatus = 'all', buildingPage = 1;
const BLDG_PER_PAGE = 5;

function renderBuildings() {
  const content = document.getElementById('pageContent');

  const filtered = DB.buildings.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(buildingSearch) || b.code.toLowerCase().includes(buildingSearch);
    const matchStatus = buildingStatus === 'all' || b.status === buildingStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / BLDG_PER_PAGE));
  buildingPage = Math.min(buildingPage, totalPages);
  const paginated = filtered.slice((buildingPage - 1) * BLDG_PER_PAGE, buildingPage * BLDG_PER_PAGE);

  content.innerHTML = `
  <div class="page-header">
    <div>
      <div class="page-title">Quản lý Tòa nhà</div>
      <div class="page-subtitle">Tổng cộng ${DB.buildings.length} tòa nhà</div>
    </div>
    <button class="btn btn-primary" onclick="openBuildingForm()">
      <i class="fa-solid fa-plus"></i> Thêm tòa nhà
    </button>
  </div>

  <div class="card">
    <div class="card-header">
      <div class="toolbar">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Tìm kiếm tòa nhà..." value="${buildingSearch}"
            oninput="buildingSearch=this.value.toLowerCase();buildingPage=1;renderBuildings()">
        </div>
        <select class="filter-select" onchange="buildingStatus=this.value;buildingPage=1;renderBuildings()">
          <option value="all" ${buildingStatus === 'all' ? 'selected' : ''}>Tất cả trạng thái</option>
          <option value="active"   ${buildingStatus === 'active' ? 'selected' : ''}>Đang hoạt động</option>
          <option value="inactive" ${buildingStatus === 'inactive' ? 'selected' : ''}>Ngừng hoạt động</option>
        </select>
      </div>
      <span class="page-subtitle">${filtered.length} kết quả</span>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã tòa</th>
            <th>Tên tòa nhà</th>
            <th>Số tầng</th>
            <th>Địa chỉ</th>
            <th>Ghi chú</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          ${paginated.length ? paginated.map((b, i) => `
          <tr>
            <td>${(buildingPage - 1) * BLDG_PER_PAGE + i + 1}</td>
            <td><strong>${b.code}</strong></td>
            <td>${b.name}</td>
            <td>${b.floors}</td>
            <td>${b.address}</td>
            <td>${b.note}</td>
            <td><span class="status-badge ${b.status === 'active' ? 'badge-success' : 'badge-danger'}">${b.status === 'active' ? 'Hoạt động' : 'Ngừng'}</span></td>
            <td>
              <div class="action-btns">
                <button class="btn-icon btn-edit" title="Sửa" onclick="openBuildingForm(${b.id})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn-icon btn-delete" title="Xóa" onclick="openDelete('buildings',${b.id})"><i class="fa-solid fa-trash"></i></button>
              </div>
            </td>
          </tr>`).join('') : '<tr><td colspan="8" class="empty-state"><i class="fa-solid fa-building-circle-exclamation"></i><p>Không tìm thấy tòa nhà nào</p></td></tr>'}
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <div class="pagination-info">Hiển thị ${Math.min((buildingPage - 1) * BLDG_PER_PAGE + 1, filtered.length)}–${Math.min(buildingPage * BLDG_PER_PAGE, filtered.length)} / ${filtered.length}</div>
      <div class="pagination-btns">
        ${renderPagination(totalPages, buildingPage, 'buildingPage', 'renderBuildings')}
      </div>
    </div>
  </div>`;
}

function openBuildingForm(id = null) {
  const b = id ? DB.buildings.find(x => x.id === id) : null;
  document.getElementById('modalTitle').textContent = b ? 'Chỉnh sửa Tòa nhà' : 'Thêm Tòa nhà mới';
  document.getElementById('modalBody').innerHTML = `
    <form class="form-grid" id="buildingForm" onsubmit="saveBuildingForm(event,${id})">
      <div class="form-group">
        <label class="form-label">Mã tòa *</label>
        <input class="form-control" name="code" required value="${b?.code || ''}" placeholder="VD: A1">
      </div>
      <div class="form-group">
        <label class="form-label">Tên tòa nhà *</label>
        <input class="form-control" name="name" required value="${b?.name || ''}" placeholder="VD: Nhà A1">
      </div>
      <div class="form-group">
        <label class="form-label">Số tầng *</label>
        <input class="form-control" type="number" name="floors" required value="${b?.floors || ''}" min="1" max="50">
      </div>
      <div class="form-group">
        <label class="form-label">Trạng thái</label>
        <select class="form-control" name="status">
          <option value="active"   ${b?.status === 'active' ? 'selected' : ''}>Hoạt động</option>
          <option value="inactive" ${b?.status === 'inactive' ? 'selected' : ''}>Ngừng hoạt động</option>
        </select>
      </div>
      <div class="form-group form-full">
        <label class="form-label">Địa chỉ</label>
        <input class="form-control" name="address" value="${b?.address || ''}" placeholder="Vị trí tòa nhà">
      </div>
      <div class="form-group form-full">
        <label class="form-label">Ghi chú</label>
        <textarea class="form-control" name="note" placeholder="Ghi chú thêm...">${b?.note || ''}</textarea>
      </div>
      <div class="form-actions form-full">
        <button type="button" class="btn btn-ghost" onclick="closeModal('formModal')">Hủy</button>
        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Lưu</button>
      </div>
    </form>`;
  openModal('formModal');
}

async function saveBuildingForm(e, id) {
  e.preventDefault();
  const f = new FormData(e.target);
  const payload = { code: f.get('code'), name: f.get('name'), address: f.get('address'), description: f.get('note') };
  try { await (id ? api.update('buildings', id, payload) : api.create('buildings', payload)); await loadAll(); closeModal('formModal'); renderBuildings(); showToast('Lưu tòa nhà thành công!', 'success'); } catch (err) { showToast(err.message, 'error'); }
  return;
  const data = { code: f.get('code'), name: f.get('name'), floors: +f.get('floors'), status: f.get('status'), address: f.get('address'), note: f.get('note') };
  if (id) {
    const idx = DB.buildings.findIndex(x => x.id === id);
    DB.buildings[idx] = { ...DB.buildings[idx], ...data };
    showToast('Cập nhật tòa nhà thành công!', 'success');
  } else {
    DB.buildings.push({ id: nextId.buildings++, ...data });
    showToast('Thêm tòa nhà thành công!', 'success');
  }
  closeModal('formModal');
  renderBuildings();
}

/* ============================================================
   ===  ROOMS PAGE  ===
============================================================ */
let roomSearch = '', roomStatus = 'all', roomType = 'all', roomBuilding = 'all', roomPage = 1;
const ROOM_PER_PAGE = 6;

function renderRooms() {
  const content = document.getElementById('pageContent');

  const filtered = DB.rooms.filter(r => {
    const matchSearch = r.code.toLowerCase().includes(roomSearch) || r.name.toLowerCase().includes(roomSearch);
    const matchStatus = roomStatus === 'all' || r.status === roomStatus;
    const matchType = roomType === 'all' || r.type === roomType;
    const matchBuilding = roomBuilding === 'all' || r.buildingId === +roomBuilding;
    return matchSearch && matchStatus && matchType && matchBuilding;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROOM_PER_PAGE));
  roomPage = Math.min(roomPage, totalPages);
  const paginated = filtered.slice((roomPage - 1) * ROOM_PER_PAGE, roomPage * ROOM_PER_PAGE);

  const statusMap = { available: 'badge-success', 'in-use': 'badge-info', maintenance: 'badge-warning' };
  const statusLabel = { available: 'Trống', 'in-use': 'Đang dùng', maintenance: 'Bảo trì' };
  const typeLabel = { lecture: 'Giảng đường', seminar: 'Hội thảo', lab: 'Thực hành', auditorium: 'Hội trường' };

  content.innerHTML = `
  <div class="page-header">
    <div>
      <div class="page-title">Quản lý Phòng học</div>
      <div class="page-subtitle">Tổng cộng ${DB.rooms.length} phòng học</div>
    </div>
    <button class="btn btn-primary" onclick="openRoomForm()">
      <i class="fa-solid fa-plus"></i> Thêm phòng
    </button>
  </div>

  <div class="card">
    <div class="card-header">
      <div class="toolbar">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Tìm mã hoặc tên phòng..." value="${roomSearch}"
            oninput="roomSearch=this.value.toLowerCase();roomPage=1;renderRooms()">
        </div>
        <select class="filter-select" onchange="roomBuilding=this.value;roomPage=1;renderRooms()">
          <option value="all">Tất cả tòa nhà</option>
          ${DB.buildings.map(b => `<option value="${b.id}" ${roomBuilding == b.id ? 'selected' : ''}>${b.name}</option>`).join('')}
        </select>
        <select class="filter-select" onchange="roomType=this.value;roomPage=1;renderRooms()">
          <option value="all">Tất cả loại</option>
          <option value="lecture"    ${roomType === 'lecture' ? 'selected' : ''}>Giảng đường</option>
          <option value="seminar"    ${roomType === 'seminar' ? 'selected' : ''}>Hội thảo</option>
          <option value="lab"        ${roomType === 'lab' ? 'selected' : ''}>Thực hành</option>
          <option value="auditorium" ${roomType === 'auditorium' ? 'selected' : ''}>Hội trường</option>
        </select>
        <select class="filter-select" onchange="roomStatus=this.value;roomPage=1;renderRooms()">
          <option value="all">Tất cả trạng thái</option>
          <option value="available"   ${roomStatus === 'available' ? 'selected' : ''}>Trống</option>
          <option value="in-use"      ${roomStatus === 'in-use' ? 'selected' : ''}>Đang dùng</option>
          <option value="maintenance" ${roomStatus === 'maintenance' ? 'selected' : ''}>Bảo trì</option>
        </select>
      </div>
      <span class="page-subtitle">${filtered.length} kết quả</span>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã phòng</th>
            <th>Tên phòng</th>
            <th>Tòa nhà</th>
            <th>Tầng</th>
            <th>Sức chứa</th>
            <th>Loại</th>
            <th>Thiết bị</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          ${paginated.length ? paginated.map((r, i) => {
    const bldg = DB.buildings.find(b => b.id === r.buildingId);
    return `
          <tr>
            <td>${(roomPage - 1) * ROOM_PER_PAGE + i + 1}</td>
            <td><strong>${r.code}</strong></td>
            <td>${r.name}</td>
            <td>${bldg?.name || '—'}</td>
            <td>Tầng ${r.floor}</td>
            <td><i class="fa-solid fa-users" style="color:var(--gray-400)"></i> ${r.capacity}</td>
            <td>${typeLabel[r.type] || r.type}</td>
            <td><small style="color:var(--gray-500)">${r.equipment}</small></td>
            <td><span class="status-badge ${statusMap[r.status] || 'badge-info'}">${statusLabel[r.status] || r.status}</span></td>
            <td>
              <div class="action-btns">
                <button class="btn-icon btn-edit" title="Sửa" onclick="openRoomForm(${r.id})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn-icon btn-delete" title="Xóa" onclick="openDelete('rooms',${r.id})"><i class="fa-solid fa-trash"></i></button>
              </div>
            </td>
          </tr>`;
  }).join('') : '<tr><td colspan="10"><div class="empty-state"><i class="fa-solid fa-door-closed"></i><p>Không có phòng nào</p></div></td></tr>'}
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <div class="pagination-info">Hiển thị ${Math.min((roomPage - 1) * ROOM_PER_PAGE + 1, filtered.length)}–${Math.min(roomPage * ROOM_PER_PAGE, filtered.length)} / ${filtered.length}</div>
      <div class="pagination-btns">${renderPagination(totalPages, roomPage, 'roomPage', 'renderRooms')}</div>
    </div>
  </div>`;
}

function openRoomForm(id = null) {
  const r = id ? DB.rooms.find(x => x.id === id) : null;
  document.getElementById('modalTitle').textContent = r ? 'Chỉnh sửa Phòng học' : 'Thêm Phòng học mới';
  document.getElementById('modalBody').innerHTML = `
    <form class="form-grid" id="roomForm" onsubmit="saveRoomForm(event,${id})">
      <div class="form-group">
        <label class="form-label">Mã phòng *</label>
        <input class="form-control" name="code" required value="${r?.code || ''}" placeholder="VD: A101">
      </div>
      <div class="form-group">
        <label class="form-label">Tên phòng *</label>
        <input class="form-control" name="name" required value="${r?.name || ''}" placeholder="VD: Phòng A101">
      </div>
      <div class="form-group">
        <label class="form-label">Tòa nhà *</label>
        <select class="form-control" name="buildingId" required>
          <option value="">-- Chọn tòa nhà --</option>
          ${DB.buildings.map(b => `<option value="${b.id}" ${r?.buildingId === b.id ? 'selected' : ''}>${b.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Tầng *</label>
        <input class="form-control" type="number" name="floor" required value="${r?.floor || 1}" min="1" max="50">
      </div>
      <div class="form-group">
        <label class="form-label">Sức chứa *</label>
        <input class="form-control" type="number" name="capacity" required value="${r?.capacity || 40}" min="1" max="500">
      </div>
      <div class="form-group">
        <label class="form-label">Loại phòng</label>
        <select class="form-control" name="type">
          <option value="lecture"    ${r?.type === 'lecture' ? 'selected' : ''}>Giảng đường</option>
          <option value="seminar"    ${r?.type === 'seminar' ? 'selected' : ''}>Hội thảo</option>
          <option value="lab"        ${r?.type === 'lab' ? 'selected' : ''}>Thực hành</option>
          <option value="auditorium" ${r?.type === 'auditorium' ? 'selected' : ''}>Hội trường</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Trạng thái</label>
        <select class="form-control" name="status">
          <option value="available"   ${r?.status === 'available' ? 'selected' : ''}>Trống</option>
          <option value="in-use"      ${r?.status === 'in-use' ? 'selected' : ''}>Đang dùng</option>
          <option value="maintenance" ${r?.status === 'maintenance' ? 'selected' : ''}>Bảo trì</option>
        </select>
      </div>
      <div class="form-group form-full">
        <label class="form-label">Thiết bị</label>
        <input class="form-control" name="equipment" value="${r?.equipment || ''}" placeholder="VD: Máy chiếu, Điều hoà">
      </div>
      <div class="form-actions form-full">
        <button type="button" class="btn btn-ghost" onclick="closeModal('formModal')">Hủy</button>
        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Lưu</button>
      </div>
    </form>`;
  openModal('formModal');
}

async function saveRoomForm(e, id) {
  e.preventDefault();
  const f = new FormData(e.target);
  const payload = { code: f.get('code'), name: f.get('name'), buildingId: +f.get('buildingId'), capacity: +f.get('capacity'), roomType: f.get('type').toUpperCase(), status: f.get('status') === 'in-use' ? 'AVAILABLE' : f.get('status').toUpperCase(), description: f.get('equipment') };
  try { await (id ? api.update('rooms', id, payload) : api.create('rooms', payload)); await loadAll(); closeModal('formModal'); renderRooms(); showToast('Lưu phòng học thành công!', 'success'); } catch (err) { showToast(err.message, 'error'); }
  return;
  const data = {
    code: f.get('code'), name: f.get('name'),
    buildingId: +f.get('buildingId'), floor: +f.get('floor'),
    capacity: +f.get('capacity'), type: f.get('type'),
    status: f.get('status'), equipment: f.get('equipment')
  };
  if (id) {
    const idx = DB.rooms.findIndex(x => x.id === id);
    DB.rooms[idx] = { ...DB.rooms[idx], ...data };
    showToast('Cập nhật phòng thành công!', 'success');
  } else {
    DB.rooms.push({ id: nextId.rooms++, ...data });
    showToast('Thêm phòng học thành công!', 'success');
  }
  closeModal('formModal');
  renderRooms();
}

/* ============================================================
   ===  SCHEDULE PAGE  ===
============================================================ */
let schedSearch = '', schedDay = 'all', schedPage = 1;
const SCHED_PER_PAGE = 7;

const dayNames = { Mon: 'Thứ 2', Tue: 'Thứ 3', Wed: 'Thứ 4', Thu: 'Thứ 5', Fri: 'Thứ 6', Sat: 'Thứ 7', Sun: 'Chủ nhật' };
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const periods = [
  { id: '1-3', label: 'Tiết 1–3', time: '07:00–09:30' },
  { id: '4-6', label: 'Tiết 4–6', time: '09:45–12:15' },
  { id: '7-9', label: 'Tiết 7–9', time: '13:00–15:30' },
  { id: '10-12', label: 'Tiết 10–12', time: '15:45–18:15' },
];
const cellColors = ['cell-blue', 'cell-green', 'cell-purple', 'cell-orange', 'cell-red'];

function renderSchedule() {
  const content = document.getElementById('pageContent');

  // Build schedule grid data
  const grid = {};
  periods.forEach(p => {
    grid[p.id] = {};
    days.forEach(d => { grid[p.id][d] = []; });
  });
  DB.schedules.forEach(s => {
    if (grid[s.period]?.[s.day]) grid[s.period][s.day].push(s);
  });

  // Table view filtered
  const filtered = DB.schedules.filter(s => {
    const matchSearch = s.subject.toLowerCase().includes(schedSearch) || s.code.toLowerCase().includes(schedSearch) || s.room.toLowerCase().includes(schedSearch);
    const matchDay = schedDay === 'all' || s.day === schedDay;
    return matchSearch && matchDay;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / SCHED_PER_PAGE));
  schedPage = Math.min(schedPage, totalPages);
  const paginated = filtered.slice((schedPage - 1) * SCHED_PER_PAGE, schedPage * SCHED_PER_PAGE);

  content.innerHTML = `
  <div class="page-header">
    <div>
      <div class="page-title">Lịch học</div>
      <div class="page-subtitle">Học kỳ I – 2026/2027</div>
    </div>
    <button class="btn btn-primary" onclick="openScheduleForm()">
      <i class="fa-solid fa-plus"></i> Thêm lịch
    </button>
  </div>

  <!-- TIMETABLE VIEW -->
  <div class="card" style="margin-bottom:20px">
    <div class="card-header">
      <div class="card-title"><i class="fa-regular fa-calendar-week"></i>&nbsp;Thời khoá biểu tuần</div>
    </div>
    <div class="card-body" style="padding:0">
      <div class="schedule-grid">
        <table class="schedule-table">
          <thead>
            <tr>
              <th>Tiết / Buổi</th>
              ${days.map(d => `<th>${dayNames[d]}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${periods.map(p => `
            <tr>
              <td class="time-col">
                <div style="font-size:12px;font-weight:700">${p.label}</div>
                <div style="font-size:10px;opacity:.7">${p.time}</div>
              </td>
              ${days.map(d => {
    const cells = grid[p.id][d];
    if (!cells.length) return `<td style="background:var(--gray-50)"></td>`;
    return `<td>${cells.map((s, i) => `
                  <div class="schedule-cell ${cellColors[s.id % 5]}" onclick="openScheduleForm(${s.id})">
                    <div class="cell-subject">${s.subject}</div>
                    <div class="cell-room"><i class="fa-solid fa-location-dot"></i> ${s.room}</div>
                    <div class="cell-room">${s.group}</div>
                  </div>`).join('')}</td>`;
  }).join('')}
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- LIST VIEW -->
  <div class="card">
    <div class="card-header">
      <div class="card-title"><i class="fa-solid fa-list"></i>&nbsp;Danh sách lịch học</div>
      <div class="toolbar">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Tìm môn, phòng, mã..." value="${schedSearch}"
            oninput="schedSearch=this.value.toLowerCase();schedPage=1;renderSchedule()">
        </div>
        <select class="filter-select" onchange="schedDay=this.value;schedPage=1;renderSchedule()">
          <option value="all">Tất cả ngày</option>
          ${days.map(d => `<option value="${d}" ${schedDay === d ? 'selected' : ''}>${dayNames[d]}</option>`).join('')}
        </select>
      </div>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã môn</th>
            <th>Tên môn học</th>
            <th>Phòng</th>
            <th>Giảng viên</th>
            <th>Thứ</th>
            <th>Tiết</th>
            <th>Nhóm</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          ${paginated.map((s, i) => `
          <tr>
            <td>${(schedPage - 1) * SCHED_PER_PAGE + i + 1}</td>
            <td><strong>${s.code}</strong></td>
            <td>${s.subject}</td>
            <td><span style="font-weight:600;color:var(--primary)">${s.room}</span></td>
            <td>${s.lecturer}</td>
            <td>${dayNames[s.day] || s.day}</td>
            <td>Tiết ${s.period}</td>
            <td>${s.group}</td>
            <td><span class="status-badge ${s.status === 'active' ? 'badge-success' : 'badge-danger'}">${s.status === 'active' ? 'Đang dạy' : 'Đã huỷ'}</span></td>
            <td>
              <div class="action-btns">
                <button class="btn-icon btn-edit" onclick="openScheduleForm(${s.id})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn-icon btn-delete" onclick="openDelete('schedules',${s.id})"><i class="fa-solid fa-trash"></i></button>
              </div>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <div class="pagination-info">Hiển thị ${Math.min((schedPage - 1) * SCHED_PER_PAGE + 1, filtered.length)}–${Math.min(schedPage * SCHED_PER_PAGE, filtered.length)} / ${filtered.length}</div>
      <div class="pagination-btns">${renderPagination(totalPages, schedPage, 'schedPage', 'renderSchedule')}</div>
    </div>
  </div>`;
}

function openScheduleForm(id = null) {
  const s = id ? DB.schedules.find(x => x.id === id) : null;
  document.getElementById('modalTitle').textContent = s ? 'Chỉnh sửa lịch học' : 'Thêm lịch học mới';
  document.getElementById('modalBody').innerHTML = `
    <form class="form-grid" onsubmit="saveScheduleForm(event,${id})">
      <div class="form-group">
        <label class="form-label">Mã môn *</label>
        <input class="form-control" name="code" required value="${s?.code || ''}" placeholder="VD: CS201">
      </div>
      <div class="form-group">
        <label class="form-label">Tên môn học *</label>
        <input class="form-control" name="subject" required value="${s?.subject || ''}" placeholder="VD: Lập trình Python">
      </div>
      <div class="form-group">
        <label class="form-label">Phòng học *</label>
        <select class="form-control" name="room" required>
          <option value="">-- Chọn phòng --</option>
          ${DB.rooms.map(r => `<option value="${r.code}" ${s?.room === r.code ? 'selected' : ''}>${r.code} – ${r.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Giảng viên *</label>
        <input class="form-control" name="lecturer" required value="${s?.lecturer || ''}" placeholder="VD: TS. Nguyễn Văn A">
      </div>
      <div class="form-group">
        <label class="form-label">Thứ trong tuần *</label>
        <select class="form-control" name="day" required>
          ${days.map(d => `<option value="${d}" ${s?.day === d ? 'selected' : ''}>${dayNames[d]}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Tiết học *</label>
        <select class="form-control" name="period" required>
          ${periods.map(p => `<option value="${p.id}" ${s?.period === p.id ? 'selected' : ''}>${p.label} (${p.time})</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Nhóm / Lớp</label>
        <input class="form-control" name="group" value="${s?.group || ''}" placeholder="VD: K22-01">
      </div>
      <div class="form-group">
        <label class="form-label">Trạng thái</label>
        <select class="form-control" name="status">
          <option value="active"    ${s?.status === 'active' ? 'selected' : ''}>Đang dạy</option>
          <option value="cancelled" ${s?.status === 'cancelled' ? 'selected' : ''}>Đã huỷ</option>
        </select>
      </div>
      <div class="form-actions form-full">
        <button type="button" class="btn btn-ghost" onclick="closeModal('formModal')">Hủy</button>
        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Lưu</button>
      </div>
    </form>`;
  openModal('formModal');
}

async function saveScheduleForm(e, id) {
  e.preventDefault();
  const f = new FormData(e.target);
  const roomEntity = DB.rooms.find(r => r.code === f.get('room'));
  const selectedTimes = {'1-3':['07:00','09:30'],'4-6':['09:45','12:15'],'7-9':['13:00','15:30'],'10-12':['15:45','18:15']}[f.get('period')];
  const previous = id ? DB.schedules.find(s => s.id === id) : null;
  const payload = { roomId: roomEntity.id, classSectionCode: f.get('group') || f.get('code'), subjectName: f.get('subject'), lecturerName: f.get('lecturer'), dayOfWeek: days.indexOf(f.get('day')) + 1, startTime: selectedTimes[0], endTime: selectedTimes[1], startDate: previous?.startDate || new Date().toISOString().slice(0,10), endDate: previous?.endDate || new Date(Date.now()+12096e5).toISOString().slice(0,10), notes: f.get('code') };
  try { await (id ? api.update('schedules', id, payload) : api.create('schedules', payload)); await loadAll(); closeModal('formModal'); renderSchedule(); showToast('Lưu lịch học thành công!', 'success'); } catch (err) { showToast(err.message, 'error'); }
  return;
  const data = { code: f.get('code'), subject: f.get('subject'), room: f.get('room'), lecturer: f.get('lecturer'), day: f.get('day'), period: f.get('period'), group: f.get('group'), status: f.get('status') };
  if (id) {
    const idx = DB.schedules.findIndex(x => x.id === id);
    DB.schedules[idx] = { ...DB.schedules[idx], ...data };
    showToast('Cập nhật lịch học thành công!', 'success');
  } else {
    DB.schedules.push({ id: nextId.schedules++, ...data });
    showToast('Thêm lịch học thành công!', 'success');
  }
  closeModal('formModal');
  renderSchedule();
}

/* ============================================================
   ===  REPORTS PAGE  ===
============================================================ */
function renderReports() {
  document.getElementById('pageContent').innerHTML = `
  <div class="page-header">
    <div>
      <div class="page-title">Báo cáo thống kê</div>
      <div class="page-subtitle">Học kỳ I – 2026/2027</div>
    </div>
    <button class="btn btn-ghost"><i class="fa-solid fa-download"></i> Xuất Excel</button>
  </div>

  <div class="stat-grid">
    <div class="stat-card">
      <div class="stat-icon blue"><i class="fa-solid fa-percent"></i></div>
      <div class="stat-info">
        <div class="stat-value">76%</div>
        <div class="stat-label">Tỷ lệ sử dụng phòng</div>
        <span class="stat-delta up"><i class="fa-solid fa-arrow-up"></i>+4% so với kỳ trước</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon green"><i class="fa-solid fa-calendar-check"></i></div>
      <div class="stat-info">
        <div class="stat-value">${DB.schedules.length}</div>
        <div class="stat-label">Tổng lịch học</div>
        <span class="stat-delta up"><i class="fa-solid fa-arrow-up"></i>Học kỳ này</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon orange"><i class="fa-solid fa-wrench"></i></div>
      <div class="stat-info">
        <div class="stat-value">${DB.rooms.filter(r => r.status === 'maintenance').length}</div>
        <div class="stat-label">Phòng đang bảo trì</div>
        <span class="stat-delta down"><i class="fa-solid fa-arrow-down"></i>Cần xử lý</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon purple"><i class="fa-solid fa-users"></i></div>
      <div class="stat-info">
        <div class="stat-value">2,840</div>
        <div class="stat-label">Lượt học sinh / tuần</div>
        <span class="stat-delta up"><i class="fa-solid fa-arrow-up"></i>+12% tháng này</span>
      </div>
    </div>
  </div>

  <div class="dash-grid">
    <div class="card">
      <div class="card-header"><div class="card-title">Thống kê phòng theo tòa nhà</div></div>
      <div class="card-body">
        ${DB.buildings.map(b => {
    const roomCount = DB.rooms.filter(r => r.buildingId === b.id).length;
    const inUse = DB.rooms.filter(r => r.buildingId === b.id && r.status === 'in-use').length;
    const pct = roomCount ? Math.round(inUse / roomCount * 100) : 0;
    return `
          <div class="usage-item" style="margin-bottom:16px">
            <div class="usage-header">
              <span class="usage-label">${b.name} <small style="color:var(--gray-400)">(${roomCount} phòng)</small></span>
              <span class="usage-pct">${pct}% đang dùng</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${pct}%;background:var(--primary)"></div>
            </div>
          </div>`;
  }).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-header"><div class="card-title">Phân loại phòng học</div></div>
      <div class="card-body">
        ${[
      { label: 'Giảng đường', key: 'lecture', color: 'var(--primary)' },
      { label: 'Hội thảo', key: 'seminar', color: 'var(--success)' },
      { label: 'Thực hành', key: 'lab', color: 'var(--info)' },
      { label: 'Hội trường', key: 'auditorium', color: 'var(--warning)' },
    ].map(t => {
      const cnt = DB.rooms.filter(r => r.type === t.key).length;
      const pct = Math.round(cnt / DB.rooms.length * 100);
      return `
          <div class="usage-item" style="margin-bottom:16px">
            <div class="usage-header">
              <span class="usage-label">${t.label}</span>
              <span class="usage-pct">${cnt} phòng (${pct}%)</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${pct}%;background:${t.color}"></div>
            </div>
          </div>`;
    }).join('')}
      </div>
    </div>
  </div>`;
}

/* ============================================================
   ===  SETTINGS PAGE  ===
============================================================ */
function renderSettings() {
  document.getElementById('pageContent').innerHTML = `
  <div class="page-header">
    <div><div class="page-title">Cài đặt hệ thống</div></div>
  </div>

  <div class="dash-grid">
    <div class="card">
      <div class="card-header"><div class="card-title">Thông tin trường</div></div>
      <div class="card-body">
        <div class="form-grid">
          <div class="form-group form-full">
            <label class="form-label">Tên trường</label>
            <input class="form-control" value="Trường Đại học Kỹ thuật Công nghệ">
          </div>
          <div class="form-group">
            <label class="form-label">Mã trường</label>
            <input class="form-control" value="HUTECH">
          </div>
          <div class="form-group">
            <label class="form-label">Học kỳ hiện tại</label>
            <select class="form-control">
              <option>Học kỳ I 2026–2027</option>
              <option>Học kỳ II 2025–2026</option>
            </select>
          </div>
          <div class="form-group form-full">
            <label class="form-label">Địa chỉ</label>
            <input class="form-control" value="475A Điện Biên Phủ, Bình Thạnh, TP.HCM">
          </div>
          <div class="form-group form-full">
            <label class="form-label">Email liên hệ</label>
            <input class="form-control" type="email" value="admin@hutech.edu.vn">
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" onclick="showToast('Đã lưu thông tin trường!','success')"><i class="fa-solid fa-floppy-disk"></i> Lưu cài đặt</button>
        </div>
      </div>
    </div>

    <div>
      <div class="card" style="margin-bottom:16px">
        <div class="card-header"><div class="card-title">Tài khoản</div></div>
        <div class="card-body">
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px">
            <div class="user-avatar" style="width:52px;height:52px;font-size:18px">AD</div>
            <div>
              <div style="font-weight:700">Admin</div>
              <div style="font-size:12px;color:var(--gray-500)">admin@hutech.edu.vn</div>
              <span class="status-badge badge-success" style="margin-top:4px">Quản trị viên</span>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" style="width:100%" onclick="showToast('Tính năng đang phát triển','warning')">
            <i class="fa-solid fa-key"></i> Đổi mật khẩu
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title">Thông báo</div></div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:14px">
          ${[
      { label: 'Thông báo email', desc: 'Nhận email khi có thay đổi lịch' },
      { label: 'Thông báo hệ thống', desc: 'Hiện thông báo trong ứng dụng' },
      { label: 'Báo cáo hàng tuần', desc: 'Tóm tắt sử dụng phòng học' },
    ].map((n, i) => `
          <div style="display:flex;align-items:center;justify-content:space-between">
            <div>
              <div style="font-size:13px;font-weight:600">${n.label}</div>
              <div style="font-size:11px;color:var(--gray-500)">${n.desc}</div>
            </div>
            <label class="toggle">
              <input type="checkbox" ${i < 2 ? 'checked' : ''} onchange="showToast('Đã cập nhật cài đặt','success')">
              <span class="toggle-slider"></span>
            </label>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

/* ============================================================
   UTILITIES
============================================================ */
function renderPagination(total, current, varName, fnName) {
  let html = `<button class="page-btn" ${current <= 1 ? 'disabled' : ''} onclick="${varName}=${current - 1};${fnName}()"><i class="fa-solid fa-chevron-left"></i></button>`;
  for (let i = 1; i <= total; i++) {
    if (total <= 7 || i === 1 || i === total || Math.abs(i - current) <= 1) {
      html += `<button class="page-btn ${i === current ? 'active' : ''}" onclick="${varName}=${i};${fnName}()">${i}</button>`;
    } else if (Math.abs(i - current) === 2) {
      html += `<button class="page-btn" disabled>…</button>`;
    }
  }
  html += `<button class="page-btn" ${current >= total ? 'disabled' : ''} onclick="${varName}=${current + 1};${fnName}()"><i class="fa-solid fa-chevron-right"></i></button>`;
  return html;
}

function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function openDelete(entity, id) {
  deleteTarget = { entity, id };
  const names = { buildings: 'tòa nhà', rooms: 'phòng học', schedules: 'lịch học' };
  document.getElementById('deleteMessage').textContent = `Bạn có chắc muốn xóa ${names[entity] || 'mục'} này không? Hành động này không thể hoàn tác.`;
  openModal('deleteModal');
}

async function confirmDeleteAction() {
  const { entity, id } = deleteTarget;
  if (entity && id) {
    try { await api.remove(entity, id); await loadAll(); showToast('Đã xóa thành công!', 'success'); closeModal('deleteModal'); pages[currentPage]?.(); } catch (err) { showToast(err.message, 'error'); closeModal('deleteModal'); }
    return;
    DB[entity] = DB[entity].filter(x => x.id !== id);
    showToast('Đã xóa thành công!', 'success');
    closeModal('deleteModal');
    pages[currentPage]?.();
  }
}

function showToast(message, type = 'info') {
  const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', warning: 'fa-triangle-exclamation', info: 'fa-circle-info' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i><span>${message}</span><button class="toast-close" onclick="this.closest('.toast').remove()"><i class="fa-solid fa-xmark"></i></button>`;
  document.getElementById('toastContainer').appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', async () => {
  // Nav clicks
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      navigate(el.dataset.page);
      // close sidebar on mobile
      if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebarOverlay').classList.remove('open');
      }
    });
  });

  // Toggle sidebar
  document.getElementById('toggleSidebar').addEventListener('click', () => {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('sidebarOverlay');
    if (window.innerWidth < 768) {
      sb.classList.toggle('open');
      ov.classList.toggle('open');
    } else {
      const collapsed = sb.style.width === '0px' || sb.style.transform === 'translateX(-100%)';
      if (collapsed) {
        sb.style.transform = '';
        document.querySelector('.main-wrapper').style.marginLeft = 'var(--sidebar-w)';
      } else {
        sb.style.transform = 'translateX(-100%)';
        document.querySelector('.main-wrapper').style.marginLeft = '0';
      }
    }
  });

  document.getElementById('sidebarOverlay').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('open');
  });

  // Modal close
  document.getElementById('closeFormModal').addEventListener('click', () => closeModal('formModal'));
  document.getElementById('closeDeleteModal').addEventListener('click', () => closeModal('deleteModal'));
  document.getElementById('cancelDelete').addEventListener('click', () => closeModal('deleteModal'));
  document.getElementById('confirmDelete').addEventListener('click', confirmDeleteAction);

  // Close modal on overlay click
  ['formModal', 'deleteModal'].forEach(id => {
    document.getElementById(id).addEventListener('click', e => {
      if (e.target === e.currentTarget) closeModal(id);
    });
  });

  // Boot
  document.getElementById('pageContent').innerHTML = '<div class="empty-state"><i class="fa-solid fa-spinner fa-spin"></i><p>Đang tải dữ liệu...</p></div>';
  try { await loadAll(); navigate('dashboard'); } catch (err) { showToast(`Không thể tải dữ liệu: ${err.message}`, 'error'); document.getElementById('pageContent').innerHTML = '<div class="empty-state"><p>Không thể kết nối máy chủ.</p></div>'; }
});
