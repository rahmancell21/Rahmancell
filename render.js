function renderTable() {
    const history = JSON.parse(localStorage.getItem('konter_db')) || [];
    const tbody = document.querySelector('#dbTable tbody');
    
    let omzet = 0;
    let counts = {};

    // Render baris tabel
    tbody.innerHTML = history.slice().reverse().map(t => {
        omzet += t.total;
        counts[t.layanan] = (counts[t.layanan] || 0) + 1;

        return `
            <tr>
                <td>${t.waktu}</td>
                <td><span class="badge" style="background:#e0e7ff; color:#4338ca">${t.layanan}</span></td>
                <td><strong>${t.detail}</strong></td>
                <td>Rp ${t.total.toLocaleString()}</td>
                <td><span class="badge">SUKSES</span></td>
            </tr>
        `;
    }).join('');

    // Update Statistik Admin
    document.getElementById('total-omzet').innerText = "Rp " + omzet.toLocaleString();
    document.getElementById('total-transaksi').innerText = history.length;
    
    // Cari layanan terlaris
    if (history.length > 0) {
        const top = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        document.getElementById('layanan-populer').innerText = top;
    }
}
