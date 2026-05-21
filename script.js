// 註冊 Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.log('SW 註冊失敗: ', err);
    });
  });
}

// 香港迪士尼樂園遊樂設施與表演點位的真實 GPS 經緯度座標 [緯度, 經度]
const parkData = [
  // 表演節目
  { id: 's1', type: 'show', title: '森林小天地', location: '魔雪奇緣世界', time: '11:30 - 19:00', desc: '❄️ 與艾莎、安娜及小白互動的沉浸式小劇場。免預約，直接現場排隊即可入場！', icon: 'bx-camera-movie', lat: 22.3130581, lng: 114.0389256, url: 'https://www.hongkongdisneyland.com/zh-hk/entertainment/playhouse-in-the-woods/' },
  { id: 's2', type: 'show', title: '魔海奇緣凱旋慶典', location: '探險世界 - 樂韻藝術廣場', time: '12:30 / 15:00 / 17:00 / 18:20', desc: '🌊 互動式露天劇場表演，敘述莫娜回歸家鄉的冒險旅程，氣氛歡樂。', icon: 'bx-water', lat: 22.3118453, lng: 114.0416398, url: 'https://www.hongkongdisneyland.com/zh-hk/entertainment/moana-a-homecoming-celebration/' },
  { id: 's3', type: 'show', title: 'StellaLou 夢想起舞吧', location: '幻想世界 - 迪士尼故事劇場', time: '12:30 / 13:45 / 16:30 / 17:45 / 19:00', desc: '🩰 與香港芭蕾舞團合作，春季限定演出，人氣極高！建議提早 30-45 分鐘排隊，或購買尊享卡獲取優先入場。', icon: 'bx-star', lat: 22.3140127, lng: 114.0397739, url: 'https://www.hongkongdisneyland.com/zh-hk/entertainment/stellalou-wonderful-wishes-ballet/' },
  { id: 's4', type: 'show', title: '迪士尼好友巡遊派對', location: '美國小鎮大街 / 幻想世界', time: '13:30', desc: '🥳 20週年限定巡遊！迪士尼史上最大規模巡遊，包含 11 輛華麗花車與過百位舞者，還能看到《熊抱青春記》美美等新角色。', icon: 'bx-party', lat: 22.3128615, lng: 114.0427313, url: 'https://www.hongkongdisneyland.com/zh-hk/entertainment/mickeys-storybook-express/' },
  { id: 's5', type: 'show', title: '迪士尼好友Live：城堡派對', location: '奇妙夢想城堡舞台', time: '14:15 / 16:00 / 18:00', desc: '🏰 20週年限定城堡秀！米奇、Duffy 與公主們換上 20 週年華麗禮服登場，有原創舞蹈互動與城堡特效。', icon: 'bx-music', lat: 22.3126336, lng: 114.0410877, url: 'https://www.hongkongdisneyland.com/zh-hk/entertainment/disney-friends-live-party-at-the-castle/' },
  { id: 's6', type: 'show', title: '星夢光影之旅：星空派對', location: '奇妙夢想城堡', time: '20:00', desc: '🎇 20週年特別升級版夜間匯演！結合多媒體投影、水幕、煙花、鐳射及無人機燈光秀，必看！建議於 19:30 前往城堡前方占位。', icon: 'bx-moon', lat: 22.3126336, lng: 114.0410877, url: 'https://www.hongkongdisneyland.com/zh-hk/entertainment/momentous/' },
  
  // 遊樂設施
  { id: 'f1', type: 'facility', title: '魔雪奇幻之旅', location: '魔雪奇緣世界', desc: '室內慢速遊船，結合頂級機械動畫人偶與投影技術，重現電影場景。', icon: 'bx-anchor', lat: 22.3120374, lng: 114.0384689, url: 'https://www.hongkongdisneyland.com/zh-hk/attractions/frozen-ever-after/' },
  { id: 'f2', type: 'facility', title: '迷離大宅', location: '迷離莊園', desc: '室內無軌道電磁車，以平穩節奏穿梭於充滿奇幻光影與實體機關的博物館。', icon: 'bx-ghost', lat: 22.3097164, lng: 114.0409982, url: 'https://www.hongkongdisneyland.com/zh-hk/attractions/mystic-manor/' },
  { id: 'f3', type: 'facility', title: '鐵甲奇俠飛行之旅', location: '明日世界', desc: '3D動感座艙模擬器，提供視覺上的飛行沉浸感，沒有雲霄飛車的劇烈失重感。', icon: 'bx-rocket', lat: 22.3143954, lng: 114.0425424, url: 'https://www.hongkongdisneyland.com/zh-hk/attractions/iron-man-experience/' },
  { id: 'f4', type: 'facility', title: '蟻俠與黃蜂女：擊戰特攻！', location: '明日世界', desc: '室內慢速乘車，配備雷射槍進行即時互動射擊體驗。', icon: 'bx-target-lock', lat: 22.3138904, lng: 114.0426988, url: 'https://www.hongkongdisneyland.com/zh-hk/attractions/ant-man-and-the-wasp-nano-battle/' },
  { id: 'f5', type: 'facility', title: '米奇幻想曲', location: '幻想世界', desc: '室內 4D 劇場，除了 3D 視覺外，還包含水花、風吹與香氣等環境體感特效。', icon: 'bx-glasses', lat: 22.312036, lng: 114.0405773, url: 'https://www.hongkongdisneyland.com/zh-hk/attractions/mickeys-philharmagic/' },
  { id: 'f6', type: 'facility', title: '小熊維尼歷險之旅', location: '幻想世界', desc: '室內慢速乘車，以實體佈景營造走入童話繪本的包覆感。', icon: 'bx-book-heart', lat: 22.3130021, lng: 114.0406946, url: 'https://www.hongkongdisneyland.com/zh-hk/attractions/many-adventures-of-winnie-the-pooh/' },
  { id: 'f7', type: 'facility', title: '森林河流之旅', location: '探險世界', desc: '戶外實地遊船，由船長真人解說，配合水面下軌道觸發的機械動物與水火特效，營造逼真叢林氛圍。', icon: 'bx-map-alt', lat: 22.3109999, lng: 114.040996, url: 'https://www.hongkongdisneyland.com/zh-hk/attractions/jungle-river-cruise/' },
  { id: 'f8', type: 'facility', title: '童話園林', location: '幻想世界', desc: '這是一個隱藏在園區內的微縮造景花園。經典童話故事被製作成了精緻的實體微縮模型。你可以親手操作機關，觸發模型內部的齒輪與實體連動。', icon: 'bx-leaf', lat: 22.3119584, lng: 114.0399312, url: 'https://www.hongkongdisneyland.com/zh-hk/attractions/fairy-tale-forest/' },
  { id: 'f9', type: 'facility', title: '動畫藝術教室', location: '美國小鎮大街', desc: '極具啟發性的室內體驗。專業的迪士尼動畫師一步步示範繪製經典角色，完成的畫作還可以帶回家留作紀念。', icon: 'bx-palette', lat: 22.3134244, lng: 114.0435859, url: 'https://www.hongkongdisneyland.com/zh-hk/attractions/animation-academy/' },
  
  // 迪士尼朋友會面 (NPC)
  { id: 'c1', type: 'character', title: 'Duffy與好友遊玩屋', location: '美國小鎮大街', time: '10:30 - 17:30', desc: '🧸 走進 Duffy 的世界！你可以透過官方 App 領取預約等候卡，與 Duffy、ShellieMay、LinaBell 等超人氣角色擁抱合照。', icon: 'bx-user-pin', lat: 22.313500, lng: 114.043200, url: 'https://www.hongkongdisneyland.com/zh-hk/entertainment/duffy-and-friends-play-house/' },
  { id: 'c2', type: 'character', title: '夢想花園', location: '幻想世界', time: '11:00 - 18:00', desc: '🌸 在優美的花園涼亭中，遇見米奇、米妮、高飛與布魯托等經典迪士尼好朋友！', icon: 'bx-heart', lat: 22.313600, lng: 114.040100, url: 'https://www.hongkongdisneyland.com/zh-hk/entertainment/fantasy-gardens-meet-and-greet/' },
  { id: 'c3', type: 'character', title: '鐵甲奇俠裝備展', location: '明日世界', time: '11:00 - 17:00', desc: '🛡️ 潛入史達工業的隱秘據點，與鋼鐵人 (Iron Man) 近距離互動，他還會跟你說話喔！', icon: 'bx-bot', lat: 22.314200, lng: 114.042800, url: 'https://www.hongkongdisneyland.com/zh-hk/entertainment/iron-man-tech-showcase/' },
  
  // 停駛公告
  { id: 'a1', type: 'alert', title: '獅子王慶典', location: '原野劇場', desc: '⚠️ 因樂園營運調整，於 2026年5月4日至5月29日 暫停演出，入園當天無法觀看此表演。', icon: 'bx-error-circle', lat: 22.311831, lng: 114.0432464, url: 'https://www.hongkongdisneyland.com/zh-hk/entertainment/festival-of-the-lion-king/' },
  { id: 'a2', type: 'alert', title: '迪士尼魔法書房', location: '迪士尼故事劇場', desc: '⚠️ 配合春季限定演出，此節目暫停演出至 6月下旬。當天改為演出《StellaLou 夢想起舞吧》。', icon: 'bx-error', lat: 22.3140127, lng: 114.0397739, url: 'https://www.hongkongdisneyland.com/zh-hk/entertainment/mickey-and-the-wondrous-book/' }
];

