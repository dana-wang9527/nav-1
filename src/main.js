const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", url: "https://juejin.cn" },
  {
    logo: "B",
    url: "https://www.zhihu.com",
  },
];

const simplify = (url) => {
  return url
    .replace("https://", "")
    .replace("http://")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

function render() {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
    <div class="site">
      <div class="logo">${node.logo}</div>
      <div class="link">${simplify(node.url)}</div>
      <div class='close'>
      <svg class="icon">
      <use xlink:href="#icon-close"></use>
  </svg>
      </div>
    </div>
</a> 
</li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, delete 1);
      render();
    });
  });
}

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要输入的网址是什么？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);

  hashMap.push({ logo: simplify(url)[0], url: url });
  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
$(document).on("keypress", (e) => {
  const key = e.key;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
