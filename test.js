const axios = require("axios");

const crawl = async (url) => {
  try {
    const response = await axios.get(url);
    const htmlString = response.data;

    // 정규 표현식을 사용하여 <span>...</span> 사이의 텍스트를 추출
    const spanTextArray = [];
    const spanRegex = /<span[^>]*>(.*?)<\/span>/g;
    let match;

    while ((match = spanRegex.exec(htmlString)) !== null) {
      spanTextArray.push(match[1].trim());
    }

    const contentWithSingleNewLines = spanTextArray
      .join("\n")
      .replace(/\n{2,}/g, "\n");

    console.log(contentWithSingleNewLines);

    return { content: contentWithSingleNewLines };
  } catch (error) {
    console.error("error", error);
  }
};

const url =
  "https://blog.naver.com/PostView.naver?blogId=borareview&logNo=223522616650&redirect=Dlog&widgetTypeCall=true&topReferer=https%3A%2F%2Fsearch.naver.com%2Fsearch.naver%3Fssc%3Dtab.blog.all%26sm%3Dtab_jum%26query%3D%25ED%2596%25A5%25EC%2588%2598%25EC%25B6%2594%25EC%25B2%259C&trackingCode=tab_blg&directAccess=false";

const main = async () => {
  const { title, content } = await crawl(url);
  console.log(title);
  console.log(content);
};

main();