// 元素選取與全域變數
const infoList = document.getElementById('info-list');
const bottomSheet = document.getElementById('bottom-sheet');
const dragHandle = document.querySelector('.drag-handle-area');

let map;
let leafletMarkers = {};
let userLocationMarker = null;

// 香港迪士尼城堡預設中心點與預設縮放
const PARK_CENTER = [22.31295, 114.04130];
const DEFAULT_ZOOM = 17;

// 初始化 Leaflet 地圖
function initMap() {
  map = L.map('map', {
    zoomControl: false, // 隱藏預設的縮放按鈕，我們自行在右上角排列控制按鈕
    maxZoom: 19,
    minZoom: 15
  }).setView(PARK_CENTER, DEFAULT_ZOOM);

  // 使用 CartoDB Voyager 圖層 (類似 Google Maps 的明亮清晰風格)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // 監聽地圖點擊，點擊空白處收合手機版底欄並取消選取項目
  map.on('click', () => {
    if (window.innerWidth < 768) {
      bottomSheet.classList.remove('expanded');
    }
    clearSelection();
  });
}

// 清除所有選取高亮狀態
function clearSelection() {
  document.querySelectorAll('.marker').forEach(m => m.classList.remove('active'));
  document.querySelectorAll('.info-card').forEach(c => c.classList.remove('highlight'));
}

