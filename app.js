// Kolkata Metro & Smart Travel Guide - Complete Interactive Logic (2026 Updated)

document.addEventListener('DOMContentLoaded', () => {
  // Initialize elements
  const upTimerEl = document.getElementById('up-timer');
  const downTimerEl = document.getElementById('down-timer');
  const upETAEl = document.getElementById('up-eta');
  const downETAEl = document.getElementById('down-eta');

  const gateTabs = document.querySelectorAll('.gate-tab');
  const gateDetails = document.getElementById('gate-details');
  const busRoutesEl = document.getElementById('bus-routes');

  const fromInput = document.getElementById('from-station');
  const toInput = document.getElementById('to-station');
  const swapBtn = document.getElementById('swap-stations');
  const searchBtn = document.getElementById('search-btn');

  const fromSuggestions = document.getElementById('from-suggestions');
  const toSuggestions = document.getElementById('to-suggestions');

  const premiumBanner = document.getElementById('premium-banner');
  const premiumBadge = document.getElementById('premium-badge');
  const premiumActiveBanner = document.getElementById('premium-active-banner');
  const payBtn = document.getElementById('pay-btn');
  const paymentModal = document.getElementById('payment-modal');
  const closePaymentBtn = document.getElementById('close-payment');
  const confirmPaymentBtn = document.getElementById('confirm-payment');
  const paymentTimerEl = document.getElementById('payment-timer');

  const savedRoutesContainer = document.getElementById('saved-routes-container');
  const savedRoutesList = document.getElementById('saved-routes-list');
  const saveRouteBtn = document.getElementById('save-current-route-btn');
  const searchResultCard = document.getElementById('search-result-card');
  const searchResultText = document.getElementById('search-result-text');

  // Station Data for Esplanade Exit Gates
  const gateData = {
    '1': {
      bengali: 'ゲート ১: এসপ্ল্যানেড বাস টার্মিনাস ও কার্জন পার্ক',
      english: 'Gate 1: Esplanade Bus Terminus & Curzon Park',
      description: 'কলকাতা ট্রাম ডিপো ও প্রধান দূরপাল্লার বাস স্ট্যান্ডের সবচেয়ে কাছে।',
      buses: ['8B', 'AC-9', '12C', '205', 'KB16', 'SD26', 'VS12']
    },
    '2': {
      bengali: 'গেট ২: নিউ মার্কেট ও ধর্মতলা ক্রসিং',
      english: 'Gate 2: New Market & Dharmatala Crossing',
      description: 'বিখ্যাত নিউ মার্কেট শপিং এলাকা, শ্রী সিনেমা ও শ্রীরাম আর্কেডের ঠিক বিপরীতে।',
      buses: ['4C', '24A', '78', 'AC-39', '234', 'E4']
    },
    '3': {
      bengali: 'গেট ৩: ময়দান ও কে.সি. দাস সুইটস',
      english: 'Gate 3: Maidan & K.C. Das Sweets',
      description: 'এসপ্ল্যানেড মেট্রো ভবনের দিকে এবং ময়দান মাঠের উত্তর-পূর্ব গেট।',
      buses: ['3C/1', '17', '39', 'AC-50', '201']
    },
    '4': {
      bengali: 'গেট ৪: ভারতীয় সংগ্রহালয় (ইন্ডিয়ান মিউজিয়াম)',
      english: 'Gate 4: Indian Museum & Park Street Direction',
      description: 'জওহরলাল নেহেরু রোড ধরে একটু এগোলেই ইন্ডিয়ান মিউজিয়াম এবং পার্ক স্ট্রিট সংযোগকারী টানেল।',
      buses: ['12C/1', '45', '71', 'AC-1', '223', 'V9']
    }
  };

  // 🚇 Complete Kolkata Metro Stations List (Differentiating confusing Dum Dum stations)
  const stations = [
    { bn: 'দক্ষিণেশ্বর', en: 'Dakshineswar' },
    { bn: 'বরাহনগর', en: 'Baranagar' },
    { bn: 'নোয়াপাড়া', en: 'Noapara' },
    { bn: 'দমদম জংশন (মেট্রো ও রেল)', en: 'Dum Dum Junction (Metro & Rail)' },
    { bn: 'দমদম ক্যান্টনমেন্ট (রেল স্টেশন)', en: 'Dum Dum Cantt. (Railway Station)' },
    { bn: 'নেতাজি সুভাষচন্দ্র বসু আন্তর্জাতিক বিমানবন্দর', en: 'Kolkata Airport (CCU / Dum Dum Airport)' },
    { bn: 'বেলগাছিয়া', en: 'Belgachia' },
    { bn: 'শ্যামবাজার', en: 'Shyambazar' },
    { bn: '쇼ভাবাজার সুতানুটি', en: 'Shovabazar Sutanuti' },
    { bn: 'গিরিশ পার্ক', en: 'Girish Park' },
    { bn: 'মহাত্মা গান্ধী রোড', en: 'Mahatma Gandhi Road' },
    { bn: 'সেন্ট্রাল', en: 'Central' },
    { bn: 'চাঁদনী চক', en: 'Chandni Chowk' },
    { bn: 'এসপ্ল্যানেড', en: 'Esplanade' },
    { bn: 'পার্ক স্ট্রিট', en: 'Park Street' },
    { bn: 'ময়দান', en: 'Maidan' },
    { bn: 'রবীন্দ্র সদন', en: 'Rabindra Sadan' },
    { bn: 'নেতাজি ভবন', en: 'Netaji Bhavan' },
    { bn: 'যতীন দাস পার্ক', en: 'Jatin Das Park' },
    { bn: 'কালীঘাট', en: 'Kalighat' },
    { bn: 'রবীন্দ্র সরোবর', en: 'Rabindra Sarobar' },
    { bn: 'মহানায়ক উত্তম কুমার', en: 'Mahanayak Uttam Kumar' },
    { bn: 'নেতাজি', en: 'Netaji' },
    { bn: 'মাষ্টারদা সূর্য সেন', en: 'Masterda Surya Sen' },
    { bn: 'গীতাঞ্জলি', en: 'Gitanjali' },
    { bn: 'কবি নজরুল', en: 'Kavi Nazrul' },
    { bn: 'শহিদ ক্ষুদিরাম', en: 'Shahid Khudiram' },
    { bn: 'কবি সুভাষ', en: 'Kavi Subhash' },
    { bn: 'হাওড়া ময়দান', en: 'Howrah Maidan' },
    { bn: 'হাওড়া', en: 'Howrah' },
    { bn: 'মহাকরণ', en: 'Mahakaran' },
    { bn: 'শিয়ালদহ', en: 'Sealdah' },
    { bn: 'ফুলবাগান', en: 'Phoolbagan' },
    { bn: 'সল্টলেক স্টেডিয়াম', en: 'Salt Lake Stadium' },
    { bn: 'বেঙ্গল কেমিক্যালস', en: 'Bengal Chemicals' },
    { bn: 'সিটি সেন্টার', en: 'City Centre' },
    { bn: 'করুণাময়ী', en: 'Karunamoyee' },
    { bn: 'সল্টলেক সেক্টর ৫', en: 'Salt Lake Sector V' }
  ];

  // 1. Live Countdown Timers for Metro
  let upTimeRemaining = 312; // 5 mins 12 seconds
  let downTimeRemaining = 165; // 2 mins 45 seconds
  let modalTimer; // Global definition inside DOMContentLoaded scope

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function formatETA(seconds) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + seconds);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
  }

  function startTimers() {
    setInterval(() => {
      if (downTimeRemaining > 0) {
        downTimeRemaining--;
      } else {
        downTimeRemaining = Math.floor(Math.random() * 240) + 120;
        showToast('ডাউন ট্রেন স্টেশনে প্রবেশ করছে (Down train arriving)', 'blue');
      }
      if (downTimerEl) {
        downTimerEl.innerText = formatTime(downTimeRemaining);
        downETAEl.innerText = `ETA: ${formatETA(downTimeRemaining)}`;
      }

      if (upTimeRemaining > 0) {
        upTimeRemaining--;
      } else {
        upTimeRemaining = Math.floor(Math.random() * 240) + 180;
        showToast('আপ ট্রেন স্টেশনে প্রবেশ করছে (Up train arriving)', 'amber');
      }
      if (upTimerEl) {
        upTimerEl.innerText = formatTime(upTimeRemaining);
        upETAEl.innerText = `ETA: ${formatETA(upTimeRemaining)}`;
      }
    }, 1000);
  }

  // 2. Interactive Gate Selection & Bus Routes
  function selectGate(gateNo) {
    gateTabs.forEach(tab => {
      if (tab.dataset.gate === gateNo) {
        tab.classList.remove('bg-gray-100', 'text-gray-700');
        tab.classList.add('bg-transitBlue', 'text-white');
      } else {
        tab.classList.remove('bg-transitBlue', 'text-white');
        tab.classList.add('bg-gray-100', 'text-gray-700');
      }
    });

    const info = gateData[gateNo];
    if (info && gateDetails && busRoutesEl) {
      gateDetails.innerHTML = `
        <h4 class="font-bold text-transitBlue text-lg mb-1">${info.bengali}</h4>
        <p class="text-xs text-gray-500 font-medium italic mb-2">${info.english}</p>
        <p class="text-sm text-gray-700">${info.description}</p>
      `;

      busRoutesEl.innerHTML = info.buses.map(bus => `
        <span class="inline-flex items-center gap-1 bg-yellow-100 text-yellow-900 font-semibold px-3 py-1.5 rounded-lg border border-yellow-300 text-sm hover:scale-105 transition-transform cursor-pointer">
          <i data-lucide="bus" class="w-4 h-4 text-transitBlue"></i>
          <span>${bus}</span>
        </span>
      `).join('');

      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  }

  gateTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      selectGate(tab.dataset.gate);
    });
  });

  selectGate('1');

  // 3. Search suggestions
  function showSuggestions(input, element, targetInput) {
    input.addEventListener('focus', () => {
      renderSuggestions(input.value, element, targetInput);
    });

    input.addEventListener('input', () => {
      renderSuggestions(input.value, element, targetInput);
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !element.contains(e.target)) {
        element.classList.add('hidden');
      }
    });
  }

  function renderSuggestions(query, element, input) {
    const filtered = stations.filter(station =>
      station.bn.includes(query) || station.en.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      element.classList.add('hidden');
      return;
    }

    element.innerHTML = filtered.map(station => `
      <div class="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex justify-between items-center transition-colors">
        <div class="flex items-center gap-2">
          <i data-lucide="map-pin" class="w-4 h-4 text-transitBlue-light"></i>
          <div>
            <p class="font-semibold text-gray-800 text-sm">${station.bn}</p>
            <p class="text-xs text-gray-400">${station.en}</p>
          </div>
        </div>
        <span class="text-xs bg-blue-50 text-transitBlue px-2 py-0.5 rounded-full font-semibold border border-blue-100">Transit</span>
      </div>
    `).join('');

    element.classList.remove('hidden');
    if (window.lucide) {
      window.lucide.createIcons();
    }

    const items = element.querySelectorAll('.cursor-pointer');
    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        input.value = `${filtered[index].bn} (${filtered[index].en})`;
        element.classList.add('hidden');
      });
    });
  }

  showSuggestions(fromInput, fromSuggestions, fromInput);
  showSuggestions(toInput, toSuggestions, toInput);

  swapBtn.addEventListener('click', () => {
    const temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;
    swapBtn.classList.add('rotate-180');
    setTimeout(() => swapBtn.classList.remove('rotate-180'), 300);
  });

  // 4. Premium Mode Setup (Local Storage)
  let isPremium = localStorage.getItem('isPremium') === 'true';

  function updatePremiumUI() {
    if (isPremium) {
      if (premiumBanner) premiumBanner.classList.add('hidden');
      if (premiumActiveBanner) premiumActiveBanner.classList.remove('hidden');
      if (premiumBadge) premiumBadge.classList.remove('hidden');
      if (savedRoutesContainer) savedRoutesContainer.classList.remove('hidden');
      renderSavedRoutes();
    } else {
      if (premiumBanner) premiumBanner.classList.remove('hidden');
      if (premiumActiveBanner) premiumActiveBanner.classList.add('hidden');
      if (premiumBadge) premiumBadge.classList.add('hidden');
      if (savedRoutesContainer) savedRoutesContainer.classList.add('hidden');
    }
  }

  // 🔒 Search Action with Paywall Gate Logic
  searchBtn.addEventListener('click', () => {
    const fromVal = fromInput.value.trim();
    const toVal = toInput.value.trim();

    if (!fromVal || !toVal) {
      showToast('দয়া করে প্রস্থান ও গন্তব্য স্টেশন নির্বাচন করুন (Please fill both stations)', 'amber');
      return;
    }

    // 🔒 Paywall Check: If not premium, automatically trigger QR payment modal
    if (!isPremium) {
      showToast('🔒 রুট ডিটেইলস দেখতে মাত্র ২ টাকা পেমেন্ট করুন (৬ মাস ফ্রি)', 'amber');
      payBtn.click();
      return;
    }

    // ✅ If premium, show dynamic route calculations
    searchBtn.disabled = true;
    searchBtn.innerHTML = `<span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></span> অনুসন্ধান করা হচ্ছে...`;

    setTimeout(() => {
      searchBtn.disabled = false;
      searchBtn.innerHTML = `<i data-lucide="search" class="w-5 h-5"></i> <span>রুট খুঁজুন (Search Route)</span>`;
      if (window.lucide) window.lucide.createIcons();

      // Custom Mapping Logic for Dum Dum confusing transit points
      const isFromAirport = fromVal.includes('বিমানবন্দর') || fromVal.includes('Airport');
      const isToAirport = toVal.includes('বিমানবন্দর') || toVal.includes('Airport');
      const isFromCantt = fromVal.includes('ক্যান্টনমেন্ট') || fromVal.includes('Cantt');
      const isToCantt = toVal.includes('ক্যান্টনমেন্ট') || toVal.includes('Cantt');
      const isFromDumDumMetro = fromVal.includes('দমদম জংশন') || fromVal.includes('Dum Dum Junction');
      const isToDumDumMetro = toVal.includes('দমদম জংশন') || toVal.includes('Dum Dum Junction');

      let resultHTML = "";

      // Smart Conditional Transit Output
      if ((isFromDumDumMetro && isToAirport) || (isFromAirport && isToDumDumMetro)) {
        resultHTML = `
          <div class="space-y-3 text-left">
            <p class="font-bold text-amber-600 border-b pb-2"><i data-lucide="alert-circle" class="inline w-4 h-4 mr-1"></i> কানেক্টিং বাস/অটো রুট গাইড:</p>
            <p class="text-sm text-gray-700">দমদম মেট্রো জংশন থেকে সরাসরি এয়ারপোর্টের কোনো মেট্রো রুট বর্তমানে সচল নেই।</p>
            <div class="bg-gray-50 p-3 rounded-xl border space-y-1.5 text-xs text-gray-600">
              <p>🚌 <b>বিকল্প মাধ্যম:</b> দমদম মেট্রো গেটের বাইরে থেকে যশোর রোড হয়ে অটো বা ডিরেক্ট বাস (Bus No. 30B, 218) ধরুন।</p>
              <p>📍 <b>দূরত্ব:</b> ৬.৫ কিমি (6.5 KM)</p>
              <p>⏱️ <b>আনুমানিক সময়:</b> ২০ মিনিট</p>
              <p>💰 <b>আনুমানিক অটো ভাড়া:</b> ₹২০ - ₹৩০</p>
            </div>
          </div>`;
      } else if ((isFromDumDumMetro && isToCantt) || (isFromCantt && isToDumDumMetro)) {
        resultHTML = `
          <div class="space-y-3 text-left">
            <p class="font-bold text-amber-600 border-b pb-2"><i data-lucide="alert-circle" class="inline w-4 h-4 mr-1"></i> লোকাল ট্রেন/অটো কানেকশন:</p>
            <p class="text-sm text-gray-700">দমদম জংশন রেল স্টেশন থেকে ক্যান্টনমেন্টের দূরত্ব মাত্র ১টি স্টেশন দূরে।</p>
            <div class="bg-gray-50 p-3 rounded-xl border space-y-1.5 text-xs text-gray-600">
              <p>🚂 <b>বিকল্প মাধ্যম:</b> দমদম রেলওয়ে জংশনের ৪ বা ৫ নম্বর প্ল্যাটফর্ম থেকে শিয়ালদহ-বনগাঁ লোকাল ট্রেন অথবা বাইরে থেকে অটো ব্যবহার করুন।</p>
              <p>📍 <b>দূরত্ব:</b> ২.৮ কিমি (2.8 KM)</p>
              <p>⏱️ <b>আনুমানিক সময়:</b> ১০ মিনিট</p>
            </div>
          </div>`;
      } else if ((isFromCantt && isToAirport) || (isFromAirport && isToCantt)) {
        resultHTML = `
          <div class="space-y-3 text-left">
            <p class="font-bold text-amber-600 border-b pb-2"><i data-lucide="alert-circle" class="inline w-4 h-4 mr-1"></i> ডিরেক্ট যশোর রোড কানেক্টিভিটি:</p>
            <div class="bg-gray-50 p-3 rounded-xl border space-y-1.5 text-xs text-gray-600">
              <p>🛺 <b>বিকল্প মাধ্যম:</b> যশোর রোড ক্রসিং থেকে সরাসরি বিমানবন্দর যাওয়ার অটো বা বাস পেয়ে যাবেন।</p>
              <p>📍 <b>দূরত্ব:</b> ৪.২ কিমি (4.2 KM)</p>
              <p>⏱️ <b>আনুমানিক সময়:</b> ১৫ মিনিট</p>
            </div>
          </div>`;
      } else {
        // Standard Running Metro dynamic calculations (Mock calculation based on string lengths as dummy index mapping)
        const totalStations = Math.abs((fromVal.length + 3) - toVal.length) + 2;
        let fare = 20;
        if (totalStations <= 2) fare = 5;
        else if (totalStations <= 5) fare = 10;
        else if (totalStations <= 12) fare = 15;
        else if (totalStations <= 20) fare = 20;
        else fare = 25;

        const duration = totalStations * 2;

        resultHTML = `
          <div class="space-y-2 text-sm text-left">
            <div class="flex justify-between py-1 border-b border-dashed border-gray-100">
              <span class="text-gray-500">ভাড়া (Fare):</span>
              <span class="font-bold text-green-600">₹${fare}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-dashed border-gray-100">
              <span class="text-gray-500">মোট স্টেশন (Total Stations):</span>
              <span class="font-bold text-gray-800">${totalStations}টি স্টেশন</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-gray-500">সময় লাগবে (Duration):</span>
              <span class="font-bold text-transitBlue">${duration} মিনিট</span>
            </div>
          </div>`;
      }

      // Render the result container beautifully
      searchResultText.innerHTML = `
        <div class="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
          <div class="text-left max-w-[45%]">
            <span class="text-xs font-bold text-transitBlue tracking-wide uppercase">From</span>
            <p class="font-bold text-gray-800 text-sm truncate">${fromVal.split(' (')[0]}</p>
          </div>
          <i data-lucide="arrow-right" class="w-5 h-5 text-gray-400 mx-2 flex-shrink-0"></i>
          <div class="text-right max-w-[45%]">
            <span class="text-xs font-bold text-transitYellow-dark tracking-wide uppercase">To</span>
            <p class="font-bold text-gray-800 text-sm truncate">${toVal.split(' (')[0]}</p>
          </div>
        </div>
        ${resultHTML}
      `;

      searchResultCard.classList.remove('hidden');
      searchResultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      if (window.lucide) window.lucide.createIcons();
    }, 800);
  });

  // Dynamic QR Generation & Live Handshake
  payBtn.addEventListener('click', () => {
    const myUPI = "8910376844.etb@icici"; // Keeping your exact verified UPI ID intact
    const myName = "Kolkata Smart Travel Guide";
    const amount = "2.00";
    const note = "Premium 6 Months Subscription";

    const upiString = `upi://pay?pa=${myUPI}&pn=${encodeURIComponent(myName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

    // Laptop-to-mobile high contrast guaranteed engine
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiString)}`;

    const qrImgEl = document.getElementById('upi-qr-image');
    const payLinkEl = document.getElementById('upi-pay-link');

    if (qrImgEl) qrImgEl.src = qrImageUrl;
    if (payLinkEl) payLinkEl.href = upiString;

    // মোবাইল ডিরেক্ট UPI বাটন সেটআপ
    const mobilePayBtn = document.getElementById('upi-mobile-link');
    if (mobilePayBtn) {
      // ১. বাটনের href-এ সরাসরি ইউপিআই স্ট্রিং সেট করুন
      mobilePayBtn.href = upiString;

      // ২. মোবাইল ব্রাউজারকে বাধ্য করবে এক্সটার্নাল অ্যাপ (GPay/PhonePe) ওপেন করতে
      mobilePayBtn.setAttribute('target', '_blank');
      mobilePayBtn.setAttribute('rel', 'noopener noreferrer');

      // ৩. সেফটি ব্যাকআপ — পুরনো listener থাকলে সরিয়ে নতুন যোগ করুন
      const newBtn = mobilePayBtn.cloneNode(true);
      mobilePayBtn.parentNode.replaceChild(newBtn, mobilePayBtn);
      newBtn.href = upiString;
      newBtn.setAttribute('target', '_blank');
      newBtn.setAttribute('rel', 'noopener noreferrer');
      newBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = upiString;
      });
    }

    paymentModal.classList.remove('hidden');
    paymentModal.classList.add('flex');
    document.body.classList.add('overflow-hidden');

    let timeLeft = 300;
    paymentTimerEl.innerText = `05:00`;
    clearInterval(modalTimer);

    modalTimer = setInterval(() => {
      timeLeft--;
      const m = Math.floor(timeLeft / 60);
      const s = timeLeft % 60;
      paymentTimerEl.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      if (timeLeft <= 0) {
        clearInterval(modalTimer);
        closePaymentModal();
        showToast('পেমেন্ট সময়সীমা শেষ (Payment session expired)', 'amber');
      }
    }, 1000);
  });

  function closePaymentModal() {
    paymentModal.classList.add('hidden');
    paymentModal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    clearInterval(modalTimer);
  }

  closePaymentBtn.addEventListener('click', closePaymentModal);

  confirmPaymentBtn.addEventListener('click', () => {
    confirmPaymentBtn.disabled = true;
    confirmPaymentBtn.innerHTML = `<span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></span> পেমেন্ট প্রসেস হচ্ছে...`;

    setTimeout(() => {
      isPremium = true;
      localStorage.setItem('isPremium', 'true');
      updatePremiumUI();
      closePaymentModal();
      confirmPaymentBtn.disabled = false;
      confirmPaymentBtn.innerHTML = `পেমেন্ট সফল করুন (Simulate Success)`;

      showToast('🎉 অভিনন্দন! প্রিমিয়াম অ্যাক্টিভ হয়েছে (Premium Successfully Activated!)', 'green');

      // Auto-trigger the search button seamlessly right after payment success!
      searchBtn.click();
    }, 1500);
  });

  // 5. Saved Routes
  function getSavedRoutes() {
    const r = localStorage.getItem('savedRoutes');
    return r ? JSON.parse(r) : [];
  }

  function saveRoute(from, to) {
    const routes = getSavedRoutes();
    if (!routes.some(item => item.from === from && item.to === to)) {
      routes.push({ from, to, date: new Date().toLocaleDateString() });
      localStorage.setItem('savedRoutes', JSON.stringify(routes));
      renderSavedRoutes();
      showToast('রুট অফলাইনে সেভ করা হয়েছে (Route saved for offline access!)', 'green');
    } else {
      showToast('রুটটি ইতিমধ্যে সংরক্ষিত আছে (Route already saved)', 'amber');
    }
  }

  function renderSavedRoutes() {
    const routes = getSavedRoutes();
    if (!savedRoutesList) return;

    if (routes.length === 0) {
      savedRoutesList.innerHTML = `
        <div class="text-center py-6 text-gray-400">
          <i data-lucide="bookmark" class="w-8 h-8 mx-auto mb-2 opacity-55"></i>
          <p class="text-sm">কোনো সংরক্ষিত রুট নেই (No saved routes)</p>
        </div>
      `;
    } else {
      savedRoutesList.innerHTML = routes.map((route, idx) => `
        <div class="flex items-center justify-between bg-white border border-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div class="flex-1 min-w-0 pr-2">
            <div class="flex items-center gap-1.5 text-xs text-transitBlue font-semibold mb-1">
              <span class="bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 flex items-center gap-1">
                <i data-lucide="wifi-off" class="w-3 h-3 text-transitBlue"></i> অফলাইন সেভ
              </span>
              <span class="text-gray-400 font-normal">${route.date}</span>
            </div>
            <div class="flex items-center gap-1 text-sm font-bold text-gray-800 truncate">
              <span>${route.from.split(' (')[0]}</span>
              <i data-lucide="arrow-right-left" class="w-3.5 h-3.5 text-gray-400 mx-1"></i>
              <span>${route.to.split(' (')[0]}</span>
            </div>
          </div>
          <button data-index="${idx}" class="delete-route-btn p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `).join('');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }

    const delBtns = savedRoutesList.querySelectorAll('.delete-route-btn');
    delBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.dataset.index);
        deleteRoute(index);
      });
    });
  }

  function deleteRoute(index) {
    const routes = getSavedRoutes();
    routes.splice(index, 1);
    localStorage.setItem('savedRoutes', JSON.stringify(routes));
    renderSavedRoutes();
    showToast('রুট ডিলিট করা হয়েছে (Route deleted)', 'amber');
  }

  if (saveRouteBtn) {
    saveRouteBtn.addEventListener('click', () => {
      const fromVal = fromInput.value.trim();
      const toVal = toInput.value.trim();
      if (fromVal && toVal) {
        saveRoute(fromVal, toVal);
      }
    });
  }

  // Custom Toast Engine
  function showToast(message, type = 'blue') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-24 left-1/2 transform -translate-x-1/2 z-[100] px-4 py-3 rounded-xl text-white font-medium text-sm shadow-xl flex items-center gap-2 transition-all duration-300`;

    let colorClass = 'bg-transitBlue';
    let iconName = 'info';

    if (type === 'amber') {
      colorClass = 'bg-amber-500 border border-amber-600';
      iconName = 'alert-triangle';
    } else if (type === 'green') {
      colorClass = 'bg-emerald-600 border border-emerald-700';
      iconName = 'check-circle';
    } else if (type === 'blue') {
      colorClass = 'bg-transitBlue border border-transitBlue-dark';
    }

    toast.classList.add(...colorClass.split(' '));
    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-4 h-4 flex-shrink-0"></i>
      <span>${message}</span>
    `;

    const container = document.getElementById('mobile-container') || document.body;
    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.classList.add('opacity-0', 'scale-90');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Demo state reset trigger
  const resetPremiumBtn = document.getElementById('reset-premium');
  if (resetPremiumBtn) {
    resetPremiumBtn.addEventListener('click', () => {
      isPremium = false;
      localStorage.removeItem('isPremium');
      localStorage.removeItem('savedRoutes');
      updatePremiumUI();
      if (searchResultCard) searchResultCard.classList.add('hidden');
      showToast('ডেমো রিস্টোর করা হয়েছে (Demo reset successfully)', 'blue');
    });
  }

  // Initialization Run
  updatePremiumUI();
  startTimers();
});


