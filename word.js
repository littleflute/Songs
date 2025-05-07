const express = require('express');
const puppeteer = require('puppeteer');
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3002;

const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" rel="stylesheet">
    <title>汪峰《人海》专辑分析</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>
<body class="bg-gray-100 text-gray-800">
    <header class="bg-blue-600 text-white p-8 text-center">
        <h1 class="text-4xl font-bold">聆听《人海》：汪峰在喧嚣尘世中的灵魂奏鸣</h1>
    </header>
    <main class="container mx-auto p-8 space-y-8">
        <section>
            <h2 class="text-3xl font-bold">音乐风格：多元融合下的情感共鸣</h2>
            <p>《人海》的音乐风格可谓是多元而丰富，它并非是单一风格的简单呈现，而是将摇滚、民谣、流行等多种元素巧妙融合，形成了独属于汪峰的音乐宇宙。</p>
            <p>在专辑开篇，我们能感受到摇滚那强烈的节奏与震撼的力量。如《灿烂的你》，激昂的吉他旋律和鼓点的猛烈敲击，瞬间将听众带入一个充满激情与热血的世界。汪峰那极具辨识度的嗓音，在高音部分的嘶吼与呐喊，仿佛是对生活中那些困境与挑战的无畏宣战，让人听后心生振奋。</p>
            <p>而在《想念真好》这样的歌曲中，民谣的温暖与细腻得以展现。简单的吉他和弦，搭配着汪峰深情的吟唱，宛如在讲述一段温柔而又美好的回忆。歌曲中那淡淡的忧伤与思念，如同微风拂过脸颊，让人在不经意间陷入对过去的缅怀之中。这种民谣元素的融入，为专辑增添了一抹柔情，让听众在喧嚣的世界中找到了一片宁静的港湾。</p>
            <p>流行元素的运用则让专辑更具大众亲和力。像《无名之辈》，旋律简洁易记，歌词贴近生活，很容易引起广大听众的共鸣。歌曲以平凡人的视角，描绘了在生活中努力奋斗、却又常常被忽视的无名之辈的心声。这种对小人物的关注，使得歌曲充满了人文关怀，也让专辑在市场上更具传播力。</p>
        </section>
        <section>
            <h2 class="text-3xl font-bold">歌词内涵：对生活的深度洞察与思考</h2>
            <p>汪峰的歌词一直以深刻、真实著称，《人海》也不例外。专辑中的每一首歌词都像是一面镜子，映照出生活的酸甜苦辣与人性的复杂多样。</p>
            <p>在《没有人在乎》中，歌词“没有人在乎你满脸的疲惫，没有人在乎你深夜的眼泪”，直白而又残酷地揭示了现实生活中人与人之间的冷漠。它让我们看到，在这个看似繁华的世界里，每个人都在为自己的生活奔波忙碌，往往忽略了身边人的感受。而“可是你依然要勇敢地飞，哪怕带着伤也要去追”，又给予了人们一种鼓舞与力量，告诉我们即使在无人问津的角落里，也要怀揣着梦想，勇敢前行。</p>
            <p>《脏歌》则是对社会现实的一种批判与反思。歌词中“这世界有些脏，脏得让人绝望”，表达了对社会中一些不良现象的不满与愤慨。但同时，歌曲也没有陷入一味的抱怨与悲观，而是通过“我要唱着歌，把这黑夜照亮”，传递出一种积极向上的态度，鼓励人们用自己的方式去改变这个世界。</p>
            <p>《亲爱的敌人》更是从人性的角度出发，探讨了人与人之间复杂的关系。“亲爱的敌人，你让我懂得了坚强，你让我看到了自己的模样”，歌词中对敌人的一种独特解读，让我们明白，在生活中那些与我们对立的人，有时候也能成为我们成长的动力。这种对人性的深度挖掘，使得歌词具有了更深层次的意义。</p>
        </section>
        <section>
            <h2 class="text-3xl font-bold">演唱技巧：炉火纯青的情感表达</h2>
            <p>汪峰的演唱技巧在《人海》中得到了淋漓尽致的展现。他能够根据不同歌曲的风格和情感需求，灵活运用各种演唱方式，将歌曲中的情感完美地传递给听众。</p>
            <p>在高音部分，汪峰的嗓音依旧保持着强大的爆发力和穿透力。如在《灿烂的你》中，他那高亢激昂的高音，如同火箭一般冲破云霄，让人为之震撼。这种高音的处理，不仅展现了他扎实的唱功，更让歌曲中的激情与力量得到了充分的释放。</p>
            <p>而在低音部分，他又能将情感演绎得细腻入微。在《想念真好》中，他用低沉而温柔的嗓音，诉说着对过去的思念之情。那轻轻的吟唱，仿佛是在耳边低语，让人感受到一种温暖而又深沉的情感。</p>
            <p>在演唱的过程中，汪峰还非常注重情感的投入与表达。他能够将自己的喜怒哀乐融入到每一个音符之中，让听众产生强烈的共鸣。无论是歌曲中的愤怒、悲伤还是喜悦，他都能通过自己的演唱，让听众感同身受。</p>
        </section>
        <section>
            <h2 class="text-3xl font-bold">专辑意义：在人海中寻找自我与希望</h2>
            <p>《人海》这张专辑不仅仅是一张音乐作品，它更是汪峰对生活、对人性的一次深刻思考与表达。在这个纷繁复杂的世界里，每个人都像是茫茫人海中的一滴水，渺小而又孤独。但正是这些渺小的个体，构成了这个丰富多彩的世界。</p>
            <p>专辑通过音乐和歌词，引导我们去关注身边的人，关注生活中的点点滴滴。它让我们明白，无论生活多么艰难，我们都不能放弃对梦想的追求，不能放弃对生活的热爱。在《无名之辈》中，那些平凡人的故事，让我们看到了自己的影子，也让我们相信，只要努力奋斗，每一个无名之辈都有可能成为自己生活的主角。</p>
            <p>同时，专辑也传递出一种对未来的希望与信心。在《灿烂的你》中，那激昂的旋律和充满希望的歌词，仿佛是在告诉我们，无论前方的道路多么崎岖，我们都要相信，未来会有灿烂的阳光等待着我们。</p>
            <p>总之，汪峰的《人海》是一张值得我们反复聆听的专辑。它用音乐的力量，触动着我们的心灵，让我们在人海中找到了自我，也找到了前行的方向。让我们一起沉浸在这张专辑的音乐世界里，感受那份来自灵魂深处的共鸣与感动。 </p>
        </section>
    </main>
    <footer class="bg-blue-600 text-white p-8 text-center">
        <p>&copy; 2025 音乐赏析</p>
    </footer>
</body>
</html>
`;

app.get('/download-word', async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdfPath = path.join(__dirname, 'output.pdf');
        await page.pdf({ path: pdfPath, format: 'A4' });
        await browser.close();

        const result = await mammoth.convertToDocx({ path: pdfPath });
        const wordPath = path.join(__dirname, 'output.docx');
        fs.writeFileSync(wordPath, result.value);

        res.download(wordPath, 'output.docx', (err) => {
            if (err) {
                console.error('下载出错:', err);
                res.status(500).send('下载出错');
            }
            fs.unlinkSync(pdfPath);
            fs.unlinkSync(wordPath);
        });
    } catch (error) {
        console.error('生成 Word 文档出错:', error);
        res.status(500).send('生成 Word 文档出错');
    }
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});    
/**
 * 升级
 * let http://localhost:3002/ show a page
 */