// 全域點擊 Marker 事件
window.handleMarkerClick = function(id, lat, lng, e) {
  if (e) {
    L.DomEvent.stopPropagation(e);
  }
  activateItem(id);
  map.setView([lat, lng], 18, { animate: true });
  // 手機版自動展開底部資訊面板
  if (window.innerWidth < 768) {
    document.getElementById('bottom-sheet').classList.add('expanded');
  }
};

// 渲染 Marker 與 側欄/底欄清單項目
function renderApp(filterType = 'all') {
  // 清除地圖上的所有舊標記
  Object.values(leafletMarkers).forEach(m => map.removeLayer(m));
  leafletMarkers = {};
  
  infoList.innerHTML = '';
  
  // 先將資料依照座標分組，以便處理重疊(分支)狀況
  const groupedData = {};
  parkData.forEach(item => {
    if (filterType !== 'all' && item.type !== filterType) return;
    const key = `${item.lat},${item.lng}`;
    if (!groupedData[key]) groupedData[key] = [];
    groupedData[key].push(item);
  });

  Object.values(groupedData).forEach(group => {
    if (group.length === 1) {
      // 正常單一點位
      const item = group[0];
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="marker type-${item.type}" data-id="${item.id}" onclick="handleMarkerClick('${item.id}', ${item.lat}, ${item.lng}, event)">
            <i class='bx ${item.icon}'></i>
            <div class="marker-tooltip">
              <span class="tooltip-title">${item.title}</span>
              <div class="tooltip-meta">
                <i class='bx bx-map'></i> ${item.location}
              </div>
              ${item.time ? `<span class="tooltip-time"><i class='bx bx-time'></i> ${item.time}</span>` : ''}
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      const marker = L.marker([item.lat, item.lng], { icon: customIcon }).addTo(map);
      leafletMarkers[item.id] = marker;
      
    } else {
      // 分支點位 (多個項目在同一座標)
      let html = `<div class="branch-center"></div>`;
      group.forEach((item, index) => {
        // 根據項目數量計算分散角度
        let angle;
        if (group.length === 2) {
          angle = index === 0 ? -Math.PI / 4 : -3 * Math.PI / 4; // -45度 與 -135度
        } else {
          angle = -Math.PI + (Math.PI / (group.length - 1)) * index;
        }
        const radius = 50; // 分支長度
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius;
        
        html += `
          <div class="branch-item-wrapper" style="position: absolute; left: 0; top: 0; margin-left: ${dx - 16}px; margin-top: ${dy - 32}px; z-index: 10;">
            <div class="marker type-${item.type}" data-id="${item.id}" 
                 onclick="handleMarkerClick('${item.id}', ${item.lat}, ${item.lng}, event)">
              <i class='bx ${item.icon}'></i>
              <div class="marker-tooltip">
                <span class="tooltip-title">${item.title}</span>
                <div class="tooltip-meta">
                  <i class='bx bx-map'></i> ${item.location}
                </div>
                ${item.time ? `<span class="tooltip-time"><i class='bx bx-time'></i> ${item.time}</span>` : ''}
              </div>
            </div>
          </div>
          <!-- 連接線 -->
          <svg style="position: absolute; left: -100px; top: -100px; width: 200px; height: 200px; pointer-events: none; overflow: visible; z-index: 1;">
            <line x1="100" y1="100" x2="${100 + dx}" y2="${100 + dy - 16}" stroke="#9d88ff" stroke-width="2.5" stroke-dasharray="5,5" />
          </svg>
        `;
      });
      
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="branch-container" style="position: relative; width: 0; height: 0;">${html}</div>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });
      
      const marker = L.marker([group[0].lat, group[0].lng], { icon: customIcon }).addTo(map);
      group.forEach(item => {
        leafletMarkers[item.id] = marker;
      });
    }
  });
  
  // 建立底欄清單項目
  parkData.forEach(item => {
    if (filterType !== 'all' && item.type !== filterType) return;
    
    const card = document.createElement('div');
    card.className = `info-card type-${item.type}`;
    card.dataset.id = item.id;
    card.innerHTML = `
      <div class="card-title-group">
        <div class="card-title">${item.title}</div>
        ${item.time ? `<div class="card-time">${item.time}</div>` : ''}
      </div>
      <div class="card-meta">
        <div class="card-location"><i class='bx bx-map'></i> ${item.location}</div>
      </div>
      <div class="card-desc ${item.type === 'alert' ? 'alert-text' : ''}">${item.desc}</div>
      <a class="card-link" href="${item.url}" target="_blank" onclick="event.stopPropagation();">
        <i class='bx bx-link-external'></i> 官網介紹
      </a>
    `;
    
    // 點擊列表資訊卡片
    card.addEventListener('click', () => {
      activateItem(item.id);
      map.setView([item.lat, item.lng], 18, { animate: true });
      if (window.innerWidth < 768) {
        bottomSheet.classList.remove('expanded');
      }
    });
    infoList.appendChild(card);
  });
}

