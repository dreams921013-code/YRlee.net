/* Preview only: exported data.js remains the public source of truth. */
if (new URLSearchParams(location.search).get('admin-preview') === '1') {
  try { const draft=JSON.parse(localStorage.getItem('eem-admin-draft-v13')||'null');
    if (draft && typeof draft==='object' && typeof siteData==='object') {
      Object.keys(siteData).forEach(k=>delete siteData[k]);
      Object.assign(siteData,draft);
    }
  } catch(e) { console.warn('미리보기 임시 데이터 읽기 실패',e); }
}