const confirmBtn = document.getElementById('confirm-payment-btn');

if (confirmBtn) {
  confirmBtn.addEventListener('click', function () {
    // বাটনটিকে লোডিং স্টেটে নিয়ে যাওয়া
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = `ভেরিফাই করা হচ্ছে... একটু অপেক্ষা করুন`;
    confirmBtn.style.backgroundColor = '#6b7280'; // Gray color

    // ৩ সেকেন্ড নকল ভেরিফিকেশন টাইমার
    setTimeout(() => {
      // ১. লোকাল স্টোরেজে পেমেন্ট সাকসেস সেভ করা
      localStorage.setItem('metro_app_paid', 'true');

      // ২. পেমেন্ট মোডালটি লুকিয়ে ফেলা (আপনার মোডালের আইডি যদি আলাদা হয় তবে 'payment-modal' এর জায়গায় সেটি দিন)
      const paymentModal = document.getElementById('payment-modal');
      if (paymentModal) {
        paymentModal.classList.add('hidden'); // অথবা paymentModal.style.display = 'none';
      }

      alert('🎉 পেমেন্ট সফলভাবে ভেরিফাই করা হয়েছে! আপনার রুটটি আনলক করা হলো।');


      if (typeof displayRoute === "function") {
        displayRoute();
      } else {
        // যদি আলাদা ফাংশন না থাকে, তবে পেজটি জাস্ট রিলোড করে দিন, কারণ লোকালস্টোরেজ সেভ হয়ে গেছে
        window.location.reload();
      }

      // বাটন আবার আগের মতো করে দেওয়া
      confirmBtn.disabled = false;
      confirmBtn.innerText = "✅ পেমেন্ট সম্পূর্ণ করেছি, রুট আনলক করুন";
      confirmBtn.style.backgroundColor = '#2563eb'; // Blue color

    }, 3000); // ৩ সেকেন্ড টাইমার
  });
}


// ==========================================
// আপনার PWA সার্ভিস ওয়ার্কারের কোডটি একদম শেষে থাকবে
// ==========================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker Registered Successfully!'))
      .catch(err => console.log('Service Worker Registration Failed!', err));
  });
}


// adding serviceWorker file  
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js') // 👈 এখানে শুধু /sw.js করে দিন
      .then(reg => console.log('Service Worker Registered Successfully!'))
      .catch(err => console.log('Service Worker Registration Failed!', err));
  });
}