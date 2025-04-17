async function fetchWikipedia() {
    const searchInput = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('wikiResult');

    if (!searchInput) {
        resultDiv.innerHTML = '<p>Iltimos, izlash uchun so‘z kiriting!</p>';
        resultDiv.style.display = 'block';
        return;
    }

    try {
        const url = `https://uz.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchInput)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.extract) {
            resultDiv.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.extract}</p>
                <a href="${data.content_urls.desktop.page}" target="_blank">To‘liq maqolani o‘qish</a>
            `;
            resultDiv.style.display = 'block';
        } else {
            resultDiv.innerHTML = '<p>Maqola topilmadi. Iltimos, boshqa so‘z kiriting.</p>';
            resultDiv.style.display = 'block';
        }
    } catch (error) {
        resultDiv.innerHTML = '<p>Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.</p>';
        resultDiv.style.display = 'block';
        console.error('Error:', error);
    }
}