// 啟動並高亮指定項目
function activateItem(id) {
  clearSelection();
  
  // 高亮地圖上的 Marker (透過 DOM 操作)
  const markerDOM = document.querySelector(`.marker[data-id="${id}"]`);
  const card = document.querySelector(`.info-card[data-id="${id}"]`);
  
  if (markerDOM) markerDOM.classList.add('active');
  if (card) {
    card.classList.add('highlight');
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ---- 控制按鈕事件綁定 ----

// 重置地圖視角按鈕
document.getElementById('reset-map-btn').addEventListener('click', () => {
  map.setView(PARK_CENTER, DEFAULT_ZOOM, { animate: true });
  clearSelection();
});

// 展開清單切換按鈕 (手機版專用)
document.getElementById('toggle-list-btn').addEventListener('click', () => {
  document.getElementById('bottom-sheet').classList.toggle('expanded');
});

// GPS 定位我的位置按鈕
const locateBtn = document.getElementById('locate-btn');
locateBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('您的瀏覽器不支援 GPS 定位功能！');
    return;
  }

  // 變更按鈕圖示狀態為載入中
  locateBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i>";
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      // 更新或新建使用者 GPS 位置 Marker
      if (userLocationMarker) {
        userLocationMarker.setLatLng([lat, lng]);
      } else {
        const userIcon = L.divIcon({
          className: 'user-div-icon',
          html: '<div class="user-location-marker"></div>',
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        });
        userLocationMarker = L.marker([lat, lng], { icon: userIcon }).addTo(map);
      }
      
      map.setView([lat, lng], 18, { animate: true });
      locateBtn.innerHTML = "<i class='bx bx-navigation'></i>";
    },
    (error) => {
      console.error('GPS 定位失敗: ', error);
      alert('無法取得您的即時位置，請確認 GPS 開發權限是否已開啟。');
      locateBtn.innerHTML = "<i class='bx bx-navigation'></i>";
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
});

// ---- 底部面板點擊與手勢滑動邏輯 (僅限手機版) ----
let pointerStartY = 0;
let isPointerDragging = false;

dragHandle.addEventListener('pointerdown', (e) => {
  if (window.innerWidth >= 768) return;
  pointerStartY = e.clientY;
  isPointerDragging = false;
  dragHandle.setPointerCapture(e.pointerId);
});

dragHandle.addEventListener('pointermove', (e) => {
  if (Math.abs(e.clientY - pointerStartY) > 10) {
    isPointerDragging = true;
  }
});

dragHandle.addEventListener('pointerup', (e) => {
  if (window.innerWidth >= 768) return;
  const dy = e.clientY - pointerStartY;
  
  if (!isPointerDragging) {
    // 視為輕觸點擊
    bottomSheet.classList.toggle('expanded');
  } else {
    // 視為滑動
    if (dy < -20) {
      bottomSheet.classList.add('expanded'); // 往上滑，展開
    } else if (dy > 20) {
      bottomSheet.classList.remove('expanded'); // 往下滑，收合
    }
  }
});

// 分類過濾按鈕事件
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderApp(e.target.dataset.filter);
  });
});

// 頁面初始化
window.addEventListener('load', () => {
  initMap();
  renderApp();
});
