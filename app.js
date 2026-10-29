const auctions = [
  {id:1,title:"Portfolio Website Template",category:"वेबसाइट",price:4500,time:"02:14:36",icon:"🌐",tag:"DIGITAL",bg:"linear-gradient(135deg,#e8e5ff,#c9c2ff)"},
  {id:2,title:"Mobile App UI Kit",category:"मोबाइल ऐप",price:3200,time:"05:08:12",icon:"📱",tag:"APP DESIGN",bg:"linear-gradient(135deg,#d8f8ed,#a7e8d1)"},
  {id:3,title:"Racing Game Prototype",category:"गेम",price:7800,time:"01:32:08",icon:"🏎️",tag:"GAME",bg:"linear-gradient(135deg,#ffe7cf,#ffc78e)"},
  {id:4,title:"Wireless Headphones",category:"वस्तुएँ",price:1800,time:"11:45:20",icon:"🎧",tag:"GADGET",bg:"linear-gradient(135deg,#dcecff,#b5d5ff)"},
  {id:5,title:"Social Media Design Pack",category:"डिजिटल प्रोडक्ट",price:950,time:"08:21:09",icon:"🎨",tag:"CREATIVE",bg:"linear-gradient(135deg,#ffe1ed,#ffb9d4)"},
  {id:6,title:"E-commerce Website",category:"वेबसाइट",price:12500,time:"03:56:44",icon:"🛒",tag:"WEBSITE",bg:"linear-gradient(135deg,#e4f4d2,#c5e5a4)"}
];
const grid=document.getElementById("auctionGrid");
const modal=document.getElementById("modal");
const rupees=n=>"₹"+Number(n).toLocaleString("en-IN");
function renderAuctions(){
  const q=document.getElementById("searchInput").value.trim().toLowerCase();
  const cat=document.getElementById("categoryFilter").value;
  const shown=auctions.filter(a=>(cat==="all"||a.category===cat)&&(!q||(a.title+" "+a.category).toLowerCase().includes(q)));
  grid.innerHTML=shown.length?shown.map(a=>`<article class="auction-card">
    <div class="product-art" style="background:${a.bg}"><small>${a.tag}</small><span>${a.icon}</span></div>
    <h3>${a.title}</h3><span class="category">${a.category}</span>
    <div class="auction-meta"><div><small>डेमो वर्तमान बोली</small><strong>${rupees(a.price)}</strong></div><span class="time">◷ ${a.time}</span></div>
    <button class="bid-btn" data-bid="${a.id}">बोली देखें →</button>
  </article>`).join(""):`<div class="empty-state">कोई प्रोडक्ट नहीं मिला। दूसरा नाम या श्रेणी आज़माएँ।</div>`;
  grid.querySelectorAll("[data-bid]").forEach(b=>b.addEventListener("click",()=>showMessage("डेमो नीलामी", "यह केवल UI डेमो है। वास्तविक बोली लगाने से पहले सुरक्षित लॉगिन, सर्वर-साइड बोली सत्यापन और डेटाबेस जोड़ना होगा।")));
}
function showMessage(title,text,content=""){
  document.getElementById("modalTitle").textContent=title;
  document.getElementById("modalText").textContent=text;
  document.getElementById("modalContent").innerHTML=content;
  modal.showModal();
}
function sellerForm(){
  showMessage("विक्रेता आवेदन","अपनी जानकारी भरें। इस डेमो में फॉर्म सर्वर पर जमा नहीं होता और आवेदन सेव नहीं होगा.",`
    <label class="modal-field">आपका नाम<input name="sellerName" placeholder="पूरा नाम" required></label>
    <label class="modal-field">ईमेल<input name="sellerEmail" type="email" placeholder="name@example.com" required></label>
    <label class="modal-field">प्रोडक्ट का प्रकार<select name="kind"><option>वस्तुएँ</option><option>वेबसाइट</option><option>मोबाइल ऐप</option><option>गेम</option><option>डिजिटल प्रोडक्ट</option></select></label>
    <label class="modal-field">प्रोडक्ट का विवरण<textarea name="details" placeholder="प्रोडक्ट के बारे में बताएँ"></textarea></label>
    <p class="form-note">डेमो नोट: वास्तविक आवेदन जमा करने के लिए backend और database जोड़ना बाकी है।</p>`);
  const form=modal.querySelector("form");
  form.addEventListener("submit",e=>{if(e.submitter&&e.submitter.classList.contains("modal-ok")){const fields=form.querySelectorAll("input[required]");for(const f of fields){if(!f.value.trim()){e.preventDefault();f.reportValidity();return;}}e.preventDefault();showMessage("डेमो पूरा","फॉर्म का नमूना भर दिया गया, लेकिन अभी कहीं सेव नहीं हुआ। वास्तविक आवेदन सुविधा backend जोड़ने के बाद सक्रिय होगी।");}}, {once:true});
}
document.getElementById("searchInput").addEventListener("input",renderAuctions);
document.getElementById("categoryFilter").addEventListener("change",renderAuctions);
document.getElementById("sellerBtn").addEventListener("click",sellerForm);
document.getElementById("sellListingBtn").addEventListener("click",sellerForm);
document.getElementById("loginBtn").addEventListener("click",()=>showMessage("Login / Register","अकाउंट सिस्टम अगले चरण में सुरक्षित authentication और database के साथ जोड़ा जाएगा। अभी यह डेमो है।","<p class='form-note'>अपना पासवर्ड इस डेमो में दर्ज न करें।</p>"));
document.getElementById("adminInfoBtn").addEventListener("click",()=>showMessage("Admin सुरक्षा","Admin panel को सुरक्षित server-side authentication, अतिरिक्त verification और role checks के साथ बनाना होगा। अभी इस डेमो में कोई सक्रिय Admin login नहीं है।"));
document.getElementById("year").textContent=new Date().getFullYear();
renderAuctions();