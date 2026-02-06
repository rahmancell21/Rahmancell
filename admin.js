function prosesSimpan(total) {
    // Menangkap input detail berdasarkan layanan yang aktif
    let detailTransaksi = "";
    const noInput = document.getElementById('no');
    const idGame = document.getElementById('idg');
    const gameSelect = document.getElementById('game');
    
    if (noInput) {
        detailTransaksi = `No: ${noInput.value}`;
    } else if (idGame) {
        detailTransaksi = `${gameSelect.value} (ID: ${idGame.value})`;
    } else if (currentLayanan === 'KERETA') {
        const jml = document.querySelectorAll('#penumpang-area input').length / 2;
        detailTransaksi = `${jml} Tiket Kereta`;
    }

    const data = {
        waktu: new Date().toLocaleString('id-ID'),
        layanan: currentLayanan,
        detail: detailTransaksi || "Selesai", // Menyimpan detail asli input
        total: total
    };

    let history = JSON.parse(localStorage.getItem('konter_db')) || [];
    history.push(data);
    localStorage.setItem('konter_db', JSON.stringify(history));

    alert("Berhasil! Detail transaksi: " + detailTransaksi);
    renderTable();
    showForm(currentLayanan.toLowerCase()); 
}
