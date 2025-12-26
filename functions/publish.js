// Example post data (replace with your form values)
const post = {
  id: '12345',
  title: 'ယူကရိန်းရှေ့တန်းက ချစ်သူဆီ "မေတ္တာရထား"',
  author: 'Soda',
  date: new Date().toISOString(),
  summary: 'ရုရှားနဲ့စစ်ဖြစ်နေတဲ့ရှေ့တန်းအနီးအထိ သွားပြီး အဲဒီမှာတာဝန်ထမ်းနေတဲ့ ချစ်ရခင်ရသူ ယူကရိန်းစစ်သားကို တွေ့ဖို့ သီးသန့်ပြေးဆွဲတဲ့ရထားကို စီးနင်းသွားတဲ့ ယူကရိန်းအမျိုးသမီးတွေအကြောင်းကို ဖတ်နိုင်ပါပြီ။',
  featureImage: 'https://ichef.bbci.co.uk/news/1024/branded_burmese/f971/live/0c56ce30-d072-11f0-a892-01d657345866.jpg',
  paragraphs: [
    'ပထမပိုဒ်နာရေး…',
    'ဒုတိယပိုဒ်နာရေး…'
  ],
  images: [
    {
      src: 'https://ichef.bbci.co.uk/news/1024/branded_burmese/f971/live/0c56ce30-d072-11f0-a892-01d657345866.jpg',
      caption: 'ရထားမထွက်ခွင်မှာ ယူနီဖောင်းဝတ်အမျိုးသားတစ်ဦးက အမျိုးသမီးတစ်ဦးကို ပွေ့ဖက်ထားတဲ့ပုံ'
    }
  ]
};

// Inject meta tags
document.getElementById('meta-title').content = post.title;
document.title = post.title;
document.getElementById('meta-description').content = post.summary;
document.getElementById('og-title').content = post.title;
document.getElementById('og-description').content = post.summary;
document.getElementById('og-image').content = post.featureImage;
document.getElementById('og-url').content = window.location.href;
document.getElementById('article-published_time').content = post.date;

// Inject article content
document.getElementById('article-title').textContent = post.title;
document.getElementById('article-author').textContent = post.author;
document.getElementById('article-date').textContent = new Date(post.date).toLocaleDateString('my-MM');
document.getElementById('article-date').setAttribute('datetime', post.date);

// Paragraphs
const body = document.getElementById('article-body');
post.paragraphs.forEach(p => {
  const para = document.createElement('p');
  para.textContent = p;
  body.appendChild(para);
});

// Images
post.images.forEach(img => {
  const figure = document.createElement('figure');
  const image = document.createElement('img');
  image.src = img.src;
  const caption = document.createElement('figcaption');
  caption.textContent = img.caption;
  figure.appendChild(image);
  figure.appendChild(caption);
  body.appendChild(figure);
});
